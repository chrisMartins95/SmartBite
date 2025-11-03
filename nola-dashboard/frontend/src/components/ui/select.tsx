"use client" // ⚙️ Indica que este componente deve ser renderizado no cliente (Next.js)

// 📦 Importa React e suas tipagens
import * as React from "react"

// 🎯 Importa os componentes base do Radix UI Select
import * as SelectPrimitive from "@radix-ui/react-select"

// 🧩 Importa ícones para navegação e seleção
import { Check, ChevronDown, ChevronUp } from "lucide-react"

// 🧱 Importa utilitário para unir classes CSS dinamicamente
import { cn } from "@/lib/utils"

/* ============================================================
🧠 ESTRUTURA DO COMPONENTE SELECT
===============================================================
O Select é composto por diversas partes:
- Root ➜ container principal que controla o estado aberto/fechado
- Trigger ➜ botão que abre o select
- Content ➜ lista suspensa de opções
- Item ➜ cada opção do select
- Label ➜ título de grupo de opções
- ScrollButtons ➜ navegação quando há muitas opções
=========================================================== */

// 🏁 Componente raiz do Select
const Select = SelectPrimitive.Root

// 🧩 Agrupador de opções (usado quando há categorias)
const SelectGroup = SelectPrimitive.Group

// 💬 Exibe o valor selecionado
const SelectValue = SelectPrimitive.Value

/* ============================================================
🎯 TRIGGER — Botão que abre o menu do Select
=========================================================== */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // 💅 Estilos base (botão com borda, fundo, foco, etc.)
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    {/* ⬇️ Ícone que indica dropdown */}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/* ============================================================
⏫ SCROLL UP BUTTON — Botão de rolagem superior
=========================================================== */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" /> {/* ⬆️ Ícone de rolagem para cima */}
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/* ============================================================
⏬ SCROLL DOWN BUTTON — Botão de rolagem inferior
=========================================================== */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" /> {/* ⬇️ Ícone de rolagem para baixo */}
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/* ============================================================
📋 CONTENT — Lista suspensa com as opções
=========================================================== */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        // 🎨 Layout, animações e comportamento responsivo
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        // 📏 Ajustes quando o posicionamento é "popper"
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* 🔼 Botão de rolagem para cima */}
      <SelectScrollUpButton />

      {/* 📜 Área visível com as opções */}
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>

      {/* 🔽 Botão de rolagem para baixo */}
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/* ============================================================
🏷️ LABEL — Rótulo para grupos de opções
=========================================================== */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} // 🪶 Texto menor e em negrito
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/* ============================================================
✅ ITEM — Cada opção do Select
=========================================================== */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // 💅 Estilo base do item (foco, hover, desabilitado)
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {/* ✅ Ícone que aparece quando o item está selecionado */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    {/* 🏷️ Texto da opção */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/* ============================================================
➖ SEPARATOR — Linha divisória entre grupos de opções
=========================================================== */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)} // 📏 Linha horizontal suave
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

/* ============================================================
📤 EXPORTAÇÕES
=========================================================== */
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
