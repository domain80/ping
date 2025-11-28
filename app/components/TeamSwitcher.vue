<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Building2, ChevronsUpDown, Plus } from "lucide-vue-next"
import { authClient } from '~/lib/auth-client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'


const activeOrganization = authClient.useActiveOrganization()
const organizations = authClient.useListOrganizations()

const workspaces = computed(() => [...(organizations.value?.data ?? [])])

// Active workspace
const activeWorkspace = computed(() => {
  const active = activeOrganization.value?.data
  if (active) {
    // Find matching workspace from list to get consistent type
    return workspaces.value.find(w => w.id === active.id) ?? null
  }

  if (workspaces.value[0])
    authClient.organization.setActive({
      organizationId: workspaces.value[0].id
    })
  return workspaces.value[0] ?? null
})

const { isMobile } = useSidebar()

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

async function switchWorkspace(workspaceId: string) {
  await authClient.organization.setActive({ organizationId: workspaceId })
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <template v-if="activeWorkspace">
                <span class="text-xs font-semibold">{{ getInitials(activeWorkspace.name) }}</span>
              </template>
              <Building2 v-else class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                {{ activeWorkspace?.name ?? 'No Workspace' }}
              </span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start"
          :side="isMobile ? 'bottom' : 'right'" :side-offset="4">
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            Workspaces
          </DropdownMenuLabel>
          <DropdownMenuItem v-for="(workspace, index) in workspaces" :key="workspace.id" class="gap-2 p-2"
            @click="switchWorkspace(workspace.id)">
            <div class="flex size-6 items-center justify-center rounded-sm border text-xs font-medium">
              {{ getInitials(workspace.name) }}
            </div>
            {{ workspace.name }}
            <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">
              Add workspace
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
