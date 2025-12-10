"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/codir-module/data-table";
import { StatusBadge } from "@/components/codir-module/status-badge";
import { getDecisions } from "@/lib/codir-module";
import { formatDate } from "@/lib/codir-module/utils";
import type { CodirDecision } from "@/types/codir-module";
import { FileText, Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CodirDecisionsPage() {
  const [decisions, setDecisions] = useState<CodirDecision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecisions();
  }, []);

  async function loadDecisions() {
    try {
      setLoading(true);
      const data = await getDecisions();
      setDecisions(data);
    } catch (error) {
      console.error('Erreur chargement décisions:', error);
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

  const decisionsParEtat = {
    idee: decisions.filter(d => d.etat === 'idee'),
    validee: decisions.filter(d => d.etat === 'validee'),
    en_cours: decisions.filter(d => d.etat === 'en_cours'),
    terminee: decisions.filter(d => d.etat === 'terminee'),
  };

  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Décisions Stratégiques</h1>
          <p className="text-muted-foreground mt-2">
            Suivi des décisions prises en CODIR
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Décision
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Décisions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{decisions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">En Cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{decisionsParEtat.en_cours.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Validées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{decisionsParEtat.validee.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{decisionsParEtat.terminee.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs par état */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            Toutes ({decisions.length})
          </TabsTrigger>
          <TabsTrigger value="en_cours">
            En Cours ({decisionsParEtat.en_cours.length})
          </TabsTrigger>
          <TabsTrigger value="validee">
            Validées ({decisionsParEtat.validee.length})
          </TabsTrigger>
          <TabsTrigger value="terminee">
            Terminées ({decisionsParEtat.terminee.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les Décisions</CardTitle>
              <CardDescription>
                Liste complète des décisions stratégiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={decisions}
                columns={[
                  {
                    key: 'date_decision',
                    header: 'Date',
                    render: (item) => formatDate(item.date_decision),
                  },
                  {
                    key: 'titre',
                    header: 'Décision',
                    render: (item) => (
                      <div>
                        <p className="font-medium">{item.titre}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: 'theme',
                    header: 'Thème',
                    render: (item) => <StatusBadge type="theme" value={item.theme} />,
                  },
                  {
                    key: 'responsable',
                    header: 'Responsable',
                  },
                  {
                    key: 'impact',
                    header: 'Impact',
                    render: (item) => <StatusBadge type="impact" value={item.impact} />,
                  },
                  {
                    key: 'priorite',
                    header: 'Priorité',
                    render: (item) => <StatusBadge type="priorite" value={item.priorite} />,
                  },
                  {
                    key: 'etat',
                    header: 'État',
                    render: (item) => <StatusBadge type="decision" value={item.etat} />,
                  },
                  {
                    key: 'date_echeance',
                    header: 'Échéance',
                    render: (item) => formatDate(item.date_echeance),
                  },
                ]}
                emptyMessage="Aucune décision enregistrée"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en_cours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Décisions En Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={decisionsParEtat.en_cours}
                columns={[
                  {
                    key: 'titre',
                    header: 'Décision',
                    render: (item) => (
                      <div>
                        <p className="font-medium">{item.titre}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: 'theme',
                    header: 'Thème',
                    render: (item) => <StatusBadge type="theme" value={item.theme} />,
                  },
                  {
                    key: 'responsable',
                    header: 'Responsable',
                  },
                  {
                    key: 'impact',
                    header: 'Impact',
                    render: (item) => <StatusBadge type="impact" value={item.impact} />,
                  },
                  {
                    key: 'date_echeance',
                    header: 'Échéance',
                    render: (item) => formatDate(item.date_echeance),
                  },
                ]}
                emptyMessage="Aucune décision en cours"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validee" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Décisions Validées</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={decisionsParEtat.validee}
                columns={[
                  {
                    key: 'titre',
                    header: 'Décision',
                  },
                  {
                    key: 'theme',
                    header: 'Thème',
                    render: (item) => <StatusBadge type="theme" value={item.theme} />,
                  },
                  {
                    key: 'responsable',
                    header: 'Responsable',
                  },
                  {
                    key: 'date_decision',
                    header: 'Date',
                    render: (item) => formatDate(item.date_decision),
                  },
                ]}
                emptyMessage="Aucune décision validée"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terminee" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Décisions Terminées</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={decisionsParEtat.terminee}
                columns={[
                  {
                    key: 'titre',
                    header: 'Décision',
                  },
                  {
                    key: 'theme',
                    header: 'Thème',
                    render: (item) => <StatusBadge type="theme" value={item.theme} />,
                  },
                  {
                    key: 'responsable',
                    header: 'Responsable',
                  },
                  {
                    key: 'date_decision',
                    header: 'Date',
                    render: (item) => formatDate(item.date_decision),
                  },
                ]}
                emptyMessage="Aucune décision terminée"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
