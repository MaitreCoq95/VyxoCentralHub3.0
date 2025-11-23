"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Image as ImageIcon, Trash2, Eye } from "lucide-react"

export function EvidencePanel() {
  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 border-l">
      <div className="p-4 border-b bg-white dark:bg-slate-950">
        <h2 className="font-semibold text-lg">Preuves & Documents</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Example Evidence Items */}
          <Card className="bg-white dark:bg-slate-950">
            <CardContent className="p-3 flex items-start gap-3">
              <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Photo_Atelier_01.jpg</p>
                <p className="text-xs text-muted-foreground">Il y a 2 min</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-950">
            <CardContent className="p-3 flex items-start gap-3">
              <div className="h-10 w-10 rounded bg-red-100 flex items-center justify-center text-red-600">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Procedure_Maintenance.pdf</p>
                <p className="text-xs text-muted-foreground">Il y a 15 min</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white dark:bg-slate-950">
        <div className="p-4 border-2 border-dashed rounded-lg text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <p className="text-sm text-muted-foreground">
            Glissez vos fichiers ici ou cliquez pour uploader
          </p>
        </div>
      </div>
    </div>
  )
}
