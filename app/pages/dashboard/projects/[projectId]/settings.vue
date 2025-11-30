<script setup lang="ts">
  import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { toast } from 'vue-sonner'
  import { refreshProjects } from '~/composables/useProjects'

  const route = useRoute()
  const router = useRouter()
  const projectId = computed(() => route.params.projectId as string)

  // Fetch project details (uses cached data from parent)
  const { data: project } = useFetch(() => `/api/project/${projectId.value}`)

  // Extend breadcrumbs from parent
  useExtendBreadcrumbs([{ label: 'Settings' }])

  const isDeleting = ref(false)
  const confirmationInput = ref('')
  const isDialogOpen = ref(false)

  // The text user must type to confirm deletion
  const confirmationText = computed(() => `delete ${project.value?.name ?? ''}`)

  // Check if confirmation input matches
  const isConfirmationValid = computed(
    () => confirmationInput.value.toLowerCase() === confirmationText.value.toLowerCase()
  )

  // Reset confirmation when dialog closes
  watch(isDialogOpen, (open) => {
    if (!open) {
      confirmationInput.value = ''
    }
  })

  async function handleDeleteProject() {
    if (!isConfirmationValid.value) return

    isDeleting.value = true
    const toastId = toast.loading('Deleting project...')

    try {
      await $fetch(`/api/project/${projectId.value}`, {
        method: 'DELETE',
      })

      toast.success('Project deleted successfully', { id: toastId })
      await refreshProjects()
      isDialogOpen.value = false
      router.push('/dashboard')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete project'
      toast.error(message, { id: toastId })
    } finally {
      isDeleting.value = false
    }
  }
  // todo: invite others
  // todo: raname project
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <div>
      <h2 class="text-lg font-semibold">Project Settings</h2>
      <p class="text-sm text-muted-foreground">Manage your project configuration</p>
    </div>

    <div class="space-y-4">
      <!-- Danger Zone -->
      <div class="border border-destructive/50 rounded-lg p-4 space-y-4">
        <h3 class="font-medium text-destructive">Danger Zone</h3>
        <div class="space-y-4">
          <div class="text-sm text-muted-foreground">
            <p>
              This action cannot be undone. This will permanently delete your project and remove all
              associated data including:
            </p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>All tasks and their history</li>
              <li>All documents and files</li>
              <li>All project settings and configurations</li>
            </ul>
          </div>

          <AlertDialog v-model:open="isDialogOpen">
            <AlertDialogTrigger as-child>
              <Button
                variant="destructive"
                size="default"
                :disabled="isDeleting"
              >
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription as="div">
                  <p>Once you delete a project, there is no going back. Please be certain.</p>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div class="space-y-2 py-2">
                <Label for="confirmation">
                  Type
                  <span class="font-mono font-semibold text-foreground">
                    {{ confirmationText }}
                  </span>
                  to confirm
                </Label>
                <Input
                  id="confirmation"
                  v-model="confirmationInput"
                  type="text"
                  :placeholder="confirmationText"
                  :disabled="isDeleting"
                  autocomplete="off"
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel :disabled="isDeleting">Cancel</AlertDialogCancel>
                <Button
                  variant="destructive"
                  :disabled="!isConfirmationValid || isDeleting"
                  @click="handleDeleteProject"
                >
                  {{ isDeleting ? 'Deleting...' : 'Delete Project' }}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  </div>
</template>
