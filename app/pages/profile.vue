<script setup lang="ts">
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { authClient } from '~/lib/auth-client'

definePageMeta({
    layout: false,
    title: "Profile | Ping"
})

const session = authClient.useSession()

async function handleSignout() {
    await authClient.signOut()
    await navigateTo({ name: "login" })
}
</script>

<template>
    <NuxtLayout name="default">
        <template #breadcrumb>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem class="hidden md:block">
                        <BreadcrumbLink href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator class="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Profile</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </template>

        <div class="max-w-2xl">
            <div class="flex flex-col items-start gap-4 mb-8">
                <Avatar v-if="session.data" class="ring ring-border shadow size-16">
                    <AvatarImage :src="session.data?.user.image ?? ''" />
                    <AvatarFallback class="text-xl">{{ session.data?.user.name.at(0) }}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 class="text-2xl font-semibold">{{ session.data?.user.name }}</h1>
                    <p class="text-muted-foreground">{{ session.data?.user.email }}</p>
                </div>
            </div>

            <div class="flex gap-4 items-center">
                <NuxtLink :to="{ name: 'dashboard' }">
                    <Button variant="outline">Go to dashboard</Button>
                </NuxtLink>
                <Button variant="destructive" @click="handleSignout">
                    Sign out
                </Button>
            </div>
        </div>
    </NuxtLayout>
</template>
