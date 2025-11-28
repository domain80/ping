<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem, BreadcrumbList,
    BreadcrumbPage
} from '@/components/ui/breadcrumb';

definePageMeta({
    layout: false,
})
</script>

<template>
    <NuxtLayout name="default">
        <template #breadcrumb>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </template>

        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-lg" />
            <div class="bg-muted/50 aspect-video rounded-lg" />
            <div class="bg-muted/50 aspect-video rounded-lg" />
        </div>
        <div class="bg-muted/50 min-h-screen flex-1 rounded-lg md:min-h-min" />
    </NuxtLayout>
</template>
