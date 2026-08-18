# Trading Uruguay 📈🇺🇾

Aplicación web de simulación de trading (compra/venta de acciones, gestión de portafolio, historial de transacciones y cotizaciones simuladas), pensada para inversores uruguayos que se están iniciando en el tema.

Proyecto desarrollado para la materia **Fundamentos de Ingeniería de Software (FIS)** — ORT Uruguay, en equipo con Juan Pagliotti y Felipe Boix.

## Funcionalidades

- **Simulación de compra/venta de acciones**, con mini-portafolio visible en la misma sección.
- **Gestión de portafolio**: valor total del patrimonio, ganancia diaria y cantidad de inversiones activas.
- **Historial de transacciones**: registro de todos los movimientos (compras y ventas) realizados.
- **Cotizaciones simuladas**: visualización de precios, nombre y tendencia de las distintas acciones disponibles.

## Stack técnico

- JavaScript vanilla (ES Modules), HTML y CSS
- Arquitectura separada en `domain` (lógica de negocio) e `interface` (UI)
- **Jest** para testing unitario, con cobertura de código
- **ESLint + Prettier** para calidad y consistencia de código

## Estructura del proyecto

- `src/domain/`: lógica de negocio (portafolio, transacciones, historial) y sus tests.
- `src/interface/`: interfaz de usuario (HTML, CSS, JS) y assets.
- `docs/`: documentación del proceso — investigación, decisiones de diseño, usabilidad/accesibilidad (heurísticas de Nielsen, WCAG AAA), calidad de código y testing.

## Documentación

| Informe | Descripción |
| :--- | :--- |
| [`informe_1`](docs/informe_1.md) | Investigación inicial, estructura del repo y estrategia de trabajo en equipo. |
| [`informe_2`](docs/informe_2.md) | Funcionalidades implementadas, usabilidad/accesibilidad y calidad de código. |
| [`informe_testing`](docs/informe_testing.md) | Estrategia y cobertura de testing. |

## Cómo correrlo

```bash
npm install
npm test        # corre los tests con cobertura
```

Para ver la interfaz, abrir `src/interface/index.html` en el navegador.

## Screenshots

Capturas de las distintas secciones disponibles en `src/interface/img/` y `docs/anexo/img/`.
