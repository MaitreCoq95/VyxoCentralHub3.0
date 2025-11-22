"use client"

import { useState } from "react"
import { Loader2, Sparkles, Copy, Check } from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"

export function EmailGenerator() {
  const [loading, setLoading] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    prospectName: "",
    companyName: "",
    industry: "",
    tone: "professional",
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
      setGeneratedEmail(data.text)
      toast({
        title: "Email Generated",
        description: "Your cold email is ready!",
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Email copied to clipboard.",
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-vyxo-gold" />
            Prospect Details
          </CardTitle>
          <CardDescription>
            Enter information about your lead to generate a personalized email.
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
              placeholder="Technology, Healthcare, etc." 
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select 
              value={formData.tone} 
              onValueChange={(val) => setFormData({...formData, tone: val})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional & Direct</SelectItem>
                <SelectItem value="friendly">Friendly & Casual</SelectItem>
                <SelectItem value="persuasive">Persuasive & Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            className="w-full bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 font-semibold mt-4"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Generated Email</CardTitle>
          <CardDescription>
            Review and copy your AI-generated draft.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <Textarea 
            className="flex-1 min-h-[300px] font-mono text-sm p-4 leading-relaxed resize-none bg-slate-50 dark:bg-slate-900"
            placeholder="Your generated email will appear here..."
            value={generatedEmail}
            readOnly
          />
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={copyToClipboard} disabled={!generatedEmail}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied" : "Copy to Clipboard"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
