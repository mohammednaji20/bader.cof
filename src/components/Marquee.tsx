import { useLang } from '../i18n';

/** شريط متحرك بكلمات الهوية — يمرّ بهدوء بلا حدود */
export function Marquee() {
  const { t, lang } = useLang();
  const items = t.marquee;
  const row = [...items, ...items];
  return (
    <div className="marquee" role="presentation" aria-hidden={true}>
      <div className="marquee__track" data-dir={lang}>
        {row.map((text, i) => (
          <span className="marquee__item" key={i}>
            {text}
            <i className="marquee__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
