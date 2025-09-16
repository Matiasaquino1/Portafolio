# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar csproj y restaurar paquetes
COPY taskmanagerapi/*.csproj ./taskmanagerapi/
RUN dotnet restore ./taskmanagerapi/TaskManager.csproj

# Copiar el resto del proyecto y publicar
COPY taskmanagerapi/. ./taskmanagerapi/
RUN dotnet publish ./taskmanagerapi/TaskManager.csproj -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/taskmanagerapi/out .
ENTRYPOINT ["dotnet", "TaskManager.dll"]

