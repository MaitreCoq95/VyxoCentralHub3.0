"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createDecision } from "@/lib/codir-module";
import type { CodirDecisionForm } from "@/types/codir-module";
import { CODIR_THEMES, CODIR_MEMBRES, CODIR_PRIORITES } from "@/types/codir-module";
import { FileText } from "lucide-react";

interface CreateDecisionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateDecisionDialog({ open, onOpenChange, onSuccess }: CreateDecisionDialogProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CodirDecisionForm>({
    defaultValues: {
      date_decision: new Date().toISOString().split('T')[0],
      etat: 'idee',
      impact: 'medium',
      priorite: 2,
    }
  });

  async function onSubmit(data: CodirDecisionForm) {
    try {
      setLoading(true);
      await createDecision(data);
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erreur création décision:', error);
      alert('Erreur lors de la création de la décision');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Nouvelle Décision Stratégique
          </DialogTitle>
          <DialogDescription>
            Créer une décision stratégique du CODIR
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              {...register("titre", { required: "Le titre est requis" })}
              placeholder="Ex: Lancer le nouveau produit X"
            />
            {errors.titre && <p className="text-sm text-red-500">{errors.titre.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Description détaillée de la décision..."
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
              <Label htmlFor="theme">Thème *</Label>
              <select
                id="theme"
                {...register("theme", { required: "Le thème est requis" })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Sélectionner...</option>
                {CODIR_THEMES.map((theme) => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
              {errors.theme && <p className="text-sm text-red-500">{errors.theme.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="impact">Impact *</Label>
              <select
                id="impact"
                {...register("impact")}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyen</option>
                <option value="high">Élevé</option>
              </select>
            </div>

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
                <option value="idee">Idée</option>
                <option value="validee">Validée</option>
                <option value="en_cours">En cours</option>
                <option value="terminee">Terminée</option>
                <option value="abandonnee">Abandonnée</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_decision">Date de Décision *</Label>
              <Input
                id="date_decision"
                type="date"
                {...register("date_decision", { required: "La date de décision est requise" })}
              />
              {errors.date_decision && <p className="text-sm text-red-500">{errors.date_decision.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_echeance">Date d'Échéance</Label>
              <Input
                id="date_echeance"
                type="date"
                {...register("date_echeance")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Notes additionnelles..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer la Décision"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
