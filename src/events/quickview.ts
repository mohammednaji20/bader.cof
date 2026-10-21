/**
 * فتح نافذة «العرض السريع» لأي منتج من أي قسم في الموقع.
 * يُستخدم من قسم الكوب المميز ومن قسم المنيو معاً.
 */
import type { MenuItem } from '../data/menu';

export const QUICK_VIEW_EVENT = 'bader:quick-view';

export function openQuickView(item: MenuItem) {
  window.dispatchEvent(new CustomEvent<MenuItem>(QUICK_VIEW_EVENT, { detail: item }));
}
