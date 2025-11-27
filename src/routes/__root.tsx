// Standard root route
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type RootRouteContext = {
  //   rqClient: QueryClient;
  authenticated: boolean;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center">
      <h1>Internal Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
  notFoundComponent: () => {
    return (
      <div className="grid min-h-screen place-items-center">
        <h1>Page Not Found</h1>
      </div>
    );
  },
});
