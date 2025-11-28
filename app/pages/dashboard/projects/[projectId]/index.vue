<script setup lang="ts">
const route = useRoute();
const projectId = computed(() => route.params.projectId as string);
</script>

<template>
    <div class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="bg-muted/50 rounded-lg p-6">
                <h3 class="text-sm font-medium text-muted-foreground">Total Tasks</h3>
                <p class="text-2xl font-bold">0</p>
            </div>
            <div class="bg-muted/50 rounded-lg p-6">
                <h3 class="text-sm font-medium text-muted-foreground">In Progress</h3>
                <p class="text-2xl font-bold">0</p>
            </div>
            <div class="bg-muted/50 rounded-lg p-6">
                <h3 class="text-sm font-medium text-muted-foreground">Completed</h3>
                <p class="text-2xl font-bold">0</p>
            </div>
            <div class="bg-muted/50 rounded-lg p-6">
                <h3 class="text-sm font-medium text-muted-foreground">Team Members</h3>
                <p class="text-2xl font-bold">1</p>
            </div>
        </div>

        <div class="bg-muted/50 min-h-[300px] rounded-lg p-6">
            <h2 class="text-lg font-semibold mb-4">Recent Activity</h2>
            <p class="text-muted-foreground">No recent activity</p>
        </div>
    </div>
</template>
