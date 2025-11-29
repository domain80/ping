<script setup lang="ts">
  import ProjectNav from '@/components/ProjectNav.vue'

  const route = useRoute()
  const projectId = computed(() => route.params.projectId as string)
</script>

<template>
  <div class="flex flex-col h-full">
    <ProjectNav :project-id="projectId" />

    <main class="flex-1 p-4 min-h-0">
      <NuxtPage />
    </main>
  </div>
</template>
