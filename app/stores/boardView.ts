export type BoardViewMode = 'board' | 'list'

export const useBoardViewStore = defineStore('boardView', () => {
  const viewMode = ref<BoardViewMode>('board')

  function setViewMode(mode: BoardViewMode) {
    viewMode.value = mode
  }

  function toggleViewMode() {
    viewMode.value = viewMode.value === 'board' ? 'list' : 'board'
  }

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
  }
})

