/** صياغة رسالة الطلب المرسلة عبر واتساب */
import type { Lang } from '../i18n';

export function greetingMessage(lang: Lang): string {
  return lang === 'ar'
    ? 'مرحباً بادر ☕\nأحب أطلب / أستفسر عن قائمة القهوة.'
    : "Hello BADER ☕\nI'd like to place an order / ask about the menu.";
}

export function orderMessage(
  lines: { name: string; qty: number }[],
  note: string,
  lang: Lang,
): string {
  if (lines.length === 0) return greetingMessage(lang);

  const items = lines
    .map((l, i) => `${i + 1}) ${l.name}${l.qty > 1 ? ` ×${l.qty}` : ''}`)
    .join('\n');

  if (lang === 'ar') {
    return (
      `طلب جديد من موقع بادر ☕\n` +
      `———————————\n` +
      `${items}\n` +
      `———————————\n` +
      `المجموع: ${lines.reduce((s, l) => s + l.qty, 0)} عنصر\n` +
      `${note.trim() ? `ملاحظة: ${note.trim()}` : 'ملاحظة: —'}\n` +
      `بانتظاركم 🌿`
    );
  }
  return (
    `New order from the BADER site ☕\n` +
    `———————————\n` +
    `${items}\n` +
    `———————————\n` +
    `Total items: ${lines.reduce((s, l) => s + l.qty, 0)}\n` +
    `${note.trim() ? `Note: ${note.trim()}` : 'Note: —'}\n` +
    `See you 🌿`
  );
}
