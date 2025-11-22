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
        title: "Missing Information",
        description: "Please fill in at least the prospect name and company.",
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
        title: "Campaign Generated",
        description: "3 variations and follow-up sequence ready!",
      })
    } catch (error: any) {
      console.error("Generation error:", error)
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Failed to generate email. Please try again.",
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
        title: "Saved to CRM",
        description: `${formData.companyName} added as a Lead with campaign details.`,
      })
    } catch (error: any) {
      console.error("CRM Save error:", error)
      toast({
        variant: "destructive",
        title: "Save Failed",
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
      title: "Copied!",
      description: "Content copied to clipboard.",
    })
  }

  const sendEmail = async (variation: EmailVariation, index: number) => {
    if (!recipientEmail) {
      toast({
        variant: "destructive",
        title: "Missing Email",
        description: "Please enter a recipient email address.",
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
        title: "Email Sent!",
        description: `Email sent to ${recipientEmail}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Send Failed",
        description: "Failed to send email. Please check your API key.",
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
            Campaign Setup
          </CardTitle>
          <CardDescription>
            Define your target and strategy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Prospect Name</Label>
            <Input 
              placeholder="John Doe" 
              value={formData.prospectName}
              onChange={(e) => setFormData({...formData, prospectName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input 
              placeholder="Acme Corp" 
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Industry</Label>
            <Input 
              placeholder="SaaS, Healthcare, etc." 
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-vyxo-gold">Trigger Event (The "Icebreaker")</Label>
            <Input 
              placeholder="e.g., Recent Series B funding, Hiring new VP Sales" 
              value={formData.triggerEvent}
              onChange={(e) => setFormData({...formData, triggerEvent: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Pain Point</Label>
            <Input 
              placeholder="e.g., High churn rate, Inefficient manual processes" 
              value={formData.painPoint}
              onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Value Proposition</Label>
            <Textarea 
              placeholder="e.g., We automate outreach to save 20h/week" 
              className="h-20 resize-none"
              value={formData.valueProp}
              onChange={(e) => setFormData({...formData, valueProp: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Call to Action</Label>
            <Input 
              placeholder="e.g., 15-min discovery call" 
              value={formData.cta}
              onChange={(e) => setFormData({...formData, cta: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Recipient Email (for sending)</Label>
            <Input 
              type="email"
              placeholder="prospect@company.com" 
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Strategy...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Campaign
                </>
              )}
            </Button>
            
            <Button 
              variant="outline"
              className="border-vyxo-gold text-vyxo-gold hover:bg-vyxo-gold/10"
              onClick={handleSaveToCRM}
              disabled={loading || !result}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Save to CRM
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Results */}
      <Card className="lg:col-span-8 h-full flex flex-col overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Generated Campaign</CardTitle>
          <CardDescription>
            {result ? result.analysis : "Your AI-generated outreach strategy will appear here."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
              <Sparkles className="h-16 w-16 mb-4" />
              <p>Fill out the form to generate your campaign</p>
            </div>
          ) : (
            <Tabs defaultValue="variations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="variations">Email Variations</TabsTrigger>
                <TabsTrigger value="sequence">Follow-up Sequence</TabsTrigger>
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
