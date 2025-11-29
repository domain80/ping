<script setup lang="ts">
  const route = useRoute()
  const projectId = computed(() => route.params.projectId as string)

  const { data: project } = useFetch(() => `/api/project/${projectId.value}`)

  useSetBreadcrumbs(
    computed(() => [
      { label: 'Dashboard', to: '/dashboard' },
      { label: project.value?.name ?? 'Project', to: `/dashboard/projects/${projectId.value}` },
      { label: 'Backlog' },
    ])
  )
  // todo: use globally set "current project so that the breadcrumbs dont rerender all the time"
</script>

<template>
  <div class="flex gap-2 h-full overflow-x-auto pb-4">Backlog</div>
</template>
