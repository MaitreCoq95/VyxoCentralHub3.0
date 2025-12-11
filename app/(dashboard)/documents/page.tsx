"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Upload, File, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-6">
        <div className="flex items-center gap-3 text-[hsl(var(--vyxo-navy))] dark:text-[hsl(var(--vyxo-gold))]">
          <FolderOpen className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground text-lg">
              Gestion des documents et fichiers
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle>Gestionnaire de Documents</CardTitle>
          <CardDescription>
            Module de gestion documentaire - En cours de développement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Module en construction</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Le module de gestion documentaire sera bientôt disponible.
              Vous pourrez y gérer vos fichiers, dossiers et partages.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" disabled>
                <Upload className="h-4 w-4 mr-2" />
                Uploader un fichier
              </Button>
              <Button variant="outline" disabled>
                <Folder className="h-4 w-4 mr-2" />
                Créer un dossier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Features Preview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload & Partage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Uploadez et partagez vos documents en toute sécurité
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Organisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Organisez vos fichiers avec des dossiers et tags
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <File className="h-4 w-4" />
              Versioning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Gardez un historique des versions de vos documents
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
