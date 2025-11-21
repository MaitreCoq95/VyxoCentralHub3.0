import { useLanguage } from "@/components/language-provider"

export default function AIPage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("ai.title")}</h1>
        <p className="text-muted-foreground mt-2">{t("ai.subtitle")}</p>
      </div>

      <div className="flex items-center justify-center h-[60vh] border-2 border-dashed border-vyxo-gold/20 rounded-xl">
        <div className="text-center space-y-4">
          <div className="text-6xl">🚧</div>
          <h2 className="text-2xl font-bold">Module AI en cours de configuration</h2>
          <p className="text-muted-foreground max-w-md">
            Le module d'intelligence artificielle sera bientôt disponible.<br/>
            Nous travaillons actuellement sur l'intégration de Walter et Agent-Audit.
          </p>
        </div>
      </div>
    </div>
  )
}
