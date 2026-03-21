# Opciones para el Form Builder de EduStack Smart

**Contexto:** Laravel 12 + Inertia.js + React + Tailwind CSS

---

## El problema a resolver

Tienes un módulo `Forms` con 5 migraciones, catálogo `form_types`, lógica condicional entre campos,
y respuestas polimórficas (event registrations + course enrollments). Necesitas una interfaz para:

1. Que un admin **diseñe** formularios (drag-drop de campos)
2. Que un usuario **rellene** el formulario publicado
3. Que las respuestas queden asociadas al `Registration` o `Enrollment` correspondiente

---

## Opción A — React Hook Form + Zod (render desde JSON Schema)

**Enfoque:** El admin define la estructura del form en la BD (tabla `form_fields` con JSON).
El frontend lo convierte dinámicamente a campos RHF.

```tsx
// Estructura en BD
type FieldDefinition = {
  id: string;
  type: 'text' | 'email' | 'select' | 'checkbox' | 'textarea' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];          // Para select/radio/checkbox
  validation?: {
    min?: number; max?: number; pattern?: string; message?: string;
  };
  // Lógica condicional
  showIf?: { fieldId: string; operator: '==' | '!=' | 'includes'; value: string };
};

// Renderer dinámico
function DynamicForm({ fields, onSubmit }) {
  const schema = buildZodSchema(fields);    // generado de FieldDefinition[]
  const form = useForm({ resolver: zodResolver(schema) });
  const watchedValues = form.watch();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fields
        .filter(f => evaluateCondition(f.showIf, watchedValues))  // lógica condicional
        .map(field => <DynamicField key={field.id} field={field} form={form} />)}
    </form>
  );
}
```

**Ventajas:**
- Sin dependencias extra — solo `react-hook-form` y `zod` (probablemente ya las tienes)
- Control total sobre el diseño y estilos (Tailwind)
- Integración nativa con Inertia.js (`useForm` de Inertia o RHF)
- Lógica condicional implementada tú mismo con `watch()`
- Perfecto si ya tienes el schema de campos definido en Laravel

**Desventajas:**
- Necesitas construir el UI del **diseñador** de campos (admin interface)
- Más código inicial (~500 líneas para el sistema completo)

**Recomendado para:** cuando quieres máximo control y ya tienes la estructura de BD.

---

## Opción B — Puck como Form Builder (drag-drop visual)

**Enfoque:** Reutilizar Puck (que ya tienes) para diseñar formularios.
Cada campo es un componente Puck con su config de validación.

```tsx
// Componentes Puck para campos de formulario
const FormFieldText: ComponentConfig = {
  label: 'Campo de texto',
  fields: {
    label:       { type: 'text' },
    placeholder: { type: 'text' },
    required:    { type: 'radio', options: [{label:'Sí', value:true}, {label:'No', value:false}] },
    validation:  { type: 'text', label: 'Regex de validación (opcional)' },
  },
  render: ({ label, placeholder, required }) => (
    <div className="flex flex-col gap-1 my-3">
      <label className="text-sm font-medium">{label}{required && ' *'}</label>
      <input type="text" placeholder={placeholder} className="border rounded px-3 py-2" />
    </div>
  ),
};

// El Puck Data JSON se guarda en form.structure (JSON en BD)
// Al renderizar el form al usuario, se convierte a RHF fields
```

**Ventajas:**
- Drag-drop de campos ya resuelto por Puck
- Consistencia con el editor de Posts/Events/etc.
- El JSON de Puck = la definición del formulario
- Visual para el admin sin código

**Desventajas:**
- Puck no fue diseñado para forms (falta validación nativa, submit, etc.)
- Necesitas transformar el Puck Data JSON a campos RHF para el usuario final
- Lógica condicional más difícil de implementar en el panel de Puck

**Recomendado para:** si quieres reutilizar lo que ya tienes y los forms son relativamente simples.

---

## Opción C — Form Builder dedicado (solución completa)

