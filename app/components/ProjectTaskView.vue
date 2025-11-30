<script setup lang="ts">
  import { Icon } from '#components'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import ProjectTaskGroup from '~/components/ProjectTaskGroup.vue'
import { Badge } from '~/components/ui/badge'

  // Get view preferences from store
  const boardView = useBoardViewStore()

  // Get group configurations
  const { getGroups, parseGroupBy } = useTaskGroups()

  // Parse grouping for board view
  const boardGrouping = computed(() => {
    if (boardView.viewMode === 'board') {
      return parseGroupBy(boardView.boardGroupBy)
    }
    return { primary: 'status', secondary: null, isCompound: false } as const
  })

  // Get primary and secondary groups
  const primaryGroups = computed(() => {
    if (boardView.viewMode === 'board') {
      return getGroups(boardGrouping.value.primary)
    }
    return getGroups(boardView.listGroupBy)
  })

  const secondaryGroups = computed(() => {
    if (boardGrouping.value.secondary) {
      return getGroups(boardGrouping.value.secondary)
    }
    return null
  })

  // Collapsed swimlanes state
  const collapsedLanes = ref<Set<string>>(new Set())

  function toggleLane(laneKey: string) {
    if (collapsedLanes.value.has(laneKey)) {
      collapsedLanes.value.delete(laneKey)
    }
    else {
      collapsedLanes.value.add(laneKey)
    }
  }

  function isLaneCollapsed(laneKey: string) {
    return collapsedLanes.value.has(laneKey)
  }

  // TODO: Fetch and organize tasks by group
  // For compound grouping: tasksByGroup[primaryKey][secondaryKey] = tasks[]
  // For simple grouping: tasksByGroup[primaryKey] = tasks[]
  const tasksByGroup = computed(() => {
    if (boardView.viewMode === 'board' && boardGrouping.value.isCompound && secondaryGroups.value) {
      // Compound: nested structure
      const groups: Record<string, Record<string, unknown[]>> = {}
      const secondary = secondaryGroups.value
      for (const primary of primaryGroups.value) {
        const primaryGroup: Record<string, unknown[]> = {}
        for (const sec of secondary) {
          primaryGroup[sec.key] = [] // Placeholder
        }
        groups[primary.key] = primaryGroup
      }
      return groups
    } else {
      // Simple: flat structure
      const groups: Record<string, unknown[]> = {}
      for (const group of primaryGroups.value) {
        groups[group.key] = [] // Placeholder
      }
      return groups
    }
  })

  // Get task count for column (sum across swimlanes if compound)
  function getColumnCount(columnKey: string): number {
    if (boardGrouping.value.isCompound && secondaryGroups.value) {
      const columnTasks = (tasksByGroup.value as Record<string, Record<string, unknown[]>>)[columnKey]
      if (!columnTasks) return 0
      return Object.values(columnTasks).reduce((sum, tasks) => sum + tasks.length, 0)
    }
    return ((tasksByGroup.value as Record<string, unknown[]>)[columnKey] || []).length
  }

  // Get task count for swimlane (sum across columns)
  function getLaneCount(laneKey: string): number {
    if (!boardGrouping.value.isCompound) return 0
    return primaryGroups.value.reduce((sum, col) => {
      const tasks = (tasksByGroup.value as Record<string, Record<string, unknown[]>>)[col.key]?.[laneKey] || []
      return sum + tasks.length
    }, 0)
  }
</script>

