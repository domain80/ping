<script setup lang="ts">
const route = useRoute();
const projectId = computed(() => route.params.projectId as string);

const { data: project } = useFetch(() => `/api/project/${projectId.value}`);

useSetBreadcrumbs(computed(() => [
    { label: 'Dashboard', to: '/dashboard' },
    { label: project.value?.name ?? 'Project', to: `/dashboard/projects/${projectId.value}` },
    { label: 'Docs' },
]));
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Documentation</h2>
        </div>

        <div class="bg-muted/50 min-h-[400px] rounded-lg p-6">
            <p class="text-muted-foreground">No documentation yet. Start by creating your first document.</p>
        </div>
    </div>
</template>
