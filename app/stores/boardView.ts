export type BoardViewMode = 'board' | 'list'
export type ListGroupBy = 'status' | 'assignee' | 'priority'
export type BoardGroupBy = 'status' | 'assignee' | 'priority' | 'status+assignee' | 'status+priority'

export const useBoardViewStore = defineStore(
  'boardView',
  () => {
    const viewMode = ref<BoardViewMode>('board')
    const listGroupBy = ref<ListGroupBy>('status')
    const boardGroupBy = ref<BoardGroupBy>('status')

    function setViewMode(mode: BoardViewMode) {
      viewMode.value = mode
    }

    function toggleViewMode() {
      viewMode.value = viewMode.value === 'board' ? 'list' : 'board'
    }

    function setListGroupBy(groupBy: ListGroupBy) {
      listGroupBy.value = groupBy
    }

    function setBoardGroupBy(groupBy: BoardGroupBy) {
      boardGroupBy.value = groupBy
    }

    return {
      viewMode,
      listGroupBy,
      boardGroupBy,
      setViewMode,
      toggleViewMode,
      setListGroupBy,
      setBoardGroupBy,
    }
  },
  {
    persist: true,
  }
)
