import { createFileRoute } from "@tanstack/react-router";

import { DataTable } from "@/components/data-table-forms";

export const Route = createFileRoute("/_layout/forms")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable />
        </div>
      </div>
    </div>
  );
}
