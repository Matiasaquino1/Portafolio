# Primera etapa: Compilación
# Utiliza la imagen del SDK para compilar la aplicación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /src

# Copia los archivos del proyecto para restaurar las dependencias
# Esto optimiza el caché de Docker, ya que los archivos del proyecto cambian con menos frecuencia que el código
COPY TaskManager/*.csproj ./TaskManager/
RUN dotnet restore ./TaskManager/TaskManager.csproj

# Copia todo el código fuente del proyecto
COPY . .
WORKDIR /src/TaskManager

# Publica la aplicación, optimizada para un despliegue en producción
RUN dotnet publish -c Release -o /app/publish

# Segunda etapa: Tiempo de ejecución
# Utiliza la imagen ligera de ASP.NET para ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

# Establece el directorio de trabajo para la aplicación final
WORKDIR /app

# Copia los archivos de la aplicación publicada desde la etapa de compilación
COPY --from=build /app/publish .

# Exponer el puerto por el que la aplicación escuchará
# Koyeb asignará dinámicamente el puerto, pero es buena práctica declararlo.
EXPOSE 8080

# La configuración clave para Koyeb: usar el puerto dinámico de la variable de entorno
# Esto permite que la aplicación escuche en el puerto que Koyeb le asigna
ENV ASPNETCORE_URLS=http://+:$PORT

# Define el punto de entrada de la aplicación
ENTRYPOINT ["dotnet", "TaskManager.dll"]
