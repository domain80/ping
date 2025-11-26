import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue"; // make sure to import from better-auth/vue

export const authClient = createAuthClient({
    basePath: process.env.BETTER_AUTH_BASE_PATH,
    plugins: [
        organizationClient({
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
