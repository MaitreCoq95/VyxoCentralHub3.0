"use client";

import { useState } from "react";
import { IdeaWithVotes } from "@/types/bucket-project";
import { CodirMember } from "@/types/codir";
import IdeaCard from "./IdeaCard";
import IdeaDetail from "./IdeaDetail";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createIdea } from "@/app/vyxo-bucket/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Internal simple form for adding idea
function NewIdeaFormComp({ members, currentUser, onClose }: { members: CodirMember[], currentUser: CodirMember | null, onClose: () => void }) {
    return <div className="p-4">Formulaire création (Please use NewIdeaDialog)</div>
}

export default function IdeaBoard({ ideas, members }: { ideas: IdeaWithVotes[], members: CodirMember[] }) {
    const [selectedIdea, setSelectedIdea] = useState<IdeaWithVotes | null>(null);
    const [currentUser, setCurrentUser] = useState<CodirMember | null>(members[0] || null); // Simulating auth with dropdown
    
    // Columns
    const columns = [
        { id: 'idea', label: 'Idées Brutes' },
        { id: 'under_review', label: 'En Revue CODIR' },
        { id: 'approved', label: 'Validées' },
        { id: 'rejected', label: 'Rejetées' },
        { id: 'converted_to_project', label: 'En Projet' }
    ];

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header controls */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                     <h2 className="text-lg font-semibold">Vue Kanban</h2>
                     {/* Identity Switcher for Demo */}
                     <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1 rounded-full">
                        <span className="text-muted-foreground">Je suis :</span>
                        <Select value={currentUser?.id} onValueChange={(uid) => setCurrentUser(members.find(m => m.id === uid) || null)}>
                            <SelectTrigger className="h-8 border-none bg-transparent shadow-none focus:ring-0 w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {members.map(m => (
                                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                     </div>
                </div>
                
                <NewIdeaDialog members={members} currentUser={currentUser} />
            </div>

            {/* Board */}
            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-4 h-full min-w-[1200px]">
                    {columns.map(col => (
                        <div key={col.id} className="w-80 flex-shrink-0 flex flex-col bg-muted/30 rounded-lg border">
                            <div className="p-3 border-b font-medium bg-muted/50 rounded-t-lg flex justify-between items-center">
                                {col.label}
                                <span className="text-xs bg-background px-2 py-0.5 rounded-full border">
                                    {ideas.filter(i => i.status === col.id).length}
                                </span>
                            </div>
                            <div className="p-3 flex-1 overflow-y-auto space-y-3">
                                {ideas.filter(i => i.status === col.id).map(idea => (
                                    <IdeaCard 
                                        key={idea.id} 
                                        idea={idea} 
                                        voteCount={{
                                            yes: idea.votes?.filter(v => v.vote === 'yes').length || 0,
                                            no: idea.votes?.filter(v => v.vote === 'no').length || 0,
                                            total: idea.votes?.length || 0
                                        }}
                                        onClick={() => setSelectedIdea(idea)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedIdea && (
                <IdeaDetail 
                    idea={selectedIdea} 
                    members={members} 
                    currentUser={currentUser} 
                    isOpen={!!selectedIdea} 
                    onClose={() => setSelectedIdea(null)} 
                />
            )}
        </div>
    );
}

// Subcomponent for creating new idea

function NewIdeaDialog({ members, currentUser }: { members: CodirMember[], currentUser: CodirMember | null }) {
    const [open, setOpen] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Consulting",
        subcategory: "",
        time_horizon: "moyen terme"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!currentUser) return;
        
        await createIdea({
            ...formData,
            created_by: currentUser.id,
            strategic_fit: 3, // Defaults
            business_potential: 3,
            complexity: 3,
            risk_level: 3
        });
        setOpen(false);
        setFormData({ title: "", description: "", category: "Consulting", subcategory: "", time_horizon: "moyen terme" });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[hsl(var(--vyxo-navy))] text-[hsl(var(--vyxo-gold))]">
                    <Plus className="w-4 h-4 mr-2" /> Ajouter une idée
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nouvelle Idée</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Titre</Label>
                        <Input 
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                            required 
                            placeholder="Ex: Café Bartop à Lyon"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea 
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Catégorie</Label>
                            <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {["Consulting", "SaaS / Produit digital", "Hardware", "Expérience", "Formation", "Partenariats", "R&D"].map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Sous-catégorie</Label>
                            <Input 
                                value={formData.subcategory} 
                                onChange={e => setFormData({...formData, subcategory: e.target.value})} 
                                placeholder="Ex: Cold Chain"
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Horizon</Label>
                        <Select value={formData.time_horizon} onValueChange={v => setFormData({...formData, time_horizon: v})}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="court terme">Court terme (0-3 mois)</SelectItem>
                                    <SelectItem value="moyen terme">Moyen terme (3-12 mois)</SelectItem>
                                    <SelectItem value="long terme">Long terme (+12 mois)</SelectItem>
                                </SelectContent>
                            </Select>
                    </div>
                    
                    <Button type="submit" className="w-full">Créer l&apos;idée</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
