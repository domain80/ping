<script setup lang="ts">
  import ProjectTaskView from '~/components/ProjectTaskView.vue'

  // Extend breadcrumbs from parent
  useExtendBreadcrumbs([{ label: 'Board' }])
</script>

<template>
  <ProjectTaskView />
</template>
