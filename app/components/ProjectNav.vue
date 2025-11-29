<script setup lang="ts">
  import { CircleDashed, FileText, KanbanSquare, LayoutGrid, Settings } from 'lucide-vue-next'

  const props = defineProps<{
    projectId: string
  }>()

  const route = useRoute()

  const navItems = computed(() => [
    {
      name: 'Overview',
      href: `/dashboard/projects/${props.projectId}`,
      icon: LayoutGrid,
      exact: true,
    },
    {
      name: 'Backlog',
      href: `/dashboard/projects/${props.projectId}/backlog`,
      icon: CircleDashed,
    },
    {
      name: 'Board',
      href: `/dashboard/projects/${props.projectId}/board`,
      icon: KanbanSquare,
    },
    {
      name: 'Docs',
      href: `/dashboard/projects/${props.projectId}/docs`,
      icon: FileText,
    },
    {
      name: 'Settings',
      href: `/dashboard/projects/${props.projectId}/settings`,
      icon: Settings,
    },
  ])

  function isActive(item: { href: string; exact?: boolean }) {
    if (item.exact) {
      return route.path === item.href
    }
    return route.path.startsWith(item.href)
  }
</script>

<template>
  <nav class="border-b overflow-auto">
    <div class="flex gap-6 mx-4">
      <NuxtLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.href"
        class="flex items-center gap-1 py-2 text-sm font-medium border-b-2 -mb-px transition-colors"
        :class="[
          isActive(item)
            ? 'border-primary text-foreground px-0'
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border',
        ]"
      >
        <component
          :is="item.icon"
          class="size-4"
        />
        {{ item.name }}
      </NuxtLink>
    </div>
  </nav>
</template>
