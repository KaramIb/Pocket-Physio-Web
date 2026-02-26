"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Queue",
      icon: Inbox,
      active: pathname === "/",
    },
    {
      href: "/patients",
      label: "Patients",
      icon: Users,
      active: pathname === "/patients" || pathname.startsWith("/patient/"),
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-around py-2 safe-area-inset-bottom">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
              item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5", item.active && "scale-110")} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
