"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Nodebase"
            asChild
            className="gap-x-4 h-10 px-4"
          >
            <Link href="/" className="flex self-center gap-3 mt-14" prefetch>
              <Image src="/logo.svg" alt="nodebase" width={30} height={30} />
              <span className="font-semibold text-xl">Nodebase</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title} className="p-1">
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={pathname === item.url}
                  asChild
                  className="gap-x-4 h-10 px-4"
                >
                  <Link href={item.url} prefetch>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton
            tooltip="Upgrade to pro"
            className="gap-x-4 h-10 px-4"
          >
            <StarIcon className="h-4 w-4" />
            <span> Upgrade to Pro</span>
          </SidebarMenuButton>
          <SidebarMenuButton tooltip="Billing Portal" className="gap-x-4 h-10 px-4">
            <CreditCardIcon className="h-4 w-4" />
            <span> Billing Portal</span>
          </SidebarMenuButton>
          <SidebarMenuButton
            tooltip="Sign out"
            className="gap-x-4 h-10 px-4"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login");
                  },
                },
              });
            }}
          >
            <LogOutIcon className="h-4 w-4" />
            <span> Sign out </span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
