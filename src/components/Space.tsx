import { useEffect, useState, useCallback } from 'react';
import { useLang } from '../i18n';
import { gallery } from '../data/gallery';
import { useLockScroll } from '../hooks/interactions';

export function Space() {
  const { lang, t } = useLang();
  const [focus, setFocus] = useState<number | null>(null);

  const close = useCallback(() => setFocus(null), []);
  const move = useCallback(
    (dir: 1 | -1) => {
      setFocus((f) => {
        if (f === null) return f;
        const next = (f + (lang === 'ar' ? -dir : dir) + gallery.length) % gallery.length;
        return next;
      });
    },
    [lang],
  );

  useEffect(() => {
    if (focus === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [focus, close, move]);

  useLockScroll(focus !== null);

  const current = focus !== null ? gallery[focus] : null;

  return (
    <section className="space" id="gallery">
      <div className="space__head">
        <p className="kicker kicker--gold" data-reveal>{t.space.kicker}</p>
        <h2 data-reveal>{t.space.title}</h2>
        <p data-reveal>{t.space.text}</p>
      </div>

      <div className="space__masonry" data-reveal="">
        {gallery.map((g, i) => (
          <button
            type="button"
            key={g.src + i}
            className={`space__cell space__cell--${g.size}`}
            onClick={() => setFocus(i)}
            aria-label={`${t.space.openLightbox}: ${g.caption[lang]}`}
          >
            <img
              src={g.src}
              alt={g.alt[lang]}
              loading="lazy"
              decoding="async"
            />
            <span className="space__cap" aria-hidden="true">{g.caption[lang]}</span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption[lang]}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button type="button" className="lightbox__close" onClick={close} aria-label={t.space.close} autoFocus>
            ✕
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => move(-1)}
            aria-label={t.space.prev}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <path d="M14 5 L7 12 L14 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>

          <figure className="lightbox__stage" data-reveal="">
            <img src={current.src} alt={current.alt[lang]} decoding="async" />
            <figcaption>
              {current.caption[lang]}
              <span>
                {focus !== null ? focus + 1 : 0} {t.space.count} {gallery.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => move(1)}
            aria-label={t.space.next}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <path d="M10 5 L17 12 L10 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
