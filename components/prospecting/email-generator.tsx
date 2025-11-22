"use client"

import { useState } from "react"
import { Loader2, Sparkles, Copy, Check, RefreshCw, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"

interface EmailVariation {
  type: string
  subject: string
  body: string
}

interface SequenceStep {
  step: string
  subject: string
  body: string
}

interface AIResponse {
  analysis: string
  variations: EmailVariation[]
  sequence: SequenceStep[]
}

export function EmailGenerator() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)
  const [copied, setCopied] = useState(false)
  const [sendingEmail, setSendingEmail] = useState<number | null>(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    prospectName: "",
    companyName: "",
    industry: "",
    triggerEvent: "",
    painPoint: "",
    valueProp: "",
    cta: "15-minute discovery call",
  })

  const handleGenerate = async () => {
    if (!formData.prospectName || !formData.companyName) {
      toast({
        variant: "destructive",
        title: t("email.missingInfo"),
        description: t("email.missingInfoDesc"),
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/ai/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate")
      }

      const data = await response.json()
      setResult(data)
      toast({
        title: t("email.campaignGenerated"),
        description: t("email.campaignGeneratedDesc"),
      })
    } catch (error: any) {
      console.error("Generation error:", error)
      toast({
        variant: "destructive",
        title: t("email.generationFailed"),
        description: error.message || t("email.generationFailedDesc"),
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveToCRM = async () => {
    if (!result) return
    setLoading(true)

    try {
      // 1. Create Client (Lead)
      const clientRes = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.companyName,
          contact_email: '', // We don't have email in form yet, maybe add it?
          status: 'lead',
          notes: `Prospect: ${formData.prospectName}\nIndustry: ${formData.industry}\nPain Point: ${formData.painPoint}`
        })
      })

      if (!clientRes.ok) throw new Error('Failed to create client')
      const client = await clientRes.json()

      // 2. Log Activity (Campaign Generated)
      const activityRes = await fetch('/api/crm/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: 'client',
          entity_id: client.id,
          action: 'campaign_generated',
          description: `Generated outreach campaign for ${formData.prospectName}`,
          metadata: result
        })
      })

      if (!activityRes.ok) throw new Error('Failed to log activity')

      toast({
        title: t("email.savedToCrm"),
        description: `${formData.companyName} ${t("email.savedToCrmDesc")}`,
      })
    } catch (error: any) {
      console.error("CRM Save error:", error)
      toast({
        variant: "destructive",
        title: t("email.saveFailed"),
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: t("email.copied"),
      description: t("email.copiedDesc"),
    })
  }

  const sendEmail = async (variation: EmailVariation, index: number) => {
    if (!recipientEmail) {
      toast({
        variant: "destructive",
        title: t("email.missingEmail"),
        description: t("email.missingEmailDesc"),
      })
      return
    }

    try {
      setSendingEmail(index)
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject: variation.subject,
          html: `<p>${variation.body.replace(/\n/g, '<br>')}</p>`,
          text: variation.body
        })
      })

      if (!response.ok) throw new Error('Failed to send email')

      toast({
        title: t("email.emailSent"),
        description: `${t("email.emailSentDesc")} ${recipientEmail}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("email.sendFailed"),
        description: t("email.sendFailedDesc"),
      })
    } finally {
      setSendingEmail(null)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12 h-[calc(100vh-200px)]">
      {/* Left Column: Inputs */}
      <Card className="lg:col-span-4 h-full overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-vyxo-gold" />
            {t("email.campaignSetup")}
          </CardTitle>
          <CardDescription>
            {t("email.defineStrategy")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("email.prospectName")}</Label>
            <Input 
              placeholder={t("email.prospectNamePlaceholder")} 
              value={formData.prospectName}
              onChange={(e) => setFormData({...formData, prospectName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("email.companyName")}</Label>
            <Input 
              placeholder={t("email.companyNamePlaceholder")} 
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("email.industry")}</Label>
            <Input 
              placeholder={t("email.industryPlaceholder")} 
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-vyxo-gold">{t("email.triggerEvent")}</Label>
            <Input 
              placeholder={t("email.triggerEventPlaceholder")} 
              value={formData.triggerEvent}
              onChange={(e) => setFormData({...formData, triggerEvent: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("email.painPoint")}</Label>
            <Input 
              placeholder={t("email.painPointPlaceholder")} 
              value={formData.painPoint}
              onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("email.valueProp")}</Label>
            <Textarea 
              placeholder={t("email.valuePropPlaceholder")} 
              className="h-20 resize-none"
              value={formData.valueProp}
              onChange={(e) => setFormData({...formData, valueProp: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("email.cta")}</Label>
            <Input 
              placeholder={t("email.ctaPlaceholder")} 
              value={formData.cta}
              onChange={(e) => setFormData({...formData, cta: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("email.recipientEmail")}</Label>
            <Input 
              type="email"
              placeholder={t("email.recipientEmailPlaceholder")} 
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              className="flex-1 bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 font-semibold"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("email.generating")}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> {t("email.generateCampaign")}
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              className="border-vyxo-gold text-vyxo-gold hover:bg-vyxo-gold/10"
              onClick={handleSaveToCRM}
              disabled={loading || !result}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> {t("email.saveToCrm")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Results */}
      <Card className="lg:col-span-8 h-full flex flex-col overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>{t("email.generatedCampaign")}</CardTitle>
          <CardDescription>
            {result ? result.analysis : t("email.strategyAppear")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
              <Sparkles className="h-16 w-16 mb-4" />
              <p>{t("email.fillForm")}</p>
            </div>
          ) : (
            <Tabs defaultValue="variations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="variations">{t("email.emailVariations")}</TabsTrigger>
                <TabsTrigger value="sequence">{t("email.followUpSequence")}</TabsTrigger>
              </TabsList>

              <TabsContent value="variations" className="space-y-6">
                {result.variations.map((variation, index) => (
                  <Card key={index} className="border-l-4 border-l-vyxo-gold">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-vyxo-navy dark:text-white">{variation.type}</CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => sendEmail(variation, index)}
                            disabled={sendingEmail !== null || !recipientEmail}
                          >
                            {sendingEmail === index ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Mail className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`Subject: ${variation.subject}\n\n${variation.body}`)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription className="font-mono text-xs">Subject: {variation.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {variation.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sequence" className="space-y-6">
                {result.sequence.map((step, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-vyxo-navy dark:text-white">{step.step}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`Subject: ${step.subject}\n\n${step.body}`)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="font-mono text-xs">Subject: {step.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {step.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
