<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import { refreshProjects } from '~/composables/useProjects';

const route = useRoute();
const router = useRouter();
const projectId = computed(() => route.params.projectId as string);

const isDeleting = ref(false);

async function handleDeleteProject() {
    isDeleting.value = true;
    const toastId = toast.loading('Deleting project...');

    try {
        await $fetch(`/api/project/${projectId.value}`, {
            method: 'DELETE',
        });

        toast.success('Project deleted successfully', { id: toastId });
        await refreshProjects();
        router.push('/dashboard');
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete project';
        toast.error(message, { id: toastId });
    } finally {
        isDeleting.value = false;
    }
}
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
                    <p class="text-sm text-muted-foreground">
                        Once you delete a project, there is no going back. Please be certain.
                    </p>

                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                            <Button variant="destructive" size="default" :disabled="isDeleting">
                                Delete Project
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your project
                                    and remove all associated data including:
                                    <ul class="list-disc list-inside mt-2 space-y-1">
                                        <li>All tasks and their history</li>
                                        <li>All documents and files</li>
                                        <li>All project settings and configurations</li>
                                    </ul>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel :disabled="isDeleting">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    :disabled="isDeleting" @click="handleDeleteProject">
                                    {{ isDeleting ? 'Deleting...' : 'Delete Project' }}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    </div>
</template>
