"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createAction } from "@/lib/codir-module";
import type { CodirActionForm } from "@/types/codir-module";
import { CODIR_MEMBRES, CODIR_PRIORITES } from "@/types/codir-module";
import { CheckCircle2 } from "lucide-react";

interface CreateActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateActionDialog({ open, onOpenChange, onSuccess }: CreateActionDialogProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CodirActionForm>({
    defaultValues: {
      etat: 'pending',
      priorite: 2,
      pourcentage_avancement: 0,
    }
  });

  async function onSubmit(data: CodirActionForm) {
    try {
      setLoading(true);
      console.log('📤 Données envoyées:', data);
      const result = await createAction(data);
      console.log('✅ Action créée:', result);
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      console.error('❌ Erreur création action:', error);
      console.error('Détails:', error.message, error.details, error.hint);

      let errorMessage = 'Erreur lors de la création de l\'action';
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        errorMessage = '⚠️ Les tables CODIR n\'existent pas encore.\n\nVeuillez exécuter la migration SQL:\nsupabase/migrations/20250210_create_codir_module.sql';
      } else if (error.message) {
        errorMessage = `Erreur: ${error.message}`;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Nouvelle Action
          </DialogTitle>
          <DialogDescription>
            Créer une nouvelle action à réaliser
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description", { required: "La description est requise" })}
              placeholder="Ex: Préparer le dossier de présentation pour le client X"
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
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
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                {...register("deadline")}
              />
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
                <option value="pending">À faire</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="blocked">Bloquée</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pourcentage_avancement">Avancement (%)</Label>
              <Input
                id="pourcentage_avancement"
                type="number"
                min="0"
                max="100"
                {...register("pourcentage_avancement", { valueAsNumber: true })}
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
              {loading ? "Création..." : "Créer l'Action"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
