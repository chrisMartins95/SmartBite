// 📦 Importa React e utilitários de tipagem
import * as React from "react"

// 🎨 Importa utilitário cva (Class Variance Authority) para lidar com variações de estilo
import { cva, type VariantProps } from "class-variance-authority"

/* ============================================================
🧩 Função utilitária: cn()
===============================================================
Concatena classes CSS de forma segura:
- Ignora valores falsy (false, null, undefined, etc.)
- Junta as classes válidas com espaço entre elas
💡 Evita repetição e mantém o código de classes mais limpo
=========================================================== */
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ")

/* ============================================================
🎨 badgeVariants — Configuração de estilos do componente Badge
===============================================================
Usa o `cva` (Class Variance Authority) para definir diferentes 
estilos (variants) para o Badge, como `default`, `secondary`, etc.
=========================================================== */
const badgeVariants = cva(
  // 🎯 Estilos base aplicados em todos os badges
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate",
  {
    variants: {
      variant: {
        // 🌈 Variações visuais do componente
        default: "border-transparent bg-primary text-primary-foreground shadow-xs", // 💎 Padrão
        secondary: "border-transparent bg-secondary text-secondary-foreground",      // 🪶 Secundário
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-xs", // ❌ Alerta/erro
        outline: "border [border-color:var(--badge-outline)] shadow-xs",             // 📦 Com borda
      },
    },
    // 🧩 Define o estilo padrão quando nenhum variant é passado
    defaultVariants: {
      variant: "default",
    },
  }
)

/* ============================================================
📘 Tipagem: BadgeProps
===============================================================
Extende propriedades padrão de <div> e inclui as variantes 
definidas acima (para autocomplete e tipagem segura).
=========================================================== */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/* ============================================================
🏷️ Componente: Badge
===============================================================
Componente visual simples para exibir rótulos, categorias 
ou status. Usa variações de cor e estilo conforme definido 
em `badgeVariants`.
=========================================================== */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)} // 🧱 Aplica estilos + variantes
      {...props} // ⚙️ Permite atributos adicionais (ex: title, onClick, etc.)
    />
  )
}

// 🧾 Exporta o componente Badge e suas variações de estilo
export { Badge, badgeVariants }
