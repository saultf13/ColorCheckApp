import { useState, useMemo, useCallback, useEffect } from "react"
import { ArrowUpDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContrastRatio } from "./components/custom/contrast-ratio"
import { PreviewSection } from "./components/custom/preview-section"
import { Suggestions } from "./components/custom/suggestions"
import {
    hexToRgb,
    checkContrast,
    isValidHex,
    normalizeHex,
    type ContrastResult,

} from "@/lib/contrast"
import { ColorInput } from "./components/custom/ColorInput"
import { Header } from "./components/custom/basics/Header"
import { Footer } from "./components/custom/basics/Footer"
import { InfoSection } from "./components/custom/basics/InfoSection"
import { ComplianceGrid } from "./components/custom/ComplianceGrid"

const DEFAULT_FOREGROUND = "#551A8B"
const DEFAULT_BACKGROUND = "#D4F1F4"

export function ColorCheckApp() {
    const [foreground, setForeground] = useState(DEFAULT_FOREGROUND)
    const [background, setBackground] = useState(DEFAULT_BACKGROUND)
    //const { toast } = useToast();

    // Read colors from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const fColor = params.get("fcolor")
        const bColor = params.get("bcolor")

        if (fColor && isValidHex(fColor)) {
            setForeground(normalizeHex(fColor))
        }
        if (bColor && isValidHex(bColor)) {
            setBackground(normalizeHex(bColor))
        }
    }, [])

    // Calculate contrast result
    const result: ContrastResult | null = useMemo(() => {
        const fgRgb = hexToRgb(foreground)
        const bgRgb = hexToRgb(background)

        if (!fgRgb || !bgRgb) return null

        return checkContrast(fgRgb, bgRgb)
    }, [foreground, background])

    // Swap colors
    const handleSwap = useCallback(() => {
        setForeground(background)
        setBackground(foreground)
    }, [foreground, background])

    // Apply suggestion
    const handleApplySuggestion = useCallback((fg: string, bg: string) => {
        setForeground(fg.toUpperCase())
        setBackground(bg.toUpperCase())
    }, [])

    // Get display colors
    const displayFg = isValidHex(foreground) ? normalizeHex(foreground) : "#000000"
    const displayBg = isValidHex(background) ? normalizeHex(background) : "#FFFFFF"

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header with Live Color Preview */}
            <Header foreground={foreground} background={background} displayFg={displayFg} displayBg={displayBg} />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Main Color Display */}
                <div
                    className="relative rounded-2xl overflow-hidden mb-8 transition-all duration-300"
                    style={{ backgroundColor: displayBg }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--background)_49%,var(--background)_51%,transparent_51%,transparent_100%)] opacity-10" />
                    <div className="p-8 md:p-12 flex flex-col items-center justify-center min-h-50">
                        <p
                            className="text-4xl md:text-6xl font-bold text-center transition-colors duration-300"
                            style={{ color: displayFg }}
                        >
                            Aa
                        </p>
                        <p
                            className="mt-4 text-lg md:text-xl text-center transition-colors duration-300"
                            style={{ color: displayFg }}
                        >
                            Vista previa en tiempo real
                        </p>
                    </div>

                    {/* Ratio Badge Overlay */}
                    {result && (
                        <div className="absolute bottom-4 right-4">
                            <div
                                className={`px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${result.normalAA
                                    ? "bg-emerald-500/20 border-emerald-500/30"
                                    : "bg-red-500/20 border-red-500/30"
                                    }`}
                            >
                                <span
                                    className={`text-sm font-bold ${result.normalAA ? "text-emerald-400" : "text-red-400"
                                        }`}
                                >
                                    {result.ratio.toFixed(2)}:1
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column - Color Inputs */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Color Pickers */}
                        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-border">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-foreground">Selección de Colores</h2>
                                    <p className="text-sm text-muted-foreground">Ajusta los colores para verificar</p>
                                </div>
                            </div>
                            {/* Foreground color picker */}
                            <ColorInput
                                label="Primer Plano"
                                value={foreground}
                                onChange={setForeground}
                                description="Texto"
                            />

                            {/* Swap Button */}
                            <div className="flex justify-center py-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSwap}
                                    className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full px-6"
                                    aria-label="Intercambiar colores"
                                >
                                    <ArrowUpDown className="w-4 h-4" />
                                    Intercambiar
                                </Button>
                            </div>
                            {/* Background color picker */}
                            <ColorInput
                                label="Fondo"
                                value={background}
                                onChange={setBackground}
                                description="Background"
                            />
                        </div>

                        {/* Suggestions */}
                        {result && !result.normalAA && (
                            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                                <Suggestions
                                    foreground={displayFg}
                                    background={displayBg}
                                    needsSuggestion={!result.normalAA}
                                    onApplySuggestion={handleApplySuggestion}
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Column - Results */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Contrast Ratio Display */}
                        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                            {result ? (
                                <ContrastRatio result={result} foreground={displayFg} background={displayBg} />
                            ) : (
                                <div className="text-center text-muted-foreground py-8">
                                    Ingresa colores válidos para ver el resultado
                                </div>
                            )}
                        </div>

                        {/* WCAG Compliance Grid */}
                        {result && (<ComplianceGrid result={result} />)}

                        {/* Preview Section */}
                        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-border mb-6">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-foreground">Vista Previa Detallada</h2>
                                    <p className="text-sm text-muted-foreground">Ejemplos de uso real</p>
                                </div>
                            </div>
                            <PreviewSection foreground={displayFg} background={displayBg} />
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <InfoSection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}
