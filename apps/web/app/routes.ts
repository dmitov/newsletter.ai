import {
  index,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sign-in", "routes/sign-in.tsx"),

  ...prefix("posts", [
    index("routes/posts/index.tsx"),
    route(":id", "routes/posts/$id.tsx"),
  ]),

  ...prefix("dashboard", [
    index("routes/dashboard/index.tsx"),
    route("posts", "routes/dashboard/posts/index.tsx"),
    route("posts/create", "routes/dashboard/posts/create.tsx"),
    route("posts/:id/edit", "routes/dashboard/posts/edit/$id.tsx"),
  ]),

  ...prefix("api", [
    route("posts", "routes/api/posts/index.ts"),
    route("posts/:id", "routes/api/posts/$id.ts"),

    route("auth/*", "routes/api/auth.ts"),
    route("subscribe", "routes/api/subscribe.ts"),
  ]),
] satisfies RouteConfig;
