<script setup lang="ts">
  import ProjectNav from '@/components/ProjectNav.vue'
  import { Search } from 'lucide-vue-next'
  import { Button } from '~/components/ui/button'
  import { authClient } from '~/lib/auth-client'

  const route = useRoute()
  const projectId = computed(() => route.params.projectId as string)

  // Fetch project data (cached, shared with child pages)
  const { data: project } = useFetch(() => `/api/project/${projectId.value}`)
  const org = authClient.useActiveOrganization()

  // Set base breadcrumbs for all project pages
  useSetBreadcrumbs(
    computed(() => [
      { label: org.value.data?.name ?? 'Workspace', to: '/dashboard' },
      {
        label: `Project${project.value?.name ? ' ~ ' + project.value?.name : null}`,
        to: undefined,
      },
    ])
  )
</script>

<template>
  <div class="contents">
    <Teleport to="#page-header-actions">
      <!-- todo: extract into components -->
      <Button
        variant="outline"
        class=""
        size="sm"
        disabled
      >
        <Search class="" />
        <span class="hidden lg:block">
          Search project
          <kbd class="bg-muted px-1 py-0.5 rounded text-xs border ml-1">/</kbd>
        </span>
      </Button>

      <Button
        variant="outline"
        class=""
        size="sm"
      >
        <span class="hidden lg:block">New Task</span>
        <span class="lg:hidden">+</span>
      </Button>
    </Teleport>

    <div class="flex flex-col h-full">
      <ProjectNav :project-id="projectId" />

      <main class="flex-1 min-h-0">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
