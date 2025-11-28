<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { authClient } from "~/lib/auth-client";

definePageMeta({
    layout: 'auth-layout',
    title: "Login | Ping"
})

const route = useRoute();

const getCallbackUrl = () => {
    const redirect = route.query.redirect;
    if (redirect && typeof redirect === "string") {
        // Use continue param as callback; fallback to "/profile" if blank
        return redirect || "/profile";
    }
    return "/profile";
};

const handleGithubSignIn = () => {
    authClient.signIn.social({
        provider: "github",
        callbackURL: getCallbackUrl(),
        newUserCallbackURL: "/api/user-setup"
    })
}

const handleGoogleSignIn = () => {
    authClient.signIn.social({
        provider: "google",
        callbackURL: getCallbackUrl()
    })
}
</script>

<template>
    <div class="space-y-8">
        <!-- Heading -->
        <header>
            <h1 class="text-xl font-semibold mb-1">Sign in</h1>
            <p class="text-muted-foreground mb-8">
                Continue with your Google or Github account
            </p>
        </header>

        <!-- Social sign-in buttons -->
        <Button variant="default" class="w-full" @click="handleGithubSignIn">
            <Icon name="mdi:github" size="16" />
            GitHub
        </Button>

        <Button variant="outline" class="w-full" @click="handleGoogleSignIn">
            <Icon name="devicon:google" class="size-5" />
            Google
        </Button>
    </div>
</template>
