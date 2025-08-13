import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/components/sonner";
import { useEffect } from "react";
import { useFetcher } from "react-router";

export function NewsletterSignup() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      const data = JSON.parse(fetcher.data);
      toast[data.status as "success" | "error"](data.message);
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form method="post" action="/api/subscribe">
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss a post
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            <Button type="submit" disabled={fetcher.state !== "idle"}>
              {fetcher.state !== "idle" ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </fetcher.Form>
  );
}
