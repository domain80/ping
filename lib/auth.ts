import { db } from "@@/lib/db"; // your drizzle instance
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite", "pg"
    }),
    plugins: [
        organization({
            creatorRole: "owner",
            allowUserToCreateOrganization: true,
            teams: {
                enabled: true,
                defaultTeam: {
                    enabled: true,
                },
            },
        }),
    ],
});
