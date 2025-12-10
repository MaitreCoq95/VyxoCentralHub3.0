"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRoadmapData } from "@/lib/codir-module";
import { formatDate, formatDateRelative } from "@/lib/codir-module/utils";
import type { RoadmapData, RoadmapPeriod } from "@/types/codir-module";
import { Map, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/codir-module/status-badge";
import { DataTable } from "@/components/codir-module/data-table";
import { ProgressBar } from "@/components/codir-module/progress-bar";

export default function CodirRoadmapPage() {
  const [period, setPeriod] = useState<RoadmapPeriod>('30j');
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap();
  }, [period]);

  async function loadRoadmap() {
    try {
      setLoading(true);
      const data = await getRoadmapData(period);
      setRoadmap(data);
    } catch (error) {
      console.error('Erreur chargement roadmap:', error);
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

  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roadmap CODIR</h1>
        <p className="text-muted-foreground mt-2">
          Vue d'ensemble des décisions, actions et projets à venir
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Éléments Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roadmap?.stats.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Par Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {roadmap?.stats.par_type && Object.entries(roadmap.stats.par_type).map(([type, count]) => (
                <div key={type} className="flex justify-between">
                  <span className="capitalize text-muted-foreground">{type}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Par Priorité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {roadmap?.stats.par_priorite && Object.entries(roadmap.stats.par_priorite).map(([prio, count]) => (
                <div key={prio} className="flex justify-between">
                  <StatusBadge type="priorite" value={Number(prio)} className="text-xs" />
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs par période */}
      <Tabs value={period} onValueChange={(v) => setPeriod(v as RoadmapPeriod)}>
        <TabsList>
          <TabsTrigger value="7j">
            <Calendar className="h-4 w-4 mr-2" />
            7 Jours
          </TabsTrigger>
          <TabsTrigger value="30j">
            <Calendar className="h-4 w-4 mr-2" />
            30 Jours
          </TabsTrigger>
          <TabsTrigger value="90j">
            <Calendar className="h-4 w-4 mr-2" />
            90 Jours
          </TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Roadmap {period}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={roadmap?.items || []}
                columns={[
                  {
                    key: 'type',
                    header: 'Type',
                    render: (item) => (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {item.type}
                      </span>
                    ),
                  },
                  {
                    key: 'titre',
                    header: 'Titre',
                    render: (item) => (
                      <div className="max-w-md">
                        <p className="font-medium">{item.titre}</p>
                      </div>
                    ),
                  },
                  {
                    key: 'responsable',
                    header: 'Responsable',
                  },
                  {
                    key: 'deadline',
                    header: 'Échéance',
                    render: (item) => (
                      <div>
                        <div className="font-medium">{formatDateRelative(item.deadline)}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(item.deadline)}</div>
                      </div>
                    ),
                  },
                  {
                    key: 'priorite',
                    header: 'Priorité',
                    render: (item) => <StatusBadge type="priorite" value={item.priorite} />,
                  },
                  {
                    key: 'avancement',
                    header: 'Avancement',
                    render: (item) => item.avancement !== undefined ? (
                      <div className="w-24">
                        <ProgressBar value={item.avancement} size="sm" showLabel={false} />
                      </div>
                    ) : '-',
                  },
                ]}
                emptyMessage={`Aucun élément prévu dans les ${period}`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
