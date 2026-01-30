import React from "react"
import { useCallback, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Copy, Pipette } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isValidHex, normalizeHex, hexToRgb, rgbToHex } from "@/lib/contrast"
import { copyColorClipboard } from "@/lib/color-utils"

interface ColorInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    description?: string
}

export function ColorInput({ label, value, onChange, description }: ColorInputProps) {
    const colorPickerRef = useRef<HTMLInputElement>(null)
    const [showSliders, setShowSliders] = useState(false)

    const handleColorPickerChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value.toUpperCase())
        },
        [onChange]
    )

    const handleSliderChange = useCallback(
        (type: "r" | "g" | "b", newValue: number) => {
            const rgb = hexToRgb(value)
            if (rgb) {
                const updated = { ...rgb, [type]: newValue }
                onChange(rgbToHex(updated.r, updated.g, updated.b))
            }
        },
        [value, onChange]
    )

    const rgb = hexToRgb(value)
    const isValid = isValidHex(value)
    const displayColor = isValid ? normalizeHex(value) : "#000000"

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-foreground">{label}</Label>
                {description && (
                    <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">{description}</span>
                )}
            </div>

            <div className="flex gap-3">
                {/* Color Preview / Picker */}
                <button
                    type="button"
                    onClick={() => colorPickerRef.current?.click()}
                    className="group relative h-14 w-14 rounded-xl border-2 border-border overflow-hidden cursor-pointer transition-all hover:border-foreground/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background shadow-lg"
                    style={{ backgroundColor: displayColor }}
                    aria-label={`Seleccionar color para ${label}`}
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <Pipette className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
                    <input
                        ref={colorPickerRef}
                        type="color"
                        value={displayColor}
                        onChange={handleColorPickerChange}
                        className="sr-only"
                        tabIndex={-1}
                    />
                </button>

                {/* Hex Input */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center">
                        <div className="flex items-center h-14 w-full rounded-xl border-2 border-border bg-input/50 overflow-hidden focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background transition-all">
                            <span className="px-4 text-muted-foreground font-mono text-sm bg-secondary/50 h-full flex items-center border-r border-border">#</span>
                            <Input
                                type="text"
                                value={value.replace("#", "")}
                                onChange={(e) => {
                                    const val = e.target.value.toUpperCase().replace(/[^A-F0-9]/g, "")
                                    if (val.length <= 6) {
                                        onChange("#" + val)
                                    }
                                }}
                                className={`font-mono text-sm h-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 ${!isValid && value.length > 1 ? "text-red-400" : "text-foreground"
                                    }`}
                                placeholder="000000"
                                maxLength={7}
                                aria-label={`Valor hexadecimal para ${label}`}
                            />
                            <Copy className="h-full mr-2 pl-2 border-l border-border" onClick={() => copyColorClipboard(displayColor)} />
                        </div>
                    </div>

                    {/* Toggle Sliders Button */}
                    <button
                        type="button"
                        onClick={() => setShowSliders(!showSliders)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showSliders ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        <span>{showSliders ? "Ocultar" : "Ajustar"} RGB</span>
                    </button>
                </div>
            </div>

            {/* RGB Sliders */}
            {showSliders && rgb && (
                <div className="space-y-3 pt-2 pb-2 px-4 rounded-xl bg-secondary/30 border border-border">
                    {[
                        { key: "r" as const, label: "R", gradient: "from-black via-red-500 to-red-500" },
                        { key: "g" as const, label: "G", gradient: "from-black via-green-500 to-green-500" },
                        { key: "b" as const, label: "B", gradient: "from-black via-blue-500 to-blue-500" },
                    ].map(({ key, label: sliderLabel, gradient }) => (
                        <div key={key} className="flex items-center gap-3 py-1">
                            <span className="w-5 text-xs font-mono font-semibold text-muted-foreground">
                                {sliderLabel}
                            </span>
                            <div className="flex-1 relative h-3">
                                <div className={`absolute inset-0 rounded-full bg-linear-to-r ${gradient} opacity-30`} />
                                <input
                                    type="range"
                                    min={0}
                                    max={255}
                                    value={rgb[key]}
                                    onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                                    className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-secondary"
                                    aria-label={`${sliderLabel} value for ${label}`}
                                />
                            </div>
                            <input
                                type="number"
                                min={0}
                                max={255}
                                value={rgb[key]}
                                onChange={(e) => {
                                    const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0))
                                    handleSliderChange(key, val)
                                }}
                                className="w-14 text-xs font-mono text-center bg-secondary/50 border border-border rounded-md py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
