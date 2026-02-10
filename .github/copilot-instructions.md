# Copilot Instructions for tutorial_app

## Project Overview
- This is a NestJS (Node.js/TypeScript) backend application, organized by domain modules (users, posts, tags, meta-options, auth).
- Each domain has its own controller, service/provider, entity, DTOs, and sometimes enums or config.
- Uses TypeORM for database access, with repositories injected via `@InjectRepository`.
- Follows dependency injection and modular structure typical of NestJS.

## Key Patterns & Conventions
- **Services** (in `providers/`) encapsulate business logic and database access. Controllers delegate to these services.
- **DTOs** (in `dtos/`) are used for input validation and type safety.
- **Entities** (e.g., `users.entity.ts`, `posts.entity.ts`) define database models for TypeORM.
- **Relations** between entities (e.g., posts and tags) are handled via TypeORM, often with eager loading or explicit relation queries.
- **Error handling** uses NestJS exceptions (`BadRequestException`, `RequestTimeoutException`, etc.) for API responses.
- **Configuration** is modularized (see `src/config/`).
- **Module files** (e.g., `users.module.ts`) wire up controllers, providers, and imports for each domain.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Run in development:** `npm run start:dev`
- **Run in production:** `npm run start:prod`
- **Run unit tests:** `npm run test`
- **Run e2e tests:** `npm run test:e2e`
- **Test coverage:** `npm run test:cov`

## Integration & Cross-Component Communication
- Services are injected into each other using NestJS DI (e.g., `PostsService` uses `UsersService` and `TagsService`).
- TypeORM repositories are injected for data access.
- Some services use `forwardRef` to resolve circular dependencies (see `UsersService` and `AuthService`).
- Relations between entities (e.g., posts, tags, users) are managed via TypeORM, sometimes with custom queries or eager loading.

## Project-Specific Notes
- Prefer using TypeORM's cascade and eager relations for entity associations.
- Error messages often include extra context (file name, line number) for debugging.
- Some legacy/experimental code is commented out but left for reference (e.g., alternative relation handling in services).
- Documentation is generated in the `documentation/` folder (HTML output, not source).

## Key Files & Directories
- `src/` — main source code (organized by domain)
- `src/app/`, `src/auth/`, `src/posts/`, `src/tags/`, `src/users/` — main modules
- `src/config/` — configuration files
- `test/` — e2e tests
- `documentation/` — generated docs (not source)
- `package.json` — scripts, dependencies
- `README.md` — basic setup and workflow

## Example: Adding a New Domain
1. Create a new folder in `src/` (e.g., `comments/`).
2. Add `comments.entity.ts`, `comments.controller.ts`, `comments.module.ts`, `providers/comments.service.ts`, and `dtos/` as needed.
3. Register the new module in `app.module.ts`.

---

For more details, see the README.md and existing module patterns. Follow the structure and conventions above for best results.