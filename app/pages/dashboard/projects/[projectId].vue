<script setup lang="ts">
import ProjectNav from '@/components/ProjectNav.vue';

const route = useRoute();
const projectId = computed(() => route.params.projectId as string);
</script>

<template>
    <div class="">
        <ProjectNav :project-id="projectId" />

        <main class="p-4">
            <NuxtPage />
        </main>
    </div>
</template>
