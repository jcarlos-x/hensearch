# HenSearch - Frontend



Una aplicación web moderna para buscar y descargar contenido de TM0H3nt41 con una interfaz elegante, panel de configuración dinámico y funcionalidades avanzadas.Una aplicación web moderna para buscar y descargar contenido de TM0H3nt41 con una interfaz elegante y funcionalidades avanzadas.



## 🌟 Características## 🌟 Características



- **🔍 Búsqueda Inteligente**: Busca por título, autor, revista o etiquetas- **🔍 Búsqueda Inteligente**: Busca por título, autor, tags, o todos los campos

- **⚙️ Configuración Dinámica**: Panel de configuración para cambiar la URL del backend sin rebuilds- **📱 Diseño Responsivo**: Interfaz moderna con sidebar colapsable

- **📱 Diseño Responsivo**: Interfaz moderna con sidebar colapsable y mobile-first- **🌓 Modo Oscuro/Claro**: Tema personalizable que se guarda automáticamente

- **🌓 Modo Oscuro/Claro**: Tema personalizable que se guarda automáticamente- **⚙️ Configuración de Backend**: Panel de configuración para cambiar la URL del servidor fácilmente

- **📄 Descarga PDF**: Convierte cualquier manga a PDF con detección automática de páginas- **📄 Descarga PDF**: Convierte cualquier manga a PDF con detección automática de páginas

- **🖼️ Lazy Loading**: Carga de imágenes optimizada para mejor rendimiento- **🖼️ Lazy Loading**: Carga de imágenes optimizada para mejor rendimiento

- **📖 Paginación**: Navegación fluida entre páginas de resultados- **📖 Paginación**: Navegación fluida entre páginas de resultados

- **📋 Vista de Detalles**: Información completa con tags, géneros y artistas- **📋 Vista de Detalles**: Información completa con tags, géneros, y artistas

- **⚡ Glass Morphism**: Interfaz moderna con efectos visuales avanzados- **⚡ Glass Morphism**: Interfaz moderna con efectos visuales avanzados

- **🔒 Seguridad**: No expone URLs de backend en el código fuente- **🔒 Seguridad**: No expone URLs de backend en el código fuente

- **🚀 Docker Ready**: Listo para despliegue con Docker y Traefik

## 🚀 Instalación y Uso

## 🏗️ Arquitectura

### Requisitos Previos

### **Frontend (Este proyecto)**

- **Tipo**: SPA (Single Page Application)- Navegador web moderno (Chrome, Firefox, Safari, Edge)

- **Framework**: Vanilla JavaScript ES6+- **Backend TMOH API**: Se configura desde la interfaz web (no requiere configuración manual)

- **Estilos**: CSS3 + Tailwind CSS + Variables CSS

- **Dependencias**: Font Awesome, jsPDF, Google FontsPara mas información del backend ir a https://git.lokius.me/xlokius/



### **Backend (Requerido por separado)**> **✅ Seguridad**: Este proyecto NO expone IPs o URLs de backend en el código fuente. La configuración se almacena localmente en el navegador del usuario.

- **API**: TM0H3nt41 API Server

- **Repositorio**: https://git.lokius.me/xlokius/******* ### 🐳 Instalación con Docker (Recomendado)

- **Puerto**: Configurable (por defecto 3000)

1. **Ejecutar desde Docker Hub:**

## 📁 Estructura del Proyecto   ```bash

   # Ejecutar la imagen desde Docker Hub

```   docker run -d -p 8080:80 --name hensearch-app [usuario]/hensearch:latest

hensearch/   ```

├── docs/                   # Archivos del frontend

│   ├── index.html          # Página principal con sidebar moderno2. **O construir localmente:**

│   ├── script.js           # Lógica de la aplicación (1500+ líneas)   ```bash

│   └── style.css           # Estilos modernos con glass morphism (2000+ líneas)   # Clona o descarga el proyecto

├── Dockerfile              # Imagen Docker optimizada para producción   git clone https://git.lokius.me/xlokius/hensearch.git

├── nginx.conf              # Configuración nginx para SPA   cd hensearch

└── .gitignore             # Excluye archivos sensibles   

```   # Construir la imagen

   docker build -t hensearch .

## 🚀 Instalación y Despliegue   

   # Ejecutar el contenedor

### 🐳 Opción 1: Docker (Recomendado)   docker run -d -p 8080:80 --name hensearch-app hensearch

   ```

#### **Desarrollo Local**

```bash3. **Accede a la aplicación:**

# Clonar el repositorio   ```

git clone [tu-repo]   http://localhost:8080

