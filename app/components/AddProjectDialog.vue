<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const props = defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    'update:open': [value: boolean];
    'created': [];
}>();

const createProjectSchema = toTypedSchema(
    z.object({
        name: z.string().min(1, 'Project name is required'),
        description: z.string().optional(),
    })
);

const form = useForm({
    validationSchema: createProjectSchema,
    initialValues: {
        name: '',
        description: '',
    },
    validateOnMount: false,
});

const isSubmitting = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
    isSubmitting.value = true;

    const toastId = toast.loading('Creating project...');

    try {
        await $fetch('/api/project', {
            method: 'POST',
            body: values,
        });

        toast.success('Project created successfully', { id: toastId });
        form.resetForm();
        emit('update:open', false);
        emit('created');
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create project';
        toast.error(message, { id: toastId });
    } finally {
        isSubmitting.value = false;
    }
});

function handleOpenChange(value: boolean) {
    if (!value) {
        form.resetForm();
    }
    emit('update:open', value);
}
</script>

<template>
    <Dialog :open="props.open" @update:open="handleOpenChange">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>New Project</DialogTitle>
                <DialogDescription>
                    Create a new project in your workspace.
                </DialogDescription>
            </DialogHeader>

            <form class="space-y-4" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="name" :validate-on-blur="false" :validate-on-change="false"
                    :validate-on-input="false" :validate-on-model-update="false">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="My awesome project" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="description" :validate-on-blur="false"
                    :validate-on-change="false" :validate-on-input="false" :validate-on-model-update="false">
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A brief description of your project" v-bind="componentField"
                                rows="3" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <DialogFooter>
                    <Button type="button" variant="outline" :disabled="isSubmitting" @click="handleOpenChange(false)">
                        Cancel
                    </Button>
                    <Button type="submit" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Creating...' : 'Create Project' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
