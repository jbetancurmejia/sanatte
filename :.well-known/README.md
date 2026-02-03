# Archivos para subir al servidor www.sanatte.com

## 📁 Estructura en tu servidor

Debes subir estos archivos a tu servidor en la siguiente estructura:

```
https://www.sanatte.com/
└── .well-known/
    ├── apple-app-site-association  (SIN EXTENSIÓN)
    └── assetlinks.json
```

---

## 📋 Pasos para configurar

### 1. Obtener tu Apple Team ID (para iOS)

1. Ve a https://developer.apple.com/account
2. Inicia sesión
3. Ve a "Membership"
4. Copia tu **Team ID** (ejemplo: `ABC123XYZ`)
5. Edita `apple-app-site-association` y reemplaza `YOUR_TEAM_ID` con tu Team ID real

### 2. Obtener tu SHA-256 fingerprint (para Android)

Ejecuta este comando en tu terminal:

```bash
cd /Users/juan.betancur/Documents/pruebas_flutter/sanatte_app/android
./gradlew signingReport
```

Busca en la salida algo como:

```
Variant: debug
Config: debug
Store: ~/.android/debug.keystore
Alias: AndroidDebugKey
MD5: XX:XX:XX:...
SHA1: XX:XX:XX:...
SHA256: AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00:AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00
```

Copia el valor de **SHA256** (sin los dos puntos `:`) y reemplaza `REEMPLAZAR_CON_TU_SHA256_FINGERPRINT` en `assetlinks.json`.

Por ejemplo, si tu SHA256 es `AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00:AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00`, debes poner:

```json
"sha256_cert_fingerprints": [
  "AABBCCDDEEFF11223344556677889900AABBCCDDEEFF11223344556677889900"
]
```

⚠️ **IMPORTANTE:** Para producción, necesitarás el SHA256 de tu **release keystore**, no del debug.

### 3. Subir archivos al servidor

#### Usando FTP/SFTP:
1. Conecta a tu servidor
2. Navega a la raíz de `www.sanatte.com`
3. Crea carpeta `.well-known` (si no existe)
4. Sube:
   - `apple-app-site-association` (SIN extensión .json)
   - `assetlinks.json`

#### Usando cPanel/File Manager:
1. Entra a tu cPanel
2. Ve a "File Manager"
3. Navega a `public_html/` o la raíz de tu dominio
4. Crea carpeta `.well-known`
5. Sube los archivos

#### Usando SSH:
```bash
scp apple-app-site-association user@sanatte.com:/var/www/html/.well-known/
scp assetlinks.json user@sanatte.com:/var/www/html/.well-known/
```

### 4. Configurar permisos y Content-Type

**apple-app-site-association** debe:
- Ser accesible públicamente
- Servirse con `Content-Type: application/json`
- NO tener extensión `.json` en el nombre
- Tener permisos de lectura (644)

**assetlinks.json** debe:
- Ser accesible públicamente
- Servirse con `Content-Type: application/json`
- Tener permisos de lectura (644)

#### Si usas Apache, crea un archivo `.htaccess` en `.well-known/`:

```apache
<Files "apple-app-site-association">
  Header set Content-Type "application/json"
</Files>
```

#### Si usas Nginx, agrega a tu configuración:

```nginx
location /.well-known/apple-app-site-association {
    default_type application/json;
}
```

---

## ✅ Verificación

### Verificar que los archivos son accesibles:

```bash
# Verificar iOS
curl https://www.sanatte.com/.well-known/apple-app-site-association

# Verificar Android
curl https://www.sanatte.com/.well-known/assetlinks.json
```

Ambos comandos deben retornar JSON válido.

### Verificar con Apple:

1. Ve a: https://search.developer.apple.com/appsearch-validation-tool/
2. Ingresa: `https://www.sanatte.com`
3. Debe aparecer como válido

### Verificar con Google:

1. Ve a: https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://www.sanatte.com&relation=delegate_permission/common.handle_all_urls
2. Debe retornar tu configuración

---

## 🔧 Troubleshooting

### Error: "apple-app-site-association not found"
- Verifica que el archivo NO tenga extensión `.json`
- Verifica permisos (debe ser 644)
- Verifica que esté en la ruta correcta

### Error: "Invalid JSON"
- Verifica la sintaxis del JSON
- No dejes comas finales
- Reemplaza correctamente el Team ID y SHA256

### Error: "Access denied"
- Verifica permisos del archivo (644)
- Verifica permisos de la carpeta `.well-known` (755)

---

## 📱 Después de subir los archivos

1. Espera 5-10 minutos para que Apple/Google cacheen los archivos
2. Desinstala y reinstala la app en tu dispositivo
3. Prueba el flujo de recuperación de contraseña
4. El enlace del email debería abrir la app directamente

---

## 🔐 Para producción (importante)

Cuando publiques la app en las tiendas:

1. **iOS:** Genera un release build y obtén el Team ID de tu cuenta de desarrollador de pago
2. **Android:** Firma tu APK/AAB con tu keystore de producción y obtén su SHA256
3. Actualiza ambos archivos con los valores de producción
4. Re-sube los archivos al servidor

Para obtener el SHA256 de tu keystore de producción:

```bash
keytool -list -v -keystore tu-keystore.jks -alias tu-alias
```
