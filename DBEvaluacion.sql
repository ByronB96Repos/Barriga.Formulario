USE [master]
GO
/****** Object:  Database [DBEvaluacion]    Script Date: 7/3/2025 1:43:08 ******/
CREATE DATABASE [DBEvaluacion]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DBEvaluacion', FILENAME = N'C:\Users\byron\DBEvaluacion.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DBEvaluacion_log', FILENAME = N'C:\Users\byron\DBEvaluacion_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DBEvaluacion] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBEvaluacion].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBEvaluacion] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBEvaluacion] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBEvaluacion] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBEvaluacion] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBEvaluacion] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBEvaluacion] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [DBEvaluacion] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBEvaluacion] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBEvaluacion] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBEvaluacion] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBEvaluacion] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBEvaluacion] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBEvaluacion] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBEvaluacion] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBEvaluacion] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DBEvaluacion] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBEvaluacion] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBEvaluacion] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBEvaluacion] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBEvaluacion] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBEvaluacion] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [DBEvaluacion] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBEvaluacion] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DBEvaluacion] SET  MULTI_USER 
GO
ALTER DATABASE [DBEvaluacion] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBEvaluacion] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DBEvaluacion] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DBEvaluacion] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DBEvaluacion] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DBEvaluacion] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DBEvaluacion] SET QUERY_STORE = OFF
GO
USE [DBEvaluacion]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 7/3/2025 1:43:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Campos]    Script Date: 7/3/2025 1:43:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Campos](
	[CampoID] [int] IDENTITY(1,1) NOT NULL,
	[CampoNombre] [nvarchar](max) NOT NULL,
	[CampoTipo] [nvarchar](max) NOT NULL,
	[FechaCreacion] [datetime2](7) NULL,
	[FechaEdicion] [datetime2](7) NULL,
	[FormularioID] [int] NOT NULL,
 CONSTRAINT [PK_Campos] PRIMARY KEY CLUSTERED 
(
	[CampoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Formularios]    Script Date: 7/3/2025 1:43:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Formularios](
	[FormularioID] [int] IDENTITY(1,1) NOT NULL,
	[FormularioNombre] [nvarchar](max) NOT NULL,
	[FechaCreacion] [datetime2](7) NULL,
	[FechaEdicion] [datetime2](7) NULL,
 CONSTRAINT [PK_Formularios] PRIMARY KEY CLUSTERED 
(
	[FormularioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Registros]    Script Date: 7/3/2025 1:43:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Registros](
	[RegistroID] [int] IDENTITY(1,1) NOT NULL,
	[FormularioID] [int] NOT NULL,
	[Valores] [nvarchar](max) NOT NULL,
	[FechaCreacion] [datetime2](7) NULL,
	[FechaEdicion] [datetime2](7) NULL,
 CONSTRAINT [PK_Registros] PRIMARY KEY CLUSTERED 
(
	[RegistroID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250306171432_Inicial', N'8.0.12')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250306174625_Registros_Formularios', N'8.0.12')
GO
SET IDENTITY_INSERT [dbo].[Campos] ON 

INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (1, N'nombres', N'text', CAST(N'2025-03-07T00:12:56.9570328' AS DateTime2), CAST(N'2025-03-07T00:12:56.9570924' AS DateTime2), 1)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (2, N'fecha de nacimiento', N'date', CAST(N'2025-03-07T00:13:39.6549657' AS DateTime2), CAST(N'2025-03-07T00:13:39.6549676' AS DateTime2), 1)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (3, N'estatura', N'number', CAST(N'2025-03-07T00:13:59.1261531' AS DateTime2), CAST(N'2025-03-07T00:13:59.1261549' AS DateTime2), 1)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (4, N'especie', N'text', CAST(N'2025-03-07T00:14:43.5063536' AS DateTime2), CAST(N'2025-03-07T00:14:43.5063592' AS DateTime2), 2)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (5, N'raza', N'text', CAST(N'2025-03-07T00:14:55.4299369' AS DateTime2), CAST(N'2025-03-07T00:14:55.4299391' AS DateTime2), 2)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (6, N'color', N'text', CAST(N'2025-03-07T00:15:06.6900318' AS DateTime2), CAST(N'2025-03-07T00:15:06.6900337' AS DateTime2), 2)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (7, N'nombre', N'text', CAST(N'2025-03-07T00:15:18.8318855' AS DateTime2), CAST(N'2025-03-07T00:15:18.8318874' AS DateTime2), 2)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (8, N'nombre', N'text', CAST(N'2025-03-07T00:21:52.7501767' AS DateTime2), CAST(N'2025-03-07T00:21:52.7501779' AS DateTime2), 3)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (9, N'precio', N'number', CAST(N'2025-03-07T00:22:12.6750317' AS DateTime2), CAST(N'2025-03-07T00:22:12.6750323' AS DateTime2), 3)
INSERT [dbo].[Campos] ([CampoID], [CampoNombre], [CampoTipo], [FechaCreacion], [FechaEdicion], [FormularioID]) VALUES (10, N'fecha de registro', N'date', CAST(N'2025-03-07T00:22:34.4125089' AS DateTime2), CAST(N'2025-03-07T00:22:34.4125098' AS DateTime2), 3)
SET IDENTITY_INSERT [dbo].[Campos] OFF
GO
SET IDENTITY_INSERT [dbo].[Formularios] ON 

INSERT [dbo].[Formularios] ([FormularioID], [FormularioNombre], [FechaCreacion], [FechaEdicion]) VALUES (1, N'Personas', CAST(N'2025-03-07T00:11:48.9058511' AS DateTime2), CAST(N'2025-03-07T00:11:48.9060235' AS DateTime2))
INSERT [dbo].[Formularios] ([FormularioID], [FormularioNombre], [FechaCreacion], [FechaEdicion]) VALUES (2, N'Mascotas', CAST(N'2025-03-07T00:12:03.4347096' AS DateTime2), CAST(N'2025-03-07T00:12:03.4347115' AS DateTime2))
INSERT [dbo].[Formularios] ([FormularioID], [FormularioNombre], [FechaCreacion], [FechaEdicion]) VALUES (3, N'Productos', CAST(N'2025-03-07T00:12:26.7928765' AS DateTime2), CAST(N'2025-03-07T00:12:26.7928795' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Formularios] OFF
GO
SET IDENTITY_INSERT [dbo].[Registros] ON 

INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (1, 1, N'{"nombres":"Byron Barriga","fecha de nacimiento":"1996-02-06","estatura":"1.85"}', CAST(N'2025-03-07T00:17:08.9940880' AS DateTime2), CAST(N'2025-03-07T00:17:08.9941471' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (2, 1, N'{"nombres":"Joseph Mosquera","fecha de nacimiento":"1997-02-15","estatura":"1.65"}', CAST(N'2025-03-07T00:18:01.3367079' AS DateTime2), CAST(N'2025-03-07T00:18:01.3367104' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (3, 1, N'{"nombres":"Diana Cajarmarca","fecha de nacimiento":"1997-06-13","estatura":"1.59"}', CAST(N'2025-03-07T00:18:52.2166334' AS DateTime2), CAST(N'2025-03-07T00:18:52.2166359' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (4, 2, N'{"especie":"Perro","raza":"Rootwailer","color":"Negro con cafe","nombre":"Dingo"}', CAST(N'2025-03-07T00:19:50.8409501' AS DateTime2), CAST(N'2025-03-07T00:19:50.8409538' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (5, 2, N'{"especie":"Gato","raza":"Siames","color":"Gris","nombre":"Botas"}', CAST(N'2025-03-07T00:20:22.4553431' AS DateTime2), CAST(N'2025-03-07T00:20:22.4553453' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (6, 2, N'{"especie":"Ave","raza":"Gallina","color":"Negra","nombre":"Tomasa"}', CAST(N'2025-03-07T00:21:18.4118677' AS DateTime2), CAST(N'2025-03-07T00:21:18.4118759' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (7, 3, N'{"nombre":"Loptop","precio":"1200.50","fecha de registro":"2025-03-06"}', CAST(N'2025-03-07T00:23:17.8634465' AS DateTime2), CAST(N'2025-03-07T00:23:17.8634472' AS DateTime2))
INSERT [dbo].[Registros] ([RegistroID], [FormularioID], [Valores], [FechaCreacion], [FechaEdicion]) VALUES (8, 3, N'{"nombre":"Celular","precio":"120","fecha de registro":"2025-03-06"}', CAST(N'2025-03-07T00:23:45.0547272' AS DateTime2), CAST(N'2025-03-07T00:23:45.0547279' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Registros] OFF
GO
/****** Object:  Index [IX_Campos_FormularioID]    Script Date: 7/3/2025 1:43:09 ******/
CREATE NONCLUSTERED INDEX [IX_Campos_FormularioID] ON [dbo].[Campos]
(
	[FormularioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Campos]  WITH CHECK ADD  CONSTRAINT [FK_Campos_Formularios_FormularioID] FOREIGN KEY([FormularioID])
REFERENCES [dbo].[Formularios] ([FormularioID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Campos] CHECK CONSTRAINT [FK_Campos_Formularios_FormularioID]
GO
USE [master]
GO
ALTER DATABASE [DBEvaluacion] SET  READ_WRITE 
GO
