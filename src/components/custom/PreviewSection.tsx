import { MousePointer2, Star, Type, Link2, Bell, Eye } from "lucide-react"

interface PreviewSectionProps {
  foreground: string
  background: string
}

export function PreviewSection({ foreground, background }: PreviewSectionProps) {
  return (
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
      <div className="grid gap-4">
        {/* Normal Text Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
              <Type className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Texto Normal (16px)</span>
          </div>
          <div
            className="p-5 rounded-xl transition-all duration-300"
            style={{ backgroundColor: background }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: foreground }}
            >
              En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo…
            </p>
          </div>
        </div>

        {/* Large Text Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
              <Type className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Texto Grande (24px+)</span>
          </div>
          <div
            className="p-5 rounded-xl transition-all duration-300"
            style={{ backgroundColor: background }}
          >
            <p
              className="text-2xl font-bold leading-relaxed"
              style={{ color: foreground }}
            >
              En un lugar de la Mancha.
            </p>
          </div>
        </div>

        {/* UI Components Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
              <MousePointer2 className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Componentes UI</span>
          </div>
          <div
            className="p-5 rounded-xl flex flex-wrap items-center gap-3 transition-all duration-300"
            style={{ backgroundColor: background }}
          >
            {/* Primary Button */}
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: foreground,
                color: background,
              }}
            >
              Primario
            </button>

            {/* Outline Button */}
            <button
              className="px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all hover:opacity-80"
              style={{
                borderColor: foreground,
                color: foreground,
                backgroundColor: "transparent",
              }}
            >
              Secundario
            </button>

            {/* Link */}
            <a
              className="flex items-center gap-1 text-sm font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
              style={{ color: foreground }}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <Link2 className="w-3.5 h-3.5" />
              Enlace
            </a>

            {/* Icon Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: `${foreground}20`, color: foreground }}
              >
                <Star className="w-4 h-4" />
              </div>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: `${foreground}20`, color: foreground }}
              >
                <Bell className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Input Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
              <Type className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Formularios</span>
          </div>
          <div
            className="p-5 rounded-xl transition-all duration-300 space-y-3"
            style={{ backgroundColor: background }}
          >
            <div
              className="flex flex-col gap-1.5"
            >
              <label
                className="text-sm font-medium"
                style={{ color: foreground }}
              >
                Campo de texto
              </label>
              <div
                className="px-4 py-2.5 rounded-lg border-2 text-sm"
                style={{
                  borderColor: foreground,
                  color: foreground,
                  backgroundColor: "transparent",
                }}
              >
                Escribe algo aquí...
              </div>
            </div>
            <p
              className="text-xs"
              style={{ color: `${foreground}99` }}
            >
              Texto de ayuda para el campo de formulario.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
