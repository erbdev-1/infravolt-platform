# Module convention

Business capabilities will be implemented as vertical slices under this directory when their backlog tasks enter scope. A module may contain its own components, server logic, queries, mutations, schemas and types.

Cross-module consumers must use a module's public exports. They must not reach into another module through fragile relative or internal deep imports. Empty module directories are intentionally not pre-created.
