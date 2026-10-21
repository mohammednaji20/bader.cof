/**
 * ملف الهوية والمعلومات الثابتة للموقع.
 * جميع الروابط والمعلومات مأخوذة من الحساب الرسمي على انستقرام
 * (instagram.com/bader.cof) وتطبيقات المرتبطة به.
 */

/** بادئة المسارات: تعمل محلياً ('/') وعلى GitHub Pages ('/bader.cof/') */
const BASE = import.meta.env.BASE_URL;

export const IMAGES = {
  logo: `${BASE}images/logo.jpg`,
  sign: `${BASE}images/sign.jpg`,
  latte: `${BASE}images/latte.jpg`,
  iced: `${BASE}images/iced-coffee.jpg`,
  pink: `${BASE}images/pink-drink.jpg`,
  carpet1: `${BASE}images/carpet-1.jpg`,
  carpet2: `${BASE}images/carpet-2.jpg`,
  mirror: `${BASE}images/mirror.jpg`,
  nationalDay: `${BASE}images/national-day.jpg`,
} as const;

/** مُساعد عام لمسارات الصور داخل ملف المنيو */
export const image = (file: string) => `${BASE}images/${file}`;

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

/* ==========================================================================
   الواتساب — إعدادات الطلب
   ==========================================================================
   ضع هنا رقم الواتساب الرسمي بصيغة عالمية، بدون + وبدون أصفار بادئة.
   مثال صحيح: '966501234567'  (رمز الدولة + الرقم)
   بمجرد ضبطه يظهر زر الطلب في كل أرجاء الموقع.
   ما دام النص الافتراضي كما هو، سيعمل زر الواتساب كحل بديل: يفتح
   انستقرام الرسمي فقط لتفادي أرقام خاطئة.
   ========================================================================== */

export const whatsappNumber = '966000000000'; // ← ← ← ضع الرقم هنا فقط

/** هل الرقم مضبوط فعلاً؟ (يمنع ظهور روابط برقم وهمي) */
export const whatsappConfigured = (() => {
  const digits = whatsappNumber.replace(/\D/g, '');
  return digits.length >= 10 && digits !== '966000000000';
})();

/** يبني رابط واتساب برسالة جاهزة، مع حل بديل آمن للانستقرام */
export function whatsappLink(text: string): string {
  if (!whatsappConfigured) return links.instagram;
  return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}
