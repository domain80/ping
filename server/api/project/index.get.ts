import { eq } from "drizzle-orm";
import { db } from "~~/lib/db";
import { project } from "~~/lib/schema/project-schema";
import { countRows, createPaginatedResponse, getPaginationParams } from "~~/lib/utils/pagination";
import { getValidSession } from "~~/server/utils/session";
import { getActiveWorkspaceId } from "~~/server/utils/workspace";

export default defineEventHandler(async (event) => {
    const session = await getValidSession(event);
    const workspaceId = getActiveWorkspaceId(session);

    const { page, limit, offset } = getPaginationParams(event);
    const whereClause = eq(project.organizationId, workspaceId);

    const [projects, total] = await Promise.all([
        db.select().from(project).where(whereClause).limit(limit).offset(offset),
        countRows(project, whereClause),
    ]);

    return createPaginatedResponse(projects, total, { page, limit });
});
