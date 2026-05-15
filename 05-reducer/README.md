# REDUCER:

Funciones del Reducer:

- Recibe estado previo
- Recibe la acción: { type, payload }
- Retorna: Nueva Referencia (Estado) NO MUTO EL ETADO PREVIO

Funciones del Context:

Funciones de las Funciones de Orden Superior:

Funcioes de los componentes Contenedores/Presentacionales:

## Flujo General

```txt
Usuario               -> Genera Eventos en UI (click, scroll, submit, etc)
  ↓
Componente            -> Llamar a una función de Alto Nivel (Generar una Acción)
  ↓
Función de Alto Nivel -> Genera una acción
  ↓
Acción                -> Action: { type: AgregarAlCarrito, payload: 2 }
  ↓
dispatch
  ↓
Reducer          -> Lógica de Negocio: Generar el Nuevo Estado [ 1 ] -> NO LO MUTA
  ↓
Context Provider -> Actualiza el valor del Context [ 1 ] / Dueño del Estado
  ↓
Componentes Consumidores -> Re-Render
```
