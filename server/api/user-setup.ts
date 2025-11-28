import { nanoid } from "nanoid";
import { auth } from "~~/lib/auth";
import { db } from "~~/lib/db";
import { project } from "~~/lib/schema/project-schema";

export default defineEventHandler(async (event) => {
    const ses = await auth.api.getSession({
        headers: event.headers,
    });

    if (!ses || !ses.session || !ses.user) {
        return sendRedirect(event, "/login", 302);
    }

    const { session, user } = ses;

    if (!session.activeOrganizationId) {
        const org = await auth.api.createOrganization({
            headers: event.headers,
            body: {
                name: `${user.name.split(" ")[0]}'s Workspace`,
                slug: `default-${nanoid(8)}`,
                userId: user.id,
            },
        });

        if (org?.id) {
            await auth.api.setActiveOrganization({
                headers: event.headers,
                body: {
                    organizationId: org.id,
                },
            });

            // Create a default project for the new organization
            await db.insert(project).values({
                name: "Default Project",
                organizationId: org.id,
                createdBy: user.id,
            });
        }
    }

    return sendRedirect(event, "/profile", 302);
});
