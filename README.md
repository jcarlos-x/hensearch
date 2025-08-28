# HenSearch - Frontend Web Application

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Nginx](https://img.shields.io/badge/nginx-alpine-blue.svg)

## 📋 Descripción

HenSearch es una aplicación web frontend moderna y responsive que proporciona una interfaz elegante para buscar y explorar contenido de TMOH3nt41. La aplicación utiliza un diseño de sidebar moderno con tema oscuro/claro y está completamente containerizada con Docker.

## ✨ Características Principales

- **🎨 Diseño Moderno**: Interfaz elegante con sidebar colapsable y tema oscuro/claro
- **📱 Responsive**: Optimizado para dispositivos móviles y de escritorio
- **🔍 Búsqueda Avanzada**: Múltiples criterios de búsqueda (nombre, artista, revista, etiquetas)
- **⚡ Performance**: Aplicación ligera con carga rápida
- **🐳 Containerizado**: Listo para producción con Docker y Nginx
- **🛡️ Seguro**: Headers de seguridad configurados
- **📊 Monitoreo**: Health checks incluidos
- **🔄 CI/CD**: Deploy automatizado con GitHub Actions
- **🌐 Multi-Arquitectura**: Soporte para AMD64 y ARM64

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker instalado
- Puerto 80 disponible (o configurar otro puerto)

### Instalación con Docker Hub (Recomendado)

```bash
# Descargar y ejecutar la imagen oficial
docker pull xlokius/hensearch:latest
docker run -d -p 80:80 --name hensearch xlokius/hensearch:latest

# Con puerto personalizado
docker run -d -p 8080:80 --name hensearch xlokius/hensearch:latest

# Verificar que funciona
curl http://localhost:8080
```

### Build Local

```bash
# Clonar el repositorio
git clone https://github.com/jcarlos-x/hensearch.git
cd hensearch

# Construir la imagen Docker
docker build -t hensearch .

# Ejecutar el contenedor
docker run -d -p 80:80 --name hensearch-app hensearch
```

### Desarrollo Local

```bash
# Servir archivos estáticos directamente
cd docs/
python -m http.server 8000
# O usar cualquier servidor web estático

# Abrir en el navegador
open http://localhost:8000
```

## 🏗️ Arquitectura

```
hensearch/
├── Dockerfile          # Configuración de contenedor
├── nginx.conf          # Configuración del servidor web
├── docs/               # Archivos de la aplicación web
│   ├── index.html      # Página principal
│   ├── script.js       # Lógica de la aplicación
│   └── style.css       # Estilos modernos
└── README.md           # Documentación
```

## 🔧 Configuración

### Variables de Entorno

La aplicación utiliza configuración dinámica para conectarse con diferentes backends:

```javascript
// En script.js se puede configurar la URL del API
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
```

### Nginx Configuration

El archivo `nginx.conf` incluye:
- Soporte para SPAs (Single Page Applications)
- Compresión GZIP habilitada
- Headers de seguridad
- Configuración optimizada para archivos estáticos

## 🎯 Funcionalidades

### Búsqueda
- **Por Nombre**: Buscar contenido por título
- **Por Artista**: Filtrar por creador
- **Por Revista**: Buscar en publicaciones específicas
- **Por Etiquetas**: Filtrado por categorías

### Filtros Avanzados
- **Tipo de Contenido**: Hen-, Ya-, Yu-
- **Modo de Vista**: Miniaturas o Lista
- **Ordenamiento**: Por fecha, rating, título, vistas
- **Dirección**: Ascendente o descendente

### Características de UI
- **Tema Adaptable**: Modo oscuro/claro automático
- **Sidebar Responsive**: Colapsable en móviles
- **Paginación**: Navegación eficiente de resultados
- **Estados de Carga**: Indicadores visuales
- **Error Handling**: Manejo elegante de errores

## 🐳 Docker

### Imagen Precompilada (Recomendado)

La imagen oficial está disponible en Docker Hub con soporte multi-arquitectura:

```bash
# Descargar imagen oficial
docker pull xlokius/hensearch:latest

# Ejecutar con configuración básica
docker run -d -p 80:80 --name hensearch xlokius/hensearch:latest

# Ejecutar con configuración personalizada
docker run -d \
  -p 8080:80 \
  --name hensearch \
  --restart unless-stopped \
  xlokius/hensearch:latest
```

### Arquitecturas Soportadas

- **linux/amd64** (Intel/AMD x64)
- **linux/arm64** (ARM 64-bit, Apple Silicon, Raspberry Pi)

### Build Local

```bash
# Build con tag personalizado
docker build -t mi-usuario/hensearch:v1.3.0 .

# Ejecutar con variables personalizadas
docker run -d \
  -p 8080:80 \
  --name mi-hensearch \
  -e API_URL=https://mi-api.com \
  mi-usuario/hensearch:v1.3.0
```

### Health Check

El contenedor incluye verificaciones de salud automáticas:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
```

## 🔄 CI/CD Automatizado

Este proyecto incluye un workflow completo de GitHub Actions que:

- **🔍 Análisis de Código**: Verifica la estructura del proyecto
- **🏗️ Build Multi-Arquitectura**: Construye para AMD64 y ARM64
- **🧪 Testing Automatizado**: Prueba la imagen Docker antes del deploy
- **🚀 Deploy Automático**: Sube a Docker Hub automáticamente

### Configuración del CI/CD

Para habilitar el CI/CD en tu fork:

1. **Configura los secrets de GitHub**: Ver [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md)
2. **Push a main/master**: El workflow se ejecuta automáticamente
3. **Resultado**: Nueva imagen disponible en Docker Hub

### Tags Automáticos

| Trigger | Tags Creados | Descripción |
|---------|-------------|-------------|
| Push a main | `latest`, `v1.3.0` | Versión estable multi-arch |
| Pull Request | `pr-123-abc1234` | Solo para testing |
| Manual | Personalizable | Definido por usuario |

### Verificar Build Status

[![Docker Build](https://github.com/tu-usuario/hensearch/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/tu-usuario/hensearch/actions/workflows/docker-publish.yml)

## 🛠️ Desarrollo

### Estructura del Código

- **HTML**: Estructura semántica con componentes modulares
- **CSS**: Sistema de variables CSS, grid layouts, animaciones
- **JavaScript**: Clases ES6, gestión de estado, API calls

### Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: TailwindCSS, Font Awesome, Google Fonts
- **Server**: Nginx Alpine
- **Container**: Docker
- **Build**: Multi-stage Docker build

## 🔒 Seguridad

- Headers de seguridad configurados en Nginx
- Validación de entrada en frontend
- Manejo seguro de URLs de imágenes
- Protección contra XSS básica

## 📊 Performance

- **Tamaño de imagen**: ~15MB (Alpine Linux + Nginx)
- **Tiempo de carga**: <2s (archivos estáticos)
- **Compresión**: GZIP habilitado para todos los assets
- **Caché**: Headers apropiados para recursos estáticos

---

**Versión**: 1.3.1 | **Mantenedor**: HenSearch App | **Última actualización**: Agosto 2025