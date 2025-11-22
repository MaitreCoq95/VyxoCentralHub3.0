"use client"

import { useState, useEffect } from "react"
import { motion, Reorder } from "framer-motion"
import { MoreHorizontal, Plus, Loader2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type Engagement } from "@/lib/supabase"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

// Map Supabase statuses to Kanban columns
const statusToColumn: Record<string, string> = {
  'draft': 'proposal',
  'active': 'negotiation',
  'completed': 'closed',
  'paused': 'contacted',
  'cancelled': 'new'
}

// Reverse map for updating Supabase
const columnToStatus: Record<string, string> = {
  'proposal': 'draft',
  'negotiation': 'active',
  'closed': 'completed',
  'contacted': 'paused',
  'new': 'cancelled'
}

type KanbanItem = Engagement & {
  client_name: string
}

export function KanbanBoard() {
  const [columns, setColumns] = useState<Record<string, KanbanItem[]>>({
    new: [],
    contacted: [],
    proposal: [],
    negotiation: [],
    closed: []
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  async function fetchPipeline() {
    try {
      const response = await fetch('/api/crm/pipeline')
      if (!response.ok) throw new Error('Failed to fetch pipeline')
      const data = await response.json()
      
      const engagements = data.engagements || []
      
      // Group by status
      const newColumns: Record<string, KanbanItem[]> = {
        new: [],
        contacted: [],
        proposal: [],
        negotiation: [],
        closed: []
      }

      engagements.forEach((eng: any) => {
        const columnKey = statusToColumn[eng.status] || 'new'
        if (newColumns[columnKey]) {
          newColumns[columnKey].push({
            ...eng,
            client_name: eng.vch_clients?.name || 'Unknown Client'
          })
        }
      })

      setColumns(newColumns)
    } catch (error) {
      console.error('Error fetching pipeline:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPipeline()
  }, [])

  async function handleMoveCard(engagementId: string, targetColumn: string) {
    const newStatus = columnToStatus[targetColumn]
    if (!newStatus) return

    // Optimistic update
    const newColumns = { ...columns }
    let movedItem: KanbanItem | undefined

    // Find and remove item from old column
    Object.keys(newColumns).forEach(col => {
      const index = newColumns[col].findIndex(item => item.id === engagementId)
      if (index !== -1) {
        movedItem = newColumns[col][index]
        newColumns[col].splice(index, 1)
      }
    })

    if (movedItem) {
      // Add to new column
      newColumns[targetColumn].push({ ...movedItem, status: newStatus as any }) // Update local status
      setColumns(newColumns)

      try {
        const response = await fetch(`/api/crm/pipeline/${engagementId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        })

        if (!response.ok) throw new Error('Failed to update status')

        toast({
          title: "Status Updated",
          description: `Moved to ${targetColumn.charAt(0).toUpperCase() + targetColumn.slice(1)}`,
        })
      } catch (error) {
        console.error('Failed to update status:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save changes. Reverting...",
        })
        fetchPipeline() // Revert on error
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-vyxo-gold" />
      </div>
    )
  }

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
            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs border-vyxo-gold/50 text-vyxo-gold bg-vyxo-gold/5">
                        €{item.budget_amount?.toLocaleString() || '0'}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Move to...</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuRadioGroup value={columnId} onValueChange={(val) => handleMoveCard(item.id, val)}>
                                {Object.keys(columns).map((col) => (
                                  <DropdownMenuRadioItem key={col} value={col} className="capitalize">
                                    {col}
                                  </DropdownMenuRadioItem>
                                ))}
                              </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h4 className="font-semibold text-sm">{item.client_name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{item.name}</p>
                    <div className="flex items-center justify-between">
                      <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-vyxo-navy text-white">
                              {item.client_name.charAt(0)}
                          </AvatarFallback>
                      </Avatar>
                      <div className="text-[10px] text-zinc-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-2 text-zinc-400 hover:text-vyxo-navy hover:bg-white border border-transparent hover:border-dashed hover:border-slate-300">
                <Plus className="h-4 w-4 mr-2" /> Add Deal
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
