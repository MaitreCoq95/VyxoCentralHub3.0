"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProjet } from "@/lib/codir-module";
import type { CodirProjetForm } from "@/types/codir-module";
import { CODIR_MEMBRES, CODIR_PRIORITES } from "@/types/codir-module";
import { FolderKanban } from "lucide-react";

interface CreateProjetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateProjetDialog({ open, onOpenChange, onSuccess }: CreateProjetDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CodirProjetForm>({
    defaultValues: {
      date_debut: new Date().toISOString().split('T')[0],
      etat: 'en_cours',
      priorite: 2,
      equipe: [],
      tags: [],
    }
  });

  async function onSubmit(data: CodirProjetForm) {
    try {
      setLoading(true);
      const formData = {
        ...data,
        equipe: selectedEquipe,
        tags: selectedTags,
      };
      await createProjet(formData);
      reset();
      setSelectedEquipe([]);
      setSelectedTags([]);
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erreur création projet:', error);
      alert('Erreur lors de la création du projet');
    } finally {
      setLoading(false);
    }
  }

  function toggleEquipeMember(membre: string) {
    setSelectedEquipe(prev =>
      prev.includes(membre)
        ? prev.filter(m => m !== membre)
        : [...prev, membre]
    );
  }

  function addTag() {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            Nouveau Projet CODIR
          </DialogTitle>
          <DialogDescription>
            Créer un nouveau projet stratégique
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du Projet *</Label>
            <Input
              id="nom"
              {...register("nom", { required: "Le nom est requis" })}
              placeholder="Ex: Refonte de la plateforme"
            />
            {errors.nom && <p className="text-sm text-red-500">{errors.nom.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectif">Objectif</Label>
            <Textarea
              id="objectif"
              {...register("objectif")}
              placeholder="Objectif principal du projet..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Description détaillée du projet..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsable">Responsable *</Label>
              <select
                id="responsable"
                {...register("responsable", { required: "Le responsable est requis" })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Sélectionner...</option>
                {CODIR_MEMBRES.map((membre) => (
                  <option key={membre} value={membre}>{membre}</option>
                ))}
              </select>
              {errors.responsable && <p className="text-sm text-red-500">{errors.responsable.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (€)</Label>
              <Input
                id="budget"
                type="number"
                {...register("budget", { valueAsNumber: true })}
                placeholder="Ex: 50000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Équipe</Label>
            <div className="grid grid-cols-2 gap-2 p-3 border rounded-md">
              {CODIR_MEMBRES.map((membre) => (
                <label key={membre} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEquipe.includes(membre)}
                    onChange={() => toggleEquipeMember(membre)}
                    className="rounded"
                  />
                  <span className="text-sm">{membre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priorite">Priorité *</Label>
              <select
                id="priorite"
                {...register("priorite", { valueAsNumber: true })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {CODIR_PRIORITES.map((prio) => (
                  <option key={prio.value} value={prio.value}>{prio.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="etat">État</Label>
              <select
                id="etat"
                {...register("etat")}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="suspendu">Suspendu</option>
                <option value="annule">Annulé</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kpi">KPI Principal</Label>
              <Input
                id="kpi"
                {...register("kpi")}
                placeholder="Ex: +20% conversion"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_debut">Date de Début *</Label>
              <Input
                id="date_debut"
                type="date"
                {...register("date_debut", { required: "La date de début est requise" })}
              />
              {errors.date_debut && <p className="text-sm text-red-500">{errors.date_debut.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                {...register("deadline")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="risques">Risques</Label>
            <Textarea
              id="risques"
              {...register("risques")}
              placeholder="Risques identifiés et plan de mitigation..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Ajouter un tag..."
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Ajouter
              </Button>
            </div>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le Projet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
