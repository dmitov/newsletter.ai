import { authenticated } from "~/lib/auth-server";
import type { Route } from "./+types";

export function meta() {
  return [
    { title: "Newsletter Dashboard" },
    { name: "description", content: "Dashboard for managing your newsletter" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await authenticated(request.headers);
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <h1>Dashboard</h1>
    </div>
  );
}
