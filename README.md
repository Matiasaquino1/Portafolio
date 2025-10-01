Portafolio - TaskManager
Bienvenido a mi proyecto TaskManager, una aplicación web desarrollada con React para la gestión eficiente de tareas, que se conecta a una API RESTful desarrollada en .NET ASP.NET Core. 
Este proyecto forma parte de mi portafolio.

Descripción del proyecto
TaskManager es una interfaz de usuario intuitiva y responsiva que permite a los usuarios crear, editar, eliminar y organizar tareas de manera sencilla. 
La aplicación consume una API RESTful desarrollada en ASP.NET Core que gestiona la lógica y persistencia de datos.

Tecnologías utilizadas
Frontend:

React 18
React Scripts
JavaScript (ES6+)
CSS3
GitHub Pages (despliegue frontend)

Backend:

ASP.NET Core Web API (.NET 7)
Entity Framework Core (para acceso a datos)
Despliegue en Render (plataforma serverless/cloud)
Características principales
Gestión completa de tareas: creación, edición, eliminación y listado.
Comunicación frontend-backend mediante API RESTful.
Interfaz limpia, responsiva y fácil de usar.
Despliegue público del frontend en GitHub Pages.
API backend desplegada en Render con alta disponibilidad.

URLs de acceso
Frontend (UI React):
https://matiasaquino1.github.io/TaskManager/

API RESTful (ASP.NET Core):
https://taskmanager-hzrt.onrender.com

Cómo ejecutar el proyecto localmente

*Frontend*
Clona el repositorio:
git clone https://github.com/Matiasaquino1/TaskManager

Instala las dependencias:
npm install

Ejecuta la app en modo desarrollo:
npm start
(abri el navegador en 'http://localhost:3000')

*Backend*
Si deseas ejecutar la API localmente, asegúrate de tener instalado .NET 7 SDK y sigue estos pasos:

Accede a la carpeta del backend.

Restaura las dependencias y compila:

dotnet restore
dotnet build

Ejecuta la API:

dotnet run

La API estará disponible en https://localhost:5001/api/tasks.

Despliegue:
El frontend está desplegado en GitHub Pages y se actualiza con:

npm run deploy
La API backend está desplegada en Koyeb, una plataforma serverless que garantiza alta disponibilidad y escalabilidad.


Contacto:
Para más información o consultas, puedes contactarme en:

GitHub: https://github.com/Matiasaquino1
LinkedIn: https://www.linkedin.com/in/matias-aquino-988752187/
