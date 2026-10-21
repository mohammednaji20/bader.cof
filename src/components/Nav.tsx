import { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { useScrolled } from '../hooks/interactions';
import { IMAGES } from '../data/site';
import type { Lang } from '../i18n';

const SECTIONS = [
  { id: 'home', key: 'home' },
  { id: 'menu', key: 'menu' },
  { id: 'story', key: 'story' },
  { id: 'gallery', key: 'gallery' },
  { id: 'location', key: 'visit' },
] as const;

export function Nav() {
  const { lang, setLang, t } = useLang();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const toggleLang = () => setLang((lang === 'ar' ? 'en' : 'ar') as Lang);

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand" aria-label="BADER Coffee">
          <img src={IMAGES.logo} alt="" width="44" height="44" decoding="async" />
          <span className="nav__brand-text" aria-hidden="true">
            {lang === 'ar' ? 'بادر' : 'BADER'}
          </span>
        </a>

        <nav className="nav__links" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary'}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}>
              {t.nav[s.key]}
            </a>
          ))}
        </nav>

        <div className="nav__side">
          <button
            type="button"
            className="nav__lang"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            {t.nav.switchTo}
          </button>
          <a href="#menu" className="btn btn--gold nav__cta">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav__sheet ${open ? 'is-open' : ''}`}>
        <nav aria-label={lang === 'ar' ? 'قائمة الجوال' : 'Mobile menu'}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}>
              {t.nav[s.key]}
            </a>
          ))}
          <a href="#menu" className="btn btn--gold" onClick={() => setOpen(false)}>
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
