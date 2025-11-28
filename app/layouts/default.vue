<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue';
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
                <div class="flex items-center gap-2 px-4 w-full">
                    <SidebarTrigger class="" />
                    <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
                    <slot name="breadcrumb" />
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
