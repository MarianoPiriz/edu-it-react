# React + Vite
# Tienda Online - Proyecto Final React (Educación IT)

Este proyecto es una aplicación de comercio electrónico desarrollada como parte del curso de **React** en **Educación IT**. La aplicación se enfoca en la gestión de estados complejos, navegación segura y arquitectura de componentes reutilizables.

## 🚀 Conceptos Técnicos Aplicados

Durante el desarrollo de este repositorio, se implementaron los siguientes pilares de React:

### 1. Arquitectura de Estado con Context API
Se implementó un `AuthContext` para centralizar la información del usuario de forma global. Esto permite que componentes distantes (como el `Navbar`, `Checkout` y `ProductCard`) compartan el estado de autenticación sin necesidad de pasar *props* manualmente por cada nivel (Prop Drilling).

### 2. Persistencia de Datos
Para asegurar que la sesión del usuario y las preferencias no se pierdan al recargar el navegador, se integró el uso de **LocalStorage** sincronizado con el estado de React dentro del Provider.

### 3. Enrutamiento Dinámico (React Router Dom)
- **Navegación Programática:** Uso de `useNavigate` para redirigir a los usuarios no logueados.
- **Rutas Protegidas:** Lógica de validación en componentes críticos como el Checkout.
- **Rutas Dinámicas:** Implementación de rutas con parámetros (`:id`, `:slug`) para las páginas de detalle de producto.

### 4. Hooks Personalizados y Lógica de Negocio
- Uso extensivo de `useState` y `useEffect` para el manejo del ciclo de vida.
- Centralización de acciones como "Agregar al carrito" y "Favoritos" bajo validaciones de seguridad.

### 5. Estilización y UI
- Interfaz moderna y responsiva utilizando **Tailwind CSS**.
- Iconografía mediante **React Icons**.

## 🛠️ Stack Tecnológico
- **React** (Vite)
- **React Router Dom**
- **Tailwind CSS**
- **Context API**

---
Desarrollado por Mariano Piriz - 2026
