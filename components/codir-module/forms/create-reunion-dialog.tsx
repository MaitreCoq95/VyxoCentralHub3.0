"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createReunion } from "@/lib/codir-module";
import type { CodirReunionForm } from "@/types/codir-module";
import { CODIR_MEMBRES } from "@/types/codir-module";
import { Calendar } from "lucide-react";

interface CreateReunionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateReunionDialog({ open, onOpenChange, onSuccess }: CreateReunionDialogProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CodirReunionForm>();

  async function onSubmit(data: CodirReunionForm) {
    try {
      setLoading(true);
      await createReunion(data);
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erreur création réunion:', error);
      alert('Erreur lors de la création de la réunion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Nouvelle Réunion CODIR
          </DialogTitle>
          <DialogDescription>
            Planifier une nouvelle réunion du Comité de Direction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              {...register("titre", { required: "Le titre est requis" })}
              placeholder="Ex: CODIR Janvier 2025"
            />
            {errors.titre && <p className="text-sm text-red-500">{errors.titre.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: "La date est requise" })}
            />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lieu">Lieu</Label>
            <Input
              id="lieu"
              {...register("lieu")}
              placeholder="Ex: Salle de réunion A / Visio"
            />
          </div>

          <div className="space-y-2">
            <Label>Participants</Label>
            <div className="grid grid-cols-2 gap-2">
              {CODIR_MEMBRES.map((membre) => (
                <label key={membre} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={membre}
                    {...register("participants")}
                    className="rounded"
                  />
                  <span className="text-sm">{membre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectifs">Objectifs</Label>
            <Textarea
              id="objectifs"
              {...register("objectifs")}
              placeholder="Objectifs principaux de la réunion..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <select
              id="statut"
              {...register("statut")}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="planifiee">Planifiée</option>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminée</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer la Réunion"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
