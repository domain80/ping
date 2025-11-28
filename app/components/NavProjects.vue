<script setup lang="ts">
import {
  Folder,
  FolderKanban,
  Forward,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-vue-next"
import { authClient } from '~/lib/auth-client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const { isMobile } = useSidebar()

// Watch active organization to refetch projects when workspace changes
const activeOrganization = authClient.useActiveOrganization()

const { data: projectsResponse } = useFetch('/api/project', {
  watch: [() => activeOrganization.value?.data?.id],
})
console.log({ projectsResponse })

const projects = computed(() => projectsResponse.value?.data ?? [])
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Projects</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="project in projects" :key="project.id">
        <SidebarMenuButton as-child>
          <NuxtLink :to="`/project/${project.id}`">
            <FolderKanban />
            <span>{{ project.name }}</span>
          </NuxtLink>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48 rounded-lg" :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'">
            <DropdownMenuItem>
              <Folder class="text-muted-foreground" />
              <span>View Project</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Forward class="text-muted-foreground" />
              <span>Share Project</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-destructive">
              <Trash2 class="text-muted-foreground" />
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <!-- Empty state -->
      <SidebarMenuItem v-if="projects.length === 0">
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <span class="text-sm">No projects yet</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <!-- Add project button -->
      <SidebarMenuItem>
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <Plus class="text-sidebar-foreground/70" />
          <span>Add Project</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
