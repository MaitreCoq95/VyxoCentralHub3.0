"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Bell, Shield, Globe, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="container py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-6">
        <div className="flex items-center gap-3 text-[hsl(var(--vyxo-navy))] dark:text-[hsl(var(--vyxo-gold))]">
          <Settings className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
            <p className="text-muted-foreground text-lg">
              Configuration de l'application et préférences
            </p>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Palette className="h-4 w-4 mr-2" />
            Préférences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Profil</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <User className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Module en construction</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  La gestion du profil utilisateur sera bientôt disponible
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de Notification</CardTitle>
              <CardDescription>
                Configurez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Module en construction</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Les paramètres de notification seront bientôt disponibles
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Shield className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Module en construction</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Les paramètres de sécurité seront bientôt disponibles
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences d'Affichage</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Palette className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Module en construction</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Les préférences d'affichage seront bientôt disponibles
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Settings Preview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Langue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Français (FR)
            </p>
            <Button size="sm" variant="outline" disabled className="w-full">
              Changer
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Thème
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Système
            </p>
            <Button size="sm" variant="outline" disabled className="w-full">
              Changer
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Activées
            </p>
            <Button size="sm" variant="outline" disabled className="w-full">
              Configurer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