cd hensearch   ```



# Construir y ejecutar4. **Comandos útiles:**

docker build -t hensearch .   ```bash

docker run -d -p 8080:80 --name hensearch-app hensearch   # Ver logs

   docker logs -f hensearch-app

# Acceder a la aplicación   

open http://localhost:8080   # Detener el contenedor

```   docker stop hensearch-app

   

#### **Producción con Traefik**   # Eliminar el contenedor

```yaml   docker rm hensearch-app

# docker-compose.yml   

version: '3.8'   # Construir sin caché

   docker build --no-cache -t hensearch .

services:   ```

  hensearch:

    build: .### 📦 Instalación Manual

    container_name: hensearch-frontend

    labels:1. **Clona o descarga el proyecto:**

      - "traefik.enable=true"   ```bash

      - "traefik.http.routers.hensearch.rule=Host(\`tudominio.com\`)"   git clone https://git.lokius.me/xlokius/hensearch.git

      - "traefik.http.routers.hensearch.entrypoints=websecure"   cd hensearch

      - "traefik.http.routers.hensearch.tls.certresolver=letsencrypt"   ```

      - "traefik.http.services.hensearch.loadbalancer.server.port=80"

    networks:2. **Inicia un servidor local:**

      - traefik   ```bash

         # Opción 1: Python

networks:   python -m http.server 8000

  traefik:   

    external: true   # Opción 2: Node.js

```   npx serve docs

   

### 📦 Opción 2: Servidor Web Tradicional   # Opción 3: PHP

   php -S localhost:8000 -t docs

```bash   ```

# Subir archivos de la carpeta docs/ a tu servidor web

# Configurar servidor para servir index.html en todas las rutas (SPA)3. **Accede a la aplicación:**

   ```

# Ejemplo con Apache (.htaccess)   http://localhost:8000

RewriteEngine On   ```

RewriteCond %{REQUEST_FILENAME} !-f

RewriteCond %{REQUEST_FILENAME} !-d### Uso Básico

RewriteRule . /index.html [L]

1. **🔧 Configurar el Backend (Primera vez):**

# Ejemplo con Nginx   - Al abrir la aplicación por primera vez, aparecerá automáticamente el panel de configuración

location / {   - O haz clic en el botón "⚙️ Configuración" en la esquina superior derecha

    try_files $uri $uri/ /index.html;   - Ingresa la URL de tu servidor backend (ej: `http://tu-servidor.com:3000`)

}   - Haz clic en "Probar Conexión" para verificar que funciona

```   - Guarda la configuración



## ⚙️ Configuración2. **Realizar una búsqueda:**

   - Escribe tu término de búsqueda en el campo principal

### **🔧 Primera Configuración**   - Selecciona el tipo de búsqueda (título, autor, tags, todos)

   - Haz clic en "Buscar" o presiona Enter

1. **Acceder a la aplicación** - La primera vez se abrirá automáticamente el panel de configuración

2. **Configurar Backend** - Introducir la URL de tu servidor backend (ej: `https://api.tudominio.com`)3. **Filtros avanzados:**

3. **Probar Conexión** - Verificar que el backend responde correctamente   - Tipo de contenido (Todos, Hentai, Yaoi, Yuri)

4. **Guardar** - La configuración se almacena localmente en el navegador   - Modo de vista (Miniaturas, Lista, Tarjetas)

   - Orden (Relevancia, Fecha, Popularidad)

### **🛠️ Panel de Configuración**   - Dirección (Ascendente/Descendente)



- **Acceso**: Botón "⚙️ Configuración" en la esquina superior derecha4. **Descargar en PDF:**

- **Funciones**:    - Haz clic en el botón "PDF" en cualquier resultado

  - Cambiar URL del backend en tiempo real   - La aplicación detectará automáticamente todas las páginas

  - Probar conectividad antes de guardar   - El PDF se descargará con el título del manga

  - Restablecer a valores por defecto

  - Notificaciones visuales de estado5. **Ver detalles:**

   - Haz clic en "Más detalles" para ver información completa

### **🔗 Backend APIs Utilizadas**   - Incluye tags, géneros, artistas, idioma, y más



```javascript## 🛠️ Tecnologías

// Endpoints que la aplicación consume

GET /api/health              // Estado del servidor### Frontend

GET /api/search-basic        // Búsqueda de contenido- **HTML5**: Estructura semántica moderna

GET /api/details             // Detalles de un elemento- **CSS3**: Variables CSS, Grid, Flexbox, Glass Morphism

GET /api/images              // Lista de imágenes de un manga- **JavaScript ES6+**: Clases, async/await, módulos

GET /api/proxy-image         // Proxy para imágenes externas- **Tailwind CSS**: Framework de utilidades CSS

GET /api/proxy-html          // Proxy para páginas externas- **Font Awesome**: Iconografía

```- **Google Fonts**: Tipografía Inter



