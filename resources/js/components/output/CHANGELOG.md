# CHANGELOG — EduStack Smart: Puck + TipTap

## 🐛 BUGS CORREGIDOS

### TipTap

| Archivo | Bug | Fix |
|---------|-----|-----|
| `MenuBar.tsx` | `editor` tipado como `Editor` pero `useEditor()` devuelve `Editor \| null` → crash al montar | Guard `if (!editor \|\| !editorState) return null` |
| `MenuBar.tsx` | `canLink: editor.can().chain().toggleLink()` — `toggleLink` NO existe en TipTap → `canLink` siempre `false` | Eliminado; la apertura del dialog no necesita ese guard |
| `MenuBar.tsx` | `window.prompt()` para insertar URL de enlace — bloquea el hilo, sin opción de quitar link, sin `target="_blank"` | Reemplazado por `LinkDialog.tsx` propio con validación, checkbox nueva pestaña y botón "Quitar enlace" |
| `MenuButton.tsx` | `flex-1` en todos los botones → todos del mismo ancho → UX terrible en la toolbar | Removido `flex-1`; cada botón usa `shrink-0` y solo el espacio que necesita |
| `TipTapEditor.tsx` | `content: value` → si `value` es `undefined` (form nuevo), TipTap lanza error | Cambiado a `content: value \|\| ''` |
| `TipTapEditorContainer.tsx` | Sin estilos para `<table>`, `<img>`, `<mark>` ni placeholder | Añadidos todos |

### Puck

| Archivo | Bug | Fix |
|---------|-----|-----|
| `GridContainer.tsx` | `items.length` como número de columnas → no puedes tener grid 3-col con 2 ítems | Prop `columns` explícita, independiente de `items.length` |
| `GridContainer.tsx` | Clases `md:grid-cols-1..20` generadas estáticamente → Tailwind JIT no las incluye → invisibles en producción | Reemplazado por `style={{ gridTemplateColumns: "repeat(N, 1fr)" }}` inline |
| `CodeBlock.tsx` | `PropsWithChildren` — Puck no serializa `children` en su Data JSON → el código desaparece al guardar | Prop `code: string` editada via `textarea` en el panel lateral |

---

## ✨ MEJORAS EN COMPONENTES EXISTENTES

### TipTap

**`MenuBar.tsx`** — Reescritura completa:
- Botones agrupados con `MenuSeparator` → barra legible (8 grupos)
- Íconos Lucide en lugar de texto puro
- Añadidos: **Underline** (Ctrl+U), **TextAlign** (L/C/R/J), **Highlight** (amarillo)
- **Tabla** — insertar + gestión inline: +col, -col, +fila, -fila, combinar, dividir, eliminar
- H5 y H6 eliminados (raramente usados)

**`TipTapEditor.tsx`** — Más extensiones:
- `Underline`, `TextAlign`, `Highlight`, `Table/Row/Header/Cell`
- `Image` — imágenes por URL (de MediaLibrary)
- `Placeholder` — texto guía por tipo de nodo
- `CharacterCount` — contador de palabras y caracteres en el pie

**`MenuButton.tsx`** — Mejorado:
- Sin `flex-1` → tamaño natural
- Soporte para `icon?: ReactNode` (Lucide)
- `tooltip` vía `title`
- Ring de foco accesible

**`TipTapEditorContainer.tsx`** — Estilos añadidos:
- Tablas (bordes, header, zebra rows, celda seleccionada)
- Imágenes centradas
- `<mark>` highlight
- Placeholder (`.is-empty::before`)
- `min-height` y `cursor-text`

**`PuckInput.tsx`** — Botón de publicar opcional:
- Props `handlePublish` y `isPublished` opcionales
- Estado "Guardando…" animado

### Puck

**`BlogImage.tsx`** — lazy loading, `decoding="async"`, 4 tamaños, alineación, link opcional, pie de imagen

**`Quote.tsx`** — 3 variantes (default/highlight/minimal), campo `role` del autor

