import { useLang } from '../i18n';
import { IMAGES } from '../data/site';
import { StarEight } from './Decor';

export function Story() {
  const { t } = useLang();

  return (
    <section className="story" id="story">
      <div className="story__grid">
        <div className="story__copy">
          <p className="kicker kicker--gold" data-reveal>{t.story.kicker}</p>
          <h2 data-reveal>{t.story.title}</h2>
          <p className="story__body" data-reveal>{t.story.body1}</p>
          <p className="story__body" data-reveal>{t.story.body2}</p>

          <blockquote className="story__quote" data-reveal>
            <span className="story__quote-mark" aria-hidden="true">{t.story.quoteMark}</span>
            {t.story.quote}
            <footer>{t.story.caption}</footer>
          </blockquote>
        </div>

        <div className="story__visuals">
          <span className="arch story__mirror" data-reveal>
            <img src={IMAGES.mirror} alt={t.story.title} loading="lazy" decoding="async" />
          </span>
          <span className="story__carpet" data-reveal>
            <img src={IMAGES.carpet1} alt={t.story.title} loading="lazy" decoding="async" />
          </span>
          <StarEight className="story__star" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
