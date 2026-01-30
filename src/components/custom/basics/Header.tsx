import { Download, Share2, Sparkles } from "lucide-react"
import { Button } from "../../ui/button"
import { useCallback } from "react"
import { toast } from "sonner";

interface Props {
    foreground: string;
    background: string;
    displayFg: string;
    displayBg: string;
}

export const Header = ({ foreground, background, displayFg, displayBg }: Props) => {

    // Copy permalink
    const handleCopyPermalink = useCallback(() => {
        const fg = foreground.replace("#", "")
        const bg = background.replace("#", "")
        const url = `${window.location.origin}${window.location.pathname}?fcolor=${fg}&bcolor=${bg}`

        navigator.clipboard.writeText(url)
        toast.success("El permalink ha sido copiado al portapapeles.");

    }, [foreground, background, toast])

    // TODO: hacer descarga de aplicación de escritorio
    const handleDownloadApp = () => {

    }

    return (
        <header className="relative overflow-hidden">
            {/* Gradient Background Effect */}
            <div
                className="absolute inset-0 opacity-20 transition-all duration-500"
                style={{
                    background: `linear-gradient(135deg, ${displayFg}40 0%, transparent 50%, ${displayBg}40 100%)`
                }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />

            <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium text-muted-foreground">
                            <Sparkles className="w-3 h-3" />
                            WCAG 2.1 Compliant
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
                            Verificador de Contraste
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                            Comprueba la accesibilidad de tus combinaciones de colores según las pautas WCAG 2.1
                        </p>
                    </div>
                    <div className=" flex flex-col space-y-3">
                        <Button
                            variant="outline"
                            onClick={handleDownloadApp}
                            className="gap-2 bg-transparent hover:bg-secondary/50 self-start md:self-auto"
                        >
                            <Download className="w-4 h-4" />
                            Descargar app escritorio
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleCopyPermalink}
                            className="gap-2 bg-transparent hover:bg-secondary/50 self-start md:self-auto"
                        >
                            <Share2 className="w-4 h-4" />
                            Compartir enlace
                        </Button>

                    </div>
                </div>
            </div>
        </header>
    )
}
