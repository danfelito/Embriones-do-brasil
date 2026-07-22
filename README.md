# Embriones do Brasil

Catálogo comercial de genética bovina brasileña para México. Incluye razas y programas, inventario filtrable de cruzamientos, fichas de donadoras, videos con miniaturas, referencias de precios, noticias y contacto directo por WhatsApp.

## Desplegar en Render

El repositorio incluye `render.yaml`, por lo que puede publicarse como Blueprint sin capturar manualmente los comandos.

1. Inicia sesión en [Render](https://dashboard.render.com/) y conecta tu cuenta de GitHub.
2. Selecciona **New > Blueprint**.
3. Elige este repositorio y conserva la ruta predeterminada `render.yaml`.
4. Confirma **Apply**. Render instalará las dependencias, compilará la aplicación y creará el servicio web.

La configuración usa Node.js 22.13, el plan gratuito, despliegue automático con cada cambio en la rama conectada y una comprobación de salud en `/`.

## Ejecutar localmente

Requiere Node.js 22.13 o posterior.

```bash
npm ci
npm run dev
```

Validación de producción:

```bash
npm test
PORT=10000 npm start
```

## Contacto

- WhatsApp: +52 229 464 8962
- Correo: ventas@brasilmx.mx
