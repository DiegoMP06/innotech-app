
---

# 🚀 EduStack Smart

![Logo](https://github.com/DiegoMP06/innotech-app/blob/main/public/logo.webp)

> Plataforma académica empresarial desacoplada con inteligencia artificial local y arquitectura orientada a eventos.

---

## 📖 Overview

**EduStack Smart** es una plataforma académica diseñada bajo un enfoque de **Investigación + Desarrollo Tecnológico (I+DT)** para centralizar la gestión institucional, trazabilidad de proyectos tecnológicos y asistencia educativa inteligente.

El sistema implementa una arquitectura moderna basada en:

* API Headless
* SSR híbrido
* RBAC granular
* Procesamiento asíncrono
* Comunicación en tiempo real
* IA ejecutada en el navegador

---

## 🏗 Arquitectura

### 🔹 Backend (Core API)

* PHP 8.3
* Laravel 12
* PostgreSQL
* Redis
* Laravel Sanctum (SPA Authentication)
* Laravel Reverb (WebSockets)
* Spatie MediaLibrary (Multimedia processing)

**Principios:**

* API-First Design
* Clean Architecture
* Service Layer Pattern
* Event-Driven Architecture
* Stateless Backend

---

### 🔹 Frontend Público

* Astro (SSR Mode)
* React (Astro Islands)
* TypeScript
* View Transitions API

**Optimización:**

* Server-Side Rendering
* Selective Hydration
* Lazy Loading
* Minimal JS Bundle

---

### 🔹 Panel Administrativo

* Laravel + Inertia.js + React

Permite:

* Gestión de usuarios
* Control RBAC
* Administración de eventos
* Gestión de proyectos
* Configuración institucional

---

## 👥 Roles del Sistema (RBAC)

| Rol           | Permisos                   |
| ------------- | -------------------------- |
| 🔐 Admin      | Control total              |
| 👤 Member     | Blog y Eventos             |
| 👨‍🏫 Teacher | Proyectos y Classroom      |
| 🎓 Student    | Participación en proyectos |
| 👀 Visitor    | Acceso público             |

El acceso se controla mediante:

* Middleware
* Policies
* Restricción de consultas
* Validación por endpoint

---

## 🧩 Módulos

* ✔ Autenticación segura (Sanctum)
* ✔ Administración de App
* ✔ Gestión de Proyectos con versionado SemVer
* ✔ Blog institucional
* ✔ Administración de Eventos
* 🚧 Plataforma Classroom (LMS)
* 🚧 Analítica institucional

---

## ⚡ Procesamiento Multimedia

Flujo:

1. Upload
2. Almacenamiento con Spatie MediaLibrary
3. Dispatch a Queue
4. Conversión optimizada
5. Actualización de estado
6. Notificación vía WebSocket

Esto evita bloqueo del hilo principal HTTP y mejora rendimiento.

---

## 🔄 Comunicación en Tiempo Real

Implementado con Laravel Reverb:

```
Event → Broadcast → Frontend Listener
```

Casos de uso:

* Notificaciones
* Estados de proyectos
* Eventos académicos
* Actualización UI sin refresh

---

## 🤖 Inteligencia Artificial Local

El sistema integra modelos LLM ejecutados directamente en el navegador utilizando:

* WebLLM
* WebGPU

### Casos de uso:

* Tutor contextual
* Resumen automático
* Generación de preguntas
* Explicación de código
* Retroalimentación técnica

**Ventajas:**

* Inferencia local
* Privacidad mejorada
* Baja latencia
* Sin dependencia de APIs externas

---

## 🔐 Seguridad

* Autenticación basada en tokens
* Protección CSRF
* Rate limiting
* Validación estricta
* Control granular por rol
* Cumplimiento de normativa de datos

---

## 📈 Escalabilidad

* Backend desacoplado
* Procesamiento delegado a queues
* WebSockets independientes
* Docker-ready
* Arquitectura preparada para microservicios

---

## 🎯 Objetivo Técnico

Construir una plataforma académica desacoplada, modular y escalable que integre:

* Gestión institucional
* Trazabilidad estructurada de proyectos
* Analítica académica
* IA local
* Seguridad empresarial

---

## 👨‍💻 Autor

**Diego Meneses Pérez**
Full Stack Developer | Arquitectura Moderna | IA aplicada

---
