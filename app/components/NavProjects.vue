<script setup lang="ts">
  import AddProjectDialog from '@/components/AddProjectDialog.vue'
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from '@/components/ui/sidebar'
  import { FolderKanban, Plus } from 'lucide-vue-next'
  import { refreshProjects, useProjects } from '~/composables/useProjects'

  const route = useRoute()

  const { projects } = useProjects()

  // Check if a project is active based on current route
  const isProjectActive = (projectId: string) => {
    return route.path.startsWith(`/dashboard/projects/${projectId}`)
  }

  // Dialog state
  const isAddDialogOpen = ref(false)

  function handleProjectCreated() {
    refreshProjects()
  }
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Projects</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="project in projects"
        :key="project.id"
      >
        <SidebarMenuButton
          as-child
          :is-active="isProjectActive(project.id)"
        >
          <NuxtLink :to="`/dashboard/projects/${project.id}`">
            <FolderKanban />
            <span>{{ project.name }}</span>
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <!-- Empty state -->
      <SidebarMenuItem v-if="projects.length === 0">
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <span class="text-sm">No projects yet</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <!-- Add project button -->
      <SidebarMenuItem>
        <SidebarMenuButton
          class="text-sidebar-foreground/70"
          @click="isAddDialogOpen = true"
        >
          <Plus class="text-sidebar-foreground/70" />
          <span>Add Project</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>

  <!-- Add Project Dialog -->
  <AddProjectDialog
    v-model:open="isAddDialogOpen"
    @created="handleProjectCreated"
  />
</template>
