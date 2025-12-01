// import { meQuery } from "@/queries/account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: () => {
    return (
      <main className="container mx-auto flex min-h-screen max-w-screen-2xl flex-col px-3"></main>
    );
  },
});
