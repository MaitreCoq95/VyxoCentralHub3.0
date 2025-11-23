"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ArrowLeft, Building2, Globe, Linkedin, MapPin, Users, 
  Brain, Sparkles, Mail, Send, Loader2, ExternalLink,
  FileText, TrendingUp, Clock, CheckCircle2, XCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

  async function handleGenerateEmail() {
    try {
      setGeneratingEmail(true)
      toast({ title: "✉️ Génération email...", description: "L'IA rédige l'email" })

      const res = await fetch(`/api/vyxhunter/companies/${companyId}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: 'contact@example.com',
          recipientName: company?.name,
          emailType: 'initial'
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

  function openEmailPreview(email: any) {
    // Find Gamma URL if available
    const gammaUrl = company.gammaSlides?.[0]?.gamma_url

    setSelectedEmail({
      id: email.id,
      subject: email.subject,
      body: email.body,
      gammaUrl
    })
    setIsEmailPreviewOpen(true)
  }

  async function handleSendEmail(id: string, subject: string, body: string) {
    try {
      // Send the email with updated content
      const res = await fetch(`/api/vyxhunter/emails/${id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body })
      })

      if (!res.ok) throw new Error('Failed to send email')

      toast({
        title: "Email envoyé !",
        description: "Le prospect a été contacté."
      })
      
      fetchCompany()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer l'email."
      })
      throw error
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-vyxo-navy" />
      </div>
    )
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Entreprise non trouvée</p>
        <Button onClick={() => router.push('/vyxhunter')} className="mt-4">
          Retour
        </Button>
      </div>
    )
  }

  const latestAnalysis = company.analyses?.[0]
  const latestGamma = company.gammaSlides?.[0]
  const emails = company.emails || []

  return (
    <div className="space-y-6 pb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/vyxhunter')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-vyxo-navy dark:text-white">{company.name}</h2>
            <p className="text-muted-foreground">{company.sector} • {company.location}</p>
          </div>
        </div>
        <Badge variant={company.status === 'qualified' ? 'default' : 'outline'} className="text-lg px-4 py-2">
          {company.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - Company Info & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* COMPANY INFO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informations Entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {company.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {company.website}
                  </a>
                </div>
              )}
              {company.linkedin_url && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{company.size_range} employés</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{company.location}</span>
              </div>
              {company.description && (
                <p className="text-sm text-muted-foreground mt-4">{company.description}</p>
              )}
            </CardContent>
          </Card>

          {/* AI ANALYSIS */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Analyse IA
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                >
                  {analyzing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  {latestAnalysis ? 'Re-analyser' : 'Analyser'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {latestAnalysis ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Score de Pertinence</span>
                      <Badge variant="secondary" className="text-lg">
                        {latestAnalysis.relevance_score}/100
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${latestAnalysis.relevance_score}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Résumé Business</h4>
                    <p className="text-sm text-muted-foreground">{latestAnalysis.business_summary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Points de Douleur</h4>
                    <ul className="space-y-1">
                      {latestAnalysis.pains?.map((pain: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Opportunités</h4>
                    <ul className="space-y-1">
                      {latestAnalysis.opportunities?.map((opp: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Angle d'Entrée</h4>
                    <p className="text-sm text-muted-foreground italic">{latestAnalysis.entry_angle}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Quick Wins</h4>
                    <ul className="space-y-1">
                      {latestAnalysis.quick_wins?.map((win: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune analyse disponible</p>
                  <p className="text-sm mt-1">Cliquez sur "Analyser" pour démarrer</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Gamma & Emails */}
        <div className="space-y-6">
          {/* GAMMA SLIDE */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  Gamma Slide
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleGenerateGamma}
                  disabled={generatingGamma || !latestAnalysis}
                >
                  {generatingGamma ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {latestGamma ? (
                <div className="space-y-3">
                  <Badge variant={latestGamma.status === 'ready' ? 'default' : 'secondary'}>
                    {latestGamma.status}
                  </Badge>
                  {latestGamma.gamma_url && (
                    <a 
                      href={latestGamma.gamma_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Voir la présentation
                    </a>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Vues : {latestGamma.views_count || 0}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune présentation générée</p>
              )}
            </CardContent>
          </Card>

          {/* EMAILS */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4" />
                  Emails ({emails.length})
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleGenerateEmail}
                  disabled={generatingEmail || !latestAnalysis}
                >
                  {generatingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
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
