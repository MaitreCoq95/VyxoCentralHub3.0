"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTemplates, getTemplatesByType } from "@/lib/codir-module";
import type { CodirTemplate } from "@/types/codir-module";
import { FileCode, Plus, Download, Eye } from "lucide-react";

export default function CodirTemplatesPage() {
  const [templates, setTemplates] = useState<CodirTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CodirTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Erreur chargement templates:', error);
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

  const templatesByType = {
    cr: templates.filter(t => t.type === 'cr'),
    decision: templates.filter(t => t.type === 'decision'),
    action: templates.filter(t => t.type === 'action'),
    projet: templates.filter(t => t.type === 'projet'),
    business_plan: templates.filter(t => t.type === 'business_plan'),
    pitch: templates.filter(t => t.type === 'pitch'),
  };

  function handleDownloadTemplate(template: CodirTemplate) {
    const element = document.createElement('a');
    const file = new Blob([template.contenu_markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.nom.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates CODIR</h1>
          <p className="text-muted-foreground mt-2">
            Templates internes pour CR, décisions, actions et projets
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Template
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Templates Par Défaut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.filter(t => t.is_default).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(templatesByType).filter(type => templatesByType[type as keyof typeof templatesByType].length > 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates par type */}
      <Tabs defaultValue="cr" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="cr">
            CR ({templatesByType.cr.length})
          </TabsTrigger>
          <TabsTrigger value="decision">
            Décisions ({templatesByType.decision.length})
          </TabsTrigger>
          <TabsTrigger value="action">
            Actions ({templatesByType.action.length})
          </TabsTrigger>
          <TabsTrigger value="projet">
            Projets ({templatesByType.projet.length})
          </TabsTrigger>
          <TabsTrigger value="business_plan">
            Business Plan ({templatesByType.business_plan.length})
          </TabsTrigger>
          <TabsTrigger value="pitch">
            Pitch ({templatesByType.pitch.length})
          </TabsTrigger>
        </TabsList>

        {Object.entries(templatesByType).map(([type, typeTemplates]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <div className="grid gap-4">
              {typeTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileCode className="h-5 w-5" />
                          {template.nom}
                          {template.is_default && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              Par défaut
                            </span>
                          )}
                        </CardTitle>
                        {template.description && (
                          <CardDescription className="mt-2">
                            {template.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Prévisualiser
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTemplate(template)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {template.tags && template.tags.length > 0 && (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}

              {typeTemplates.length === 0 && (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-muted-foreground">
                      <FileCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun template de type "{type}"</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>{selectedTemplate.nom}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6">
              <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded">
                {selectedTemplate.contenu_markdown}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
