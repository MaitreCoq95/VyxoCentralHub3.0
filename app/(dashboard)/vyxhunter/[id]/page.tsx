'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Linkedin, 
  MapPin, 
  Users, 
  Brain, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Mail, 
  History 
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmailPreviewDialog } from '@/components/vyxhunter/email-preview-dialog'
import { GammaCustomizationDialog, type GammaGenerationOptions } from '@/components/vyxhunter/gamma-customization-dialog'

export default function CompanyPage() {
  const { id: companyId } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [generatingGamma, setGeneratingGamma] = useState(false)
  const [generatingEmail, setGeneratingEmail] = useState(false)
  
  // Email Preview State
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<any>(null)

  // New state for email customization
  const [contactName, setContactName] = useState('')
  const [emailStyle, setEmailStyle] = useState<'short' | 'structured'>('structured')
  
  // Gamma customization state
  const [isGammaDialogOpen, setIsGammaDialogOpen] = useState(false)

  useEffect(() => {
    fetchCompany()
  }, [companyId])

  async function fetchCompany() {
    try {
      if (!companyId) return

      const res = await fetch(`/api/vyxhunter/companies/${companyId}`)
      
      if (!res.ok) {
        throw new Error('Failed to fetch company')
      }

      const data = await res.json()
      
      if (!data.company) {
        throw new Error('Company not found')
      }

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
      toast({ title: "🔍 Analyse en cours...", description: "L'IA étudie l'entreprise" })
      
      const res = await fetch(`/api/vyxhunter/companies/${companyId}/analyze`, {
        method: 'POST'
      })
      
      if (!res.ok) throw new Error('Analysis failed')
      
      toast({ title: "✅ Analyse terminée !", description: "Les données ont été mises à jour" })
      fetchCompany()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message })
    } finally {
      setAnalyzing(false)
    }
  }

  // Poll for Gamma status if generating
  useEffect(() => {
    if (!company) return
    
    let interval: NodeJS.Timeout
    const latestGamma = company.gammaSlides?.[0]

    if (latestGamma?.status === 'generating' || generatingGamma) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/vyxhunter/companies/${companyId}/gamma/status`)
          if (res.ok) {
            const data = await res.json()
            if (data.status === 'ready') {
              toast({ title: "✅ Slide prête !", description: "La présentation est disponible" })
              fetchCompany() // Refresh to show the link
              setGeneratingGamma(false)
              clearInterval(interval)
            } else if (data.status === 'failed') {
              toast({ variant: "destructive", title: "Erreur", description: "La génération a échoué" })
              fetchCompany()
              setGeneratingGamma(false)
              clearInterval(interval)
            }
          }
        } catch (e) {
          console.error("Polling error", e)
        }
      }, 3000) // Check every 3 seconds
    }

    return () => clearInterval(interval)
  }, [companyId, company, generatingGamma, toast, fetchCompany])

  // Open customization dialog
  function handleGenerateGamma() {
    setIsGammaDialogOpen(true)
  }

  // Generate with custom options from dialog
  async function handleGenerateWithOptions(options: GammaGenerationOptions) {
    try {
      setGeneratingGamma(true)
      toast({ title: "✨ Génération Gamma...", description: "Création de la slide de présentation" })

      const res = await fetch(`/api/vyxhunter/companies/${companyId}/gamma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      })

      if (!res.ok) throw new Error('Gamma generation failed')

      toast({ title: "⏳ Génération lancée", description: "Veuillez patienter quelques instants..." })
      fetchCompany() // Will show "generating" status and trigger polling
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message })
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

  function openEmailPreview(email: any) {
    // Find Gamma URL if available
    const gammaUrl = company.gammaSlides?.[0]?.gamma_url

    setSelectedEmail({
      id: email.id,
      subject: email.subject,
      body: email.body_text || email.body_html || '', // Use body_text or body_html
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
                  <div className="flex items-center gap-2">
                    <Badge variant={latestGamma.status === 'ready' ? 'default' : latestGamma.status === 'failed' ? 'destructive' : 'secondary'}>
                      {latestGamma.status}
                    </Badge>
                    {latestGamma.status === 'failed' && latestGamma.error_message && (
                      <span className="text-xs text-red-500 font-mono bg-red-50 px-2 py-1 rounded">
                        {latestGamma.error_message}
                      </span>
                    )}
                  </div>
                  {latestGamma.gamma_url && latestGamma.status === 'ready' && (
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
              <ScrollArea className="h-[300px] pr-4">
                {emails.length > 0 ? (
                  <div className="space-y-3">
                    {emails.map((email: any) => (
                      <div 
                        key={email.id} 
                        className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => openEmailPreview(email)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={email.status === 'sent' ? 'default' : 'secondary'}>
                            {email.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(email.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm mb-1 truncate">{email.subject}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {email.body_text || "Pas de contenu"}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>Ouvertures: {email.open_count}</span>
                          <span>Clics: {email.click_count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Aucun email généré</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* INTERACTIONS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <History className="h-4 w-4" />
                Historique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                {company.interactions && company.interactions.length > 0 ? (
                  <div className="space-y-4">
                    {company.interactions.map((interaction: any) => (
                      <div key={interaction.id} className="flex gap-3 text-sm">
                        <div className="min-w-[80px] text-xs text-muted-foreground pt-0.5">
                          {new Date(interaction.created_at).toLocaleDateString()}
                        </div>
                        <div>
                          <p className="font-medium">{interaction.type}</p>
                          {interaction.details && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {JSON.stringify(interaction.details)}
                            </p>
                          )}
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

      {/* GAMMA CUSTOMIZATION DIALOG */}
      <GammaCustomizationDialog
        open={isGammaDialogOpen}
        onOpenChange={setIsGammaDialogOpen}
        companyId={companyId as string}
        companyName={company?.name || ''}
        onGenerate={handleGenerateWithOptions}
      />
    </div>
  )
}
