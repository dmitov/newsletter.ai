import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

interface DashboardHeaderProps {
  children: React.ReactNode;
  title: string;
  backLink: {
    title: string;
    href: string;
  };
}

export function DashboardHeader({
  children,
  title,
  backLink,
}: DashboardHeaderProps) {
  return (
    <header className="border-b bg-white dark:bg-slate-800">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={backLink.href}
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">{backLink.title}</span>
          </Link>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {title ?? "Dashboard"}
          </h1>
        </div>

        {children}
      </div>
    </header>
  );
}
