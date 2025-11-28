import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware, organization } from "better-auth/plugins";
import { db } from "~~/lib/db"; // your drizzle instance
import * as authSchema from "./schema/auth-schema";

export const auth = betterAuth({
    appName: "Ping",
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite", "pg"
        schema: authSchema,
    }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        organization({
            creatorRole: "owner",
            allowUserToCreateOrganization: true,
            teams: {
                enabled: false,
            },
        }),
    ],

    telemetry: {
        enabled: false,
    },

    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path.startsWith("/sign-in")) {
                const newSession = ctx.context.newSession;

                console.log({ newSession });
                console.log({ session: ctx.context.session });
                // console.log({ iadapter: ctx.context.internalAdapter });
                console.log({ dbUsers: await ctx.context.internalAdapter.listUsers() });

                if (newSession) {
                    console.log({ newSession });
                    // sendMessage({
                    //     type: "user-register",
                    //     name: newSession.user.name,
                    // })
                }
            }
        }),
    },
});
