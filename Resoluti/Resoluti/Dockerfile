#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#ENV ASPNETCORE_URLS=http://+:6000;http://+:80;
#ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Resoluti/Resoluti.csproj", "Resoluti/"]
RUN dotnet restore "Resoluti/Resoluti.csproj"
COPY . .
WORKDIR "/src/Resoluti"
RUN dotnet build "Resoluti.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Resoluti.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Resoluti.dll"]