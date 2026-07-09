# Client Manager

Aplicación web para la gestión y análisis de clientes desarrollada con Angular.

Permite registrar clientes, visualizar la información almacenada en Firebase Firestore y obtener métricas estadísticas sobre los datos registrados.

## 🚀 Demo

Aplicación desplegada en Firebase Hosting:

🔗 https://client-manager-17218.web.app/

---

## 📋 Funcionalidades

### Gestión de clientes

- Visualización de clientes registrados.
- Registro de nuevos clientes.
- Persistencia de datos utilizando Firebase Firestore.

### Tabla de clientes

Listado de clientes utilizando Angular Material Table.

Incluye:

- 🔎 Búsqueda por nombre y apellido.
- ↕️ Ordenamiento por columnas:
  - Nombre.
  - Apellido.
  - Edad.

---

## 📊 Análisis de datos

La aplicación calcula métricas estadísticas sobre las edades de los clientes registrados.

### Edad promedio

Representa la edad media de todos los clientes.

Fórmula:

```
Suma de todas las edades / cantidad de clientes
```

Ejemplo:

Clientes:

```
58, 34, 18
```

Cálculo:

```
(58 + 34 + 18) / 3 = 36.7
```

Resultado:

```
Edad promedio: 36.7 años
```

---

### Desviación estándar

La desviación estándar permite conocer qué tan dispersas están las edades respecto al promedio.

Interpretación:

- Una desviación estándar baja indica que las edades son similares.
- Una desviación estándar alta indica que existe mayor diferencia entre las edades.

El cálculo se realiza mediante:

1. Obtención del promedio de edades.
2. Cálculo de la distancia de cada edad respecto al promedio.
3. Cálculo de la varianza.
4. Obtención de la raíz cuadrada para obtener la desviación estándar.

Ejemplo:

```
Edades:
58, 34, 18

Edad promedio:
36.7 años

Desviación estándar:
16.4 años
```

---

## 🛠️ Tecnologías utilizadas

- Angular 15
- TypeScript
- Angular Material
- Firebase Firestore
- Firebase Hosting
- RxJS

---

## 📁 Estructura del proyecto

```
src/app
│
├── core
│   ├── models
│   └── services
│
├── features
│   └── clients
│       ├── client-list
│       └── client-form
│
├── shared
│   ├── components
│   └── pipes
│
└── environments
```

### Organización

**Core**
- Contiene modelos y servicios principales de la aplicación.

**Features**
- Contiene las funcionalidades agrupadas por dominio.

**Shared**
- Contiene componentes y elementos reutilizables.

---

## 🔥 Firebase

La aplicación utiliza Firebase Firestore como base de datos.

Configuración:

- Firebase SDK 9
- AngularFire 7.5

Firestore permite:

- Guardar clientes.
- Consultar clientes.
- Actualizar información en tiempo real.

---

## 🧠 Decisiones técnicas

- Se utilizó arquitectura **Standalone Components** de Angular.
- Se separó la lógica de negocio mediante servicios.
- Se utilizó Firebase Firestore para almacenamiento persistente.
- Se implementó manejo de suscripciones con `takeUntil` para evitar fugas de memoria.
- Se utilizó Angular Material para construir una interfaz consistente y reutilizable.
- Se organizaron las funcionalidades siguiendo una estructura basada en dominios (`core`, `features`, `shared`).
