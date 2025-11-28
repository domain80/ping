<script setup lang="ts">
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

const route = useRoute()
const projectId = computed(() => route.params.projectId as string)

// TODO: Fetch project details
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
                        <BreadcrumbPage>Project</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </template>

        <div class="space-y-6">
            <div>
                <h1 class="text-2xl font-semibold">Project Details</h1>
                <p class="text-muted-foreground">Project ID: {{ projectId }}</p>
            </div>

            <div class="bg-muted/50 min-h-[400px] rounded-xl p-6">
                <!-- Project content will go here -->
            </div>
        </div>
    </NuxtLayout>
</template>

