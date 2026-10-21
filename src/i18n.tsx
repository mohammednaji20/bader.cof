import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'ar' | 'en';

export interface Strings {
  nav: {
    home: string;
    menu: string;
    story: string;
    gallery: string;
    visit: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
    switchTo: string;
  };
  hero: {
    kicker: string;
    titleA: string;
    titleB: string;
    text: string;
    primary: string;
    secondary: string;
    scroll: string;
    since: string;
  };
  marquee: string[];
  signature: {
    kicker: string;
    title: string;
    text: string;
    viewMenu: string;
    items: { tag: string; title: string; text: string }[];
  };
  menu: {
    kicker: string;
    title: string;
    text: string;
    all: string;
    quicker: string;
    priceNote: string;
    quickView: string;
    close: string;
    category: string;
    rows: string;
    modalNote: string;
    few: string;
  };
  story: {
    kicker: string;
    title: string;
    body1: string;
    body2: string;
    quote: string;
    quoteMark: string;
    caption: string;
  };
  space: {
    kicker: string;
    title: string;
    text: string;
    openLightbox: string;
    close: string;
    prev: string;
    next: string;
    count: string;
  };
  moments: {
    kicker: string;
    title: string;
    text: string;
    follow: string;
    source: string;
  };
  location: {
    kicker: string;
    title: string;
    text: string;
    address: string;
    hoursTitle: string;
    maps: string;
    hoursNote: string;
    mapHint: string;
  };
  footer: {
    line: string;
    slogan: string;
    navigate: string;
    connect: string;
    instagram: string;
    threads: string;
    rights: string;
    motto: string;
  };
}

const ar: Strings = {
  nav: {
    home: 'الرئيسية',
    menu: 'المنيو',
    story: 'قصتنا',
    gallery: 'المعرض',
    visit: 'موقعنا',
    cta: 'اكتشف المنيو',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    switchTo: 'EN',
  },
  hero: {
    kicker: 'قهوة مختصة — حي الروضة، الدمام',
    titleA: 'قهوتك...',
    titleB: 'لحظتك الخاصة',
    text: 'في كل صباح، بادر وصالح نفسك بالقهوة قبل أن تواجه العالم.',
    primary: 'استكشف المنيو',
    secondary: 'وين تلاقينا؟',
    scroll: 'انزل معنا',
    since: 'قهوة مختصة',
  },
  marquee: [
    'في كل صباح، بادر',
    'وصالح نفسك بالقهوة',
    'قبل أن تواجه العالم',
    'قهوة مختصة',
    'حي الروضة',
    'الدمام',
  ],
  signature: {
    kicker: 'كوب بادر',
    title: 'بادر بجرعتك',
    text: 'ساخنة، باردة، وملوّنة — كل كوب يبدأ بحبٍّ مختار بعناية وينتهي بلحظة خاصة.',
    viewMenu: 'شوف المنيو كامل',
    items: [
      {
        tag: '٠١ — ساخن',
        title: 'فن اللاتيه',
        text: 'رغوة مخملية مرسومة بأيدٍ مختصة.',
      },
      {
        tag: '٠٢ — بارد',
        title: 'قهوة مثلجة',
        text: 'برودة، جسم قوي، وجرعة صادقة.',
      },
      {
        tag: '٠٣ — مميز',
        title: 'مشروبات ملوّنة',
        text: 'منعشة، ورديّة، وبلمسة نعناع.',
      },
    ],
  },
  menu: {
    kicker: 'قائمة بادر',
    title: 'المنيو',
    text: 'اختر تصنيفك الأول. الأسعار تُنشر بعد اعتمادها رسمياً من المحل.',
    all: 'الكل',
    quicker: 'قريباً',
    priceNote: 'السعر يُعلن قريباً',
    quickView: 'عرض سريع',
    close: 'إغلاق',
    category: 'التصنيف',
    rows: 'عناصر',
    modalNote: 'الأسماء والمكوّنات قابلة للتحرير قبل الاعتماد النهائي للمنيو.',
    few: 'قوائم تصنيفات',
  },
  story: {
    kicker: 'قصتنا',
    title: 'بادر... وخلي للقهوة حكاية',
    body1:
      '«بادر» مش كلمة على واجهة؛ إنها أول خطوة في يومك. بدأت حكايتنا في حي الروضة بفكرة بسيطة: كوب صالح يُحضّر بعناية، وثقافة مختصة تُقدّمها بأمانة.',
    body2:
      'حتى جدراننا تحكي. البساط المعلّق على حائطنا يقول فكرتنا كاملة، فيكفي أن تقف عنده لحظة… ثم تُواصل يومك.',
    quote: 'في كل صباح، بادر وصالح نفسك بالقهوة قبل أن تواجه العالم',
    quoteMark: '”',
    caption: 'على جدراننا داخل المحل',
  },
  space: {
    kicker: 'المكان',
    title: 'من الداخل',
    text: 'حجر البار، ركان روان، وتراث نصوره بصمت. اضغط على أي صورة لتقريبها.',
    openLightbox: 'تكبير الصورة',
    close: 'إغلاق',
    prev: 'السابق',
    next: 'التالي',
    count: 'من',
  },
  moments: {
    kicker: 'انستقرام',
    title: 'لحظات من بادر',
    text: 'صور حقيقية هويتنا من حسابنا الرسمي — اضغط أي صورة لرؤيتها هناك.',
    follow: 'تابعنا على انستقرام',
    source: 'الصور من حسابنا الرسمي',
  },
  location: {
    kicker: 'وين تلاقينا',
    title: 'الموقع وأوقات العمل',
    text: 'شارع هادئ في حي الروضة، وكوب صالح بيك ينتظرك.',
    address: 'حي الروضة، الدمام، السعودية',
    hoursTitle: 'أوقات العمل',
    maps: 'افتح الموقع على خرائط Google',
    hoursNote: 'التوقيتات بناءً على صفحتنا — قابلة للتأكيد قبل الزيارة.',
    mapHint: 'مو واضح الوقت؟ اضغط على الزر وستوصلك الخرائط.',
  },
  footer: {
    line: 'في كل صبح، بادر',
    slogan: 'وصالح نفسك بالقهوة قبل أن تواجه العالم.',
    navigate: 'أقسام',
    connect: 'تواصل معنا',
    instagram: 'انستقرام',
    threads: 'ثريدز',
    rights: 'جميع الحقوق محفوظة',
    motto: 'Life Begins After Coffee.',
  },
};

