"use client"

import { useState } from "react"
import { Search, MapPin, Building2, Briefcase, Loader2, UserPlus, Mail, CheckCircle, AlertCircle, Globe, Unlock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/components/language-provider"
import { IndustryFilter } from "@/components/prospecting/industry-filter"

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
    industry: [] as string[],  // Changed to array for multi-select
    companySize: [] as string[],
    seniority: "",
    department: "",
    revenueMin: "",
    revenueMax: "",
    companyName: "",
    personName: ""
  })
  const [results, setResults] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [addingToCrm, setAddingToCrm] = useState<string | null>(null)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [transferring, setTransferring] = useState(false)
  const { toast } = useToast()

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchParams.jobTitle && !searchParams.industry && !searchParams.seniority && !searchParams.department) {
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

  async function unlockEmail(prospect: Prospect) {
    try {
      const revealRes = await fetch('/api/prospecting/apollo/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: prospect.id })
      });

      if (revealRes.ok) {
        const revealData = await revealRes.json();
        if (revealData.email) {
           setResults(prev => prev.map(p => p.id === prospect.id ? { ...p, email: revealData.email } : p));
           toast({ title: "Email débloqué", description: revealData.email });
        }
      }
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de débloquer l'email" });
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
          sector: searchParams.industry.length > 0 ? searchParams.industry.join(', ') : 'Unknown',
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

  function toggleSelectContact(prospectId: string) {
    setSelectedContacts(prev => 
      prev.includes(prospectId) 
        ? prev.filter(id => id !== prospectId)
        : [...prev, prospectId]
    )
  }

  function toggleSelectAll() {
    if (selectedContacts.length === results.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(results.map(p => p.id))
    }
  }

  async function sendToVyxHunter() {
    if (selectedContacts.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun contact sélectionné",
        description: "Sélectionnez au moins un contact à transférer"
      })
      return
    }

    try {
      setTransferring(true)
      
      const selectedProspects = results.filter(p => selectedContacts.includes(p.id))
      
      const response = await fetch('/api/prospecting/send-to-vyxhunter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: selectedProspects,
          autoEnrich: true // Active l'enrichissement automatique
        })
      })

      if (!response.ok) throw new Error('Transfer failed')

      const data = await response.json()

      toast({
        title: "✅ Transfert réussi !",
        description: `${data.created} entreprise(s) ajoutée(s) à VyxHunter${data.skipped > 0 ? ` (${data.skipped} déjà existante(s))` : ''}`
      })

      // Reset selection
      setSelectedContacts([])

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de transfert",
        description: "Impossible de transférer les contacts vers VyxHunter"
      })
    } finally {
      setTransferring(false)
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
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("prospect.jobTitle")}</label>
              <div className="relative">
                <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t("prospect.jobTitlePlaceholder")} 
                  className="pl-9"
                    { value: "51,200", label: "51-200 employés" },
                    { value: "201,500", label: "201-500 employés" },
                    { value: "501,1000", label: "501-1000 employés" },
                    { value: "1001,5000", label: "1001-5000 employés" },
                    { value: "5001,10000", label: "5001-10000 employés" },
                    { value: "10001", label: "10000+ employés" }
                  ].map((size) => (
                    <label key={size.value} className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={searchParams.companySize.includes(size.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSearchParams({...searchParams, companySize: [...searchParams.companySize, size.value]})
                          } else {
                            setSearchParams({...searchParams, companySize: searchParams.companySize.filter(s => s !== size.value)})
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* NEW FILTERS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">🏢 Nom Entreprise</label>
                <Input 
                  placeholder="Ex: Google, Microsoft..."
                  value={searchParams.companyName}
                  onChange={(e) => setSearchParams({...searchParams, companyName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">👤 Nom Personne</label>
                <Input 
                  placeholder="Ex: John Doe..."
                  value={searchParams.personName}
                  onChange={(e) => setSearchParams({...searchParams, personName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">🎯 Niveau de Séniorité</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchParams.seniority}
                  onChange={(e) => setSearchParams({...searchParams, seniority: e.target.value})}
                >
                  <option value="">Tous niveaux</option>
                  <option value="c_suite">C-Suite (CEO, CTO, CFO...)</option>
                  <option value="vp">Vice-Président</option>
                  <option value="director">Directeur</option>
                  <option value="manager">Manager</option>
                  <option value="senior">Senior</option>
                  <option value="entry">Junior/Entry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">🏢 Département</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchParams.department}
                  onChange={(e) => setSearchParams({...searchParams, department: e.target.value})}
                >
                  <option value="">Tous départements</option>
                  <option value="sales">Ventes</option>
                  <option value="marketing">Marketing</option>
                  <option value="engineering">Ingénierie/Tech</option>
                  <option value="operations">Opérations</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Ressources Humaines</option>
                  <option value="legal">Juridique</option>
                  <option value="customer_success">Customer Success</option>
                </select>
              </div>
            </div>

            {/* REVENUE ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">💰 CA Min (€)</label>
                <Input 
                  type="number"
                  placeholder="Ex: 1000000"
                  value={searchParams.revenueMin}
                  onChange={(e) => setSearchParams({...searchParams, revenueMin: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">💰 CA Max (€)</label>
                <Input 
                  type="number"
                  placeholder="Ex: 10000000"
                  value={searchParams.revenueMax}
                  onChange={(e) => setSearchParams({...searchParams, revenueMax: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="bg-vyxo-navy hover:bg-vyxo-navy/90 text-white w-full md:w-auto">
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
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {t("prospect.results")} <Badge variant="secondary">{results.length}</Badge>
              </h3>
              {results.length > 0 && (
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === results.length && results.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                  <span className="text-muted-foreground">Tout sélectionner</span>
                </label>
              )}
            </div>
            {selectedContacts.length > 0 && (
              <Button
                onClick={sendToVyxHunter}
                disabled={transferring}
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-semibold"
              >
                {transferring ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
                {transferring ? "Transfert & Analyse..." : `Envoyer & Analyser (IA) (${selectedContacts.length})`}
              </Button>
            )}
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
                <Card key={prospect.id} className="hover:shadow-md transition-shadow relative">
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(prospect.id)}
                      onChange={() => toggleSelectContact(prospect.id)}
                      className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    />
                  </div>
                  <CardContent className="p-5 pl-12">
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
                        {prospect.organization_url && (
                          <a href={prospect.organization_url.startsWith('http') ? prospect.organization_url : `https://${prospect.organization_url}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary ml-1">
                            <Globe className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{prospect.location || t("prospect.unknownLocation")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {prospect.email && prospect.email !== 'Not available' && !prospect.email.includes('email_not_unlocked') ? (
                          <span className="text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                            {prospect.email}
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                             <span className="text-muted-foreground text-xs italic">Email masqué</span>
                             <Button size="sm" variant="ghost" className="h-6 px-2 text-xs hover:bg-emerald-50 hover:text-emerald-600" onClick={() => unlockEmail(prospect)}>
                               <Unlock className="h-3 w-3 mr-1" /> Débloquer
                             </Button>
                          </div>
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
