import { relations } from "drizzle-orm";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organization, user } from "./auth-schema";
import { tableId, timestamps } from "./utils";

export const project = sqliteTable(
    "project",
    {
        ...tableId("project"),
        name: text("name").notNull(),
        description: text("description"),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        createdBy: text("created_by")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        ...timestamps,
    },
    (table) => [
        index("project_organizationId_idx").on(table.organizationId),
        index("project_createdBy_idx").on(table.createdBy),
    ]
);

export const projectRelations = relations(project, ({ one }) => ({
    organization: one(organization, {
        fields: [project.organizationId],
        references: [organization.id],
    }),
    createdByUser: one(user, {
        fields: [project.createdBy],
        references: [user.id],
    }),
}));
