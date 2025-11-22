"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-slate-100 dark:bg-slate-800" : ""}>
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("fr")} className={language === "fr" ? "bg-slate-100 dark:bg-slate-800" : ""}>
          🇫🇷 Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
