using System;
using Entity;
using Microsoft.EntityFrameworkCore;


namespace Datos
{
    public class PersonaContext : DbContext
    {
        public PersonaContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Persona> Persona { get; set; }
        public DbSet<Pagos> Pagos { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Prestamos> Prestamos{get;set;}
    }
}
