<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()
</script>
<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child class="p-0">
            <Button variant="link" class="p-0!">
                <Icon icon="tabler:circle-half-2" class="p-0 m-0" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode = 'light'">
                Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode = 'dark'">
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode = 'auto'">
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>