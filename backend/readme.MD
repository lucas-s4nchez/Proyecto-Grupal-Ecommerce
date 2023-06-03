## Crear entorno virual

Instalar virtualenv en tu pc `pip install virtualenv`.

Dentro del proyecto en tu terminal sobre la carpeta backend ejecutar el siguiente comando `virtualenv venv`.

Luego para activar el entorno virtual presioná `ctrl + shift + p`, esto abrirá un modal en vscode donde vas a poner lo siguiente `Python: Select Interpreter`, le hacés click y te apareceran algunas opciones (si es que ya tenés otros entornos), elegí la opción `Escriba la ruta de acceso del intérprete...` y te aparecerá un input para colocar la ruta del entorno virtual que quieres activar, ahí es donde vas a poner la ruta del entorno creado, el que está en la carpeta backend, si el proyecto lo tenes en el escritorio la ruta sería algo así : "C:/Users/tuusuario/Desktop/Proyecto-Grupal-2023/backend/venv" .

## Instalar dependencias necesarias

Con el comando `pip install -r requirements.txt` se instalan todas las dependencias del proyecto.

## Crear base de datos mysql

Para poder hacer las migraciones en django necesitas crear la base de datos primero, crea una base de datos mysql de forma local

## Crear las variables de entorno

Crea un archivo `.env` en la carpeta backend, este archivo va a contener las variables que no queremos que se suban al repositorio, en el archivo `.env.template` estan las variables que debes colocar en este archivo, con descripciones de lo que éstas guardan.

## Hacer las migraciones

En este punto ya debería ser posible hacer las migraciones con django, en tu terminal sobre la carpeta backend ejecuta el comando `python manage.py makemigrations` y luego este otro `python manage.py migrate`

Con esto los modelos de django y los que creamos adicionalmente, se conectaran con nuestra base de datos

## Crear un superusuario

Ejecuta en tu terminal sobre la carpeta backend el comando `python manage.py createsuperuser`, te apareceran inputs para llenar con el correo y contraseña que quieras usar.

## Levantar el servidor

`python manage.py runserver`
