<script setup lang="ts">
  import { Icon } from '#components'
  import { Badge } from '~/components/ui/badge'
  import { Button } from '~/components/ui/button'
  import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

  // Props for reusability
  const props = defineProps<{
    title: string
    tasks?: Array<object>
    emptyText?: string
    icon?: string
    iconClass?: string
  }>()

  const taskCount = computed(() => props.tasks?.length ?? 0)
</script>

<template>
  <div class="shrink-0 w-80 bg-muted/20 rounded-lg flex flex-col">
    <!-- Column Header -->
    <div class="flex items-center gap-2 px-3 py-2.5">
      <!-- Status Icon -->
      <Icon
        :name="icon ?? 'lucide:circle-dashed'"
        :class="['size-4 shrink-0', iconClass ?? 'text-muted-foreground']"
      />

      <!-- Title -->
      <span class="font-medium text-sm">{{ title }}</span>

      <!-- Count Badge -->
      <Badge
        v-if="taskCount > 0"
        variant="outline"
        class="rounded-md px-1.5 py-0 h-5 text-muted-foreground font-normal"
      >
        {{ taskCount }}
      </Badge>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Actions -->
      <Tooltip :delay-duration="1000">
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon-sm"
            class="size-7 text-muted-foreground"
          >
            <Icon
              name="lucide:plus"
              class="size-4"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add task</TooltipContent>
      </Tooltip>
    </div>

    <!-- Tasks Container -->
    <div class="flex-1 space-y-2 px-2 pb-2">
      <template v-if="tasks && tasks.length > 0">
        <slot :tasks="tasks" />
      </template>
      <template v-else>
        <p class="text-sm text-muted-foreground px-1">{{ emptyText ?? 'No tasks yet' }}</p>
      </template>
    </div>

    <slot name="footer" />
  </div>
</template>