<template>
  <!-- Board View with Grid (simple or compound) -->
  <div
    v-if="boardView.viewMode === 'board'"
    class="h-full overflow-auto px-4 py-4"
  >
    <!-- Simple Board: Horizontal scrolling columns -->
    <div
      v-if="!boardGrouping.isCompound"
      class="flex gap-3 h-full"
      style="scrollbar-width: none; -ms-overflow-style: none"
    >
      <div
        v-for="group in primaryGroups"
        :key="group.key"
        class="shrink-0 w-80 bg-muted/20 rounded-lg flex flex-col"
      >
        <!-- Column Header -->
        <div class="flex items-center gap-2 px-3 py-2.5 sticky top-0 z-10 bg-muted/20">
          <Icon
            :name="group.icon"
            :class="['size-4 shrink-0', group.iconClass]"
          />
          <span class="font-medium text-sm">{{ group.label }}</span>
          <Badge
            variant="outline"
            class="rounded-md px-1.5 py-0 h-5 text-muted-foreground font-normal"
          >
            {{ ((tasksByGroup as Record<string, unknown[]>)[group.key] || []).length }}
          </Badge>
        </div>

        <!-- Tasks Container -->
        <div class="flex-1 space-y-2 px-2 pb-2">
          <template v-if="(tasksByGroup as Record<string, unknown[]>)[group.key]?.length">
            <!-- TODO: Task cards will go here -->
            <div
              v-for="(task, idx) in (tasksByGroup as Record<string, unknown[]>)[group.key]"
              :key="idx"
              class="text-sm"
            >
              Task placeholder
            </div>
          </template>
          <template v-else>
            <p class="text-sm text-muted-foreground px-1">No tasks yet</p>
          </template>
        </div>
      </div>
    </div>

    <!-- Compound Board: CSS Grid with swimlanes -->
    <div
      v-else-if="secondaryGroups"
      class="board-grid"
      :style="{ '--columns': primaryGroups.length }"
    >
      <!-- Column Headers -->
      <div
        v-for="col in primaryGroups"
        :key="`header-${col.key}`"
        class="column-header flex items-center gap-2 px-3 py-2.5 bg-muted/20 rounded-t-lg border-b sticky top-0 z-10"
      >
        <Icon
          :name="col.icon"
          :class="['size-4 shrink-0', col.iconClass]"
        />
        <span class="font-medium text-sm">{{ col.label }}</span>
        <Badge
          variant="outline"
          class="rounded-md px-1.5 py-0 h-5 text-muted-foreground font-normal"
        >
          {{ getColumnCount(col.key) }}
        </Badge>
      </div>

      <!-- Swimlanes -->
      <template
        v-for="lane in secondaryGroups"
        :key="`lane-${lane.key}`"
      >
        <Collapsible
          :open="!isLaneCollapsed(lane.key)"
          class="col-span-full"
        >
          <!-- Swimlane Header -->
          <CollapsibleTrigger
            as-child
            class="swimlane-header"
          >
            <button
              class="flex items-center gap-2 w-full px-3 py-2 bg-muted/30 hover:bg-muted/50 transition-colors border-y"
              @click="toggleLane(lane.key)"
            >
              <Icon
                name="tabler:chevron-right"
                :class="[
                  'size-4 shrink-0 text-muted-foreground transition-transform',
                  !isLaneCollapsed(lane.key) && 'rotate-90',
                ]"
              />
              <Icon
                :name="lane.icon"
                :class="['size-4 shrink-0', lane.iconClass]"
              />
              <span class="font-medium text-sm">{{ lane.label }}</span>
              <Badge
                variant="outline"
                class="rounded-md px-1.5 py-0 h-5 text-muted-foreground font-normal"
              >
                {{ getLaneCount(lane.key) }} items
              </Badge>
            </button>
          </CollapsibleTrigger>

          <!-- Task Cells (one per column) -->
          <CollapsibleContent class="col-span-full grid grid-cols-subgrid">
            <div
              v-for="col in primaryGroups"
              :key="`cell-${col.key}-${lane.key}`"
              class="task-cell min-h-[100px] p-2 space-y-2"
            >
              <!-- TODO: Render tasks here -->
              <div
                v-for="(task, idx) in (tasksByGroup as Record<string, Record<string, unknown[]>>)[col.key]?.[lane.key]"
                :key="idx"
                class="text-sm text-muted-foreground"
              >
                Task placeholder
              </div>
              <p
                v-if="!(tasksByGroup as Record<string, Record<string, unknown[]>>)[col.key]?.[lane.key]?.length"
                class="text-sm text-muted-foreground/50"
              >
                No tasks
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </template>
    </div>
  </div>

  <!-- List View: Vertical collapsible sections -->
  <div
    v-else
    class="space-y-1 py-4"
  >
    <ProjectTaskGroup
      v-for="group in primaryGroups"
      :key="group.key"
      :group="group"
      :tasks="(tasksByGroup as Record<string, unknown[]>)[group.key]"
    />
  </div>
</template>

<style scoped>
.board-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), minmax(280px, 1fr));
  gap: 0.75rem;
}

.col-span-full {
  grid-column: 1 / -1;
}

.grid-cols-\[subgrid\] {
  grid-template-columns: subgrid;
}
</style>
