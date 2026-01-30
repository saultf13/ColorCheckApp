
export const Footer = () => {
    return (
        <footer className="border-t border-border mt-16">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        Herramienta de verificación de contraste basada en WCAG 2.1
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Hecho con accesibilidad en mente</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
