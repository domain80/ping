<script setup lang="ts">
  import { Icon } from '#components'
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
  import { Badge } from '~/components/ui/badge'
  import { Button } from '~/components/ui/button'
  import type { TaskGroup } from '~/composables/useTaskGroups'

  const props = defineProps<{
    group: TaskGroup
    tasks?: unknown[]
  }>()

  const taskCount = computed(() => props.tasks?.length ?? 0)

  // Collapse state
  const isCollapsed = ref(false)

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value
  }
</script>

<template>
  <!-- List Mode: Collapsible section -->
  <Collapsible
    :open="!isCollapsed"
    class="rounded"
  >
    <CollapsibleTrigger
      as-child
      class="w-full"
    >
      <button
        class="flex items-center gap-2 w-full px-3 py-1 transition-colors hover:bg-muted/50"
        @click="toggleCollapse"
      >
        <Icon
          name="tabler:chevron-right"
          :class="[
            'size-4 shrink-0 text-muted-foreground transition-transform',
            !isCollapsed && 'rotate-90',
          ]"
        />
        <Icon
          :name="group.icon"
          :class="['size-4 shrink-0', group.iconClass]"
        />
        <span class="font-medium text-sm">{{ group.label }}</span>
        <Badge
          variant="outline"
          class="rounded-md px-1.5 py-0 h-5 text-muted-foreground font-normal"
        >
          {{ taskCount }}
        </Badge>
        <div class="flex-1" />
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
        <template v-if="tasks && tasks.length > 0">
          <slot :tasks="tasks" />
        </template>
        <template v-else>
          <p class="text-sm text-muted-foreground pl-6">No tasks</p>
        </template>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
