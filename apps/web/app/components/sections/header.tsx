import { Button } from "@repo/ui/components/button";
import { Link } from "react-router";
import { authClient } from "~/lib/auth-client";
import { UserMenu } from "../user-menu";

export function Header() {
  const session = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">N</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Newsletter</h1>
        </Link>
        <div className="flex items-center space-x-2">
          <Link to="/">
            <Button variant="link">Homepage</Button>
          </Link>
          <Link to="/posts">
            <Button variant="link">Posts</Button>
          </Link>
          {session.data ? (
            <UserMenu />
          ) : (
            <Link to="/sign-in">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
