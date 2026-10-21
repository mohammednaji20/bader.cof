import { IMAGES } from './site';
import type { Bilingual } from './menu';

/**
 * ملاحظة: هوية الصور مأخوذة من حساب انستقرام الرسمي؛
 * الأبعاد الفعلية يديرها التخطيط عبر CSS.
 */

export interface GalleryItem {
  src: string;
  alt: Bilingual;
  caption: Bilingual;
  /** ارتفاع تقريبي للمَعْرض في layout الماسوني */
  size: 'tall' | 'wide' | 'square';
}

export const gallery: GalleryItem[] = [
  {
    src: IMAGES.sign,
    size: 'tall',
    alt: { ar: 'لافتة بادر المضيئة على الواجهة', en: 'The illuminated Bader sign' },
    caption: { ar: 'لافتة الواجهة', en: 'The facade sign' },
  },
  {
    src: IMAGES.latte,
    size: 'tall',
    alt: { ar: 'كوب لاتيه بفن اللاتيه', en: 'A latte with pouring art' },
    caption: { ar: 'فن اللاتيه', en: 'Latte art' },
  },
  {
    src: IMAGES.mirror,
    size: 'tall',
    alt: { ar: 'مرآة على شكل قوس مع نبتة خضار', en: 'The arched mirror with a plant' },
    caption: { ar: 'مرآة القوس', en: 'The arch mirror' },
  },
  {
    src: IMAGES.carpet1,
    size: 'wide',
    alt: { ar: 'بساط معلّق على الجدار مكتوب عليه الشعار', en: 'The quote tapestry on the wall' },
    caption: { ar: 'بساط الكلمة', en: 'The quote tapestry' },
  },
  {
    src: IMAGES.pink,
    size: 'tall',
    alt: { ar: 'مشروب وردي منعش', en: 'A refreshing pink drink' },
    caption: { ar: 'المشروب الوردي', en: 'The pink drink' },
  },
  {
    src: IMAGES.iced,
    size: 'square',
    alt: { ar: 'قهوة مثلجة على طاولة خشبية', en: 'Iced coffee on a wooden table' },
    caption: { ar: 'قهوة مثلجة', en: 'Iced coffee' },
  },
  {
    src: IMAGES.nationalDay,
    size: 'tall',
    alt: { ar: 'تصميم يوم وطني سعودي على خلفية خضراء', en: 'A Saudi national-day design on green' },
    caption: { ar: 'كوب الوطنية', en: 'The national-day cup' },
  },
  {
    src: IMAGES.carpet2,
    size: 'tall',
    alt: { ar: 'زوايا البساط على الجدار مع الإضاءة', en: 'The tapestry under warm light' },
    caption: { ar: 'زاوية الجدار', en: 'A corner of the wall' },
  },
];
