export interface Breadcrumb {
  label: string
  to?: string
}

interface ExtensionEntry {
  id: number
  crumbs: Breadcrumb[]
}

const BASE_KEY = 'app-breadcrumbs-base'
const EXTENSIONS_KEY = 'app-breadcrumbs-ext'

let extensionIdCounter = 0

/**
 * Get the current breadcrumbs (for use in layout).
 * Returns base breadcrumbs + all extensions combined.
 */
export function useBreadcrumbs() {
  const base = useState<Breadcrumb[]>(BASE_KEY, () => [])
  const extensions = useState<ExtensionEntry[]>(EXTENSIONS_KEY, () => [])
  return computed(() => [...base.value, ...extensions.value.flatMap((e) => e.crumbs)])
}

/**
 * Set base breadcrumbs for the current route level.
 * Call this in parent route components to define the base breadcrumb trail.
 */
export function useSetBreadcrumbs(breadcrumbs: MaybeRefOrGetter<Breadcrumb[]>) {
  const base = useState<Breadcrumb[]>(BASE_KEY, () => [])

  watchEffect(() => {
    base.value = toValue(breadcrumbs)
  })
}

/**
 * Extend breadcrumbs from a child route.
 * Extensions stack cumulatively and are automatically cleaned up on unmount.
 */
export function useExtendBreadcrumbs(breadcrumbs: MaybeRefOrGetter<Breadcrumb[]>) {
  const extensions = useState<ExtensionEntry[]>(EXTENSIONS_KEY, () => [])
  const id = extensionIdCounter++

  watchEffect(() => {
    const crumbs = toValue(breadcrumbs)
    const idx = extensions.value.findIndex((e) => e.id === id)
    if (idx >= 0) {
      extensions.value[idx] = { id, crumbs }
    } else {
      extensions.value.push({ id, crumbs })
    }
  })

  onUnmounted(() => {
    extensions.value = extensions.value.filter((e) => e.id !== id)
  })
}
