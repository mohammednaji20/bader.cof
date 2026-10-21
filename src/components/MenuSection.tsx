import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useLang } from '../i18n';
import {
  menuCategories,
  menuItems,
  type CategoryId,
  type MenuItem,
} from '../data/menu';
import { QUICK_VIEW_EVENT } from '../events/quickview';
import { StarEight } from './Decor';
import { useLockScroll } from '../hooks/interactions';

/** لوحة الزخرفة الظاهرة عندما لا تتوفر صورة للمنتج */
function CupTexture({ label }: { label: string }) {
  return (
    <span className="menu__texture" aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none">
        <path d="M60 12 c-14 14-14 26 0 40 14 14 14 26 0 40" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="62" r="26" stroke="currentColor" strokeWidth="2" />
        <path d="M40 50 h40 v14 a20 20 0 0 1-40 0 Z" fill="currentColor" opacity="0.9" />
        <path d="M80 54 h8 a7 7 0 0 1 0 14 h-8" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M34 96 h52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{label}</span>
    </span>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`chip ${active ? 'is-active' : ''}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/** نافذة العرض السريع (تُستنسخ لكل منتج عبر key=id) */
function QuickView({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { lang, t } = useLang();
  const catLabel =
    menuCategories.find((c) => c.id === item.category)?.label[lang] ?? '';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useLockScroll(true);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={item.name[lang]}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal__panel" data-reveal="">
        <button type="button" className="modal__close" onClick={onClose} aria-label={t.menu.close} autoFocus>
          ✕
        </button>

        {item.image ? (
          <img className="modal__img" src={item.image} alt={item.name[lang]} />
        ) : (
          <div className="modal__img modal__img--texture">
            <CupTexture label={item.name[lang]} />
          </div>
        )}

        <div className="modal__body">
          <span className="modal__cat">
            {t.menu.category}: {catLabel}
          </span>
          <h3>{item.name[lang]}</h3>
          <p className="modal__desc">{item.desc[lang]}</p>

          <div className="modal__price">
            <span>{t.menu.priceNote}</span>
            <StarEight className="modal__star" />
          </div>
          <p className="modal__note">{t.menu.modalNote}</p>
        </div>
      </div>
    </div>
  );
}

export function MenuSection() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState<CategoryId | 'all'>('all');
  const [selected, setSelected] = useState<MenuItem | null>(null);

  useEffect(() => {
    const onQuickView = (e: Event) => {
      const item = (e as CustomEvent<MenuItem>).detail;
      setSelected(item);
    };
    window.addEventListener(QUICK_VIEW_EVENT, onQuickView);
    return () => window.removeEventListener(QUICK_VIEW_EVENT, onQuickView);
  }, []);

  const items = useMemo(
    () => (cat === 'all' ? menuItems : menuItems.filter((m) => m.category === cat)),
    [cat],
  );

  return (
    <section className="menu" id="menu">
      <div className="menu__head">
        <p className="kicker kicker--gold" data-reveal>{t.menu.kicker}</p>
        <h2 data-reveal>{t.menu.title}</h2>
        <p className="menu__lead" data-reveal>{t.menu.text}</p>

        <div className="menu__filters" role="group" aria-label={t.menu.few} data-reveal>
          <FilterChip active={cat === 'all'} onClick={() => setCat('all')}>
            {t.menu.all}
          </FilterChip>
          {menuCategories.map((c) => (
            <FilterChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label[lang]}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="menu__grid">
        {items.map((item, i) => (
          <button
            type="button"
            key={item.id}
            className={`menu__card ${item.image ? 'menu__card--photo' : ''}`}
            data-reveal=""
            style={{ '--rd': `${(i % 3) * 90}ms` } as CSSProperties}
            onClick={() => setSelected(item)}
          >
            {item.image ? (
              <span className="menu__thumb arch">
                <img src={item.image} alt={item.name[lang]} loading="lazy" decoding="async" />
              </span>
            ) : (
              <span className="menu__thumb arch menu__thumb--flat">
                <CupTexture label={item.name[lang]} />
              </span>
            )}
            <span className="menu__info">
              <span className="menu__name">{item.name[lang]}</span>
              <span className="menu__desc">{item.desc[lang]}</span>
              <span className="menu__row">
                <span className="menu__cat">
                  {menuCategories.find((c) => c.id === item.category)?.label[lang]}
                </span>
                <span className="menu__price">{t.menu.priceNote}</span>
              </span>
            </span>
            <span className="menu__quick" aria-hidden="true">
              {t.menu.quickView}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <QuickView
          key={selected.id}
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
