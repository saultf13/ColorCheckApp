import { Info } from 'lucide-react'

export const InfoSection = () => {
    return (
        <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Info className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Guía de Accesibilidad</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        title: "¿Qué es WCAG?",
                        description: "Las Pautas de Accesibilidad para el Contenido Web (WCAG) son estándares internacionales que hacen el contenido web más accesible para todos los usuarios."
                    },
                    {
                        title: "Niveles AA vs AAA",
                        description: "AA es el nivel mínimo recomendado para sitios web comerciales. AAA ofrece la máxima accesibilidad pero puede limitar las opciones de diseño."
                    },
                    {
                        title: "Texto Grande",
                        description: "Se considera texto grande cuando es de 18pt (24px) o más, o 14pt (18.66px) en negrita. Requiere menor contraste para ser legible."
                    }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="group p-6 rounded-xl bg-card/30 border border-border hover:bg-card/50 hover:border-border/80 transition-all duration-300"
                    >
                        <h3 className="font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
