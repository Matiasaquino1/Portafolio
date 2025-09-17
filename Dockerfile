# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src 

# Copiar csproj y restaurar paquetes
COPY TaskManager/*.csproj ./TaskManager/
RUN dotnet restore ./TaskManager/TaskManager.csproj

# Copiar el resto del proyecto y publicar
COPY . .
WORKDIR /src/TaskManager
# Publica la aplicación a la ruta /app/out
RUN dotnet publish TaskManager.csproj -c Release -o /app/out --no-restore 


# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final 
WORKDIR /app

# Línea 16 Corregida: Usa COPY --from para copiar los binarios de la etapa 'build'
COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "TaskManager.dll"]