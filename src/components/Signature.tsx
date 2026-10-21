import { useLang } from '../i18n';
import { IMAGES } from '../data/site';
import { StarEight } from './Decor';
import { openQuickView } from '../events/quickview';
import { menuItems, type MenuItem } from '../data/menu';

/** المنتجات الثلاثة التي تمثّلها الصور هنا (حسب الملف المركزي للمنيو) */
const SIGNATURE_ITEMS: (MenuItem | undefined)[] = [
  menuItems.find((m) => m.id === 'hot-latte'),
  menuItems.find((m) => m.id === 'iced-coffee'),
  menuItems.find((m) => m.id === 'sig-pink'),
];

const SHOTS = [
  { image: IMAGES.latte },
  { image: IMAGES.iced },
  { image: IMAGES.pink },
];

export function Signature() {
  const { t } = useLang();

  const Card = ({ index, className }: { index: number; className?: string }) => {
    const item = SIGNATURE_ITEMS[index];
    if (!item) return null;
    const meta = t.signature.items[index];
    return (
      <button
        type="button"
        className={`signature__card ${className ?? ''}`}
        data-reveal=""
        onClick={() => openQuickView(item)}
        title={t.menu.quickView}
      >
        <img src={SHOTS[index].image} alt={meta.title} loading="lazy" decoding="async" />
        <span className="signature__label">
          <span className="signature__tag">{meta.tag}</span>
          <strong>{meta.title}</strong>
          <span>{meta.text}</span>
        </span>
      </button>
    );
  };

  return (
    <section className="signature" id="signature">
      <div className="signature__head">
        <p className="kicker kicker--gold" data-reveal>{t.signature.kicker}</p>
        <h2 data-reveal>{t.signature.title}</h2>
      </div>

      <div className="signature__board">
        <Card index={0} className="signature__card--main arch" />
        <span className="signature__note" data-reveal>
          <StarEight className="signature__star" />
          <p>{t.signature.text}</p>
          <a className="link-arrow" href="#menu">
            {t.signature.viewMenu}
          </a>
        </span>
        <Card index={1} />
        <Card index={2} />
      </div>
    </section>
  );
}
