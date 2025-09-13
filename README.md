<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Aplicación para administrar gatos

## CLONAR ESTE REPO
```bash
https://github.com/Axelius55/nestJS_Cats_Curso_Postgres.git
```

## Instalar dependencias

```bash
npm install
```

## COPIA Y AJUSTA EL ENV Y EN EL YML

## LEVANTA EL CONTENEDOR DE DOCKER

```bash
docker compose up --build
```

## Correr el proyecto de NestJS

```bash
npm run start:dev
```

## TE PEDIRA REGISTRARTE EN ESTE ENDPOINT

localhost:3000/api/v1  SERÁ SIEMPRE LA BASE PARA ACCEDER A LAS RUTAS

```bash
localhost:3000/api/v1/auth/register
```

POST

```json
{
    "userName": "HolaNose",
    "userEmail": "ehsjauu@gmail.com",
    "userPassword": "18892019"
}
```

## YA ESTÁS ESN LA BD!! AHORA DEBERAS HACER LOGIN

POST
```bash
localhost:3000/api/v1/auth/login
```

necesitarás tu email y tu password

```json
{
    "userEmail": "ehsjauu@gmail.com",
    "userPassword": "18892019"
}
```

LA RESPUESTA SERÁ ALGO PARECIDO A ESTO:

```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVoc2phdXVAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTc3MjQzMDYsImV4cCI6MTc1NzgxMDcwNn0.F02tPnYkBnh-_t37SsDVTYgLvEkFHm9ijiOrvOwpZtw",
    "email": "ehsjauu@gmail.com"
}
```

## NOTA: al registarte siempre apareceras como usuario, si quieres ser admin necesitas un gestor de BD como tablePlus para cambiar tu rol

## Se te otrogara un token en Postman este deberás usarlo como bearer token para poder acceder a cualquier ruta



## PARA CONOCER TODOS LOS ENDPOINTS ENTRA: 

http://localhost:3000/docs#

### PUEDES PROBAR LOS ENDPOINTS EN POSTMAN SIN MANDAR NADA Y ALLÍ MISMO SE TE DIRAN LAS PROPIEDADES QUE ESPERA QUE MANDES

### TAMBIÉN PUEDES ENTRAR A CADA DTO (ejemplo: create-cat.dto) PARA SABER TODAS LAS PROPIEDADES QUE ESPERA UN CAT