const en: Strings = {
  nav: {
    home: 'Home',
    menu: 'Menu',
    story: 'Our story',
    gallery: 'Gallery',
    visit: 'Visit',
    cta: 'Explore the menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchTo: 'ع',
  },
  hero: {
    kicker: 'Specialty coffee — Ar Rawdah, Dammam',
    titleA: 'Your coffee…',
    titleB: 'your own moment',
    text: 'Every morning, start — and be kind to yourself with coffee before you face the world.',
    primary: 'Explore the menu',
    secondary: 'Where are we?',
    scroll: 'Scroll',
    since: 'Specialty coffee',
  },
  marquee: [
    'Every morning, start with Bader',
    'and treat yourself to coffee',
    'before facing the world',
    'specialty coffee',
    'Ar Rawdah district',
    'Dammam',
  ],
  signature: {
    kicker: 'The Bader cup',
    title: 'Start with your cup',
    text: 'Ward or cold — every cup begins with carefully chosen beans, and ends with a moment of your own.',
    viewMenu: 'See the full menu',
    items: [
      { tag: '01 — Hot', title: 'Latte art', text: 'Velvet foam, poured by hand.' },
      { tag: '02 — Iced', title: 'Iced coffee', text: 'Cold, bold, and twice the wake-up.' },
      { tag: '03 — Signature', title: 'Colourful iced drinks', text: 'Refreshing, rosy, with a hint of mint.' },
    ],
  },
  menu: {
    kicker: 'The Bader list',
    title: 'Menu',
    text: 'Pick your category. Prices will be published once officially confirmed by the shop.',
    all: 'All',
    quicker: 'Soon',
    priceNote: 'Price announced soon',
    quickView: 'Quick view',
    close: 'Close',
    category: 'Category',
    rows: 'items',
    modalNote: 'Names and descriptions are editable placeholders until the official menu is confirmed.',
    few: 'Categories',
  },
  story: {
    kicker: 'Our story',
    title: 'Bader… and let coffee tell a story',
    body1:
      '“Bader” is not just a word on a sign — it is the first step of your day. Our story began simply: a well-made cup, prepared with care, served honestly.',
    body2:
      'Even our walls speak. The carpet on our wall spells this idea, and if you stand there, that final cup means: begin your day.',
    quote: 'Every morning, start — and treat yourself to coffee before you face the world',
    quoteMark: '”',
    caption: 'On our wall at the shop',
  },
  space: {
    kicker: 'The space',
    title: 'Inside',
    text: 'Terrazzo, warm light, and heritage in the details. Tap any photo to zoom.',
    openLightbox: 'Open image',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    count: 'of',
},
  moments: {
    kicker: 'Instagram',
    title: 'Moments from Bader',
    text: 'Real photos from our official account — tap any image to see it there.',
    follow: 'Follow us on Instagram',
    source: 'Photos from our official Instagram',
  },
  location: {
    kicker: 'Find us',
    title: 'Location & hours',
    text: 'A quiet street in Ar Rawdah, and a good cup waiting.',
    address: 'Ar Rawdah District, Dammam, Saudi Arabia',
    hoursTitle: 'Working hours',
    maps: 'Open location on Google Maps',
    hoursNote: 'Hours from our profile — please confirm before visiting.',
    mapHint: 'Tap the button and Google Maps will take you there.',
  },
  footer: {
    line: 'Every morning — start',
    slogan: 'and treat yourself to coffee before facing the world.',
    navigate: 'Sections',
    connect: 'Connect',
    instagram: 'Instagram',
    threads: 'Threads',
    rights: 'All rights reserved',
    motto: 'Life Begins After Coffee.',
  },
};

const dict: Record<Lang, Strings> = { ar, en };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}

const LangContext = createContext<LangContextValue>({
  lang: 'ar',
  setLang: () => undefined,
  t: ar,
});

const STORAGE_KEY = 'bader-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'بادر | قهوة مختصة — الدمام، حي الروضة'
        : 'BADER Coffee | Specialty Coffee — Dammam';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
