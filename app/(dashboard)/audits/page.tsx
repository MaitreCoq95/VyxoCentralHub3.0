"use client"

import { useState, useEffect } from "react"
import { Plus, FileText, Download, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DynamicForm, FormSchema } from "@/components/audit/dynamic-form"
import { AuditPDF } from "@/components/audit/pdf-document"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useLanguage } from "@/components/language-provider"

// Dummy Audit Schema
const iso9001Schema: FormSchema = {
  title: "ISO 9001:2015 Internal Audit",
  sections: [
    {
      id: "context",
      title: "Context of the Organization",
      description: "Understanding the organization and its context (Clause 4)",
      fields: [
        { id: "q1", type: "radio", label: "Has the organization determined external and internal issues?", options: [{label: "Yes", value: "yes"}, {label: "No", value: "no"}, {label: "Partial", value: "partial"}] },
        { id: "q2", type: "textarea", label: "Observations / Evidence" },
        { id: "q3", type: "rating", label: "Compliance Score (1-5)" }
      ]
    },
    {
      id: "leadership",
      title: "Leadership",
      description: "Leadership and commitment (Clause 5)",
      fields: [
        { id: "q4", type: "radio", label: "Is the quality policy established and communicated?", options: [{label: "Yes", value: "yes"}, {label: "No", value: "no"}] },
        { id: "q5", type: "textarea", label: "Observations / Evidence" }
      ]
    }
  ]
}

// Dummy Data
const recentAudits = [
  { id: "1", client: "TechCorp SAS", template: "ISO 9001", date: "2024-05-15", status: "completed", score: 92, auditor: "Jean Dupont" },
  { id: "2", client: "GreenEnergy Ltd", template: "ISO 14001", date: "2024-05-10", status: "in_progress", score: 0, auditor: "Marie Curie" },
  { id: "3", client: "BuildIt Now", template: "Safety Audit", date: "2024-05-01", status: "review", score: 78, auditor: "Jean Dupont" },
]

export default function AuditsPage() {
  const [isClient, setIsClient] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFormSubmit = (data: any) => {
    console.log("Audit Submitted:", data)
    setOpen(false)
    // Here we would save to Supabase
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-vyxo-navy dark:text-white">{t("audit.title")}</h2>
          <p className="text-muted-foreground">{t("audit.subtitle")}</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-vyxo-navy hover:bg-vyxo-navy/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> {t("audit.new")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("audit.start")}</DialogTitle>
              <DialogDescription>{t("audit.selectTemplate")}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <DynamicForm schema={iso9001Schema} onSubmit={handleFormSubmit} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentAudits.map((audit) => (
          <Card key={audit.id} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="mb-2">{audit.template}</Badge>
                {audit.status === "completed" && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                {audit.status === "in_progress" && <Clock className="h-5 w-5 text-vyxo-gold" />}
                {audit.status === "review" && <AlertTriangle className="h-5 w-5 text-orange-500" />}
              </div>
              <CardTitle className="text-lg">{audit.client}</CardTitle>
              <CardDescription>{audit.date} • {audit.auditor}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm font-medium">
                  {t("audit.score")}: <span className={audit.score >= 80 ? "text-emerald-600" : "text-orange-600"}>{audit.score > 0 ? `${audit.score}%` : "N/A"}</span>
                </div>
                {audit.status === "completed" && isClient && (
                  <PDFDownloadLink
                    document={
                        <AuditPDF data={{
                            clientName: audit.client,
                            auditDate: audit.date,
                            auditorName: audit.auditor,
                            score: audit.score,
                            findings: [
                                { id: "1", question: "Context Issues Identified?", answer: "Yes, fully documented." },
                                { id: "2", question: "Leadership Commitment?", answer: "Evidence of management review found." }
                            ]
                        }} />
                    }
                    fileName={`audit-${audit.client}-${audit.date}.pdf`}
                  >
                    {/* @ts-ignore - PDFDownloadLink children type mismatch in some versions */}
                    {({ blob, url, loading, error }) => (
                      <Button variant="outline" size="sm" disabled={loading}>
                        <Download className="mr-2 h-4 w-4" />
                        {loading ? t("audit.generating") : t("audit.download")}
                      </Button>
                    )}
                  </PDFDownloadLink>
                )}
                {audit.status !== "completed" && (
                    <Button variant="secondary" size="sm">
                        {t("audit.continue")}
                    </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
