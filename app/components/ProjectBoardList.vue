<script setup lang="ts">
  import { Icon } from '#components'
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from '@/components/ui/collapsible'
  import { Badge } from '~/components/ui/badge'
  import { Button } from '~/components/ui/button'
  import type { ListGroupBy } from '~/stores/boardView'

  const props = defineProps<{
    groupBy?: ListGroupBy
  }>()

  // Status grouping configuration
  const statusGroups = [
    { key: 'todo', label: 'To Do', icon: 'tabler:list-check', iconClass: 'text-muted-foreground' },
    { key: 'in_progress', label: 'In Progress', icon: 'tabler:progress', iconClass: 'text-blue-500' },
    { key: 'review', label: 'Review', icon: 'tabler:eye-search', iconClass: 'text-amber-500' },
    { key: 'done', label: 'Done', icon: 'tabler:circle-check', iconClass: 'text-green-500' },
  ]

  // Priority grouping configuration
  const priorityGroups = [
    { key: 'urgent', label: 'Urgent', icon: 'tabler:alert-triangle', iconClass: 'text-red-500' },
    { key: 'high', label: 'High', icon: 'tabler:arrow-up', iconClass: 'text-orange-500' },
    { key: 'medium', label: 'Medium', icon: 'tabler:minus', iconClass: 'text-yellow-500' },
    { key: 'low', label: 'Low', icon: 'tabler:arrow-down', iconClass: 'text-blue-500' },
    { key: 'none', label: 'No Priority', icon: 'tabler:dots', iconClass: 'text-muted-foreground' },
  ]

  // Assignee grouping configuration (placeholder - will be dynamic based on team members)
  const assigneeGroups = [
    { key: 'unassigned', label: 'Unassigned', icon: 'tabler:user-off', iconClass: 'text-muted-foreground' },
    // Additional assignees would be added dynamically
  ]

  // Get current groups based on groupBy prop
  const currentGroups = computed(() => {
    switch (props.groupBy) {
      case 'priority':
        return priorityGroups
      case 'assignee':
        return assigneeGroups
      default:
        return statusGroups
    }
  })

  // Track collapsed state per group
  const collapsedGroups = ref<Set<string>>(new Set())

  function toggleGroup(key: string) {
    if (collapsedGroups.value.has(key)) {
      collapsedGroups.value.delete(key)
    }
    else {
      collapsedGroups.value.add(key)
    }
  }

  function isCollapsed(key: string) {
    return collapsedGroups.value.has(key)
  }

  // TODO: Replace with actual tasks from API
  const tasksByGroup = computed(() => {
    const groups: Record<string, unknown[]> = {}
    for (const group of currentGroups.value) {
      groups[group.key] = [] // Placeholder - will be populated with actual tasks
    }
    return groups
  })
</script>

<template>
  <div class="space-y-2 px-4 py-4">
    <Collapsible
      v-for="group in currentGroups"
      :key="group.key"
      :open="!isCollapsed(group.key)"
      class="rounded-lg border bg-card"
    >
      <CollapsibleTrigger
        as-child
        class="w-full"
      >
        <button
          class="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-muted/50 transition-colors rounded-t-lg"
          @click="toggleGroup(group.key)"
        >
          <!-- Collapse indicator -->
          <Icon
            name="tabler:chevron-right"
            :class="[
              'size-4 shrink-0 text-muted-foreground transition-transform',
              !isCollapsed(group.key) && 'rotate-90',
            ]"
          />

          <!-- Group Icon -->
          <Icon
            :name="group.icon"
            :class="['size-4 shrink-0', group.iconClass]"
          />

          <!-- Group Label -->
          <span class="font-medium text-sm">{{ group.label }}</span>

          <!-- Task Count -->
          <Badge
            variant="outline"
            class="rounded-md px-1.5 py-0 h-5 text-muted-foreground font-normal"
          >
            {{ tasksByGroup[group.key]?.length ?? 0 }}
          </Badge>

          <!-- Spacer -->
          <div class="flex-1" />

          <!-- Add Task Button -->
          <Button
            variant="ghost"
            size="icon-sm"
            class="size-7 text-muted-foreground"
            @click.stop
          >
            <Icon
              name="tabler:plus"
              class="size-4"
            />
          </Button>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div class="px-3 pb-3 space-y-1">
          <template v-if="tasksByGroup[group.key]?.length">
            <!-- Task items will go here -->
            <slot
              :group="group"
              :tasks="tasksByGroup[group.key]"
            />
          </template>
          <template v-else>
            <p class="text-sm text-muted-foreground py-2 pl-6">No tasks</p>
          </template>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

