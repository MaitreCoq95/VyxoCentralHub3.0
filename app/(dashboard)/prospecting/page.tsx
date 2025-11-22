"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailGenerator } from "@/components/prospecting/email-generator"
import { Search, Mail, Users } from "lucide-react"

export default function ProspectingPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-vyxo-navy dark:text-white">Automated Prospecting</h2>
        <p className="text-muted-foreground">Find leads and generate AI-powered outreach campaigns.</p>
      </div>

      <Tabs defaultValue="email-generator" className="flex-1">
        <TabsList className="bg-slate-100 dark:bg-slate-800">
          <TabsTrigger value="email-generator" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
            <Mail className="h-4 w-4 mr-2" /> Email Generator
          </TabsTrigger>
          <TabsTrigger value="lead-finder" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
            <Search className="h-4 w-4 mr-2" /> Lead Finder
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" /> Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email-generator" className="mt-6">
          <EmailGenerator />
        </TabsContent>

        <TabsContent value="lead-finder" className="mt-6">
          <div className="flex h-[400px] items-center justify-center border-2 border-dashed rounded-lg">
            <div className="text-center">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Lead Finder Coming Soon</h3>
              <p className="text-muted-foreground">Search for potential clients by industry and location.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <div className="flex h-[400px] items-center justify-center border-2 border-dashed rounded-lg">
            <div className="text-center">
              <Users className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Campaign Management Coming Soon</h3>
              <p className="text-muted-foreground">Track your outreach performance and follow-ups.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
