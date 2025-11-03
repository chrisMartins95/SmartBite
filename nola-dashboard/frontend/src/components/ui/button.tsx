// 📦 Importa React (necessário para criar componentes e usar forwardRef)
import * as React from "react"

// 🔗 Importa Slot do Radix UI (permite substituir o elemento raiz dinamicamente)
import { Slot } from "@radix-ui/react-slot"

// 🎨 Importa `cva` (Class Variance Authority) e seu tipo auxiliar `VariantProps`
import { cva, type VariantProps } from "class-variance-authority"

// 🧱 Importa a função `cn` (merge inteligente de classes CSS)
import { cn } from "@/lib/utils"

/* ============================================================
🎨 Definição de variações de estilo do botão (buttonVariants)
===============================================================
Usa `cva` para centralizar todas as variações visuais e tamanhos 
do botão, permitindo uma API clara e consistente (variant + size).
=========================================================== */
const buttonVariants = cva(
  // 🎯 Classes base aplicadas a todos os botões
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
  {
    variants: {
      // 💡 Diferentes estilos visuais do botão
      variant: {
        default: "bg-primary text-primary-foreground border border-primary-border", // 💎 Padrão
        destructive: "bg-destructive text-destructive-foreground border border-destructive-border", // ❌ Erro/Perigo
        outline: "border [border-color:var(--button-outline)] shadow-xs active:shadow-none", // 📦 Contorno
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border", // 🪶 Secundário
        ghost: "border border-transparent", // 👻 Invisível, usado em ícones ou botões neutros
      },

      // 📏 Tamanhos (alturas mínimas e espaçamento interno)
      size: {
        default: "min-h-9 px-4 py-2",          // 🔹 Tamanho padrão
        sm: "min-h-8 rounded-md px-3 text-xs", // 🔸 Pequeno
        lg: "min-h-10 rounded-md px-8",        // 🔹 Grande
        icon: "h-9 w-9",                       // 🎯 Botão quadrado (ícone)
      },
    },
    // ⚙️ Valores padrão (se nenhum for especificado)
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/* ============================================================
📘 Tipagem: ButtonProps
===============================================================
Extende propriedades nativas de <button> + variantes do CVA.
O campo `asChild` permite substituir o botão por outro elemento
(útil em casos como <Link> ou <a> que se comportam como botão).
=========================================================== */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // 🔁 Permite renderizar outro elemento no lugar do botão
}

/* ============================================================
🖱️ Componente: Button
===============================================================
Componente principal reutilizável de botão.
Aceita variações (`variant`), tamanhos (`size`) e pode atuar 
como wrapper de outro componente (via `asChild`).
=========================================================== */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 🔄 Usa Slot se `asChild` for true (substitui <button> por outro elemento)
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref} // 📌 ForwardRef para integração com libs externas (Radix, React Hook Form, etc.)
        className={cn(buttonVariants({ variant, size, className }))} // 🎨 Monta classes dinâmicas
        {...props} // ⚙️ Passa as demais props (onClick, disabled, etc.)
      />
    )
  }
)

// 🏷️ Nome de exibição no DevTools
Button.displayName = "Button"

// 🧾 Exporta o componente e suas variações
export { Button, buttonVariants }
