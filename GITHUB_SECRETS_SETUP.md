# 🔐 Configuración de GitHub Secrets para Docker Hub

Este documento explica cómo configurar los secrets necesarios en GitHub para que el workflow de CI/CD pueda subir automáticamente las imágenes Docker a Docker Hub.

## 📋 Secrets Requeridos

Para que el workflow funcione correctamente, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

### 🔑 DOCKER_USERNAME
- **Descripción**: Tu nombre de usuario de Docker Hub
- **Valor**: `xlokius` (o tu usuario de Docker Hub)
- **Ejemplo**: `xlokius`

### 🔐 DOCKER_PASSWORD
- **Descripción**: Tu token de acceso personal de Docker Hub
- **Valor**: Token generado en Docker Hub (NO uses tu contraseña directa)
- **Ejemplo**: `dckr_pat_ABC123...` (Docker Personal Access Token)

## 🛠️ Configuración Paso a Paso

### 1. Generar Token en Docker Hub

1. Ve a [Docker Hub](https://hub.docker.com/)
2. Inicia sesión con tu cuenta
3. Haz clic en tu avatar → **Account Settings**
4. Ve a la pestaña **Security**
5. Haz clic en **New Access Token**
6. Configura el token:
   - **Token description**: `GitHub Actions - HenSearch`
   - **Access permissions**: `Public Repo Read/Write` (para repositorios públicos) o `Private Repo` (para privados)
7. Haz clic en **Generate**
8. **¡IMPORTANTE!** Copia el token inmediatamente (no podrás verlo después)

### 2. Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (pestaña del repositorio)
3. En el menú lateral, selecciona **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**

#### Configurar DOCKER_USERNAME:
- **Name**: `DOCKER_USERNAME`
- **Secret**: `xlokius` (tu usuario de Docker Hub)
- Haz clic en **Add secret**

#### Configurar DOCKER_PASSWORD:
- **Name**: `DOCKER_PASSWORD`
- **Secret**: Pega el token que copiaste de Docker Hub
- Haz clic en **Add secret**

### 3. Verificar Configuración

Una vez configurados los secrets, deberías ver:

```
Repository secrets
├── DOCKER_USERNAME ••••••••
└── DOCKER_PASSWORD ••••••••••••••••••••••••••••••
```

## 🚀 Funcionamiento del Workflow

### Triggers Automáticos

El workflow se ejecuta automáticamente cuando:

- **Push a main/master**: Construye y sube imagen con tag `latest` y versión
- **Pull Request**: Construye imagen de prueba (NO la sube a Docker Hub)
- **Ejecución Manual**: Desde la pestaña Actions con opciones personalizadas

### Tags Generados

| Trigger | Tags Creados | Descripción |
|---------|-------------|-------------|
| Push a main | `latest`, `v1.3.0`, `latest-amd64`, `latest-arm64` | Versión estable |
| Pull Request | `pr-123-abc1234` | Solo para testing |
| Manual | Personalizable | Definido por el usuario |

### Arquitecturas Soportadas

- **linux/amd64** (Intel/AMD x64)
- **linux/arm64** (ARM 64-bit, Apple Silicon, Raspberry Pi)

## 🔍 Verificación

### Comprobar que el workflow funciona:

1. Haz un pequeño cambio en el proyecto
2. Haz commit y push a la rama main:
   ```bash
   git add .
   git commit -m "test: trigger docker build"
   git push origin main
   ```
3. Ve a la pestaña **Actions** en GitHub
4. Verifica que el workflow "🐳 Docker Build & Push to Docker Hub" se ejecute exitosamente
5. Comprueba en [Docker Hub](https://hub.docker.com/r/xlokius/hensearch) que la imagen se haya subido

### Probar la imagen:

```bash
# Descargar y probar la imagen
docker pull xlokius/hensearch:latest
docker run -d -p 8080:80 --name test-hensearch xlokius/hensearch:latest

# Verificar que funciona
curl http://localhost:8080

# Limpiar
docker stop test-hensearch
docker rm test-hensearch
```

## ⚠️ Consideraciones de Seguridad

### ✅ Buenas Prácticas:
- **SIEMPRE** usa tokens de acceso, nunca contraseñas directas
- Configura tokens con permisos mínimos necesarios
- Revisa periódicamente y rota los tokens
- No compartas los tokens en código o logs

### 🔒 Tokens vs Contraseñas:
- **Tokens**: ✅ Recomendado, permisos granulares, revocables
- **Contraseñas**: ❌ Menos seguro, acceso completo a la cuenta

### 📝 Rotación de Tokens:
Se recomienda rotar los tokens cada 3-6 meses:
1. Genera un nuevo token en Docker Hub
2. Actualiza el secret `DOCKER_PASSWORD` en GitHub
3. Revoca el token anterior en Docker Hub

## 🆘 Troubleshooting

### Error: "Invalid credentials"
- Verifica que `DOCKER_USERNAME` esté correcto
- Regenera el token en Docker Hub
- Actualiza `DOCKER_PASSWORD` con el nuevo token

### Error: "Repository not found"
- Verifica que el repositorio `xlokius/hensearch` exista en Docker Hub
- Asegúrate de que tu usuario tenga permisos de escritura

### Error: "Rate limit exceeded"
- Docker Hub tiene límites de rate para usuarios gratuitos
- Considera usar Docker Hub Pro o esperar un tiempo

### Workflow no se ejecuta:
- Verifica que el archivo esté en `.github/workflows/docker-publish.yml`
- Comprueba que el YAML sea válido
- Revisa los triggers en el workflow

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del workflow en la pestaña Actions
2. Verifica que los secrets estén configurados correctamente
3. Comprueba la documentación de [GitHub Actions](https://docs.github.com/en/actions)
4. Consulta la documentación de [Docker Hub](https://docs.docker.com/docker-hub/)

---

**¡Una vez configurado, tu proyecto tendrá CI/CD completamente automatizado! 🚀**