"use client"

import { useState } from "react"
import { Search, MapPin, Building2, Briefcase, Loader2, UserPlus, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/components/language-provider"

interface Prospect {
  id: string
  first_name: string
  last_name: string
  title: string
  email: string
  linkedin_url?: string
  organization?: string
  organization_url?: string
  location?: string
  photo_url?: string
}

export default function ProspectingPage() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
    industry: ""
  })
  const [results, setResults] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [addingToCrm, setAddingToCrm] = useState<string | null>(null)
  const { toast } = useToast()

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchParams.jobTitle && !searchParams.industry) {
      toast({
        variant: "destructive",
        title: t("prospect.missingCriteria"),
        description: t("prospect.missingCriteriaDesc")
      })
      return
    }

    setLoading(true)
    setSearched(true)
    setResults([])

    try {
      const response = await fetch('/api/prospecting/apollo/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.prospects || [])
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("prospect.searchError"),
        description: t("prospect.searchErrorDesc")
      })
    } finally {
      setLoading(false)
    }
  }

  async function addToCrm(prospect: Prospect) {
    try {
      setAddingToCrm(prospect.id)
      
      let emailToUse = prospect.email;

      // 1. Reveal Email (if needed)
      if (!emailToUse || emailToUse === 'Not available' || emailToUse.includes('email_not_unlocked')) {
        try {
            const revealRes = await fetch('/api/prospecting/apollo/reveal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: prospect.id })
            });
            
            if (revealRes.ok) {
                const revealData = await revealRes.json();
                if (revealData.email) {
                    emailToUse = revealData.email;
                    // Update local state to reflect the revealed email immediately in the UI (optional but nice)
                    setResults(prev => prev.map(p => p.id === prospect.id ? { ...p, email: emailToUse } : p));
                    
                    toast({
                        title: "Email récupéré !",
                        description: `L'adresse ${emailToUse} a été débloquée.`,
                    })
                }
            }
        } catch (revealError) {
            console.error("Failed to reveal email", revealError);
            // Continue without email if reveal fails, or maybe show a warning
        }
      }

      // 2. Create Client (Lead)
      const clientRes = await fetch('/api/crm/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: prospect.organization || `${prospect.first_name} ${prospect.last_name}`,
          sector: searchParams.industry || 'Unknown',
          status: 'lead',
          city: prospect.location,
          contactName: `${prospect.first_name} ${prospect.last_name}`,
          contact_email: emailToUse !== 'Not available' && !emailToUse.includes('email_not_unlocked') ? emailToUse : undefined,
          notes: `Imported from Apollo. Title: ${prospect.title}. LinkedIn: ${prospect.linkedin_url}`
        })
      })

      if (!clientRes.ok) throw new Error('Failed to create client')

      toast({
        title: t("prospect.success"),
        description: `${prospect.first_name} ${t("prospect.addedToCrm")}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("prospect.error"),
        description: t("prospect.addError")
      })
    } finally {
      setAddingToCrm(null)
    }
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-vyxo-navy dark:text-white">{t("prospect.title")}</h2>
          <p className="text-muted-foreground">{t("prospect.subtitle")}</p>
        </div>
      </div>

      {/* SEARCH FORM */}
      <Card className="border-t-4 border-t-vyxo-gold">
        <CardHeader>
          <CardTitle>{t("prospect.search")}</CardTitle>
          <CardDescription>{t("prospect.targetDecisionMakers")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("prospect.jobTitle")}</label>
              <div className="relative">
                <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t("prospect.jobTitlePlaceholder")} 
                  className="pl-9"
                  value={searchParams.jobTitle}
                  onChange={(e) => setSearchParams({...searchParams, jobTitle: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("prospect.location")}</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t("prospect.locationPlaceholder")} 
                  className="pl-9"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("prospect.industry")}</label>
              <div className="relative">
                <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t("prospect.industryPlaceholder")} 
                  className="pl-9"
                  value={searchParams.industry}
                  onChange={(e) => setSearchParams({...searchParams, industry: e.target.value})}
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="bg-vyxo-navy hover:bg-vyxo-navy/90 text-white">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {t("prospect.findProspects")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* RESULTS */}
      {searched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {t("prospect.results")} <Badge variant="secondary">{results.length}</Badge>
            </h3>
          </div>

          {results.length === 0 && !loading ? (
            <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{t("prospect.noProspectsFound")}</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                  {t("prospect.adjustCriteria")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((prospect) => (
                <Card key={prospect.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={prospect.photo_url} />
                          <AvatarFallback className="bg-vyxo-navy text-white">
                            {prospect.first_name[0]}{prospect.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-sm">{prospect.first_name} {prospect.last_name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1" title={prospect.title}>
                            {prospect.title}
                          </p>
                        </div>
                      </div>
                      {prospect.linkedin_url && (
                        <a href={prospect.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        <span className="truncate">{prospect.organization || t("prospect.unknownCompany")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{prospect.location || t("prospect.unknownLocation")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {prospect.email && prospect.email !== 'Not available' ? (
                          <span className="text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                            {prospect.email}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs italic">{t("prospect.emailNotFound")}</span>
                        )}
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      variant={addingToCrm === prospect.id ? "secondary" : "outline"}
                      disabled={!!addingToCrm}
                      onClick={() => addToCrm(prospect)}
                    >
                      {addingToCrm === prospect.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <UserPlus className="h-4 w-4 mr-2" />
                      )}
                      {addingToCrm === prospect.id ? t("prospect.adding") : t("prospect.addToCrm")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
