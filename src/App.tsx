import { LanguageProvider, useLang } from './i18n';
import { useRevealObserver } from './hooks/interactions';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Signature } from './components/Signature';
import { MenuSection } from './components/MenuSection';
import { Story } from './components/Story';
import { Space } from './components/Space';
import { Moments } from './components/Moments';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

function Site() {
  useRevealObserver();
  const { lang } = useLang();

  const skipTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="site">
      <a
        href="#main"
        className="skip"
        onClick={(e) => {
          e.preventDefault();
          skipTo('main');
        }}
      >
        {lang === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Signature />
        <MenuSection />
        <Story />
        <Space />
        <Moments />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}
