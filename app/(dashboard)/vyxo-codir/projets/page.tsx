"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/codir-module/data-table";
import { StatusBadge } from "@/components/codir-module/status-badge";
import { ProgressBar } from "@/components/codir-module/progress-bar";
import { CreateProjetDialog } from "@/components/codir-module/forms";
import { getProjets } from "@/lib/codir-module";
import { formatDate, formatCurrency } from "@/lib/codir-module/utils";
import type { CodirProjet } from "@/types/codir-module";
import { FolderKanban, Plus, TrendingUp } from "lucide-react";

export default function CodirProjetsPage() {
  const [projets, setProjets] = useState<CodirProjet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadProjets();
  }, []);

  async function loadProjets() {
    try {
      setLoading(true);
      const data = await getProjets();
      setProjets(data);
    } catch (error) {
      console.error('Erreur chargement projets:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Chargement...</div>
        </div>
      </div>
    );
  }

  const projetsActifs = projets.filter(p => p.etat === 'en_cours');
  const projetsTermines = projets.filter(p => p.etat === 'termine');
  const avancementMoyen = projetsActifs.length > 0
    ? Math.round(projetsActifs.reduce((sum, p) => sum + p.avancement, 0) / projetsActifs.length)
    : 0;

  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projets CODIR</h1>
          <p className="text-muted-foreground mt-2">
            Suivi des projets issus des décisions CODIR
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Projet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Projets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Projets Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projetsActifs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Projets Terminés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projetsTermines.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avancement Moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avancementMoyen}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Projets Actifs */}
      <Card>
        <CardHeader>
          <CardTitle>Projets en Cours</CardTitle>
          <CardDescription>
            Projets actuellement actifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={projetsActifs}
            columns={[
              {
                key: 'nom',
                header: 'Projet',
                render: (item) => (
                  <div className="max-w-md">
                    <p className="font-medium">{item.nom}</p>
                    {item.objectif && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {item.objectif}
                      </p>
                    )}
                  </div>
                ),
              },
              {
                key: 'responsable',
                header: 'Responsable',
              },
              {
                key: 'avancement',
                header: 'Avancement',
                render: (item) => (
                  <div className="w-32">
                    <ProgressBar value={item.avancement} size="sm" />
                  </div>
                ),
              },
              {
                key: 'budget',
                header: 'Budget',
                render: (item) => formatCurrency(item.budget),
              },
              {
                key: 'deadline',
                header: 'Deadline',
                render: (item) => formatDate(item.deadline),
              },
              {
                key: 'priorite',
                header: 'Priorité',
                render: (item) => <StatusBadge type="priorite" value={item.priorite} />,
              },
            ]}
            emptyMessage="Aucun projet actif"
          />
        </CardContent>
      </Card>

      {/* Tous les projets */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les Projets</CardTitle>
          <CardDescription>
            Historique complet des projets CODIR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={projets}
            columns={[
              {
                key: 'nom',
                header: 'Projet',
                render: (item) => (
                  <div className="max-w-md">
                    <p className="font-medium">{item.nom}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                ),
              },
              {
                key: 'responsable',
                header: 'Responsable',
              },
              {
                key: 'avancement',
                header: 'Avancement',
                render: (item) => (
                  <div className="w-24">
                    <ProgressBar value={item.avancement} size="sm" showLabel={false} />
                  </div>
                ),
              },
              {
                key: 'etat',
                header: 'État',
                render: (item) => <StatusBadge type="projet" value={item.etat} />,
              },
              {
                key: 'date_debut',
                header: 'Début',
                render: (item) => formatDate(item.date_debut),
              },
              {
                key: 'deadline',
                header: 'Fin prévue',
                render: (item) => formatDate(item.deadline),
              },
            ]}
            emptyMessage="Aucun projet enregistré"
          />
        </CardContent>
      </Card>

      <CreateProjetDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={loadProjets}
      />
    </div>
  );
}
