import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { meQuery } from "@/queries/account";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: () => {
    return (
      <main className="container mx-auto flex min-h-screen max-w-screen-2xl flex-col px-3"></main>
    );
  },
});
