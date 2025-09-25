using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using TaskManager.Data;



var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("DefaultConnection")
                      ?? builder.Configuration.GetConnectionString("DefaultConnection");

Console.WriteLine($"Using connection: {connectionString}");

builder.Services.AddDbContext<TaskContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowGithubPages",
        policy =>
        {
            policy.WithOrigins("https://matiasaquino1.github.io") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors("AllowGithubPages");
app.UseAuthorization();
app.MapControllers();

app.MapGet("/db-check", async (TaskContext db) =>
{
    var canConnect = await db.Database.CanConnectAsync();
    return Results.Ok(new { success = canConnect });
});

app.MapGet("/health", () => Results.Ok("OK from Render!"));


app.Run();

