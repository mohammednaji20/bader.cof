import { useLang } from '../i18n';
import { IMAGES, links } from '../data/site';
import type { CSSProperties } from 'react';

/**
 * «لحظات من بادر» — صور حقيقية من الهوية الرسمية، والقسم يرتبط مباشرة
 * بحساب انستقرام دون أي ادعاءات حُساب أو منشورات مفبركة.
 */
const MOMENTS = [
  IMAGES.latte,
  IMAGES.pink,
  IMAGES.iced,
  IMAGES.nationalDay,
  IMAGES.carpet2,
  IMAGES.sign,
];

export function Moments() {
  const { t } = useLang();

  return (
    <section className="moments" aria-labelledby="moments-title">
      <div className="moments__head">
        <p className="kicker kicker--gold" data-reveal>{t.moments.kicker}</p>
        <h2 id="moments-title" data-reveal>{t.moments.title}</h2>
        <p data-reveal>{t.moments.text}</p>
      </div>

      <div className="moments__grid">
        {MOMENTS.map((src, i) => (
          <a
            key={src + i}
            className="moments__cell"
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal=""
            style={{ '--rd': `${(i % 3) * 80}ms` } as CSSProperties}
          >
            <img src={src} alt={t.moments.source} loading="lazy" decoding="async" />
            <span className="moments__ig" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
              </svg>
            </span>
          </a>
        ))}
      </div>

      <div className="moments__cta" data-reveal>
        <a className="btn btn--green" href={links.instagram} target="_blank" rel="noopener noreferrer">
          {t.moments.follow}
        </a>
        <span className="moments__source">{t.moments.source}</span>
      </div>
    </section>
  );
}
