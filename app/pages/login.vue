<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { authClient } from '@@/lib/auth/client';

const handleGithubSignIn = () => {
    authClient.signIn.social({
        provider: "github",
        callbackURL: "/whoami"
    })
}

const handleGoogleSignIn = () => {
    authClient.signIn.social({
        provider: "google",
        callbackURL: "/whoami"
    })
}
</script>

<template>
    <div class="min-h-screen flex">
        <!-- Left column: Login form -->
        <div class="flex-2 flex flex-col items-center justify-center px-6 py-12 lg:px-16">
            <div class="w-full max-w-sm mx-auto space-y-6 lg:mx-0">
                <!-- Logo -->
                <div class="flex items-center justify-start gap-2 lg:hidden">
                    <NuxtIcon name="ping" class="text-muted-foreground w-6" />
                    <h4>Ping</h4>
                </div>

                <!-- Heading -->
                <header>
                    <h1 class="text-xl font-semibold mb-1">Sign in</h1>
                    <p class="text-muted-foreground mb-8">
                        Continue with your Google or Github account
                    </p>
                </header>

                <!-- Social sign-in buttons -->
                <!-- <div class="contents"> -->
                <Button variant="default" class="w-full" @click="handleGithubSignIn">
                    <Icon name="mdi:github" size="16" />
                    GitHub
                </Button>

                <Button variant="outline" class="w-full" @click="handleGoogleSignIn">
                    <Icon name="devicon:google" class="size-5" />
                    Google
                </Button>
                <!-- </div> -->
            </div>
        </div>

        <!-- Right column: Branded panel (hidden on mobile) -->
        <div class="hidden lg:flex lg:flex-1 border-l flex-col justify-center ">
            <!-- Logo -->
            <div class="mb-16 flex gap-4 items-center  bg-background p-8 -ml-12">
                <NuxtIcon name="ping" class="text-muted-foreground w-8" />
                <span class="">Ping</span>
            </div>


        </div>
    </div>
</template>
