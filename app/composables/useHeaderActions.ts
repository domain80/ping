import type { Component, Raw } from 'vue'

export interface HeaderAction {
  id: string
  component: Raw<Component>
  props?: Record<string, unknown>
  order?: number // lower = left, higher = right
}

const HEADER_ACTIONS_KEY = 'app-header-actions'

/**
 * Get global header actions (for use in layout)
 */
export function useHeaderActions() {
  return useState<HeaderAction[]>(HEADER_ACTIONS_KEY, () => [])
}

/**
 * Register a global header action.
 * Call this in plugins or app.vue to add persistent header actions.
 */
export function useRegisterHeaderAction(action: MaybeRefOrGetter<HeaderAction>) {
  const actions = useState<HeaderAction[]>(HEADER_ACTIONS_KEY, () => [])

  watchEffect(() => {
    const a = toValue(action)
    const idx = actions.value.findIndex(x => x.id === a.id)
    if (idx >= 0) actions.value[idx] = a
    else actions.value.push(a)
  })

  onUnmounted(() => {
    const a = toValue(action)
    actions.value = actions.value.filter(x => x.id !== a.id)
  })
}

