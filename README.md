# USER-AUTH-API

Api de almacenamiento y autenticación de usuarios a través de una **api key**, con tokens generados con JWT y almacenamiento en una base de datos de MongoDB.<br>
Cuenta con funcionalidades de búsqueda (lista e individual), registro, logueo, verificación de token y borrados (lógico y definitivo), como así también recuperación de cuentas borradas lógicamente.

---

## V1.0

## REQUERIMIENTOS

Si deseas descargar y experimentar el proyecto personalmente debes crear en la raíz un archivo **.env** con los siguientes elementos:

```javascript
PORT; // Número de puerto
MONGO_URI; // URI de la base de datos en MongoDB
TOKEN; // Token para JWT
```

## UTILIZACIÓN

Para poder hacer uso del proyecto primero debemos conocer la estructura de los dos modelos que posee el mismo:<br>

**MODELO -** `ApiKey`

Es el modelo que definirá las distintas ApiKeys del proyecto:

```typescript
{
  key: string; // ApiKey que será generado automáticamente
  project: string; // Nombre del proyecto que usará la ApiKey (1 ApiKey por proyecto), es un campo requerido
  email: string; // Email del usuario que utilizará la aplicación, es un campo requerido
}
```

**MODELO -** `User`
Es el modelo donde se alojarán los distintos usuarios vinculados a la ApiKey:

```typescript
{
  id: string; // Id del usuario (generado automáticamente)
  name: string; // Nombre del usuario (es un campo requerido)
  email: string; // Email del usuario (es un campo requerido)
  password: string; // Contraseña del correo (es requerido y además pasa por un proceso de hash antes de amacenarlo en la base de datos)
  status: string; // Dos opciones: "active" o "inactive" (se genera automáticamente)
  api_key: string; // ApiKey a la cual está vinculada el usuario (es un campo requerido)
  date: date; // Fecha de creación del usuario (se genera automáticamente)
  data: any; // Campo donde se podrá alojar la información que el proyecto necesite (no es un campo requerido)
}
```

### ENDPOINTS - APIKEY

Para hacer uso del proyecto primero es necesario generar una ApiKey:

**POST -** `/api_key/generate`

Genera una ApiKey para utilizar **user-auth-api** en un proyecto.

`body`

```typescript
{
  "email": string // Email del owner del proyecto
  "project": string // Nombre del proyecto, no pueden existir dos proyectos iguales con el mismo correo
}
```

`201`

```typescript
{ "key": string } // ApiKey generada
```

`500 - Error al no disponer del email o el proyecto`

```typescript
'Error: Missing Parameters!';
```

`500 - Error por existir un proyecto con el mismo nombre con el email establecido`

```typescript
'Error: Existing Project!';
```

`500 - Error en el formato del email`

```typescript
'Error: <- Mensaje generado por Joi ->!';
```

**GET -** `/api_key/projects`

Lista de proyectos asociados al email solicitado.

`body`

```typescript
{ "email": string } // Email del owner
```

`200`

```typescript
{
  "count": number // Número de proyectos
  "projects": [
    {
      "key": string // ApiKey del proyecto
      "project": string // Nombre del proyecto
      "email": string // Email del proyecto
    },
    ...
  ] // Lista de los proyectos asociados al email
}
```

`500 - Error al no disponer del email`

```typescript
'Error: Missing Parameters!';
```

`500 - Error al no existir el email en la base de datos`

```typescript
'Error: Owner not exists!';
```

**GET -** `/api_key/key`

Obtener la ApiKey de un proyecto.

`body`

```typescript
{
  "email": string // Email del owner del proyecto
  "project": string // Nombre del proyecto
}
```

`200`

```typescript
{ "key": string } // ApiKey del proyecto
```

`500 - Error al no disponer del email o el proyecto`

```typescript
'Error: Missing Parameters!';
```

`500 - Error al no existir el proyecto solicitado`

```typescript
'Error: Project not exists!';
```

### ENDPOINTS - USERS

Los siguientes endpoints requieren del query param **api_key**, si no se brinda dicha query se mostrará un error.

`500 - Error al no tener el query param "api_key"`

```typescript
'Error: Api Key required!';
```

`500 - Error al tener un query param "api_key" inválido`

```typescript
"Error: Api Key doesn't exist!";
```

_AUTENTICACIÓN_

**POST -** `/auth/register`

Añadir un nuevo usuario. **Name**, **Email** y **Password** poseen validaciones implementadas con Joi.

`body`

