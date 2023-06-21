# La web del café

## Descripción del Proyecto:

El proyecto _La web del cafe_ es una aplicacion web de comercio electronico con una arquitectura MVC que nos permite realizar la compra de productos, asi como registrar productos y gestionarlos. Los roles en este proyecto tambien están incluidos, la diferencia de opciones entre un catalogo de productos y un administrador.

## Demostración de funciones y aplicaciones:

Es una aplicacion SPA de comercio electronico con _Angular_ consumo de API, y _POO_ con _Django y Python_.
Dedicada a la comercializacion de cafe y otras bebidas, incluidos aperitivos.

## Tecnologías utilizadas

El proyecto ha sido desarrollado utilizando las siguientes tecnologías:

- **Angular**: Un framework de desarrollo de aplicaciones web en TypeScript que permite la creación de interfaces de usuario interactivas y dinámicas.
- **Bootstrap**: Un framework de diseño front-end que proporciona herramientas y componentes para el desarrollo rápido y sencillo de interfaces web responsivas.
- **Django**: Un framework de desarrollo web de alto nivel que utiliza el lenguaje de programación Python para construir aplicaciones web seguras y escalables.
- **MySQL**: Un sistema de gestión de bases de datos relacional que se ha utilizado como backend para almacenar y recuperar los datos del sistema. También se ha utilizado el lenguaje SQL para realizar consultas y manipular la base de datos.

Además, como entorno de desarrollo se ha utilizado Visual Studio Code, un IDE popular y versátil que proporciona herramientas y extensiones para facilitar la codificación y depuración del proyecto.

## Personas Desarrolladoras del Proyecto

- Lucas Emir Sanchez
- Danilo Oviedo
- Daniel Aranda
- Grecia Azul Lossani
- Eduardo Nicolas Zurbriggen
- Jose Martin Oviedo
- Damian Emiliano Ledesma
- Fernando Esteban Juarez
- Hernan Ezequiel Juarez
- Facundo Villalba

## Levantar el proyecto localmente

Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo local:

1. Asegúrate de tener instaladas las siguientes herramientas:

   - Node.js: Para instalarlo, visita el sitio oficial de Node.js (https://nodejs.org) y sigue las instrucciones de instalación para tu sistema operativo.
   - Angular CLI: Abre una terminal y ejecuta el siguiente comando para instalar Angular CLI de forma global:
     ```
     npm install -g @angular/cli
     ```
   - TypeScript: Ejecuta el siguiente comando en la terminal para instalar TypeScript:
     ```
     npm install -g typescript
     ```
   - Python: Si aún no tienes instalado Python, puedes descargarlo e instalarlo desde el sitio oficial de Python (https://www.python.org)

   - Virtualenv: Ejecuta el siguiente comando en la terminal para instalar virtualenv:
     ```
     pip install virtualenv
     ```
   - MySQL: Instala el sistema de gestión de bases de datos MySQL en tu máquina y asegúrate de tener un servidor MySQL en ejecución.

2. Clona el repositorio del proyecto desde GitHub:
   ```
   git clone https://github.com/lucas-s4nchez/Proyecto-Grupal-Ecommerce
   ```
3. Navega hasta la carpeta raíz del proyecto:

   ```
   cd <nombre_de_la_carpeta_del_proyecto>
   ```

4. En la terminal navega hasta la carpeta backend (si ya estás en la raiz del proyceto: `cd backend`), y ejecuta el siguiente comando:
   ```
   virtualenv venv
   ```
5. Luego, para activar el entorno virtual presioná `ctrl + shift + p`, esto abrirá un modal en vscode donde vas a poner lo siguiente `Python: Select Interpreter`, le hacés click y te apareceran algunas opciones (si es que ya tenés otros entornos), elegí la opción `Escriba la ruta de acceso del intérprete...` y te aparecerá un input para colocar la ruta del entorno virtual que quieres activar, ahí es donde vas a poner la ruta del entorno creado, el que está en la carpeta backend, si el proyecto lo tenes en el escritorio la ruta sería algo así : "C:/Users/tuusuario/Desktop/Proyecto-Grupal-2023/backend/venv" .

6. Con el entorno virtual ya activado y sobre la carpeta backend ejecuta este comando en la terminal para instalar las dependencias del backend:
   ```
   pip install -r requirements.txt
   ```
7. Crear base de datos mysql, para poder hacer las migraciones en Django necesitas crear la base de datos primero, crea una base de datos mysql de forma local
8. Crea un archivo `.env` en la carpeta backend, este archivo va a contener las variables que no queremos que se suban al repositorio, en el archivo `.env.template` estan las variables que debes colocar en este archivo, con descripciones de lo que éstas guardan.
9. En este punto ya debería ser posible hacer las migraciones con Django, en tu terminal sobre la carpeta backend ejecuta el comando:
   ```
   python manage.py makemigrations
   ```
   y luego este otro:
   ```
   python manage.py migrate
   ```
10. Crear un superusuario, ejecuta en tu terminal sobre la carpeta backend el comando:
    ```
    python manage.py createsuperuser
    ```
    Te apareceran inputs para llenar con el correo y contraseña que quieras usar.
11. Levantar el servidor de django, ejecuta en tu terminal sobre la carpeta backend el comando:
    ```
    python manage.py runserver
    ```
12. Instalar las dependencias del frontend, ejecuta en tu terminal sobre la carpeta frontend el comando:
    ```
    npm install
    ```
13. Levantar el proyecto de angular, ejecuta en tu terminal sobre la carpeta frontend el comando:
    ```
    ng serve -o
    ```

## Integrar mercado pago

Debes seguir estos pasos para que acepten los pagos de mercado pago con usuarios de TEST

1. Crearte una integración de mercado pago.
2. Crear 2 cuentas de prueba una de vendedor y otra de comprador
3. Inicia sesion en la cuenta de prueba vendedor y crear una integración de mercado pago.
4. Guardar el access token de esta nueva integración en las variables de entorno.
5. Descargar `ngrok` (https://ngrok.com/) y guardar el archivo ngrok.exe en la carpeta backend del proyecto.
6. Activar el ngrok en la terminal sobre carpeta backend, ejecutar este comando:
   ```
   .\ngrok.exe http 8000
   ```
7. El dominio que te genera ngrok es algo asi:
   ```
   https://d660-168-196-24-185.sa.ngrok.io
   ```
8. Debes guardarlo en el archivo `.env` en la variable `NGROK_HOST` (guarda el dominio sin comillas) quitando el "https://", quedaría algo asi:
   ```
   NGROK_HOST=d660-168-196-24-185.sa.ngrok.io
   ```
9. Este dominio que te genera ngrok dura 2 horas, asi que debes actualizarlo ejecutando el paso 5 (sin descargarlo nuevamente ovbio), 6 y 7 cada 2 horas de ser necesario
10. Ya te deberia funcionar el mercado pago.
