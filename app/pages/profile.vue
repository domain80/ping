<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { authClient } from '~/lib/auth-client';

definePageMeta({
    layout: false,
    title: "Profile | Ping"
})


// const session = await authClient.getSession();
const session = authClient.useSession()

async function handleSignout() {
    await authClient.signOut();
    await navigateTo({ name: "login" })
}

</script>

<template>
    <NuxtLayout :key="session.data?.session.token ?? 'guest'" name="auth-layout">

        <div>
            <!-- <pre>
                {{ session }}
            </pre> -->

            <div class="flex flex-col items-start gap-2 my-32">
                <!-- show profile info -->
                <Avatar v-if="session.data" class="ring ring-gray-200 shadow flex items-center justify-center size-10">
                    <AvatarImage :src="session.data?.user.image ?? ''" />
                    <AvatarFallback>{{ session.data?.user.name.at(0) }} </AvatarFallback>
                </Avatar>
                <div>
                    <h4 class="text-lg">{{ session.data?.user.name }} </h4>
                    <p class="">{{ session.data?.user.email }} </p>
                </div>

            </div>

            <div class="flex gap-8 items-center">
                <NuxtLink :to="{ name: 'dashboard' }" class="text-muted-foreground ">
                    Go to dashboard
                </NuxtLink>

                <Button variant="link" :onclick="handleSignout" class="">
                    Sign out
                </Button>
            </div>


        </div>

        <template #desc>
            <section>
                <p class="font-medium">Profile Info</p>
                <p class="text-sm">View your profile information</p>
            </section>
        </template>

    </NuxtLayout>
</template>

<style lang="scss" scoped></style>div