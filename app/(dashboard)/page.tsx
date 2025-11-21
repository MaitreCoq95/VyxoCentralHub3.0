"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Users, FileText, Activity, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-vyxo-navy dark:text-white">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back to your command center.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-vyxo-navy hover:bg-vyxo-navy/90 text-white">
            <FileText className="mr-2 h-4 w-4" /> New Audit
          </Button>
          <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-semibold">
            <Users className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* REVENUE CARD - LARGE (2x2 on large screens) */}
        <motion.div variants={item} className="col-span-1 md:col-span-2 row-span-2">
          <Card className="h-full border-none shadow-lg bg-gradient-to-br from-vyxo-navy to-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-vyxo-gold/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-zinc-300">Total Revenue</CardTitle>
              <div className="text-4xl font-bold text-white mt-2">€124,500.00</div>
              <p className="text-sm text-emerald-400 flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +12.5% from last month
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full flex items-end justify-between gap-2 mt-4">
                {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 100].map((h, i) => (
                  <div key={i} className="w-full bg-white/10 hover:bg-vyxo-gold/80 transition-all rounded-t-md relative group" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-vyxo-navy text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      €{h}k
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-zinc-400 mt-2">
                <span>Jan</span><span>Dec</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ACTIVE CLIENTS */}
        <motion.div variants={item} className="col-span-1">
            <Card className="h-full border-l-4 border-l-vyxo-gold shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Clients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-vyxo-navy dark:text-white">24</div>
                    <p className="text-xs text-muted-foreground mt-1">3 new this month</p>
                </CardContent>
            </Card>
        </motion.div>

        {/* PENDING AUDITS */}
        <motion.div variants={item} className="col-span-1">
            <Card className="h-full border-l-4 border-l-vyxo-navy shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Audits</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-vyxo-navy dark:text-white">7</div>
                    <p className="text-xs text-red-500 mt-1 font-medium">2 overdue</p>
                </CardContent>
            </Card>
        </motion.div>

        {/* CLIENT MAP VISUALIZATION */}
        <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2">
             <Card className="h-full shadow-md overflow-hidden flex flex-col">
                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b">
                    <CardTitle className="text-base font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-vyxo-gold" /> Client Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1 relative bg-slate-100 dark:bg-slate-950">
                    {/* Abstract Map Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <MapPin className="h-32 w-32 text-vyxo-navy" />
                    </div>
                    <div className="absolute top-1/4 left-1/4 h-3 w-3 bg-vyxo-navy rounded-full animate-ping"></div>
                    <div className="absolute top-1/4 left-1/4 h-3 w-3 bg-vyxo-navy rounded-full"></div>
                    
                    <div className="absolute top-1/2 left-1/2 h-3 w-3 bg-vyxo-gold rounded-full animate-ping delay-75"></div>
                    <div className="absolute top-1/2 left-1/2 h-3 w-3 bg-vyxo-gold rounded-full"></div>

                    <div className="absolute bottom-1/3 right-1/4 h-3 w-3 bg-vyxo-navy rounded-full animate-ping delay-150"></div>
                    <div className="absolute bottom-1/3 right-1/4 h-3 w-3 bg-vyxo-navy rounded-full"></div>
                    
                    <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Paris Region: 65%
                    </div>
                </CardContent>
            </Card>
        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2">
            <Card className="h-full shadow-md flex flex-col">
                <CardHeader>
                    <CardTitle className="text-base font-medium flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-vyxo-navy" /> Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-[300px]">
                        <div className="space-y-0">
                            {[
                                { action: "Audit Completed", target: "TechCorp SAS", time: "2h ago", type: "success" },
                                { action: "New Client", target: "GreenEnergy Ltd", time: "5h ago", type: "neutral" },
                                { action: "Invoice Sent", target: "#INV-2024-001", time: "1d ago", type: "warning" },
                                { action: "Document Uploaded", target: "ISO-9001 Cert", time: "1d ago", type: "neutral" },
                                { action: "Meeting Scheduled", target: "Kickoff", time: "2d ago", type: "neutral" },
                            ].map((act, i) => (
                                <div key={i} className="flex items-start p-4 border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <div className={`h-2 w-2 mt-2 rounded-full mr-3 ${
                                        act.type === 'success' ? 'bg-emerald-500' : 
                                        act.type === 'warning' ? 'bg-vyxo-gold' : 'bg-vyxo-navy'
                                    }`} />
                                    <div>
                                        <p className="text-sm font-medium text-vyxo-navy dark:text-white">{act.action}</p>
                                        <p className="text-xs text-muted-foreground">{act.target}</p>
                                        <p className="text-[10px] text-zinc-400 mt-1">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </motion.div>

        {/* QUICK STATS ROW */}
        <motion.div variants={item} className="col-span-1">
             <Card className="h-full bg-slate-50 dark:bg-slate-900 border-dashed border-2 flex items-center justify-center hover:border-vyxo-gold hover:bg-vyxo-gold/5 transition-all cursor-pointer group">
                <div className="text-center">
                    <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-vyxo-gold" />
                    </div>
                    <p className="text-sm font-medium mt-2 text-muted-foreground group-hover:text-vyxo-navy dark:group-hover:text-white">Draft Proposal</p>
                </div>
            </Card>
        </motion.div>
        
      </div>
    </motion.div>
  )
}