**Enfoque:** UI dedicada de drag-drop con `@dnd-kit/core`, diseñada específicamente para forms.
Más trabajo inicial pero la mejor experiencia para admin y usuario.

```
Arquitectura:
  FormBuilder (admin)
    ├── FieldPalette          → lista de tipos de campo arrastrables
    ├── FormCanvas            → área donde se arrastran y ordenan campos
    ├── FieldConfigPanel      → panel lateral: label, validaciones, condicionales
    └── FormPreview           → tab preview del form final

  FormRenderer (usuario final)
    ├── DynamicForm           → RHF + Zod generado del JSON
    ├── ConditionalLogic      → evalúa showIf en tiempo real
    └── SubmitHandler         → POST a /api/forms/{id}/responses
```

**Stack sugerido:**
```bash
npm install @dnd-kit/core @dnd-kit/sortable react-hook-form zod
```

**Ventajas:**
- UX optimizada tanto para admin como para usuario
- Soporta lógica condicional compleja
- Reutilizable para todos los módulos (Events, Classroom, etc.)
- El JSON del form puede variar por tipo (`form_types`) con validaciones propias

**Desventajas:**
- Mayor inversión de tiempo (~2-3 días para la v1 completa)
- `@dnd-kit` tiene curva de aprendizaje

**Recomendado para:** cuando los forms son core del negocio y necesitas lógica condicional robusta.

---

## Opción D — Biblioteca externa

### D1. React JSON Schema Form (RJSF)
```bash
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8
```
```tsx
import Form from '@rjsf/core';
const schema = { type: 'object', properties: { name: { type: 'string', title: 'Nombre' } } };
<Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit} />
```
- Pro: estándar, muy completo, validación JSON Schema
- Con: difícil de estilizar con Tailwind, genera HTML propio

### D2. Formily (Alibaba)
```bash
npm install @formily/core @formily/react
```
- Pro: lógica condicional de primera clase, muy potente
- Con: API compleja, documentación principalmente en chino

### D3. React Flow + Custom (para forms muy complejos)
- Usar React Flow para visualizar dependencias entre campos
- Overkill para la mayoría de casos de EduStack

**Recomendado para:** D1 si necesitas algo funcional muy rápido sin diseño personalizado.

---

## Mi recomendación para EduStack Smart

**Combinar A + B:**

1. **Para forms simples** (registro a evento, inscripción a curso):
   → **Opción B (Puck)** — agrega `FormFieldText`, `FormFieldSelect`, `FormFieldCheckbox`
   como componentes Puck en un config `formPuckConfig` separado.

2. **Para forms complejos** con lógica condicional (encuestas, evaluaciones, rúbricas):
   → **Opción A (RHF + Zod)** con un UI de diseñador propio simple (tabla editable, sin drag-drop).

3. **A futuro si escala:**
   → Migrar a **Opción C** con `@dnd-kit` cuando el módulo Forms sea más crítico.

---

## Componentes Puck para empezar (Opción B)

Estos 6 componentes cubren el 90% de forms académicos:

| Componente Puck   | Tipo HTML      | Uso típico                          |
|-------------------|----------------|-------------------------------------|
| `FormFieldText`   | `input[text]`  | Nombre, título del proyecto         |
| `FormFieldEmail`  | `input[email]` | Correo de contacto                  |
| `FormFieldSelect` | `<select>`     | Carrera, semestre, categoría        |
| `FormFieldTextarea` | `<textarea>` | Descripción, justificación          |
| `FormFieldCheckbox` | `input[checkbox]` | Aceptar términos, confirmar asistencia |
| `FormFieldFile`   | `input[file]`  | Subir CV, portafolio (via MediaLibrary) |

Con estos + RHF para el submit + tu tabla `form_responses` en Laravel tienes un sistema completo.

---

## Dependencias necesarias (por opción)

```bash
# Opción A y B (mínimo)
npm install react-hook-form zod @hookform/resolvers

# Opción C (completa)
npm install react-hook-form zod @hookform/resolvers @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Opción D1 (RJSF)
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @rjsf/tailwind
```