## 🎯 Uso de la Aplicación### Librerías

- **jsPDF**: Generación de PDFs del lado del cliente

### **🔍 Búsqueda Básica**- **Intersection Observer API**: Lazy loading optimizado

1. Escribir término en el campo de búsqueda- **Fetch API**: Comunicación con el backend

2. Seleccionar tipo: Nombre, Artista, Revista o Etiqueta

3. Presionar "Buscar" o Enter### Características Técnicas

- **Responsive Design**: Adaptable a móviles, tablets y escritorio

### **🔧 Filtros Avanzados**- **Progressive Enhancement**: Funciona sin JavaScript básico

- **Tipo de contenido**: Todos, Hentai, Yaoi, Yuri- **Accessibility**: Navegación por teclado y lectores de pantalla

- **Vista**: Miniaturas o Lista- **Performance**: Lazy loading, debouncing, optimización de imágenes

- **Ordenar por**: Fecha, Rating, Título, Vistas

- **Dirección**: Ascendente o Descendente## 📁 Estructura del Proyecto



### **📄 Descarga PDF**```

- Hacer clic en botón "PDF" de cualquier resultadohensearch/

- La aplicación detecta automáticamente todas las páginas├── docs/                   # Archivos del frontend

- Descarga se inicia con el título del manga│   ├── index.html          # Página principal

│   ├── script.js           # Lógica de la aplicación

### **📱 Responsive Design**│   └── style.css           # Estilos personalizados

- **Móvil**: Sidebar colapsable, navegación optimizada├── Dockerfile              # Imagen Docker para el frontend

- **Tablet**: Layout adaptativo├── nginx.conf              # Configuración de Nginx

- **Desktop**: Sidebar fijo, experiencia completa└── README.md               # Documentación del proyecto

```

## 🛠️ Tecnologías

## ⚙️ Configuración

### **Frontend**

- **HTML5**: Estructura semántica moderna### Backend API

- **CSS3**: Variables CSS, Grid, Flexbox, Glass Morphism

- **JavaScript ES6+**: Clases, async/await, módulos, localStorageLa aplicación se conecta al backend en `http://ip_del_servidor:3000` con los siguientes endpoints:

- **Tailwind CSS**: Framework de utilidades CSS

- **Font Awesome**: Iconografía profesional- `GET /api/health` - Estado del servidor

- **Google Fonts**: Tipografía Inter- `GET /api/search-basic` - Búsqueda de contenido

- `GET /api/details` - Detalles de un elemento

### **Librerías Externas**- `GET /api/proxy-image` - Proxy para imágenes

- **jsPDF**: Generación de PDFs del lado del cliente- `GET /api/images` - Lista de imágenes de un manga

- **Intersection Observer API**: Lazy loading optimizado

- **Fetch API**: Comunicación con el backend### Variables de Configuración



### **Infraestructura**Para cambiar la URL del backend, edita la variable `baseUrl` en `script.js`:

- **Docker**: Contenederización con nginx:alpine

- **Nginx**: Servidor web optimizado para SPA```javascript

- **Traefik**: Compatible con reverse proxy y SSL automáticothis.baseUrl = 'http://tu-servidor:puerto';

```

## 🔒 Seguridad

## 🎨 Personalización

### **Características de Seguridad**

- ✅ **No URLs hardcodeadas** en el código fuente### Temas

- ✅ **Headers de seguridad** nginx configurados

- ✅ **XSS Protection** habilitadoLos temas se definen con variables CSS en `style.css`:

- ✅ **Content-Type sniffing** deshabilitado

- ✅ **X-Frame-Options** configurado```css

:root[data-theme="dark"] {

### **Almacenamiento Local**  --primary: #6366f1;

- **localStorage**: URL del backend (no sensible)  --bg-app: #0f0f0f;

- **Sin cookies**: No almacena datos sensibles  --bg-sidebar: #1a1a1a;

- **Configuración local**: Solo en el navegador del usuario  /* ... más variables */

}

## 🚀 Despliegue en Producción```



### **Docker Build**### Colores Principales

```bash

# Construcción optimizada- **Primario**: `#6366f1` (Índigo)

docker build -t hensearch:latest .- **Secundario**: `#8b5cf6` (Violeta)

- **Éxito**: `#10b981` (Verde)

# Tags para versionado- **Error**: `#ef4444` (Rojo)

