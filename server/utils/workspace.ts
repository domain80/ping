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

