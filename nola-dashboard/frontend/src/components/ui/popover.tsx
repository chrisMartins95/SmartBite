// 📦 Importa React (necessário para criar componentes e refs)
import * as React from "react"

// 🎯 Importa os componentes primitivos do Popover da biblioteca Radix UI
import * as PopoverPrimitive from "@radix-ui/react-popover"

// 🧱 Importa a função utilitária para combinar classes CSS dinamicamente
import { cn } from "@/lib/utils"

/* ============================================================
🧩 BASE: Popover
===============================================================
A estrutura do Popover é composta de:
- Root ➜ Componente raiz que controla estado (aberto/fechado)
- Trigger ➜ Elemento que ativa o popover (botão, ícone, etc.)
- Content ➜ Caixa de conteúdo que aparece sobre a interface
=========================================================== */

// 🏁 Componente raiz do Popover (controla abertura/fechamento)
const Popover = PopoverPrimitive.Root

// 🎯 Elemento que dispara o popover (ex: botão ou ícone)
const PopoverTrigger = PopoverPrimitive.Trigger

/* ============================================================
💬 Componente: PopoverContent
===============================================================
Container flutuante exibido quando o popover é ativado.

⚙️ Props:
- `align`: alinhamento horizontal (ex: start, center, end)
- `sideOffset`: distância do trigger (em pixels)
- `className`: classes adicionais para personalização
=========================================================== */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>, // 🔗 Tipagem correta para o ref
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> // 🧾 Herda todas as props do componente base
>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    // 🌀 Usa Portal para renderizar o conteúdo fora da hierarquia normal do DOM
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}               // 🔗 ForwardRef para controle externo (acessibilidade, focus, etc.)
        align={align}           // 📐 Alinhamento horizontal
        sideOffset={sideOffset} // 📏 Espaçamento entre o trigger e o conteúdo
        className={cn(
          // 🎨 Classes padrão (layout, animações e estilo visual)
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none \
          data-[state=open]:animate-in data-[state=closed]:animate-out \
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 \
          data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 \
          data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 \
          data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 \
          origin-[--radix-popover-content-transform-origin]",
          className // ✨ Permite adicionar classes extras via props
        )}
        {...props} // ⚙️ Repassa quaisquer outras props nativas
      />
    </PopoverPrimitive.Portal>
  )
)

// 🏷️ Define o nome do componente para aparecer corretamente no React DevTools
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/* ============================================================
📤 Exportações
===============================================================
Permite importar e usar o popover modularmente:
  import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
=========================================================== */
export { Popover, PopoverTrigger, PopoverContent }