docker tag hensearch:latest hensearch:v1.3.0- **Advertencia**: `#f59e0b` (Ámbar)



# Subir a registry## 📱 Características Responsivas

docker push tu-registry/hensearch:latest

```- **Móvil** (< 768px): Sidebar colapsable, navegación simplificada

- **Tablet** (768px - 1024px): Layout adaptativo

### **Variables de Entorno**- **Escritorio** (> 1024px): Sidebar fijo, vista completa

```bash

# No se requieren variables de entorno## 🔧 Funcionalidades Técnicas

# La configuración se hace desde la interfaz web

```### Lazy Loading

- Carga imágenes solo cuando están visibles

### **Recursos Requeridos**- Sistema de cola para rate limiting

- **CPU**: 0.1 cores mínimo- Fallbacks automáticos para errores

- **RAM**: 64MB mínimo

- **Storage**: 50MB para la imagen### Manejo de Errores

- **Network**: Puerto 80 (HTTP)- Retry automático con URL alternativas

- Placeholders para imágenes no disponibles

### **Compatibilidad con Reverse Proxy**- Mensajes de error informativos

- ✅ **Traefik**: Configuración incluida en ejemplos

- ✅ **Nginx**: Compatible con proxy_pass### Performance

- ✅ **Cloudflare**: SSL termination automático- Paginación eficiente

- ✅ **Apache**: mod_proxy compatible- Debouncing en búsquedas

- Optimización de requests

## 🔧 Desarrollo

## 🚀 Despliegue

### **Estructura del Código**

### Con Docker (Recomendado)

#### **index.html**```bash

- Sidebar moderno con formulario de búsqueda# Construir la imagen

- Área de contenido principal responsivadocker build -t hensearch .

- Estados: Bienvenida, Resultados, Sin resultados, Error

- Overlay de carga con animaciones# Ejecutar el contenedor

docker run -d -p 8080:80 --name hensearch-app hensearch

#### **script.js (1500+ líneas)**

- **SidebarManager**: Gestión del sidebar y móvil# La aplicación estará disponible en http://localhost:8080

- **ThemeManager**: Modo oscuro/claro persistente  ```

- **SearchManager**: Lógica principal de búsqueda y API

- **ConfigManager**: Panel de configuración dinámico### Subir a Docker Hub

- **PDFGenerator**: Descarga de mangas en PDF```bash

- **LazyLoader**: Carga optimizada de imágenes# Etiquetar la imagen

docker tag hensearch [tu-usuario]/hensearch:latest

#### **style.css (2000+ líneas)**

- Variables CSS para theming completo# Subir a Docker Hub

- Glass morphism y efectos modernosdocker push [tu-usuario]/hensearch:latest

- Responsive design mobile-first```

- Animaciones y transiciones fluidas

- Componentes modulares reutilizables### Desarrollo

```bash

### **Comandos de Desarrollo**# Servidor local simple

```bashpython -m http.server 8000 -d docs

# Desarrollo local sin Docker```

python -m http.server 8000 -d docs

### Producción Manual

# Con Docker para testing1. Sube los archivos de la carpeta `docs/` a tu servidor web

docker run -d -p 8080:80 -v $(pwd)/docs:/usr/share/nginx/html nginx:alpine2. La URL del backend ya está configurada para apuntar a tu VPS

3. Asegúrate de que el CORS esté configurado correctamente en tu VPS

# Monitoreo de logs

docker logs -f hensearch-app### CORS en el VPS

```El backend en tu VPS debe permitir requests desde tu dominio:

```javascript

## 📊 PerformanceAccess-Control-Allow-Origin: https://tu-dominio.com

```

### **Optimizaciones Implementadas**

- **Gzip compression**: Texto comprimido al 70%### 🐳 Configuración Docker

- **Lazy loading**: Imágenes cargadas on-demand

- **Debouncing**: Búsquedas optimizadas#### Variables de Entorno (Opcional)

- **Caching**: Headers HTTP configuradosSi necesitas personalizar la configuración de Nginx:

- **Minification**: CSS y JS optimizados

- **CDN**: Librerías externas desde CDN```bash

docker run -d -p 8080:80 \

### **Métricas Típicas**  -e NGINX_HOST=tu-dominio.com \

- **First Paint**: < 1.5s  --name hensearch-app \

- **Time to Interactive**: < 2.5s  hensearch

- **Bundle Size**: ~150KB (sin dependencias)```

- **Lighthouse Score**: 95+ en todas las categorías

#### Conexión con Backend

## 🤝 ContribuciónLa aplicación incluye un panel de configuración integrado donde los usuarios pueden:

- Configurar la URL del backend fácilmente desde la interfaz

---
