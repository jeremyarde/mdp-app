import { createFileRoute } from "@tanstack/react-router";
// import { Editor } from "@/components/editor";
import Page from "@/app/editor-view/page";

export const Route = createFileRoute("/_layout/editor")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
