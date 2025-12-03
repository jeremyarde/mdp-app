import { IconChartBar, IconFolder } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export function NavMain() {
  const items = [
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: IconDashboard,
    // },
    {
      title: "Editor",
      url: "/editor",
      icon: IconChartBar,
    },
    {
      title: "Forms",
      url: "/forms",
      icon: IconFolder,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
