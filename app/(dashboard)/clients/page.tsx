"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, LayoutGrid, List as ListIcon, Kanban, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientCard } from "@/components/crm/client-card"
import { KanbanBoard } from "@/components/crm/kanban-board"
import { useLanguage } from "@/components/language-provider"
import { type Client } from "@/lib/supabase"

export default function ClientsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch('/api/crm/clients')
        if (!response.ok) throw new Error('Failed to fetch clients')
        const data = await response.json()
        setClients(data.clients || [])
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-vyxo-navy dark:text-white">{t("crm.title")}</h2>
          <p className="text-muted-foreground">{t("crm.subtitle")}</p>
        </div>
        <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-semibold">
          <Plus className="mr-2 h-4 w-4" /> {t("crm.addClient")}
        </Button>
      </div>

      <Tabs defaultValue="list" className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                <LayoutGrid className="h-4 w-4 mr-2" /> {t("crm.list")}
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
                <Kanban className="h-4 w-4 mr-2" /> {t("crm.pipeline")}
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("crm.search")}
                className="pl-9 w-[250px] bg-white dark:bg-slate-900"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="flex-1 mt-0">
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-vyxo-gold" />
            </div>
          ) : clients.length === 0 ? (
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              No clients found. Add your first client to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {clients.map((client) => (
                <ClientCard 
                  key={client.id} 
                  client={{
                    id: client.id,
                    name: client.name,
                    sector: client.sector || 'Unknown',
                    status: client.status,
                    logo: client.logo_url,
                    city: client.city,
                    contactName: client.contact_email // Using email as contact for now
                  }} 
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pipeline" className="flex-1 mt-0 h-full min-h-[500px]">
          <KanbanBoard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
