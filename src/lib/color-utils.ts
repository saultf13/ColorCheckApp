import { toast } from "sonner";

export const copyColorClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    toast.success("El color ha sido copiado al portapapeles.");
}
