import { copyColorClipboard } from "@/lib/color-utils"
import { type ContrastResult } from "@/lib/contrast"

interface ContrastRatioProps {
  result: ContrastResult
  foreground: string
  background: string
}

export function ContrastRatio({ result, foreground, background }: ContrastRatioProps) {
  const ratio = result.ratio.toFixed(2)

  // Determine overall quality
  const getQualityLabel = () => {
    if (result.normalAAA) return { text: "Excelente", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
    if (result.normalAA) return { text: "Bueno", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
    if (result.largeAA) return { text: "Aceptable", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" }
    return { text: "Insuficiente", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" }
  }

  const quality = getQualityLabel()

  // Calculate percentage for visual indicator (21:1 is max contrast)
  const percentage = Math.min((result.ratio / 21) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Color Swatches */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-xl border-2 border-border shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: foreground }}
            onClick={() => copyColorClipboard(foreground)}
          />
          <div className="text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Texto</p>
            <p className="font-mono text-sm text-foreground">{foreground}</p>
          </div>
        </div>

        <div className="text-muted-foreground text-2xl font-light">/</div>

        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-xl border-2 border-border shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: background }}
            onClick={() => copyColorClipboard(background)}
          />
          <div className="text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Fondo</p>
            <p className="font-mono text-sm text-foreground">{background}</p>
          </div>
        </div>
      </div>

      {/* Main Ratio Display */}
      <div className="text-center py-6">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
          Ratio de Contraste
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-6xl md:text-7xl font-bold text-foreground tabular-nums tracking-tight">
            {ratio}
          </span>
          <span className="text-3xl text-muted-foreground font-light">:1</span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${result.normalAAA
              ? "bg-linear-to-r from-emerald-600 to-emerald-400"
              : result.normalAA
                ? "bg-linear-to-r from-emerald-600 to-emerald-500"
                : result.largeAA
                  ? "bg-linear-to-r from-amber-600 to-amber-400"
                  : "bg-linear-to-r from-red-600 to-red-400"
              }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1:1</span>
          <span>21:1</span>
        </div>
      </div>

      {/* Quality Badge */}
      <div className="flex justify-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${quality.bg} border ${quality.border}`}>
          <div className={`w-2 h-2 rounded-full ${quality.color.replace('text-', 'bg-')}`} />
          <span className={`text-sm font-medium ${quality.color}`}>
            {quality.text}
          </span>
        </div>
      </div>
    </div>
  )
}
