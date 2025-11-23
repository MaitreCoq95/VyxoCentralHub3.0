"use client"

import { useState } from "react"
import { ChecklistPanel } from "@/components/audit/execution/checklist-panel"
import { FindingEditor } from "@/components/audit/execution/finding-editor"
import { EvidencePanel } from "@/components/audit/execution/evidence-panel"

// Mock data for development
const MOCK_CHECKLISTS = [
  {
    id: "1",
    audit_id: "123",
    title: "4. Contexte de l'organisme",
    description: "Compréhension de l'organisme et de son contexte",
    category: "ISO 9001",
    is_template: false,
    created_at: new Date().toISOString(),
    items: [
      { id: "c1", checklist_id: "1", requirement: "L'organisme a-t-il déterminé les enjeux externes et internes ?", reference: "4.1", order_index: 1, guidance: null, created_at: "" },
      { id: "c2", checklist_id: "1", requirement: "Les parties intéressées pertinentes sont-elles identifiées ?", reference: "4.2", order_index: 2, guidance: null, created_at: "" },
      { id: "c3", checklist_id: "1", requirement: "Le domaine d'application du SMQ est-il déterminé et documenté ?", reference: "4.3", order_index: 3, guidance: null, created_at: "" },
    ]
  },
  {
    id: "2",
    audit_id: "123",
    title: "5. Leadership",
    description: "Leadership et engagement",
    category: "ISO 9001",
    is_template: false,
    created_at: new Date().toISOString(),
    items: [
      { id: "l1", checklist_id: "2", requirement: "La direction démontre-t-elle son leadership et son engagement ?", reference: "5.1", order_index: 1, guidance: null, created_at: "" },
      { id: "l2", checklist_id: "2", requirement: "La politique qualité est-elle établie et communiquée ?", reference: "5.2", order_index: 2, guidance: null, created_at: "" },
    ]
  }
]

export default function AuditExecutionPage({ params }: { params: { id: string } }) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleSaveFinding = (data: any) => {
    console.log("Saving finding:", data)
    // TODO: Implement save logic
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Left Column: Checklist (25%) */}
      <div className="w-1/4 min-w-[300px] max-w-[400px]">
        <ChecklistPanel 
          checklists={MOCK_CHECKLISTS}
          selectedItemId={selectedItemId}
          onSelectItem={setSelectedItemId}
        />
      </div>

      {/* Center Column: Finding Editor (50%) */}
      <div className="flex-1 min-w-[500px] border-r">
        <FindingEditor 
          itemId={selectedItemId}
          onSave={handleSaveFinding}
        />
      </div>

      {/* Right Column: Evidence (25%) */}
      <div className="w-1/4 min-w-[300px] max-w-[400px]">
        <EvidencePanel />
      </div>
    </div>
  )
}
