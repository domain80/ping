import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/lib/db";
import { project } from "~~/lib/schema/project-schema";
import { ensureParam } from "~~/server/utils/params";
import { getValidSession } from "~~/server/utils/session";
import { getVerifiedWorkspaceId } from "~~/server/utils/workspace";

const updateProjectSchema = z
    .object({
        name: z.string().min(1, "Project name cannot be empty").trim().optional(),
        description: z.string().trim().nullable().optional(),
    })
    .refine((data) => data.name !== undefined || data.description !== undefined, {
        message: "At least one field must be provided",
    });

export default defineEventHandler(async (event) => {
    const session = await getValidSession(event);
    const workspaceId = await getVerifiedWorkspaceId(event, session);

    const projectId = ensureParam(event, { name: "id" });

    // Verify project exists and belongs to the workspace
    const [existingProject] = await db
        .select()
        .from(project)
        .where(and(eq(project.id, projectId), eq(project.organizationId, workspaceId)));

    if (!existingProject) {
        throw createError({
            statusCode: 404,
            message: "Project not found",
        });
    }

    const body = await readValidatedBody(event, updateProjectSchema.parse);

    const [updatedProject] = await db
        .update(project)
        .set({
            ...(body.name !== undefined && { name: body.name }),
            ...(body.description !== undefined && { description: body.description }),
        })
        .where(eq(project.id, projectId))
        .returning();

    return updatedProject;
});
