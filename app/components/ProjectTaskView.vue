<script setup lang="ts">
  import ProjectTaskGroup from '~/components/ProjectTaskGroup.vue'

  // Get view preferences from store
  const boardView = useBoardViewStore()

  // Get group configurations
  const { getGroups } = useTaskGroups()

  // Compute current groups based on view mode and groupBy setting
  const currentGroups = computed(() => {
    if (boardView.viewMode === 'board') {
      // For board view, use boardGroupBy (handle compound groupings in future)
      const groupBy = boardView.boardGroupBy
      // For now, extract primary grouping (before '+' if compound)
      const primaryGroupBy = groupBy.includes('+')
        ? (groupBy.split('+')[0] as 'status' | 'assignee' | 'priority')
        : (groupBy as 'status' | 'assignee' | 'priority')
      return getGroups(primaryGroupBy)
    } else {
      // For list view, use listGroupBy
      return getGroups(boardView.listGroupBy)
    }
  })

  // TODO: Fetch and organize tasks by group
  // This will be replaced with actual task data from API
  const tasksByGroup = computed(() => {
    const groups: Record<string, unknown[]> = {}
    for (const group of currentGroups.value) {
      groups[group.key] = [] // Placeholder
    }
    return groups
  })
</script>

<template>
  <!-- Board View: Horizontal scrolling columns -->
  <div
    v-if="boardView.viewMode === 'board'"
    class="flex gap-3 h-full overflow-x-auto px-4 py-4"
    style="scrollbar-width: none; -ms-overflow-style: none"
  >
    <ProjectTaskGroup
      v-for="group in currentGroups"
      :key="group.key"
      :group="group"
      mode="board"
      :tasks="tasksByGroup[group.key]"
    />
  </div>

  <!-- List View: Vertical collapsible sections -->
  <div
    v-else
    class="space-y-1 py-4"
  >
    <ProjectTaskGroup
      v-for="group in currentGroups"
      :key="group.key"
      :group="group"
      mode="list"
      :tasks="tasksByGroup[group.key]"
    />
  </div>
</template>

