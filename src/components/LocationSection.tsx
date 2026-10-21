import { useLang } from '../i18n';
import { address, hours, links } from '../data/site';

/** خريطة توضيحية مصوّرة بروح الدمام — بدون إحداثيات مفبركة */
function MapIllustration({ label }: { label: string }) {
  return (
    <svg className="loc__map-svg" viewBox="0 0 400 300" role="img" aria-label={label}>
      <rect width="400" height="300" fill="#e9dcc3" />
      <path
        d="M0 214 C120 202 260 236 400 190 L400 300 L0 300 Z"
        fill="#9dbfb4"
        opacity="0.65"
      />
      <path d="M0 236 C140 224 250 250 400 212" stroke="#f4ecde" strokeWidth="7" fill="none" opacity="0.8" />
      <g stroke="#c9b28c" strokeWidth="3">
        <path d="M60 40 L60 170" />
        <path d="M118 24 L118 150" />
        <path d="M330 40 L330 150" />
        <path d="M40 86 L300 86" />
        <path d="M150 210 L150 300" />
      </g>
      <g fill="#ead9b8" stroke="#c2a878" strokeWidth="2">
        <rect x="66" y="50" width="34" height="26" rx="3" />
        <rect x="132" y="96" width="46" height="30" rx="3" />
        <rect x="286" y="58" width="38" height="28" rx="3" />
        <rect x="212" y="120" width="40" height="26" rx="3" />
      </g>
      <g fill="#12332a">
        <path
          d="M200 118 c-16 0 -26 11 -26 25 0 18 26 43 26 43 s26-25 26-43 c0-14-10-25-26-25 Z"
          opacity="0.92"
        />
        <circle cx="200" cy="143" r="10" fill="#f4ecde" />
        <circle cx="200" cy="143" r="5" fill="#1e4636" />
      </g>
      <text x="200" y="40" textAnchor="middle" fill="#12332a" fontSize="19" fontWeight="700">
        حي الروضة
      </text>
      <text x="318" y="262" textAnchor="middle" fill="#12332a" fontSize="15" fontWeight="600">
        الدمام
      </text>
    </svg>
  );
}

export function LocationSection() {
  const { lang, t } = useLang();

  return (
    <section className="loc" id="location">
      <div className="loc__grid">
        <div className="loc__info">
          <p className="kicker kicker--gold" data-reveal>{t.location.kicker}</p>
          <h2 data-reveal>{t.location.title}</h2>
          <p className="loc__text" data-reveal>{t.location.text}</p>

          <div className="loc__address" data-reveal>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <path
                d="M12 21 c-4.6-4.4-7-7.8-7-11 a7 7 0 0 1 14 0 c0 3.2-2.4 6.6-7 11 Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.6" fill="currentColor" />
            </svg>
            <strong>{address[lang]}</strong>
          </div>

          <div className="loc__hours" data-reveal>
            <h3>{t.location.hoursTitle}</h3>
            {hours.map((h, i) => (
              <div className="loc__hour-row" key={i}>
                <span>{h.days[lang]}</span>
                <i aria-hidden="true" />
                <span className="loc__hour-time">{h.time[lang]}</span>
              </div>
            ))}
            <p className="loc__note">{t.location.hoursNote}</p>
          </div>

          <a
            className="btn btn--gold"
            href={links.maps}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal=""
          >
            {t.location.maps}
          </a>
        </div>

        <div className="loc__map" data-reveal>
          <MapIllustration label={address[lang]} />
          <p className="loc__hint">{t.location.mapHint}</p>
        </div>
      </div>
    </section>
  );
}
