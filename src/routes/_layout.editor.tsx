import { createFileRoute } from "@tanstack/react-router";
// import { Editor } from "@/components/editor";
import Page from "@/app/editor-view/page";

export const Route = createFileRoute("/_layout/editor")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      formId: (search.formId as string) || undefined,
    };
  },
});

function RouteComponent() {
  const { formId } = Route.useSearch();
  return <Page formId={formId} />;
}
