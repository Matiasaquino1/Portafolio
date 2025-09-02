FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar csproj y restaurar dependencias
COPY TaskManager/*.csproj TaskManager/
RUN dotnet restore TaskManager/TaskManager.csproj

# Copiar todo y compilar
COPY . .
WORKDIR /src/TaskManager
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
EXPOSE 8000
ENV ASPNETCORE_URLS=http://+:8000
ENTRYPOINT ["dotnet", "TaskManager.dll"]


