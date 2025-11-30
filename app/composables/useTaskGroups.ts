export interface TaskGroup {
  key: string
  label: string
  icon: string
  iconClass: string
}

/**
 * Composable for task group configurations.
 * Provides status, priority, and assignee groupings for board/list views.
 *
 * Note: Priority and assignee groups may be fetched from API in the future.
 * The structure supports easy migration to async data sources.
 */
export function useTaskGroups() {
  // Status-based groups (static - defined by the system)
  const statusGroups: TaskGroup[] = [
    { key: 'todo', label: 'To Do', icon: 'tabler:list-check', iconClass: 'text-muted-foreground' },
    { key: 'in_progress', label: 'In Progress', icon: 'tabler:progress', iconClass: 'text-blue-500' },
    { key: 'review', label: 'Review', icon: 'tabler:eye-search', iconClass: 'text-amber-500' },
    { key: 'done', label: 'Done', icon: 'tabler:circle-check', iconClass: 'text-green-500' },
  ]

  // Priority-based groups (could be fetched from API in future)
  const priorityGroups: TaskGroup[] = [
    { key: 'urgent', label: 'Urgent', icon: 'tabler:alert-triangle', iconClass: 'text-red-500' },
    { key: 'high', label: 'High', icon: 'tabler:arrow-up', iconClass: 'text-orange-500' },
    { key: 'medium', label: 'Medium', icon: 'tabler:minus', iconClass: 'text-yellow-500' },
    { key: 'low', label: 'Low', icon: 'tabler:arrow-down', iconClass: 'text-blue-500' },
    { key: 'none', label: 'No Priority', icon: 'tabler:dots', iconClass: 'text-muted-foreground' },
  ]

  // Assignee-based groups (will be fetched from API - team members)
  // For now, just show unassigned. In future: fetch project members and map to groups.
  const assigneeGroups: TaskGroup[] = [
    { key: 'unassigned', label: 'Unassigned', icon: 'tabler:user-off', iconClass: 'text-muted-foreground' },
    // TODO: Dynamically populate from project team members
  ]

  /**
   * Get groups based on groupBy type
   */
  function getGroups(groupBy: 'status' | 'assignee' | 'priority'): TaskGroup[] {
    switch (groupBy) {
      case 'priority':
        return priorityGroups
      case 'assignee':
        return assigneeGroups
      default:
        return statusGroups
    }
  }

  return {
    statusGroups,
    priorityGroups,
    assigneeGroups,
    getGroups,
  }
}

