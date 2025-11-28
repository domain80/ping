<script setup lang="ts">
import ProjectNav from '@/components/ProjectNav.vue';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

definePageMeta({
    layout: false,
})

const route = useRoute();
const projectId = computed(() => route.params.projectId as string);

// Fetch project details
const { data: project } = useFetch(() => `/api/project/${projectId.value}`);
</script>

<template>
    <NuxtLayout name="default">
        <template #breadcrumb>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem class="hidden md:block">
                        <BreadcrumbLink href="/dashboard">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator class="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{{ project?.name ?? 'Project' }}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </template>

        <div class="space-y-6">


            <!-- Project Navigation -->
            <ProjectNav :project-id="projectId" />

            <main class="p-4">
                <!-- Child Page Content -->
                <NuxtPage />
            </main>
        </div>
    </NuxtLayout>
</template>
