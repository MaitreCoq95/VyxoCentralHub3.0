"use client"

import { useState } from "react"
import { motion, Reorder } from "framer-motion"
import { MoreHorizontal, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Dummy data type
type Lead = {
  id: string
  name: string
  value: string
  company: string
}

const initialColumns = {
  new: [
    { id: "1", name: "John Doe", value: "€15k", company: "Acme Corp" },
    { id: "2", name: "Jane Smith", value: "€8k", company: "StartUp Inc" },
  ],
  contacted: [
    { id: "3", name: "Bob Johnson", value: "€25k", company: "BigTech SA" },
  ],
  proposal: [
    { id: "4", name: "Alice Brown", value: "€40k", company: "Global Ltd" },
  ],
  negotiation: [],
  closed: [],
}

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns)

  return (
    <div className="flex h-full gap-6 overflow-x-auto pb-4">
      {Object.entries(columns).map(([columnId, items]) => (
        <div key={columnId} className="w-[300px] min-w-[300px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {columnId}
            </h3>
            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">
              {items.length}
            </Badge>
          </div>
          
          <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl p-2 border border-dashed border-slate-200 dark:border-slate-800">
            <Reorder.Group 
                axis="y" 
                values={items} 
                onReorder={(newItems) => setColumns({ ...columns, [columnId]: newItems })}
                className="space-y-3"
            >
              {items.map((item) => (
                <Reorder.Item key={item.id} value={item}>
                  <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-xs border-vyxo-gold/50 text-vyxo-gold bg-vyxo-gold/5">
                          {item.value}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <h4 className="font-semibold text-sm">{item.company}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{item.name}</p>
                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-vyxo-navy text-white">
                                {item.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-[10px] text-zinc-400">2 days ago</div>
                      </div>
                    </CardContent>
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            
            <Button variant="ghost" className="w-full mt-2 text-zinc-400 hover:text-vyxo-navy hover:bg-white border border-transparent hover:border-dashed hover:border-slate-300">
                <Plus className="h-4 w-4 mr-2" /> Add Lead
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
