/**
 * ملف الهوية والمعلومات الثابتة للموقع.
 * جميع الروابط والمعلومات مأخوذة من الحساب الرسمي على انستقرام
 * (instagram.com/bader.cof) وتطبيقات المرتبطة به.
 */

export const IMAGES = {
  logo: '/images/logo.jpg',
  sign: '/images/sign.jpg',
  latte: '/images/latte.jpg',
  iced: '/images/iced-coffee.jpg',
  pink: '/images/pink-drink.jpg',
  carpet1: '/images/carpet-1.jpg',
  carpet2: '/images/carpet-2.jpg',
  mirror: '/images/mirror.jpg',
  nationalDay: '/images/national-day.jpg',
} as const;

export const links = {
  instagram: 'https://www.instagram.com/bader.cof/',
  threads: 'https://www.threads.com/@bader.cof',
  /** الرابط الموثّق كما هو في حساب انستقرام الرسمي (biolink) */
  maps: 'https://maps.app.goo.gl/3APkpfs9hqoNuywr7',
} as const;

export const identity = {
  nameAr: 'بادر',
  nameEn: 'BADER Coffee',
  taglineAr: 'قهوة مختصة',
  slogan: {
    ar: 'في كل صباح، بادر وصالح نفسك بالقهوة قبل أن تواجه العالم.',
    en: 'Every morning, begin — and treat yourself to coffee before you face the world.',
  },
} as const;

/** أوقات العمل كما تعرض صفحة انستقرام الرسمية، مع ملاحظة بقابلية التأكيد */
export const hours = [
  {
    days: { ar: 'السبت — الخميس', en: 'Saturday — Thursday' },
    time: { ar: '٢٤ ساعة', en: '24 hours' },
  },
  {
    days: { ar: 'الجمعة', en: 'Friday' },
    time: { ar: 'من ١:٠٠ م إلى ٦:٠٠ ص', en: '1:00 PM – 6:00 AM' },
  },
] as const;

export const address = {
  ar: 'حي الروضة، الدمام، السعودية',
  en: 'Ar Rawdah District, Dammam, Saudi Arabia',
} as const;
