import { ChatInterface } from "@/components/ai/chat-interface"
import { useLanguage } from "@/components/language-provider"

export default function AIPage() {
  const { t } = useLanguage()

  return (
    <div className="h-full flex flex-col space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-vyxo-navy dark:text-white">{t("ai.title")}</h2>
        <p className="text-muted-foreground">{t("ai.subtitle")}</p>
      </div>
      
      <ChatInterface />
    </div>
  )
}
