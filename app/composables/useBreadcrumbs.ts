export interface Breadcrumb {
  label: string
  to?: string
}

const BREADCRUMBS_KEY = 'app-breadcrumbs'

/**
 * Get the current breadcrumbs (for use in layout)
 */
export function useBreadcrumbs() {
  return useState<Breadcrumb[]>(BREADCRUMBS_KEY, () => [])
}

/**
 * Set breadcrumbs for the current page.
 * Call this in page components to define their breadcrumb trail.
 */
export function useSetBreadcrumbs(breadcrumbs: MaybeRefOrGetter<Breadcrumb[]>) {
  const state = useState<Breadcrumb[]>(BREADCRUMBS_KEY, () => [])

  watchEffect(() => {
    state.value = toValue(breadcrumbs)
  })

  // // Clear on unmount to prevent stale breadcrumbs
  // onUnmounted(() => {
  //     state.value = [];
  // });
}
