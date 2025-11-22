"use client"

import { useState } from "react"
import { MoreHorizontal, MapPin, Building2, Phone, Mail, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditClientDialog } from "@/components/crm/edit-client-dialog"
import { useToast } from "@/components/ui/use-toast"

interface ClientCardProps {
  client: {
    archived: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this client?")) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/crm/clients/${client.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete client")

      toast({
        title: "Success",
        description: "Client deleted successfully",
      })

      onRefresh?.()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete client",
      })
    } finally {
      setIsDeleting(false)
    }
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg leading-none tracking-tight group-hover:text-vyxo-navy dark:group-hover:text-vyxo-gold transition-colors">
                {client.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <Building2 className="h-3 w-3 mr-1" /> {client.sector}
              </p>
            </div>
              <MapPin className="h-3 w-3 mr-1" /> {client.city || "Paris, FR"}
          </div>
          <Badge variant="secondary" className={statusColors[client.status]}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
    </>
  )
}
