import { z } from 'zod'
import { db } from '~~/lib/db'
import { project } from '~~/lib/schema/project-schema'
import { getValidSession } from '~~/server/utils/session'
import { getVerifiedWorkspaceId } from '~~/server/utils/workspace'

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').trim(),
  description: z.string().trim().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await getValidSession(event)
  const workspaceId = await getVerifiedWorkspaceId(event, session)

  const body = await readValidatedBody(event, createProjectSchema.parse)

  const [newProject] = await db
    .insert(project)
    .values({
      name: body.name,
      description: body.description || null,
      organizationId: workspaceId,
      createdBy: session.user.id,
    })
    .returning()

  return newProject
})
