<script setup lang="ts">
  const route = useRoute()
  const projectId = computed(() => route.params.projectId as string)

  const { data: project } = useFetch(() => `/api/project/${projectId.value}`)

  useSetBreadcrumbs(
    computed(() => [
      { label: 'Dashboard', to: '/dashboard' },
      { label: project.value?.name ?? 'Project', to: `/dashboard/projects/${projectId.value}` },
      { label: 'Board' },
    ])
  )
</script>

<template>
  <div class="flex gap-2 h-full overflow-x-auto pb-4">
    <!-- To Do Column -->
    <div class="shrink-0 w-72 bg-muted/50 rounded-lg p-4 flex flex-col">
      <h3 class="font-semibold mb-4">To Do</h3>
      <div class="flex-1 space-y-2 overflow-y-auto">
        <p class="text-sm text-muted-foreground">No tasks yet</p>
      </div>
    </div>

    <!-- In Progress Column -->
    <div class="shrink-0 w-72 bg-muted/50 rounded-lg p-4 flex flex-col">
      <h3 class="font-semibold mb-4">In Progress</h3>
      <div class="flex-1 space-y-2 overflow-y-auto">
        <p class="text-sm text-muted-foreground">No tasks yet</p>
      </div>
    </div>

    <!-- Review Column -->
    <div class="shrink-0 w-72 bg-muted/50 rounded-lg p-4 flex flex-col">
      <h3 class="font-semibold mb-4">Review</h3>
      <div class="flex-1 space-y-2 overflow-y-auto">
        <p class="text-sm text-muted-foreground">No tasks yet</p>
      </div>
    </div>

    <!-- Done Column -->
    <div class="shrink-0 w-72 bg-muted/50 rounded-lg p-4 flex flex-col">
      <h3 class="font-semibold mb-4">Done</h3>
      <div class="flex-1 space-y-2 overflow-y-auto">
        <p class="text-sm text-muted-foreground">No tasks yet</p>
      </div>
    </div>
  </div>
</template>
