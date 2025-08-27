# Dockerfile para TMOHentai Search Frontend
FROM nginx:alpine

# Información del mantenedor
LABEL maintainer="HenSearch App" \
      description="Frontend web application for TM0H3nt41 search with dynamic backend configuration"

# Copiar archivos estáticos de la aplicación
COPY docs/ /usr/share/nginx/html/

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Health check para verificar que nginx está funcionando
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]