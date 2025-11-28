<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Box, CheckCircle2, Circle, ListTodo, Users } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const route = useRoute();
const projectId = computed(() => route.params.projectId as string);

// Fetch project details
const { data: project, refresh } = useFetch(() => `/api/project/${projectId.value}`);

// Refs for contenteditable elements
const nameRef = ref<HTMLElement | null>(null);
const descriptionRef = ref<HTMLElement | null>(null);

// Track original values for rollback
let originalName = '';
let originalDescription = '';

// Save name on blur
async function handleNameBlur(e: FocusEvent) {
    const target = e.target as HTMLElement;
    const newName = target.innerText.trim();

    // Validate
    if (!newName) {
        toast.error('Project name cannot be empty');
        target.innerText = originalName;
        return;
    }

    // Skip if unchanged
    if (newName === originalName) return;

    try {
        await $fetch(`/api/project/${projectId.value}`, {
            method: 'PATCH',
            body: { name: newName },
        });
        originalName = newName;
        await refresh();
        await refreshNuxtData('projects');
        toast.success('Project name updated');
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update project name';
        toast.error(message);
        target.innerText = originalName;
    }
}

// Save description on blur
async function handleDescriptionBlur(e: FocusEvent) {
    const target = e.target as HTMLElement;
    const newDescription = target.innerText.trim();

    // Skip if unchanged
    if (newDescription === originalDescription) return;

    try {
        await $fetch(`/api/project/${projectId.value}`, {
            method: 'PATCH',
            body: { description: newDescription || null },
        });
        originalDescription = newDescription;
        await refresh();
        toast.success('Description updated');
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update description';
        toast.error(message);
        target.innerText = originalDescription;
    }
}

// Handle focus to store original value
function handleNameFocus(e: FocusEvent) {
    originalName = (e.target as HTMLElement).innerText.trim();
    moveCursorToEnd(e.target as HTMLElement);
}

function handleDescriptionFocus(e: FocusEvent) {
    originalDescription = (e.target as HTMLElement).innerText.trim();
    moveCursorToEnd(e.target as HTMLElement);
}

// Move cursor to end of contenteditable
function moveCursorToEnd(el: HTMLElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
}

// Handle keyboard events for name (prevent Enter, handle Escape)
function handleNameKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        e.preventDefault();
        (e.target as HTMLElement).blur();
    } else if (e.key === 'Escape') {
        (e.target as HTMLElement).innerText = originalName;
        (e.target as HTMLElement).blur();
    }
}

// Handle keyboard events for description (handle Escape)
function handleDescriptionKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
        (e.target as HTMLElement).innerText = originalDescription;
        (e.target as HTMLElement).blur();
    }
}
</script>

<template>
    <div class="space-y-4 max-w-2xl mx-auto">
        <!-- Project Header -->
        <div class="space-y-2">
            <!-- Project Icon -->
            <div class="size-8 rounded-sm border bg-muted/50 flex items-center justify-center">
                <Box class="size-4 text-muted-foreground" />
            </div>

            <!-- Project Name (Editable) -->
            <h1 ref="nameRef" contenteditable="true"
                class="text-xl font-bold outline-none rounded px-1 -mx-1 focus:bg-muted/50 transition-colors empty:before:content-['Untitled_Project'] empty:before:text-muted-foreground"
                @focus="handleNameFocus" @blur="handleNameBlur" @keydown="handleNameKeydown">{{ project?.name }}</h1>

            <!-- Description (Editable) -->
            <p ref="descriptionRef" contenteditable="true"
                class="text-sm text-muted-foreground outline-none rounded px-2 -mx-2 focus:bg-muted/50 transition-colors whitespace-pre-wrap empty:before:content-['Add_description...'] empty:before:text-muted-foreground/70"
                @focus="handleDescriptionFocus" @blur="handleDescriptionBlur" @keydown="handleDescriptionKeydown">{{
                    project?.description }}</p>

            <!-- Stats Badges -->
            <div class="flex flex-wrap gap-2 -ml-1 mt-4">
                <Badge variant="secondary" class="gap-1.5">
                    <ListTodo class="size-3" />
                    <span>0 Tasks</span>
                </Badge>
                <Badge variant="secondary" class="gap-1.5">
                    <Circle class="size-3" />
                    <span>0 In Progress</span>
                </Badge>
                <Badge variant="secondary" class="gap-1.5">
                    <CheckCircle2 class="size-3" />
                    <span>0 Completed</span>
                </Badge>
                <Badge variant="secondary" class="gap-1.5">
                    <Users class="size-3" />
                    <span>1 Member</span>
                </Badge>
            </div>

        </div>
    </div>
</template>
