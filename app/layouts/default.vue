<script setup lang="ts">
  import AppSidebar from '@/components/AppSidebar.vue'
  import { Separator } from '@/components/ui/separator'
  import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
  import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '~/components/ui/breadcrumb'

  const rawBreadcrumbs = useBreadcrumbs()
  const globalActions = useHeaderActions()

  const sortedGlobalActions = computed(() =>
    [...globalActions.value].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  )

  // Stable array - preserves object references for unchanged items at same position
  const stableBreadcrumbs = shallowRef<Breadcrumb[]>([])

  watch(
    rawBreadcrumbs,
    (newCrumbs) => {
      const current = stableBreadcrumbs.value
      let changed = false

      // Check if anything actually changed
      if (current.length !== newCrumbs.length) {
        changed = true
      } else {
        for (let i = 0; i < newCrumbs.length; i++) {
          const c = current[i]
          const n = newCrumbs[i]
          if (!c || !n || c.label !== n.label || c.to !== n.to) {
            changed = true
            break
          }
        }
      }

      if (!changed) return

      // Build new array, reusing objects where possible
      const result: Breadcrumb[] = []
      for (let i = 0; i < newCrumbs.length; i++) {
        const existing = current[i]
        const incoming = newCrumbs[i]
        if (!incoming) continue

        // Same item at same index? Reuse the object
        if (existing && existing.label === incoming.label && existing.to === incoming.to) {
          result.push(existing)
        } else {
          result.push({ label: incoming.label, to: incoming.to })
        }
      }

      stableBreadcrumbs.value = result
    },
    { immediate: true, deep: true }
  )
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="flex flex-col h-screen overflow-hidden">
      <!-- Top app header -->
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b"
      >
        <div class="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />

          <!-- Breadcrumbs -->
          <Breadcrumb v-if="stableBreadcrumbs.length">
            <BreadcrumbList class="flex items-center text-muted-foreground text-sm">
              <template
                v-for="(crumb, idx) in stableBreadcrumbs"
                :key="crumb.to ?? crumb.label"
              >
                <BreadcrumbItem
                  :class="idx < stableBreadcrumbs.length - 1 ? 'hidden md:inline-flex' : ''"
                >
                  <template v-if="idx === stableBreadcrumbs.length - 1">
                    <BreadcrumbPage>{{ crumb.label }}</BreadcrumbPage>
                  </template>
                  <template v-else>
                    <NuxtLink
                      v-if="crumb.to"
                      :to="crumb.to"
                    >
                      {{ crumb.label }}
                    </NuxtLink>
                    <span v-else>{{ crumb.label }}</span>
                  </template>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  v-if="idx < stableBreadcrumbs.length - 1"
                  class="hidden md:inline-flex"
                />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
          <!-- Header actions -->
          <div class="ml-auto flex items-center gap-2">
            <!-- Global actions from composable -->
            <component
              :is="action.component"
              v-for="action in sortedGlobalActions"
              :key="action.id"
              v-bind="action.props"
            />

            <!-- Page-specific actions (teleport target) -->
            <div
              id="page-header-actions"
              class="contents"
            />

            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
