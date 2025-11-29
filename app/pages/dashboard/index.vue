<script setup lang="ts">
  useSetBreadcrumbs([{ label: 'Dashboard' }])
</script>

<template>
  <div>
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div class="bg-muted/50 aspect-video rounded-lg" />
      <div class="bg-muted/50 aspect-video rounded-lg" />
      <div class="bg-muted/50 aspect-video rounded-lg" />
    </div>
    <div class="bg-muted/50 min-h-screen flex-1 rounded-lg md:min-h-min" />
  </div>
</template>
