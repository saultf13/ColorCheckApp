import type { ContrastResult } from "@/lib/contrast";
import { ComplianceBadge } from "./ComplianceBadge";
import { CheckCircle2 } from "lucide-react";

interface Props {
    result: ContrastResult;
}
export const ComplianceGrid = ({ result }: Props) => {
    return (
        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                </div>
                <div>
                    <h2 className="font-semibold text-foreground">Cumplimiento WCAG</h2>
                    <p className="text-sm text-muted-foreground">Niveles de accesibilidad</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {/* Normal Text */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Texto Normal
                    </h3>
                    <div className="space-y-2">
                        <ComplianceBadge
                            label="Nivel AA"
                            passed={result.normalAA}
                            requiredRatio="4.5:1"
                        />
                        <ComplianceBadge
                            label="Nivel AAA"
                            passed={result.normalAAA}
                            requiredRatio="7:1"
                        />
                    </div>
                </div>

                {/* Large Text */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Texto Grande
                    </h3>
                    <div className="space-y-2">
                        <ComplianceBadge
                            label="Nivel AA"
                            passed={result.largeAA}
                            requiredRatio="3:1"
                        />
                        <ComplianceBadge
                            label="Nivel AAA"
                            passed={result.largeAAA}
                            requiredRatio="4.5:1"
                        />
                    </div>
                </div>

                {/* Graphics - Full Width */}
                <div className="sm:col-span-2 pt-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Componentes UI y Gráficos
                    </h3>
                    <ComplianceBadge
                        label="WCAG 2.1 AA"
                        passed={result.graphicsAA}
                        requiredRatio="3:1"
                    />
                </div>
            </div>
        </div>
    )
}
