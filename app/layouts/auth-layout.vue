<script lang="ts" setup>

</script>

<template>
    <div class="min-h-screen flex">
        <!-- Left column: Form content -->
        <div class="flex-2 flex flex-col items-center justify-center px-6 py-12 lg:px-16">
            <div class="w-full max-w-sm mx-auto space-y-6 lg:mx-0">
                <!-- Logo (mobile only) -->
                <div class="flex items-center justify-start gap-2 lg:hidden">
                    <NuxtIcon name="ping" class="text-muted-foreground w-5 aspect-square" />
                    <h4>Ping</h4>
                </div>

                <!-- Page content slot -->
                <slot />
            </div>
        </div>

        <!-- Right column: Branded panel (hidden on mobile) -->
        <div class="hidden lg:flex lg:flex-1 border-l flex-col justify-center">
            <!-- Logo -->
            <div class=" flex gap-4 items-center bg-background p-8 -ml-12 my-32 ">
                <NuxtIcon name="ping" class="text-muted-foreground w-8" />
                <span>Ping</span>
            </div>

            <!-- page desc -->
            <!-- <div class="space-y-12 contents"> -->
            <section v-if="$slots.desc"
                class="before:w-2 before:my-2 -ml-1 before:h-2 before:bg-amber-600 before:rounded-full before:inline-block before:mr-2 text-muted-foreground flex items-start">
                <slot name="desc" />
            </section>

            <!-- </div> -->
        </div>
    </div>
</template>
