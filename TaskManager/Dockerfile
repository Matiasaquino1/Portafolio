FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar el .csproj primero para aprovechar la cache
COPY TaskManager.csproj ./
RUN dotnet restore TaskManager.csproj

# Copiar el resto del código
COPY . ./
RUN dotnet publish TaskManager.csproj -c Release -o /app /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8000
ENTRYPOINT ["dotnet", "TaskManager.dll"]

