# ===== Build =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar el código y restaurar dependencias
COPY . .
RUN dotnet restore

# Publicar en modo Release
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# ===== Runtime =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Koyeb define un PORT dinámico
ENV ASPNETCORE_HTTP_PORTS=${PORT}
EXPOSE 8080

# Copiar archivos publicados desde build
COPY --from=build /app/publish .

# Iniciar la app
ENTRYPOINT ["dotnet", "TaskManager.dll"]
