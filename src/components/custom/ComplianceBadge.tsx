import { Check, X } from "lucide-react"

interface ComplianceBadgeProps {
  label: string
  passed: boolean
  requiredRatio: string
}

export function ComplianceBadge({ label, passed, requiredRatio }: ComplianceBadgeProps) {
  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${passed
          ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/30"
          : "bg-red-500/5 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30"
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${passed
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
            }`}
        >
          {passed ? (
            <Check className="w-4 h-4" strokeWidth={3} />
          ) : (
            <X className="w-4 h-4" strokeWidth={3} />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className={`text-xs ${passed ? "text-emerald-400/70" : "text-red-400/70"}`}>
            {passed ? "Cumple" : "No cumple"}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs text-muted-foreground">Requerido</span>
        <p className="text-sm font-mono text-foreground">
          {requiredRatio}
        </p>
      </div>
    </div>
  )
}
