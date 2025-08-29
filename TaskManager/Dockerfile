
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src


COPY ["./", "./"]
RUN dotnet restore


RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80


COPY --from=publish /app/publish .


ENTRYPOINT ["dotnet", "TaskManager.dll"]