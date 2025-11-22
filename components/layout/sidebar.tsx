interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

    },
    {
      label: t("nav.documents"),
      icon: FolderOpen,
      href: "/documents",
      color: "text-emerald-500",
    },
    {
      label: t("nav.settings"),
      icon: Settings,
      href: "/settings",
      color: "text-zinc-400",
    },
  ]

  return (
    <div className={cn("pb-12 min-h-screen bg-vyxo-navy", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center pl-3 mb-14">
            <div className="relative w-8 h-8 mr-4">
              <div className="absolute inset-0 bg-vyxo-gold rounded-lg transform rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center text-vyxo-navy font-bold text-lg">V</div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wider">
              VYXO<span className="text-vyxo-gold">.CH</span>
            </h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href 
                    ? "text-white bg-white/10 border-r-4 border-vyxo-gold" 
                    : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2 mt-auto absolute bottom-0 w-full">
            <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-red-500 hover:bg-red-500/10">
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export function MobileSidebar() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-vyxo-navy border-r-vyxo-gold/20 w-72 text-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}
