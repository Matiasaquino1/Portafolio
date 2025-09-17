# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src # Cambiado a /src para evitar conflictos

# Copiar csproj y restaurar paquetes
COPY TaskManager/*.csproj ./TaskManager/
RUN dotnet restore ./TaskManager/TaskManager.csproj

# Copiar el resto del proyecto y publicar
COPY . .
WORKDIR /src/TaskManager # Nos movemos al directorio del proyecto para simplificar la publicación
# El flag -o /app/out fuerza que la salida vaya a un directorio raíz y plano
RUN dotnet publish TaskManager.csproj -c Release -o /app/out --no-restore 

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final # Le damos un nombre a la etapa
WORKDIR /app

# Copiamos desde la ruta plana /app/out de la etapa 'build'
COPY --from=build /app/out . # <<< ¡Esta es la línea clave de corrección!

ENTRYPOINT ["dotnet", "TaskManager.dll"]
