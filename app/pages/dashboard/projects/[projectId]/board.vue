<script setup lang="ts">
  import ProjectBoardColumn from '~/components/ProjectBoardColumn.vue'
  import ProjectBoardList from '~/components/ProjectBoardList.vue'

  // Extend breadcrumbs from parent
  useExtendBreadcrumbs([{ label: 'Board' }])

  // Board view store
  const boardView = useBoardViewStore()
</script>

<template>
  <!-- Board View -->
  <div
    v-if="boardView.viewMode === 'board'"
    class="flex gap-3 h-full overflow-x-auto px-4 py-4"
    style="scrollbar-width: none; -ms-overflow-style: none"
  >
    <!-- To Do Column -->
    <ProjectBoardColumn
      title="To Do"
      icon="tabler:list-check"
      icon-class="text-muted-foreground"
    />

    <!-- In Progress Column -->
    <ProjectBoardColumn
      title="In Progress"
      icon="tabler:progress"
      icon-class="text-blue-500"
    />

    <!-- Review Column -->
    <ProjectBoardColumn
      title="Review"
      icon="tabler:eye-search"
      icon-class="text-amber-500"
    />

    <!-- Done Column -->
    <ProjectBoardColumn
      title="Done"
      icon="tabler:circle-check"
      icon-class="text-green-500"
    />
  </div>

  <!-- List View -->
  <ProjectBoardList
    v-else
    :group-by="boardView.listGroupBy"
  />
</template>
