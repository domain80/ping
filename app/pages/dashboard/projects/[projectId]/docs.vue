<script setup lang="ts">
  // Extend breadcrumbs from parent
  useExtendBreadcrumbs([{ label: 'Docs' }])
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full py-20 text-center gap-4">
    <div class="flex flex-col items-center gap-2">
      <span
        class="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800"
      >
        #coming soon
      </span>
      <h2 class="text-2xl font-bold text-muted-foreground">Project Documents</h2>
    </div>
    <p class="text-muted-foreground/80 text-base max-w-md">
      This feature is
      <span class="font-semibold text-primary">coming soon</span>
      !
      <br />
      <span class="text-xs opacity-60 mt-2 block">All your documents and doodles in one place</span>
    </p>
  </div>
</template>
