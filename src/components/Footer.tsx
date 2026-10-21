import { useLang } from '../i18n';
import { IMAGES, links } from '../data/site';
import { StarEight } from './Decor';

export function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <img src={IMAGES.logo} alt="BADER Coffee" width="64" height="64" loading="lazy" decoding="async" />
          <p className="footer__word">{lang === 'ar' ? 'بادر' : 'BADER'}</p>
          <p className="footer__slogan">
            {t.footer.line} — {t.footer.slogan}
          </p>
        </div>

        <nav className="footer__nav" aria-label={t.footer.navigate}>
          <h4>{t.footer.navigate}</h4>
          <a href="#home">{t.nav.home}</a>
          <a href="#menu">{t.nav.menu}</a>
          <a href="#story">{t.nav.story}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#location">{t.nav.visit}</a>
        </nav>

        <nav className="footer__connect" aria-label={t.footer.connect}>
          <h4>{t.footer.connect}</h4>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer">
            {t.footer.instagram}
          </a>
          <a href={links.threads} target="_blank" rel="noopener noreferrer">
            {t.footer.threads}
          </a>
          <a href={links.maps} target="_blank" rel="noopener noreferrer">
            Google Maps
          </a>
        </nav>

        <div className="footer__motif" aria-hidden="true">
          <StarEight />
          <span>{t.footer.motto}</span>
        </div>
      </div>

      <div className="footer__bar">
        <span>
          © {new Date().getFullYear()} {lang === 'ar' ? 'بادر — قهوة مختصة' : 'BADER Coffee'}
        </span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
}