```typescript
{
  "name": string // Nombre del usuario
  "email": string // Email del usuario
  "password": string // Contraseña del usuario
  "data": any // Información adicional
}
```

`201`

```typescript
{
  "data": "User <- Username -> sucesfully created!"
}
```

`500 - Error usuario existente pero inactivo`

```typescript
'Error: Acount already exists but is inactive!';
```

`500 - Error email existente`

```typescript
'Error: Email already exists!';
```

`500 - Error al no pasar las validaciones de Joi`

```typescript
'Error: <- Mensaje generado por Joi ->!';
```

**POST -** `/auth/login`

Iniciar sesión con el usuario y generación del token. **Email** y **Password** poseen validaciones implementadas con Joi.

`body`

```typescript
{
  "email": string // Email del usuario
  "password": string // Contraseña del usuario
}
```

`201`

```typescript
{ "token": JWToken } // Token de sesión (válido por 31 días)
```

`500 - Error contraseña incorrecta`

```typescript
'Error: Invalid password!';
```

`500 - Error email inexistente`

```typescript
"Error: The email doesn't exist!";
```

`500 - Error al no pasar las validaciones de Joi`

```typescript
'Error: <- Mensaje generado por Joi ->!';
```

`500 - Error al querer iniciar sesión en una cuenta inactiva`

```typescript
'Error: Acount inactive!';
```

**GET -** `/auth/protected`

Verifica si el token es válido para que el usuario pueda seguir logueado.

`header`

```typescript
{ "auth-token": JWToken } // Token generado al iniciar sesión
```

`200`

```typescript
{ "valid": true }
```

`500 - Error al no pasar el token`

```typescript
'Error: Access denied!';
```

`500 - Error token inválido`

```typescript
'Error: Invalid token!';
```

`500 - Error usuario inexistente`

```typescript
'Error: User not found!';
```

_USUARIOS_

**GET -** `/users/list/:status`

Lista de usuarios según su estatus de actividad: **active** (Usuarios que no están "eliminados"), **inactive** (Usuarios con borrado lógico) y **all** (Ambos usuarios).

`200`

```typescript
{
  "count": number // Número de usuarios
  "status": string // active | inactive | all
  "users" : [
    {
      "id": string // Id del usuario
      "name": string // Nombre del usuario
      "email": string // Email del usuario
      "status": string // Status del ususario
      "date": date // Fecha de registro del usuario
      "data": any // Información adicional
    },
    ...
  ]
}
```

`500 - Error parámetro distinto a active | inactive | all`

```typescript
'Error: Invalid parameter!';
```

**GET -** `/users/id/:id`

Obtiene un usuario según su **id** ingresado por parámetro.

`200`

```typescript
{
  "id": string // Id del usuario
  "name": string // Nombre del usuario
  "email": string // Email del usuario
  "status": string // Status del ususario
  "date": date // Fecha de registro del usuario
  "data": any // Información adicional
}
```

`500 - Error al no ingresado el parámetro "id"`

```typescript
'Error: Invalid parameter!';
```

`500 - Error usuario inexistente`

```typescript
'Error: User not found!';
```

**PUT -** `/users/id/:id`

Realiza un borrado lógico del usuario según su **id** ingresado por parámetro. No se puede realizar un borrado lógico a un usuario que ya está inactivo.

`200`

```typescript
'User <- Username -> deleted!';
```

`500 - Error al no encontrar un usuario activo con el id solicitado`

```typescript
'Error: User not found or not active!';
```

**DELETE -** `/users/id/:id`

Realiza un borrado definitivo del usuario según su **id** ingresado por parámetro. Para poder realizar el borrado definitivo, primero hay que realizar el borrado lógico.

`200`

```typescript
'User permanently deleted and their records can no longer be accessed!';
```

`500 - Error al no encontrar un usuario inactivo con el id solicitado`

```typescript
'Error: User not found or not inactive!';
```

**PUT -** `/users/recovery/:id`

Recupera un usuario según su **id** ingresado por parámetro que está inactivo. Para poder realizar la recuperación de usuario, primero hay que realizar el borrado lógico.

`200`

```typescript
"<- Username ->'s account has been recovered!";
```

`500 - Error al no encontrar un usuario inactivo con el id solicitado`

```typescript
'Error: User not found or not inactive!';
```

## PRÓXIMOS PASOS

- Crear ruta para modificar el `users.data` (la información extra).
- Posibilidad de cambiar de contraseña.
- Posibilidad de cambiar el email.
- Crear entorno visual para crear las ApiKey's.
- Añadir el envio de correos electrónicos al generar una ApiKey.
- Fixes.
