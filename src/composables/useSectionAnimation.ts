import { onMounted } from 'vue'
import { gsap } from '@/lib/gsap'

interface SectionAnimationOptions {
  selector?: string
  y?: number
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
}

export function useSectionAnimation(options: SectionAnimationOptions = {}) {
  const {
    selector = '[data-anim]',
    y = 28,
    duration = 0.7,
    stagger = 0.1,
    delay = 0.1,
    ease = 'power3.out',
  } = options

  onMounted(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    gsap.from(elements, {
      opacity: 0,
      y,
      duration,
      stagger,
      delay,
      ease,
      clearProps: 'transform',
    })
  })
}
