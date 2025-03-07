using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Formularios.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Formularios",
                columns: table => new
                {
                    FormularioID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormularioNombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FechaEdicion = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formularios", x => x.FormularioID);
                });

            migrationBuilder.CreateTable(
                name: "Campos",
                columns: table => new
                {
                    CampoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CampoNombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CampoTipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FechaEdicion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FormularioID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Campos", x => x.CampoID);
                    table.ForeignKey(
                        name: "FK_Campos_Formularios_FormularioID",
                        column: x => x.FormularioID,
                        principalTable: "Formularios",
                        principalColumn: "FormularioID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Campos_FormularioID",
                table: "Campos",
                column: "FormularioID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Campos");

            migrationBuilder.DropTable(
                name: "Formularios");
        }
    }
}
