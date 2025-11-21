"use client"

import { useState } from "react"
import { useChat } from "ai"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

export function ChatInterface() {
  const [agent, setAgent] = useState("walter-cash")
  const { t } = useLanguage()
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    body: { agent },
  })

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
            <div className={cn("p-3 rounded-xl transition-colors", 
                agent === 'walter-cash' ? "bg-vyxo-gold/10 text-vyxo-gold" : "bg-emerald-500/10 text-emerald-500"
            )}>
                <Bot className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-bold text-lg">{t("ai.title")}</h3>
                <p className="text-xs text-muted-foreground">{t("ai.selectAgent")}</p>
            </div>
        </div>
        <Select value={agent} onValueChange={setAgent}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("ai.selectAgent")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="walter-cash">{t("ai.walter")}</SelectItem>
            <SelectItem value="agent-audit">{t("ai.agentAudit")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-vyxo-gold/20 shadow-lg">
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground mt-20 opacity-50">
                        <Sparkles className="h-12 w-12 mb-4" />
                        <p>{t("ai.startPrompt")} {agent === 'walter-cash' ? 'Walter' : 'Agent-Audit'}.</p>
                    </div>
                )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex w-full",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "flex max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                    m.role === "user" 
                        ? "bg-vyxo-navy text-white rounded-br-none" 
                        : "bg-slate-100 dark:bg-slate-800 text-foreground rounded-bl-none"
                  )}>
                    {m.role !== "user" && (
                        <div className="mr-3 mt-0.5">
                            <Bot className="h-4 w-4 text-vyxo-gold" />
                        </div>
                    )}
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start w-full">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-vyxo-gold rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-vyxo-gold rounded-full animate-bounce delay-75" />
                        <div className="w-2 h-2 bg-vyxo-gold rounded-full animate-bounce delay-150" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={agent === 'walter-cash' ? t("ai.placeholder.walter") : t("ai.placeholder.audit")}
                className="flex-1 bg-white dark:bg-black"
              />
              <Button type="submit" size="icon" className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
