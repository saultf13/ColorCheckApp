// Utility functions for contrast calculation following WCAG guidelines

export interface RGB {
    r: number
    g: number
    b: number
}

export interface ContrastResult {
    ratio: number
    normalAA: boolean
    normalAAA: boolean
    largeAA: boolean
    largeAAA: boolean
    graphicsAA: boolean
}

// Convert hex color to RGB
export function hexToRgb(hex: string): RGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16)
                return hex.length === 1 ? "0" + hex : hex
            })
            .join("")
    )
}

// Calculate relative luminance according to WCAG 2.1
export function getLuminance(rgb: RGB): number {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
        v = v / 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: RGB, color2: RGB): number {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
}

// Check all WCAG compliance levels
export function checkContrast(foreground: RGB, background: RGB): ContrastResult {
    const ratio = getContrastRatio(foreground, background)

    return {
        ratio,
        // WCAG AA: 4.5:1 for normal text
        normalAA: ratio >= 4.5,
        // WCAG AAA: 7:1 for normal text
        normalAAA: ratio >= 7,
        // WCAG AA: 3:1 for large text (18pt+ or 14pt bold)
        largeAA: ratio >= 3,
        // WCAG AAA: 4.5:1 for large text
        largeAAA: ratio >= 4.5,
        // WCAG 2.1 AA: 3:1 for graphical objects and UI components
        graphicsAA: ratio >= 3,
    }
}

// Validate hex color
export function isValidHex(hex: string): boolean {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

// Normalize hex (ensure # prefix and 6 digits)
export function normalizeHex(hex: string): string {
    let h = hex.replace("#", "")
    if (h.length === 3) {
        h = h
            .split("")
            .map((c) => c + c)
            .join("")
    }
    return "#" + h.toUpperCase()
}

// Suggest color adjustments to meet contrast requirements
export function suggestColorAdjustment(
    foreground: RGB,
    background: RGB,
    targetRatio: number = 4.5
): { lighterFg: string; darkerFg: string; lighterBg: string; darkerBg: string } {
    const step = 5

    // Find lighter foreground
    let lighterFg = { ...foreground }
    while (getContrastRatio(lighterFg, background) < targetRatio && lighterFg.r < 255) {
        lighterFg = {
            r: Math.min(255, lighterFg.r + step),
            g: Math.min(255, lighterFg.g + step),
            b: Math.min(255, lighterFg.b + step),
        }
    }

    // Find darker foreground
    let darkerFg = { ...foreground }
    while (getContrastRatio(darkerFg, background) < targetRatio && darkerFg.r > 0) {
        darkerFg = {
            r: Math.max(0, darkerFg.r - step),
            g: Math.max(0, darkerFg.g - step),
            b: Math.max(0, darkerFg.b - step),
        }
    }

    // Find lighter background
    let lighterBg = { ...background }
    while (getContrastRatio(foreground, lighterBg) < targetRatio && lighterBg.r < 255) {
        lighterBg = {
            r: Math.min(255, lighterBg.r + step),
            g: Math.min(255, lighterBg.g + step),
            b: Math.min(255, lighterBg.b + step),
        }
    }

    // Find darker background
    let darkerBg = { ...background }
    while (getContrastRatio(foreground, darkerBg) < targetRatio && darkerBg.r > 0) {
        darkerBg = {
            r: Math.max(0, darkerBg.r - step),
            g: Math.max(0, darkerBg.g - step),
            b: Math.max(0, darkerBg.b - step),
        }
    }

    return {
        lighterFg: rgbToHex(lighterFg.r, lighterFg.g, lighterFg.b),
        darkerFg: rgbToHex(darkerFg.r, darkerFg.g, darkerFg.b),
        lighterBg: rgbToHex(lighterBg.r, lighterBg.g, lighterBg.b),
        darkerBg: rgbToHex(darkerBg.r, darkerBg.g, darkerBg.b),
    }
}
