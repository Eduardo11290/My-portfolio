using Microsoft.EntityFrameworkCore;
using Portfolio.BusinessLogic.Services;
using Portfolio.BusinessLogic.Services.Interfaces;
using Portfolio.DataAccess;
using Portfolio.DataAccess.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// --- Database (SQLite) ---
var connectionString = builder.Configuration.GetConnectionString("PortfolioContext")
    ?? "Data Source=portfolio.db";
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseSqlite(connectionString));

// --- Repositories ---
builder.Services.AddScoped<IContactMessageRepository, ContactMessageRepository>();
builder.Services.AddScoped<IRecommendationRepository, RecommendationRepository>();
builder.Services.AddScoped<IAnalyticsEventRepository, AnalyticsEventRepository>();

// --- Services ---
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IRecommendationService, RecommendationService>();
builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();

// --- Email (Resend) ---
var emailSettings = builder.Configuration.GetSection("Resend").Get<EmailSettings>()
    ?? new EmailSettings();
builder.Services.AddSingleton(emailSettings);
builder.Services.AddHttpClient<IEmailService, EmailService>();

// --- CORS (frontend) ---
var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>()
    ?? ["http://localhost:5173"];
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Create the SQLite database/schema on first run.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();
