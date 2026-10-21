/**
 * ============ ملف المنيو المركزي ============
 * هذا هو الملف الوحيد الذي تحتاج تعديله لتحديث المنيو.
 *
 * - الأسماء والأوصاف حالياً صياغات أولية (placeholders) قابلة للتحرير
 *   حتى اعتماد المنيو الرسمي من المحل.
 * - عند توفر السعر الرسمي أضف حقل:
 *       price: '15'          (بدون رمز العملة — يُنضيف تلقائياً الريال)
 *   وسيظهر السعر مباشرة دون أي تعديلات أخرى.
 * - حقل image اختياري؛ العناصر الأخرى ستظهر بهوية تنسيقية أنيقة.
 */

export type Bilingual = { ar: string; en: string };

export type CategoryId = 'hot' | 'iced' | 'signature';

export interface MenuCategory {
  id: CategoryId;
  label: Bilingual;
}

export interface MenuItem {
  id: string;
  category: CategoryId;
  name: Bilingual;
  /** وصف قصير — يُحرّر عند اعتماد المنيو الرسمي */
  desc: Bilingual;
  image?: string;
  /** الصياغات الأولية قابلة للتحرير حتى رسمية المنيو */
  price?: string;
}

export const menuCategories: MenuCategory[] = [
  { id: 'hot', label: { ar: 'القهوة الساخنة', en: 'Hot coffee' } },
  { id: 'iced', label: { ar: 'القهوة الباردة', en: 'Iced coffee' } },
  { id: 'signature', label: { ar: 'المشروبات المميزة', en: 'Signature drinks' } },
];

export const menuItems: MenuItem[] = [
  // ==== القهوة الساخنة ====
  {
    id: 'hot-latte',
    category: 'hot',
    name: { ar: 'لاتيه', en: 'Latte' },
    desc: {
      ar: 'رغوة مخملية وفن لاتيه مرسوم بحب — الكوب المشهور من واجهتنا.',
      en: 'Velvet milk foam with hand-poured latte art — the famous cup from our gallery.',
    },
    image: '/images/latte.jpg',
  },
  {
    id: 'hot-espresso',
    category: 'hot',
    name: { ar: 'إسبريسو', en: 'Espresso' },
    desc: {
      ar: 'جرعة مركّزة بكريما ذهبية، أساس فنّ القهوة عندنا.',
      en: 'A concentrated shot with a golden crema — our base for coffee art.',
    },
  },
  {
    id: 'hot-flat-white',
    category: 'hot',
    name: { ar: 'فلات وايت', en: 'Flat white' },
    desc: {
      ar: 'توازن الكوبين وبين الحليب، بحرارة مطمئنة.',
      en: 'A calm balance of espresso and steamed milk.',
    },
  },
  {
    id: 'hot-v60',
    category: 'hot',
    name: { ar: 'قهوة مقطّرة', en: 'Pour-over (V60)' },
    desc: {
      ar: 'من حبة مختصّة إلى كوب واضح الطبق — لمن يعشق نكهة الحبة ببساطتها.',
      en: 'From a single-origin bean to a clean, bright cup.',
    },
  },

  // ==== القهوة الباردة ====
  {
    id: 'iced-coffee',
    category: 'iced',
    name: { ar: 'قهوة مثلجة', en: 'Iced coffee' },
    desc: {
      ar: 'إسبريسو بارد على ثلج خشن — كما في صورتنا على الطاولة.',
      en: 'Cold espresso over fresh ice — straight from our photo.',
    },
    image: '/images/iced-coffee.jpg',
  },
  {
    id: 'iced-latte',
    category: 'iced',
    name: { ar: 'آيس لاتيه', en: 'Iced latte' },
    desc: {
      ar: 'حليب بارد يُسكب بهدوء فوق الثلج والإسبريسو.',
      en: 'Chilled milk gently layered over ice and espresso.',
    },
  },
  {
    id: 'iced-spanish',
    category: 'iced',
    name: { ar: 'آيس لاتيه إسباني', en: 'Spanish iced latte' },
    desc: {
      ar: 'حلاوة اللاتيه الإسباني داخل كوب بارد — للذكرى الحلوة.',
      en: 'A sweet, cold iced latte for warm Eastern days.',
    },
  },

  // ==== المشروبات المميزة ====
  {
    id: 'sig-pink',
    category: 'signature',
    name: { ar: 'المشروب الوردي', en: 'The pink drink' },
    desc: {
      ar: 'ورديّ منعش بأوراق نعناع ولمسة ليمون — من قائمتنا المميزة.',
      en: 'A refreshing rosy drink with mint leaves and a bright lemon touch.',
    },
    image: '/images/pink-drink.jpg',
  },
  {
    id: 'sig-night',
    category: 'signature',
    name: { ar: 'كوب الليل', en: 'The night cup' },
    desc: {
      ar: 'المقها ثبت ٢٤ ساعة — والليلة لها كوبها الخاص.',
      en: 'We open around the clock — the night deserves its own cup.',
    },
  },
  {
    id: 'sig-saudi',
    category: 'signature',
    name: { ar: 'كوب المناسبات', en: 'The occasion cup' },
    desc: {
      ar: 'كوب يحتفل بالمناسبات الوطنية والمواسم — تابع انستقرام لأول الإصدارات.',
      en: 'Seasons and national days get their own cup — stay tuned on Instagram.',
    },
    image: '/images/national-day.jpg',
  },
];
