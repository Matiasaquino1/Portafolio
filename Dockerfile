# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar csproj y restaurar paquetes
COPY TaskManager/*.csproj ./TaskManager/
RUN dotnet restore ./TaskManager/TaskManager.csproj

# Copiar el resto del proyecto y publicar
COPY TaskManager/. ./TaskManager/
RUN dotnet publish ./TaskManager/TaskManager.csproj -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/TaskManager/out .
ENTRYPOINT ["dotnet", "TaskManager.dll"]

