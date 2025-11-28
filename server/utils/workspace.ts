import type { H3Event } from "h3";
import { auth } from "~~/lib/auth";
import type { Session } from "./session";

export function getActiveWorkspaceId(session: Session): string {
    const workspaceId = session.session.activeOrganizationId;

    if (!workspaceId) {
        throw createError({
            statusCode: 400,
            message: "No active workspace selected",
        });
    }

    return workspaceId;
}

/**
 * Verifies that the user is a member of the specified organization using auth API
 */
export async function verifyWorkspaceMembership(
    event: H3Event,
    organizationId: string
): Promise<void> {
    // Use auth API to list user's organizations
    const organizations = await auth.api.listOrganizations({
        headers: event.headers,
    });

    const isMember = organizations?.some((org) => org.id === organizationId);

    if (!isMember) {
        throw createError({
            statusCode: 404,
            message: "Resource not found",
        });
    }
}

/**
 * Gets the active workspace ID and verifies the user is a member
 */
export async function getVerifiedWorkspaceId(event: H3Event, session: Session): Promise<string> {
    const workspaceId = getActiveWorkspaceId(session);
    await verifyWorkspaceMembership(event, workspaceId);
    return workspaceId;
}
