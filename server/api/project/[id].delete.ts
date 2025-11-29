import { and, eq } from 'drizzle-orm'
import { db } from '~~/lib/db'
import { project } from '~~/lib/schema/project-schema'
import { ensureParam } from '~~/server/utils/params'
import { getValidSession } from '~~/server/utils/session'
import { getVerifiedWorkspaceId } from '~~/server/utils/workspace'

export default defineEventHandler(async (event) => {
  const session = await getValidSession(event)
  const workspaceId = await getVerifiedWorkspaceId(event, session)

  const projectId = ensureParam(event, { name: 'id' })

  // Verify project exists and belongs to the workspace
  const [existingProject] = await db
    .select()
    .from(project)
    .where(and(eq(project.id, projectId), eq(project.organizationId, workspaceId)))

  if (!existingProject) {
    throw createError({
      statusCode: 404,
      message: 'Project not found',
    })
  }

  await db.delete(project).where(eq(project.id, projectId))

  return { success: true }
})
