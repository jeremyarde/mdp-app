import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "@tanstack/react-router";
import { SlashIcon } from "lucide-react";

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatBreadcrumbLabel(path: string): string {
  // Convert path segments to readable labels
  return capitalizeFirst(path.replace(/-/g, " "));
}

export function SiteHeader() {
  const location = useLocation();
  const pathname = location.pathname;

  // Split pathname into segments and filter out empty strings
  const pathSegments = pathname.split("/").filter(Boolean);

  // Generate breadcrumbs
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = formatBreadcrumbLabel(segment);
    const isLast = index === pathSegments.length - 1;

    return {
      path,
      label,
      isLast,
    };
  });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* Always show Home as the first breadcrumb */}
            {/* {pathname !== "/" && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.length > 0 && (
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </>
            )} */}
            {/* Render dynamic breadcrumbs */}
            {breadcrumbs.map((breadcrumb) => (
              <React.Fragment key={breadcrumb.path}>
                <BreadcrumbItem>
                  {breadcrumb.isLast ? (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!breadcrumb.isLast && (
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
            {/* Show "Home" as the page if we're on the root */}
            {pathname === "/" && (
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