**`Heading.tsx`** — alineación, decoraciones (subrayado de color, línea inferior), prop `text` explícita

**`Paragraph.tsx`** — alineación, tamaño (sm/base/lg), color muted, prop `text` explícita

---

## 🆕 COMPONENTES NUEVOS

### TipTap

| Archivo | Descripción |
|---------|-------------|
| `MenuSeparator.tsx` | Separador visual entre grupos de botones |
| `LinkDialog.tsx` | Diálogo de inserción/edición de enlace con validación URL y nueva pestaña |

### Puck

| Archivo | Descripción | Módulos |
|---------|-------------|---------|
| `VideoEmbed.tsx` | YouTube/Vimeo responsive con nocookie, detección de URL, caption | Posts, Events, Classroom |
| `Divider.tsx` | Separador configurable (sólido, dashed, fade, etc.) | Todos |
| `CalloutBox.tsx` | Alertas tipo info/warning/danger/success/tip | Todos |
| `RichTextBlock.tsx` | TipTap embebido como bloque Puck | Todos |
| `ButtonLink.tsx` | CTA configurable con 5 variantes y 4 alineaciones | Todos |
| `Gallery.tsx` | Grid de imágenes con lightbox, navegación, thumbnails | Projects, Events |
| `Accordion.tsx` | FAQ/Preguntas frecuentes con múltiples estilos | Events, Classroom |
| `StatsGrid.tsx` | Métricas numéricas (2/3/4 cols, 3 variantes) | Projects, Events |
| `Timeline.tsx` | Cronograma vertical/horizontal con estados done/current/upcoming | Events, Projects |

### Config

| Archivo | Descripción |
|---------|-------------|
| `puck-config.ts` | Config central + 4 variantes por módulo (blog/project/event/classroom) |

---

## 📦 DEPENDENCIAS NUEVAS NECESARIAS

```bash
# TipTap — extensiones adicionales
npm install \
  @tiptap/extension-underline \
  @tiptap/extension-text-align \
  @tiptap/extension-highlight \
  @tiptap/extension-table \
  @tiptap/extension-table-row \
  @tiptap/extension-table-header \
  @tiptap/extension-table-cell \
  @tiptap/extension-image \
  @tiptap/extension-placeholder \
  @tiptap/extension-character-count
```

> Lucide React ya debería estar instalado (viene con shadcn/ui).
> Sin lucide-react, sustituir los íconos en MenuBar.tsx con texto o SVG inline.

---

## 🗂 ESTRUCTURA FINAL

```
resources/js/
├── components/
│   ├── tiptap/
│   │   ├── MenuBar.tsx              ← reescrito
│   │   ├── MenuButton.tsx           ← mejorado
│   │   ├── MenuSeparator.tsx        ← nuevo
│   │   ├── LinkDialog.tsx           ← nuevo
│   │   ├── TipTapEditor.tsx         ← más extensiones
│   │   └── TipTapEditorContainer.tsx ← más estilos
│   └── puck/
│       ├── BlogImage.tsx            ← mejorado
│       ├── CodeBlock.tsx            ← bug fix crítico
│       ├── GridContainer.tsx        ← bug fix crítico
│       ├── Heading.tsx              ← mejorado
│       ├── Paragraph.tsx            ← mejorado
│       ├── Quote.tsx                ← mejorado
│       ├── ExternalLink.tsx         ← sin cambios
│       ├── PuckInput.tsx            ← mejorado
│       ├── VideoEmbed.tsx           ← nuevo
│       ├── Divider.tsx              ← nuevo
│       ├── CalloutBox.tsx           ← nuevo
│       ├── RichTextBlock.tsx        ← nuevo
│       ├── ButtonLink.tsx           ← nuevo
│       ├── Gallery.tsx              ← nuevo
│       ├── Accordion.tsx            ← nuevo
│       ├── StatsGrid.tsx            ← nuevo
│       └── Timeline.tsx             ← nuevo
└── lib/
    └── puck-config.ts               ← nuevo (config central + variantes)
```
