<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue';
import { BreadcrumbSeparator } from '~/components/ui/breadcrumb';

const breadcrumbs = useBreadcrumbs();
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
                <div class="flex items-center gap-2 px-4 w-full">
                    <SidebarTrigger />
                    <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
                    <Breadcrumb v-if="breadcrumbs.length">
                        <BreadcrumbList class="flex items-center text-muted-foreground text-sm">
                            <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.to ?? idx">
                                <BreadcrumbItem :class="idx < breadcrumbs.length - 1 ? 'hidden md:inline-flex' : ''">
                                    <template v-if="idx === breadcrumbs.length - 1">
                                        <BreadcrumbPage>{{ crumb.label }}</BreadcrumbPage>
                                    </template>
                                    <template v-else>
                                        <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
                                        <span v-else>{{ crumb.label }}</span>
                                    </template>
                                </BreadcrumbItem>
                                <!-- <Separator v-if="idx < breadcrumbs.length - 1" orientation="vertical"
                                    class="mx-2 data-[orientation=vertical]:h-4 hidden md:inline-flex" /> -->

                                <BreadcrumbSeparator v-if="idx < breadcrumbs.length - 1"
                                    class="hidden mx-2 md:inline-flex" />
                            </template>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div class="ml-auto p-0">
                        <ThemeSwitcher />
                    </div>
                </div>
            </header>
            <main class="flex flex-1 flex-col gap-4">
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>
