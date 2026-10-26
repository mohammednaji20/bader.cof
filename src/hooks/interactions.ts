import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** يضيف صنف is-in لكل عنصر [data-reveal] عند ظهوره بلطف — حتى العناصر اللاحقة (نوافذ منبثقة) */
export function useRevealObserver() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // تقليل الحركة: أظهر كل شيء فوراً، بما فيه العناصر اللاحقة
      const markAll = () =>
        document
          .querySelectorAll('[data-reveal]')
          .forEach((el) => el.classList.add('is-in'));
      markAll();
      const mo = new MutationObserver(() => markAll());
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    // التقاط عناصر جديدة (نافذة المنتج، اللايت بوكس…) عند إضافتها للشجرة
    const mo = new MutationObserver((records) => {
      records.forEach((rec) => {
        rec.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement) || node.tagName === 'HEAD') return;
          const targets: Element[] = node.matches('[data-reveal]')
            ? [node]
            : Array.from(node.querySelectorAll('[data-reveal]'));
          targets.forEach((el) => {
            if (!el.classList.contains('is-in')) io.observe(el);
          });
        });
      });
    });

    document
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((el) => io.observe(el));

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/** حالة التمرير مع عتبة معينة (لصنع الهيدر الصلب) */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** تأثير بارالاكس رقيق لعنصر واحد، مع احترام تفضيل تقليل الحركة */
export function useParallax(speed = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      el.style.setProperty('--py', `${Math.min(y * speed, 120)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/** قفل تمرير الصفحة أثناء فتح نافذة منبثقة */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
