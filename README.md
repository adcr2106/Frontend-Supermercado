# Integrantes:
* Andres Chavarria
* Maikol Acevedo

# Demo del proyecto

*Frontend desplegado en Firebase*

🌐 https://supermercado-7faf4.web.app/login

    Credenciales para iniciar sesion:
    Dcoumento: 1
    Contraseña: 1

*Backend desplegado en Render*

🌐 https://backend-supermercado-zcrx.onrender.com/docs

*Video demostrativo*

🎥 https://drive.google.com/file/d/1AakUIa4fOc2fbBPXvXnAORLB5CaOYF8x/view?usp=drive_link

--------------

# Supermercado App

Sistema web para la gestión integral de un supermercado, desarrollado con **Angular** para el frontend y **FastAPI** para el backend.

La aplicación permite administrar:

* Clientes
* Empleados
* Productos
* Categorías
* Proveedores
* Compras
* Detalles de compra
* Pagos
* Jornadas
* Caja registradora

---

# Tecnologías utilizadas

## Frontend

* Angular
* Angular Material
* TypeScript
* SCSS

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

## Despliegue

* Frontend: Firebase Hosting
* Backend: Render

---

# Arquitectura del proyecto

## Frontend

```bash
src/
│
├── app/
│   ├── core/
│   │   ├── services/
│   │   ├── audit-context.service.ts
│   │   └── audit-user.guard.ts
│   │
│   ├── features/
│   │   ├── caja_registradora/
│   │   ├── categoria/
│   │   ├── cliente/
│   │   ├── compra/
│   │   ├── detalle_compra/
│   │   ├── empleado/
│   │   ├── jornada/
│   │   ├── login/
│   │   ├── pago/
│   │   ├── producto/
│   │   ├── proveedor/
│   │   └── shell/
│   │
│   ├── models/
│   │   ├── caja_registradora.models.ts
│   │   ├── categoria.models.ts
│   │   ├── cliente.models.ts
│   │   ├── compra.models.ts
│   │   ├── detalle_compra.models.ts
│   │   ├── empleado.models.ts
│   │   ├── jornada.models.ts
│   │   ├── pago.models.ts
│   │   ├── producto.models.ts
│   │   └── proveedor.models.ts
│   │
│   ├── shared/
│   │
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.html
│   ├── app.scss
│   ├── app.spec.ts
│   └── app.ts
│
├── environments/
├── index.html
├── main.ts
└── styles.scss
```

---

# Funcionalidades principales

## Autenticación

* Inicio de sesión
* Manejo de sesión mediante LocalStorage
* Protección de rutas

## Gestión de productos

* Crear productos
* Editar productos
* Listar productos
* Desactivar productos

## Gestión de clientes

* Registro de clientes
* Edición de información
* Listado de clientes

## Gestión de compras

* Creación de compras
* Asociación automática de empleado en sesión
* Gestión de detalles de compra
* Cálculo automático del total

## Gestión de caja registradora

* Apertura de caja
* Cierre de caja
* Registro de movimientos

---

# Instalación local

## Clonar el repositorio

```bash
git clone https://github.com/usuario/supermercado-app.git
```

---

# Frontend

## Instalar dependencias

```bash
npm install
```

## Ejecutar proyecto

```bash
ng serve
```

La aplicación estará disponible en:

```bash
http://localhost:4200
```

---

# Backend

## Crear entorno virtual

```bash
python -m venv venv
```

## Activar entorno virtual

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Instalar dependencias

```bash
pip install -r requirements.txt
```

## Ejecutar servidor

```bash
uvicorn main:app --reload
```

Backend disponible en:

```bash
http://localhost:8000
```

---

# Variables de entorno

## Frontend

Archivo:

```bash
src/environments/environment.ts
```

Ejemplo:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

---

# Despliegue

## Frontend en Firebase

### Build de producción

```bash
ng build
```

### Deploy

```bash
firebase deploy
```

---

## Backend en Render

Configuración utilizada:

* Runtime: Python
* Build Command:

```bash
pip install -r requirements.txt
```

* Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

---

# Modelos implementados

* CajaRegistradora
* Categoria
* Cliente
* Compra
* DetalleCompra
* Empleado
* Jornada
* Pago
* Producto
* Proveedor

---

# Características técnicas

* Arquitectura modular
* Componentes standalone en Angular
* Formularios reactivos
* API RESTful
* Validaciones con Pydantic
* Soft delete
* Manejo de estados activos/inactivos
* Relaciones entre entidades
* Uso de UUIDs

---

# Estado del proyecto

Proyecto en desarrollo activo.

Módulos CRUD implementados:

* Clientes
* Empleados
* Productos
* Categorías
* Proveedores
* Compras
* Detalles de compra
* Pagos
* Jornadas
* Caja registradora

---

# Autor

Desarrollado como proyecto académico y práctico de gestión de supermercado.
