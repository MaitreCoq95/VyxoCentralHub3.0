"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getKpis } from "@/lib/codir-module";
import { formatDate, formatPercentage } from "@/lib/codir-module/utils";
import type { CodirKpi } from "@/types/codir-module";
import { TrendingUp, TrendingDown, Target, CheckCircle2, FolderKanban, FileText } from "lucide-react";
import { StatCard } from "@/components/codir-module/stat-card";

export default function CodirKpisPage() {
  const [kpis, setKpis] = useState<CodirKpi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKpis();
  }, []);

  async function loadKpis() {
    try {
      setLoading(true);
      const data = await getKpis();
      setKpis(data);
    } catch (error) {
      console.error('Erreur chargement KPIs:', error);
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

  // Get latest KPI snapshot
  const latestKpi = kpis.length > 0 ? kpis[0] : null;

  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">KPIs Stratégiques CODIR</h1>
        <p className="text-muted-foreground mt-2">
          Indicateurs de performance du Comité de Direction
        </p>
        {latestKpi && (
          <p className="text-sm text-muted-foreground mt-1">
            Dernière mise à jour : {formatDate(latestKpi.periode)}
          </p>
        )}
      </div>

      {latestKpi ? (
        <>
          {/* KPIs Décisions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              KPIs Décisions
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard
                title="Décisions Prises"
                value={latestKpi.decisions_prises}
                icon={FileText}
                color="text-blue-600"
              />
              <StatCard
                title="Décisions Validées"
                value={latestKpi.decisions_validees}
                icon={CheckCircle2}
                color="text-green-600"
              />
              <StatCard
                title="Décisions Terminées"
                value={latestKpi.decisions_terminees}
                icon={Target}
                color="text-purple-600"
              />
              <StatCard
                title="Taux Transformation"
                value={formatPercentage(latestKpi.taux_transformation)}
                subtitle="Décisions → Actions"
                icon={TrendingUp}
                color="text-orange-600"
              />
            </div>
          </div>

          {/* KPIs Projets */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              KPIs Projets
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Projets Actifs"
                value={latestKpi.projets_actifs}
                icon={FolderKanban}
                color="text-blue-600"
              />
              <StatCard
                title="Projets Terminés"
                value={latestKpi.projets_termines}
                subtitle="Ce mois"
                icon={CheckCircle2}
                color="text-green-600"
              />
              <StatCard
                title="Avancement Global"
                value={formatPercentage(latestKpi.avancement_global)}
                subtitle="Moyenne des projets actifs"
                icon={TrendingUp}
                color="text-purple-600"
              />
            </div>
          </div>

          {/* KPIs Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              KPIs Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Actions Assignées"
                value={latestKpi.actions_assignees}
                subtitle="Ce mois"
                icon={Target}
                color="text-blue-600"
              />
              <StatCard
                title="Actions Complétées"
                value={latestKpi.actions_completees}
                subtitle="Ce mois"
                icon={CheckCircle2}
                color="text-green-600"
              />
              <StatCard
                title="Taux Complétion"
                value={formatPercentage(latestKpi.taux_completion_actions)}
                icon={TrendingUp}
                color="text-purple-600"
              />
            </div>
          </div>

          {/* KPIs Business (optionnels) */}
          {(latestKpi.diagnostics_vendus > 0 || latestKpi.scores_codex_generes > 0 || latestKpi.abonnements_uniq > 0) && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                KPIs Business
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {latestKpi.diagnostics_vendus > 0 && (
                  <StatCard
                    title="Diagnostics Vendus"
                    value={latestKpi.diagnostics_vendus}
                    subtitle="Ce mois"
                    icon={FileText}
                    color="text-emerald-600"
                  />
                )}
                {latestKpi.scores_codex_generes > 0 && (
                  <StatCard
                    title="Scores Codex Générés"
                    value={latestKpi.scores_codex_generes}
                    subtitle="Ce mois"
                    icon={Target}
                    color="text-cyan-600"
                  />
                )}
                {latestKpi.abonnements_uniq > 0 && (
                  <StatCard
                    title="Abonnements UniQ"
                    value={latestKpi.abonnements_uniq}
                    subtitle="Actifs"
                    icon={CheckCircle2}
                    color="text-indigo-600"
                  />
                )}
              </div>
            </div>
          )}

          {/* Historique */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des KPIs</CardTitle>
              <CardDescription>
                Évolution des indicateurs sur les derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpis.map((kpi) => (
                  <div key={kpi.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{formatDate(kpi.periode)}</span>
                      <span className="text-sm text-muted-foreground">{kpi.type_periode}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Décisions:</span>
                        <span className="ml-2 font-medium">{kpi.decisions_prises}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Projets:</span>
                        <span className="ml-2 font-medium">{kpi.projets_actifs}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actions:</span>
                        <span className="ml-2 font-medium">{kpi.actions_completees}/{kpi.actions_assignees}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {latestKpi.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{latestKpi.notes}</p>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg font-medium">Aucun KPI disponible</p>
              <p className="text-sm text-muted-foreground mt-2">
                Les KPIs seront calculés automatiquement à partir des données CODIR
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
