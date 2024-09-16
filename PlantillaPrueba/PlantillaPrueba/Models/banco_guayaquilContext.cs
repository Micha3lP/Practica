using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PlantillaPrueba.Models
{
    public partial class banco_guayaquilContext : DbContext
    {
        public banco_guayaquilContext()
        {
        }

        public banco_guayaquilContext(DbContextOptions<banco_guayaquilContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Asiento> Asientos { get; set; } = null!;
        public virtual DbSet<CuentasContable> CuentasContables { get; set; } = null!;
        public virtual DbSet<Departamento> Departamentos { get; set; } = null!;
        public virtual DbSet<Movimiento> Movimientos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Asiento>(entity =>
            {
                entity.ToTable("asientos");

                entity.HasIndex(e => new { e.Fecha, e.AsientoId }, "UQ__asientos__CEDEBBD7E5CCF401")
                    .IsUnique();

                entity.Property(e => e.AsientoId).HasColumnName("asiento_id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.DptoId).HasColumnName("dpto_id");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.HasOne(d => d.Dpto)
                    .WithMany(p => p.Asientos)
                    .HasForeignKey(d => d.DptoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_dpto");
            });

            modelBuilder.Entity<CuentasContable>(entity =>
            {
                entity.HasKey(e => e.CuentaId)
                    .HasName("PK__cuentas___612B086186BC64ED");

                entity.ToTable("cuentas_contables");

                entity.Property(e => e.CuentaId).HasColumnName("cuenta_id");

                entity.Property(e => e.NumCuenta)
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("num_cuenta");
            });

            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.HasKey(e => e.DptoId)
                    .HasName("PK__departam__9E457488B9A9ECBA");

                entity.ToTable("departamentos");

                entity.Property(e => e.DptoId).HasColumnName("dpto_id");

                entity.Property(e => e.DescDpto)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("desc_dpto");
            });

            modelBuilder.Entity<Movimiento>(entity =>
            {
                entity.ToTable("movimientos");

                entity.Property(e => e.MovimientoId).HasColumnName("movimiento_id");

                entity.Property(e => e.AsientoId).HasColumnName("asiento_id");

                entity.Property(e => e.CuentaId).HasColumnName("cuenta_id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.TipoMovimiento)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("tipo_movimiento")
                    .IsFixedLength();

                entity.Property(e => e.Valor)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("valor");

                entity.HasOne(d => d.Asiento)
                    .WithMany(p => p.Movimientos)
                    .HasForeignKey(d => d.AsientoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_asiento");

                entity.HasOne(d => d.Cuenta)
                    .WithMany(p => p.Movimientos)
                    .HasForeignKey(d => d.CuentaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_cuenta");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
