import { useLocalStorage } from '@vueuse/core'

const isCollapsed = useLocalStorage('app-sidebar-collapsed', false)

export function useSidebar() {
  return {
    isCollapsed,
    toggle: () => { isCollapsed.value = !isCollapsed.value },
    expand: () => { isCollapsed.value = false },
    collapse: () => { isCollapsed.value = true },
  }
}
