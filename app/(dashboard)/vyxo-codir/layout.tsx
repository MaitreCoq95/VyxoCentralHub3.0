"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  FolderKanban,
  Map,
  TrendingUp,
  FileCode
} from "lucide-react";

export default function VyxoCodirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/vyxo-codir",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Membres",
      href: "/vyxo-codir/membres",
      icon: Users,
    },
    {
      name: "Réunions",
      href: "/vyxo-codir/reunions",
      icon: Calendar,
    },
    {
      name: "Décisions",
      href: "/vyxo-codir/decisions",
      icon: FileText,
    },
    {
      name: "Projets",
      href: "/vyxo-codir/projets",
      icon: FolderKanban,
    },
    {
      name: "Roadmap",
      href: "/vyxo-codir/roadmap",
      icon: Map,
    },
    {
      name: "KPIs",
      href: "/vyxo-codir/kpis",
      icon: TrendingUp,
    },
    {
      name: "Templates",
      href: "/vyxo-codir/templates",
      icon: FileCode,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header with navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 mr-6">
            <Building2 className="h-6 w-6 text-[hsl(var(--vyxo-navy))] dark:text-[hsl(var(--vyxo-gold))]" />
            <span className="font-bold text-lg">Vyxo CODIR</span>
          </div>

          <nav className="flex items-center space-x-1 overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
