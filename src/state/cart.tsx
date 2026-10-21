import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { menuItems } from '../data/menu';
import { useLang } from '../i18n';
import { useLockScroll } from '../hooks/interactions';
import { whatsappConfigured, whatsappLink } from '../data/site';
import { greetingMessage, orderMessage } from '../utils/whatsapp';

/**
 * سلة الطلب المركزية — محفوظة في localStorage وتسترجع تلقائياً.
 * لا تُرسل بيانات لأي خادم: تبني رسالة واتساب نصية أنيقة عند الضغط فقط.
 */

export interface CartLine {
  id: string;
  qty: number;
}

interface CartApi {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'bader-cart-v1';

const CartContext = createContext<CartApi>({
  lines: [],
  count: 0,
  isOpen: false,
  openCart: () => undefined,
  closeCart: () => undefined,
  add: () => undefined,
  setQty: () => undefined,
  remove: () => undefined,
  clear: () => undefined,
});

/** تنظيف وتحقق من محتوى السلة المخزن */
function normalize(raw: unknown): CartLine[] {
  if (typeof raw !== 'string') return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const valid = new Set(menuItems.map((m) => m.id));
  return parsed
    .filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === 'object' &&
        typeof (l as CartLine).id === 'string' &&
        typeof (l as CartLine).qty === 'number' &&
        valid.has((l as CartLine).id),
    )
    .map((l) => ({ id: l.id, qty: Math.max(1, Math.min(20, Math.round(l.qty))) }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      return normalize(localStorage.getItem(STORAGE_KEY));
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* التخزين غير متاح */
    }
  }, [lines]);

  const api = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (id, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id);
          if (found) {
            return prev.map((l) =>
              l.id === id ? { ...l, qty: Math.min(20, l.qty + qty) } : l,
            );
          }
          return [...prev, { id, qty }];
        }),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty < 1
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(20, qty) } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    }),
    [lines, isOpen],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

const CartSvg = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
    <path
      d="M3 4h2.3l2.4 10.6a1.8 1.8 0 0 0 1.8 1.4h7.9a1.8 1.8 0 0 0 1.8-1.4L20.5 7.5H6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10.4" cy="19.4" r="1.5" fill="currentColor" />
    <circle cx="17.2" cy="19.4" r="1.5" fill="currentColor" />
  </svg>
);

const WhatsAppSvg = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M12 3.9c-4.5 0-8.1 3.6-8.1 8.1 0 1.6.5 3 1.3 4.3L4 20.1l4-1.1c1.2.6 2.5 1 3.9 1 4.5 0 8.1-3.6 8.1-8.1S16.5 3.9 12 3.9Zm5.7 11.6c-.2.6-1.2 1.2-1.7 1.3-.4 0-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4-.1.6.4.2.5.7 1.7.8 1.9.1.2.1.4 0 .6-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1l1.7.8c.2.1.4.2.4.3 0 .1 0 .8-.2 1.3Z" />
  </svg>
);

/** أيقونة السلة مع شارة العدد — تظهر في الترويسة */
export function CartButton() {
  const { count, openCart } = useCart();
  const { t } = useLang();
  return (
    <button
      type="button"
      className="nav__cart"
      onClick={openCart}
      aria-label={`${t.cart.open} (${count})`}
    >
      <CartSvg />
      {count > 0 && (
        <span className="nav__cart-badge" key={count}>
          {count > 20 ? '20+' : count}
        </span>
      )}
    </button>
  );
}

/** نافذة السلة + إرسال الطلب على واتساب */
export function CartView() {
  const { lang, t } = useLang();
  const cart = useCart();
  const [note, setNote] = useState('');

  useLockScroll(cart.isOpen);

  useEffect(() => {
    if (!cart.isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cart.closeCart();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cart.isOpen, cart.closeCart]);

  if (!cart.isOpen) return null;

  const entries = cart.lines
    .map((l) => ({ item: menuItems.find((m) => m.id === l.id), qty: l.qty }))
    .filter((e): e is { item: (typeof menuItems)[number]; qty: number } => !!e.item);

  const href = whatsappLink(
    orderMessage(
      entries.map((e) => ({ name: e.item.name[lang], qty: e.qty })),
      note,
      lang,
    ),
  );

  return (
    <div
      className="modal cart"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) cart.closeCart();
      }}
    >
      <div className="cart__panel">
        <header className="cart__head">
          <h3>{t.cart.title}</h3>
          <button
            type="button"
            className="modal__close modal__close--static"
            onClick={cart.closeCart}
            aria-label={t.cart.close}
            autoFocus
          >
            ✕
          </button>
        </header>

        {entries.length === 0 ? (
          <div className="cart__empty">
            <span aria-hidden="true">☕</span>
            <strong>{t.cart.empty}</strong>
            <p>{t.cart.emptyHint}</p>
            <a href="#menu" className="link-arrow" onClick={cart.closeCart}>
              {t.cart.browse}
            </a>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {entries.map(({ item, qty }) => (
                <li key={item.id} className="cart__row">
                  <span className="cart__name">{item.name[lang]}</span>
                  <span className="cart__qty">
                    <button
                      type="button"
                      onClick={() => cart.setQty(item.id, qty - 1)}
                      aria-label="−"
                    >
                      −
                    </button>
                    <b>{qty}</b>
                    <button
                      type="button"
                      onClick={() => cart.setQty(item.id, qty + 1)}
                      aria-label="+"
                    >
                      +
                    </button>
                  </span>
                  <button
                    type="button"
                    className="cart__remove"
                    onClick={() => cart.remove(item.id)}
                    aria-label={t.cart.remove}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <label className="cart__note">
              <span>{t.cart.noteTitle}</span>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.cart.notePh}
              />
            </label>

            <a
              className="btn btn--wa cart__send"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!whatsappConfigured}
            >
              <WhatsAppSvg />
              {t.cart.send}
            </a>

            <div className="cart__foot">
              <button type="button" onClick={cart.clear}>
                {t.cart.clear}
              </button>
              {!whatsappConfigured && <span>{t.cart.unconfigured}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * زر واتساب العائم:
 * - سلة فيها عناصر؟ يفتح السلة لمراجعة وإرسال الطلب.
 * - سلة فاضية؟ يفتح رسالة واتساب مباشرة (أو انستقرام كحل مؤقت
 *   حتى ضبط الرقم في data/site.ts).
 */
export function WhatsAppFab() {
  const { count, openCart } = useCart();
  const { lang, t } = useLang();

  if (count > 0) {
    return (
      <button
        type="button"
        className="fab fab--cart"
        onClick={openCart}
        aria-label={`${t.cart.open} (${count})`}
      >
        <CartSvg />
        <span className="fab__badge" key={count}>
          {count > 20 ? '20+' : count}
        </span>
      </button>
    );
  }

  return (
    <a
      className="fab fab--wa"
      href={whatsappLink(greetingMessage(lang))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.cart.direct}
    >
      <WhatsAppSvg />
    </a>
  );
}
