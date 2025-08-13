# Newsletter.ai

A take-home assignment for a job interview project. 

## How to run it
1. Run `cp .env.example .env` and fill-in the environment variables
2. Run `pnpm install`
3. Run `pnpm run dev`

## Product requirements
-[x] Ability to author new posts
-[x] Ability to view published posts in read-only mode
-[x] Ability to sign up for the newsletter
-[x] Ability to retrieve blog posts from an API including content
-[x] Ability to schedule posts to be published at a later date
-[x] Send an email to subscribers upon publishing a post

## Demo
The live demo is available here: [https://newsletter-ai-web.vercel.app/](https://newsletter-ai-web.vercel.app/)
> Note: The app lacks loading states here and there. For example authenticating with GitHub takes some time and no loader is shown.

## Project structure
- `./apps/web` – React Router v7 app responsible for the front-end website and API
- `./packages/auth` – BetterAuth configuration
- `./packages/db` – Prisma setup and database client
- `./packages/email` – React Email & Resend configuration
- `./packages/jobs` – Trigger.dev job definitions
- `./packages/ui` – ShadCN UI component library
- `./packages/utils` – Common utilities (e.g., date-fns)
- `./packages/validators` – Zod validators for create/update operations

## Time taken
I completed all required features within the allotted 4 hours. To save time, I reused some pre-written code from [Midday](https://github.com/midday-ai/midday) and my personal projects, including the `auth`, `email`, and `jobs` packages.

Most of the UI was "vibe-coded" during the initial build. However, I wasn’t fully satisfied with the design, so I invested an additional 2 hours refining the visuals and deploying the application to Vercel.

## Technology stack
Answer to the question "What were some of the reasons you chose the technology stack that you did?"

- **[Turborepo](https://turbo.build/repo)** – Chosen for its simplicity and familiarity. While this project doesn’t strictly require a monorepo, I’ve worked extensively with them and find the structure beneficial for scalability and tooling consistency. I drew inspiration from Midday.ai and create-t3-turbo for the overall setup and developer experience.

- **[React Router v7](https://reactrouter.com/)** – Picked as an “unknown” to push myself. I’ve used React Router before, but not since the Remix merge. This was a chance to explore the updated API and new capabilities while still leveraging a router I understand conceptually.

- **[Prisma](https://www.prisma.io/)** – My go-to ORM. I’ve used it for 3+ years in personal and professional projects, and despite exploring alternatives, Prisma’s developer experience, type safety, and ecosystem keep me coming back. I’m comfortable and efficient with it—and still excited about its evolution.

- **[ShadCN UI](https://ui.shadcn.com/)** – My preferred UI component library. It offers accessible, themeable, and highly composable components out of the box, enabling me to move quickly without sacrificing design quality.

- **[TanStack Forms](https://tanstack.com/forms)** – Another “unknown” for me. I’m already a fan of TanStack Router, Query, and Table, so this was my first hands-on experience with their form management. I wanted to test how it compares to my usual choices.

- **[BetterAuth](https://better-auth.com/)** – Chosen for its minimal setup and modern approach to authentication. I was able to get secure auth running in minutes, making it a clear win for rapid development. I’d gladly use it again in future projects.

- **[React Email](https://react.email/)** – My go-to for emails in React. It enables a component-driven approach to email design, making it easy to maintain consistency and preview layouts during development.

- **[Trigger.dev](https://trigger.dev/)** – My preferred background jobs tool. Its developer-friendly API and integrations make scheduling, running, and monitoring jobs a painless experience.

## Trade-offs
> What were some of the trade-offs you made when building this application? Why were these acceptable?

- **UI/UX polish** – I didn’t spend much time fine-tuning the UI/UX. Most of it was “vibe-coded” in Cursor with ShadCN UI doing the heavy lifting to make things look decent out of the box. The trade-off here was intentional: I prioritized getting the tech stack and core features in place over design.

- **API architecture** – Ideally, I would’ve created a separate API app using Hono. However, given the time constraints, I opted to use React Router API routes, which are quick, reliable, and fit well for this scope.

## Future improvements
> Given more time, what improvements or optimizations would you add? When would you add them?

- **Markdown editor** – A core part of the authoring experience that would make writing posts far better.
    - When: Early in post-MVP development, before launch if possible.
- **API authentication** – A great technical challenge and essential for production readiness.
    - When: Just before product launch.

- **UI/UX improvements** – Strong design builds trust and retention. I’d revisit layout, spacing, accessibility, and overall visual hierarchy. Loading are also a must-have.
    - When: Post-launch, after gathering initial user feedback.

- **More features features** – (eg. Image support)
    - When: In parallel with UI/UX improvements.

- **Dedicated API app with Hono** – While RR API routes are fine now, I’d eventually split into a dedicated API service for scalability and separation of concerns, treating React Router more like a BFF.
    - When: Once the API surface grows beyond a certain threshold.

# Deployment
>How would you deploy the application in a production-ready way?

The project is currently deployed on Vercel, which is great for rapid setup and initial testing. However, at scale, both Vercel and Trigger.dev can become costly.

For a more cost-effective, production-ready alternative, I’d recommend self-hosting the entire stack using a provider like [Hetzner](https://www.hetzner.com/) and managing deployments with tools such as [Coolify](https://coolify.io/). This approach offers greater control over infrastructure, predictable costs, and flexibility for scaling.




