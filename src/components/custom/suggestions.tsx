import { Lightbulb, Sparkles, ArrowRight } from "lucide-react"
import { hexToRgb, suggestColorAdjustment, checkContrast } from "@/lib/contrast"
import { cn } from "@/lib/utils";

interface SuggestionsProps {
  foreground: string;
  background: string;
  needsSuggestion: boolean;
  previousRatio: number;
  onApplySuggestion: (fg: string, bg: string) => void;
}

export function Suggestions({
  foreground,
  background,
  needsSuggestion,
  onApplySuggestion,
  previousRatio,
}: SuggestionsProps) {
  if (!needsSuggestion) return null

  const fgRgb = hexToRgb(foreground)
  const bgRgb = hexToRgb(background)

  if (!fgRgb || !bgRgb) return null

  const suggestions = suggestColorAdjustment(fgRgb, bgRgb, 4.5)

  const options = [
    {
      label: "Oscurecer texto",
      description: "Mejor para fondos claros",
      fg: suggestions.darkerFg,
      bg: background,
    },
    {
      label: "Aclarar texto",
      description: "Mejor para fondos oscuros",
      fg: suggestions.lighterFg,
      bg: background,
    },
    {
      label: "Oscurecer fondo",
      description: "Mantiene el color del texto",
      fg: foreground,
      bg: suggestions.darkerBg,
    },
    {
      label: "Aclarar fondo",
      description: "Mantiene el color del texto",
      fg: foreground,
      bg: suggestions.lighterBg,
    },
  ]

  // Calculate new ratio for each suggestion
  const getNewRatio = (fg: string, bg: string) => {
    const fgRgb = hexToRgb(fg)
    const bgRgb = hexToRgb(bg)
    if (!fgRgb || !bgRgb) return null
    return checkContrast(fgRgb, bgRgb).ratio
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Sugerencias de Mejora</h3>
          <p className="text-sm text-muted-foreground">Ajustes para cumplir WCAG AA</p>
        </div>
      </div>

      <div className="grid gap-2">
        {options.map((option, index) => {
          const newRatio = getNewRatio(option.fg, option.bg)
          return (
            <button
              key={index}
              onClick={() => onApplySuggestion(option.fg, option.bg)}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-secondary/50 hover:border-foreground/20 transition-all text-left"
            >
              {/* Color Preview */}
              <div className="flex items-center gap-1">
                <div
                  className="w-8 h-8 rounded-lg border-2 border-border shadow-sm transition-transform group-hover:scale-105"
                  style={{ backgroundColor: option.fg }}
                />
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <div
                  className="w-8 h-8 rounded-lg border-2 border-border shadow-sm transition-transform group-hover:scale-105"
                  style={{ backgroundColor: option.bg }}
                />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>

              {/* New Ratio */}
              {newRatio && (
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className={cn("text-sm font-bold", previousRatio < newRatio ? "text-emerald-400" : "text-red-500")}>
                      {newRatio.toFixed(1)}:1
                    </span>
                    <Sparkles className={cn("w-3 h-3", previousRatio < newRatio ? "text-emerald-400" : "text-red-500")} />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
