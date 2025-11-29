import { authClient } from '~/lib/auth-client'

export function useProjects() {
  const activeOrganization = authClient.useActiveOrganization()

  const { data, refresh, status } = useFetch('/api/project', {
    key: 'projects',
    watch: [() => activeOrganization.value?.data?.id],
  })

  const projects = computed(() => data.value?.data ?? [])
  const isLoading = computed(() => status.value === 'pending')

  return {
    projects,
    isLoading,
    refresh,
  }
}

// Helper to refresh projects from anywhere in the app
export function refreshProjects() {
  return refreshNuxtData('projects')
}
