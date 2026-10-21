import { useCallback, type CSSProperties } from 'react';
import { useLang } from '../i18n';
import { useParallax } from '../hooks/interactions';
import { IMAGES, identity } from '../data/site';
import { Steam } from './Decor';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export function Hero() {
  const { lang, t } = useLang();
  const bg = useParallax(0.1);

  const go = useCallback((id: string) => scrollTo(id), []);

  return (
    <section className="hero" id="home" aria-label={t.hero.kicker}>
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker" data-reveal>{t.hero.kicker}</p>
          <h1 className="hero__title" data-reveal>
            <span className="hero__line">{t.hero.titleA}</span>
            <span className="hero__line hero__line--gold">{t.hero.titleB}</span>
          </h1>
          <p className="hero__text" data-reveal>{t.hero.text}</p>

          <div className="hero__actions" data-reveal>
            <button type="button" className="btn btn--gold" onClick={() => go('menu')}>
              {t.hero.primary}
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => go('location')}>
              {t.hero.secondary}
            </button>
          </div>

          <div className="hero__foot" data-reveal>
            <Steam className="hero__steam" />
            <span className="hero__since">{t.hero.since}</span>
          </div>
        </div>

        <div className="hero__visual" data-reveal>
          <div className="arch hero__arch" style={{ '--py': '0px' } as CSSProperties}>
            <div className="hero__parallax" ref={bg}>
              <img
                src={IMAGES.sign}
                alt={
                  lang === 'ar'
                    ? 'لافتة بادر قهوة مختصة المضيئة على واجهة المحل'
                    : 'The illuminated BADER specialty coffee sign'
                }
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
          <p className="hero__credit">{t.hero.since}</p>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => go('signature')}
        aria-label={t.hero.scroll}
      >
        <span className="hero__scroll-track" aria-hidden="true">
          <span className="hero__scroll-dot" />
        </span>
        {t.hero.scroll}
      </button>

      <span className="hero__slogan" aria-hidden="true">
        {identity.slogan[lang]}
      </span>
    </section>
  );
}
