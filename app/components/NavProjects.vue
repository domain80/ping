<script setup lang="ts">
import {
  FolderKanban, Plus
} from "lucide-vue-next";
import { authClient } from '~/lib/auth-client';

import AddProjectDialog from '@/components/AddProjectDialog.vue';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

const { isMobile } = useSidebar();

// Watch active organization to refetch projects when workspace changes
const activeOrganization = authClient.useActiveOrganization();

const { data: projectsResponse, refresh } = useFetch('/api/project', {
  watch: [() => activeOrganization.value?.data?.id],
});

const projects = computed(() => projectsResponse.value?.data ?? []);

// Dialog state
const isAddDialogOpen = ref(false);

function handleProjectCreated() {
  refresh();
}
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Projects</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="project in projects" :key="project.id">
        <SidebarMenuButton as-child>
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
        <SidebarMenuButton class="text-sidebar-foreground/70" @click="isAddDialogOpen = true">
          <Plus class="text-sidebar-foreground/70" />
          <span>Add Project</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>

  <!-- Add Project Dialog -->
  <AddProjectDialog v-model:open="isAddDialogOpen" @created="handleProjectCreated" />
</template>
