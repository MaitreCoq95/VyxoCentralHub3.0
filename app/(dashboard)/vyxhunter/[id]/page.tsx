
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, Building2, Globe, Linkedin, MapPin, Users, 
  Brain, Sparkles, Mail, Send, Loader2, ExternalLink,
  FileText, TrendingUp, Clock, CheckCircle2, XCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { EmailPreviewDialog } from "@/components/vyxhunter/email-preview-dialog"

export default function CompanyDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const companyId = params.id as string

  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [generatingGamma, setGeneratingGamma] = useState(false)
  const [generatingEmail, setGeneratingEmail] = useState(false)
  
  // New state for email preview
  const [selectedEmail, setSelectedEmail] = useState<{
    id: string
    subject: string
    body: string
    gammaUrl?: string
  } | null>(null)
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false)

  useEffect(() => {
    fetchCompany()
  }, [companyId])

  async function fetchCompany() {
    try {
      const res = await fetch(`/api/vyxhunter/companies/${companyId}`)
      if (!res.ok) throw new Error('Failed to fetch company')
      
      const data = await res.json()
      setCompany(data.company)
    } catch (error) {
      console.error('Error fetching company:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger l'entreprise"
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleAnalyze() {
    try {
      setAnalyzing(true)
      toast({ title: "🤖 Analyse en cours...", description: "L'IA analyse cette entreprise" })

      const res = await fetch(`/api/vyxhunter/companies/${companyId}/analyze`, {
        method: 'POST'
      })

      if (!res.ok) throw new Error('Analysis failed')

      const data = await res.json()
      toast({
        title: "✅ Analyse terminée !",
        description: `Score de pertinence : ${data.analysis.relevance_score}/100`
      })

      fetchCompany()
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Échec de l'analyse" })
    } finally {
      setAnalyzing(false)
    }
  }

  async function handleGenerateGamma() {
    try {
      setGeneratingGamma(true)
      toast({ title: "📊 Génération Gamma...", description: "Création de la présentation" })

      const res = await fetch(`/api/vyxhunter/companies/${companyId}/gamma`, {
        method: 'POST'
      })

      if (!res.ok) throw new Error('Gamma generation failed')

      toast({ title: "✅ Gamma généré !", description: "Présentation prête" })
      fetchCompany()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message })
    } finally {
      setGeneratingGamma(false)
    }
  }

  // New state for email customization
  const [contactName, setContactName] = useState('')
  const [emailStyle, setEmailStyle] = useState<'short' | 'structured'>('structured')

  // ... (existing code)

  async function handleGenerateEmail() {
    try {
      setGeneratingEmail(true)
      toast({ title: "✉️ Génération email...", description: "L'IA rédige l'email" })

      const res = await fetch(`/api/vyxhunter/companies/${companyId}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: 'contact@example.com', // Placeholder, will be editable
          recipientName: contactName || company?.name,
          contactName: contactName,
          emailType: 'initial',
          emailStyle: emailStyle
        })
      })

      if (!res.ok) throw new Error('Email generation failed')

      toast({ title: "✅ Email généré !", description: "Brouillon créé" })
      fetchCompany()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message })
    } finally {
      setGeneratingEmail(false)
    }
  }

  // ... (existing code)

          {/* EMAILS */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4" />
                  Emails ({emails.length})
                </CardTitle>
              </div>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Nom du contact</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Jean Dupont"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Style</label>
                    <select 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={emailStyle}
                      onChange={(e) => setEmailStyle(e.target.value as 'short' | 'structured')}
                    >
                      <option value="structured">Structuré</option>
                      <option value="short">Court</option>
                    </select>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  variant="outline"
                  onClick={handleGenerateEmail}
                  disabled={generatingEmail || !latestAnalysis}
                >
                  {generatingEmail ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Générer un brouillon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {emails.length > 0 ? (
                  <div className="space-y-3">
                    {emails.map((email: any) => (
                      <div key={email.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={email.status === 'sent' ? 'default' : 'outline'}>
                            {email.email_type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {email.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium line-clamp-1">{email.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {email.sent_at ? new Date(email.sent_at).toLocaleDateString('fr-FR') : 'Brouillon'}
                        </p>
                        {email.status === 'draft' && (
                          <Button 
                            size="sm" 
                            className="w-full mt-2" 
                            variant="outline"
                            onClick={() => openEmailPreview(email)}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Aperçu & Envoyer
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">Aucun email</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* INTERACTIONS TIMELINE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                {company.interactions?.length > 0 ? (
                  <div className="space-y-3">
                    {company.interactions.map((interaction: any) => (
                      <div key={interaction.id} className="flex items-start gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-vyxo-navy mt-1.5" />
                        <div>
                          <p className="font-medium">{interaction.type.replace('_', ' ')}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(interaction.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Aucune interaction</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* EMAIL PREVIEW DIALOG */}
      <EmailPreviewDialog 
        open={isEmailPreviewOpen}
        onOpenChange={setIsEmailPreviewOpen}
        email={selectedEmail}
        onSend={handleSendEmail}
      />
    </div>
  )
}
