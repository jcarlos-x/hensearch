# TMOH Search

Una aplicación web moderna para buscar y descargar contenido de TMOHentai con una interfaz elegante y funcionalidades avanzadas.

## 🌟 Características

- **🔍 Búsqueda Inteligente**: Busca por título, autor, tags, o todos los campos
- **📱 Diseño Responsivo**: Interfaz moderna con sidebar colapsable
- **🌓 Modo Oscuro/Claro**: Tema personalizable que se guarda automáticamente
- **📄 Descarga PDF**: Convierte cualquier manga a PDF con detección automática de páginas
- **🖼️ Lazy Loading**: Carga de imágenes optimizada para mejor rendimiento
- **📖 Paginación**: Navegación fluida entre páginas de resultados
- **📋 Vista de Detalles**: Información completa con tags, géneros, y artistas
- **⚡ Glass Morphism**: Interfaz moderna con efectos visuales avanzados

## 🚀 Instalación y Uso

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor backend TMOH API ejecutándose en `http://ip_del_servidor:3000`

Para mas información del backend ir a https://git.lokius.me/xlokius/tmohentai_api

### Instalación

1. **Clona o descarga el proyecto:**
   ```bash
   git clone https://git.lokius.me/xlokius/hensearch.git
   cd hensearch
   ```

2. **Inicia un servidor local:**
   ```bash
   # Opción 1: Python
   python -m http.server 8000
   
   # Opción 2: Node.js
   npx serve frontend
   
   # Opción 3: PHP
   php -S localhost:8000
   ```

3. **Accede a la aplicación:**
   ```
   http://localhost:8000
   ```

### Uso Básico

1. **Realizar una búsqueda:**
   - Escribe tu término de búsqueda en el campo principal
   - Selecciona el tipo de búsqueda (título, autor, tags, todos)
   - Haz clic en "Buscar" o presiona Enter

2. **Filtros avanzados:**
   - Tipo de contenido (Todos, Hentai, Yaoi, Yuri)
   - Modo de vista (Miniaturas, Lista, Tarjetas)
   - Orden (Relevancia, Fecha, Popularidad)
   - Dirección (Ascendente/Descendente)

3. **Descargar en PDF:**
   - Haz clic en el botón "PDF" en cualquier resultado
   - La aplicación detectará automáticamente todas las páginas
   - El PDF se descargará con el título del manga

4. **Ver detalles:**
   - Haz clic en "Más detalles" para ver información completa
   - Incluye tags, géneros, artistas, idioma, y más

## 🛠️ Tecnologías

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, Glass Morphism
- **JavaScript ES6+**: Clases, async/await, módulos
- **Tailwind CSS**: Framework de utilidades CSS
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Inter

### Librerías
- **jsPDF**: Generación de PDFs del lado del cliente
- **Intersection Observer API**: Lazy loading optimizado
- **Fetch API**: Comunicación con el backend

### Características Técnicas
- **Responsive Design**: Adaptable a móviles, tablets y escritorio
- **Progressive Enhancement**: Funciona sin JavaScript básico
- **Accessibility**: Navegación por teclado y lectores de pantalla
- **Performance**: Lazy loading, debouncing, optimización de imágenes

## 📁 Estructura del Proyecto

```
Search-TMOH/
├── frontend/
│   ├── index.html          # Página principal
│   ├── script.js           # Lógica de la aplicación
│   ├── style.css           # Estilos personalizados
│   └── README.md           # Documentación técnica
└── 
```

## ⚙️ Configuración

### Backend API

La aplicación se conecta al backend en `http://ip_del_servidor:3000` con los siguientes endpoints:

- `GET /api/health` - Estado del servidor
- `GET /api/search-basic` - Búsqueda de contenido
- `GET /api/details` - Detalles de un elemento
- `GET /api/proxy-image` - Proxy para imágenes
- `GET /api/images` - Lista de imágenes de un manga

### Variables de Configuración

Para cambiar la URL del backend, edita la variable `baseUrl` en `script.js`:

```javascript
this.baseUrl = 'http://tu-servidor:puerto';
```

## 🎨 Personalización

### Temas

Los temas se definen con variables CSS en `style.css`:

```css
:root[data-theme="dark"] {
  --primary: #6366f1;
  --bg-app: #0f0f0f;
  --bg-sidebar: #1a1a1a;
  /* ... más variables */
}
```

### Colores Principales

- **Primario**: `#6366f1` (Índigo)
- **Secundario**: `#8b5cf6` (Violeta)
- **Éxito**: `#10b981` (Verde)
- **Error**: `#ef4444` (Rojo)
- **Advertencia**: `#f59e0b` (Ámbar)

## 📱 Características Responsivas

- **Móvil** (< 768px): Sidebar colapsable, navegación simplificada
- **Tablet** (768px - 1024px): Layout adaptativo
- **Escritorio** (> 1024px): Sidebar fijo, vista completa

## 🔧 Funcionalidades Técnicas

### Lazy Loading
- Carga imágenes solo cuando están visibles
- Sistema de cola para rate limiting
- Fallbacks automáticos para errores

### Manejo de Errores
- Retry automático con URL alternativas
- Placeholders para imágenes no disponibles
- Mensajes de error informativos

### Performance
- Paginación eficiente
- Debouncing en búsquedas
- Optimización de requests

## 🚀 Despliegue

### Desarrollo
```bash
# Servidor local simple
python -m http.server 8000
```

### Producción
1. Sube los archivos a tu servidor web
2. Configura la URL del backend
3. Asegúrate de que el CORS esté configurado correctamente

### CORS
El backend debe permitir requests desde tu dominio:
```javascript
Access-Control-Allow-Origin: https://tu-dominio.com
```


---

**Versión**: 1.3.0  
**Última actualización**: Agosto 2025