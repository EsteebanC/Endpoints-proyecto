-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2026 a las 18:21:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `shortia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agencias`
--

CREATE TABLE `agencias` (
  `ID_Agencia` int(11) NOT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `ID_Reporte` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_Categoria` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `ID_Comentario` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `ID_Publicacion` int(11) DEFAULT NULL,
  `Contenido` varchar(255) DEFAULT NULL,
  `Fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `ID_Contratos` int(11) NOT NULL,
  `ID_IA` int(11) DEFAULT NULL,
  `Condiciones` varchar(255) DEFAULT NULL,
  `Presupuesto` float DEFAULT NULL,
  `Fecha_Inicio` date DEFAULT NULL,
  `Fecha_Fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas`
--

CREATE TABLE `estadisticas` (
  `ID_Estadisticas` int(11) NOT NULL,
  `Total_Likes` int(11) DEFAULT NULL,
  `Total_Comentarios` int(11) DEFAULT NULL,
  `Total_Publicaciones` int(11) DEFAULT NULL,
  `Numero_Seguidores` int(11) DEFAULT NULL,
  `Numero_Compartidos` int(11) DEFAULT NULL,
  `ID_Publicacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `influencer_ia`
--

CREATE TABLE `influencer_ia` (
  `ID_IA` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Algoritmo` varchar(255) DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  `ID_Agencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `ID_Marca` int(11) NOT NULL,
  `ID_Contratos` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Producto` varchar(255) DEFAULT NULL,
  `Requisitos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medios_pago`
--

CREATE TABLE `medios_pago` (
  `ID_Pago` int(11) NOT NULL,
  `Moneda` varchar(255) DEFAULT NULL,
  `Proveedor` varchar(255) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `ID_Transaccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia`
--

CREATE TABLE `multimedia` (
  `ID_Multimedia` int(11) NOT NULL,
  `ID_Categoria` int(11) DEFAULT NULL,
  `ID_IA` int(11) DEFAULT NULL,
  `Tamaño` int(11) DEFAULT NULL,
  `Duracion` int(11) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Formato` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacionalidad`
--

CREATE TABLE `nacionalidad` (
  `ID_Nacionalidad` int(11) NOT NULL,
  `ID_Persona` int(11) DEFAULT NULL,
  `ID_Agencia` int(11) DEFAULT NULL,
  `Pais` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Codigo_Postal` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `ID_Notificacion` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `Estado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `ID_Persona` int(11) NOT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Genero` varchar(255) DEFAULT NULL,
  `Pais` varchar(255) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`ID_Persona`, `Edad`, `Genero`, `Pais`, `Nombre`) VALUES
(1, NULL, NULL, NULL, 'costa67'),
(2, NULL, NULL, NULL, 'isaac777'),
(3, NULL, NULL, NULL, 'costa67'),
(4, NULL, NULL, NULL, 'villahuila'),
(5, NULL, NULL, NULL, 'megufi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `ID_Publicacion` int(11) NOT NULL,
  `Tipo_publicacion` varchar(255) DEFAULT NULL,
  `Fecha_Publicacion` datetime DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Numero_likes` int(11) DEFAULT NULL,
  `Numero_comentarios` int(11) DEFAULT NULL,
  `ID_Multimedia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `redes_sociales`
--

CREATE TABLE `redes_sociales` (
  `ID_Redes` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `URL_Perfil` varchar(255) DEFAULT NULL,
  `ID_Publicacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `ID_Reporte` int(11) NOT NULL,
  `ID_Estadisticas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguidores`
--

CREATE TABLE `seguidores` (
  `ID_Seguidor` int(11) NOT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Telefono` varchar(255) DEFAULT NULL,
  `ID_IA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `ID_Token` int(11) NOT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `ID_Transaccion` int(11) NOT NULL,
  `ID_Token` int(11) DEFAULT NULL,
  `Monto` float DEFAULT NULL,
  `Estado` varchar(255) DEFAULT NULL,
  `Fecha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL,
  `ID_Persona` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `Fecha_Registro` datetime DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID_Usuario`, `ID_Persona`, `Email`, `Contrasena`, `Fecha_Registro`, `Username`) VALUES
(2, 2, 'donisaias@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2026-05-25 17:15:00', 'isaac777'),
(3, 3, 'costa67@gmail.com', '94026ed3f20a217455d5b63d7a7fea452955e5f9ebbef9c803006317212947a7', '2026-05-25 17:23:56', 'costa67'),
(4, 4, 'huilacampeon@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2026-05-25 17:31:44', 'villahuila'),
(5, 5, 'megufi@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2026-05-26 21:16:22', 'megufi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agencias`
--
ALTER TABLE `agencias`
  ADD PRIMARY KEY (`ID_Agencia`),
  ADD KEY `ID_Reporte` (`ID_Reporte`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`ID_Comentario`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `ID_Publicacion` (`ID_Publicacion`);

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`ID_Contratos`),
  ADD KEY `ID_IA` (`ID_IA`);

--
-- Indices de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD PRIMARY KEY (`ID_Estadisticas`),
  ADD KEY `ID_Publicacion` (`ID_Publicacion`);

--
-- Indices de la tabla `influencer_ia`
--
ALTER TABLE `influencer_ia`
  ADD PRIMARY KEY (`ID_IA`),
  ADD KEY `ID_Agencia` (`ID_Agencia`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`ID_Marca`),
  ADD KEY `ID_Contratos` (`ID_Contratos`);

--
-- Indices de la tabla `medios_pago`
--
ALTER TABLE `medios_pago`
  ADD PRIMARY KEY (`ID_Pago`),
  ADD KEY `ID_Transaccion` (`ID_Transaccion`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`ID_Multimedia`),
  ADD KEY `ID_Categoria` (`ID_Categoria`),
  ADD KEY `ID_IA` (`ID_IA`);

--
-- Indices de la tabla `nacionalidad`
--
ALTER TABLE `nacionalidad`
  ADD PRIMARY KEY (`ID_Nacionalidad`),
  ADD KEY `ID_Persona` (`ID_Persona`),
  ADD KEY `ID_Agencia` (`ID_Agencia`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`ID_Notificacion`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`ID_Persona`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`ID_Publicacion`),
  ADD KEY `ID_Multimedia` (`ID_Multimedia`);

--
-- Indices de la tabla `redes_sociales`
--
ALTER TABLE `redes_sociales`
  ADD PRIMARY KEY (`ID_Redes`),
  ADD KEY `ID_Publicacion` (`ID_Publicacion`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`ID_Reporte`),
  ADD KEY `ID_Estadisticas` (`ID_Estadisticas`);

--
-- Indices de la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD PRIMARY KEY (`ID_Seguidor`),
  ADD KEY `ID_Usuario` (`ID_Usuario`),
  ADD KEY `ID_IA` (`ID_IA`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`ID_Token`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`ID_Transaccion`),
  ADD KEY `ID_Token` (`ID_Token`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID_Usuario`),
  ADD KEY `ID_Persona` (`ID_Persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agencias`
--
ALTER TABLE `agencias`
  MODIFY `ID_Agencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `ID_Comentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `ID_Contratos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  MODIFY `ID_Estadisticas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `influencer_ia`
--
ALTER TABLE `influencer_ia`
  MODIFY `ID_IA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `ID_Marca` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medios_pago`
--
ALTER TABLE `medios_pago`
  MODIFY `ID_Pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `ID_Multimedia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nacionalidad`
--
ALTER TABLE `nacionalidad`
  MODIFY `ID_Nacionalidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `ID_Notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `ID_Persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `ID_Publicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `redes_sociales`
--
ALTER TABLE `redes_sociales`
  MODIFY `ID_Redes` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `ID_Reporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seguidores`
--
ALTER TABLE `seguidores`
  MODIFY `ID_Seguidor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `ID_Token` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `ID_Transaccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agencias`
--
ALTER TABLE `agencias`
  ADD CONSTRAINT `agencias_ibfk_1` FOREIGN KEY (`ID_Reporte`) REFERENCES `reportes` (`ID_Reporte`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicaciones` (`ID_Publicacion`);

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`ID_IA`) REFERENCES `influencer_ia` (`ID_IA`);

--
-- Filtros para la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD CONSTRAINT `estadisticas_ibfk_1` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicaciones` (`ID_Publicacion`);

--
-- Filtros para la tabla `influencer_ia`
--
ALTER TABLE `influencer_ia`
  ADD CONSTRAINT `influencer_ia_ibfk_1` FOREIGN KEY (`ID_Agencia`) REFERENCES `agencias` (`ID_Agencia`);

--
-- Filtros para la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD CONSTRAINT `marcas_ibfk_1` FOREIGN KEY (`ID_Contratos`) REFERENCES `contratos` (`ID_Contratos`);

--
-- Filtros para la tabla `medios_pago`
--
ALTER TABLE `medios_pago`
  ADD CONSTRAINT `medios_pago_ibfk_1` FOREIGN KEY (`ID_Transaccion`) REFERENCES `transacciones` (`ID_Transaccion`);

--
-- Filtros para la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD CONSTRAINT `multimedia_ibfk_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`),
  ADD CONSTRAINT `multimedia_ibfk_2` FOREIGN KEY (`ID_IA`) REFERENCES `influencer_ia` (`ID_IA`);

--
-- Filtros para la tabla `nacionalidad`
--
ALTER TABLE `nacionalidad`
  ADD CONSTRAINT `nacionalidad_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`),
  ADD CONSTRAINT `nacionalidad_ibfk_2` FOREIGN KEY (`ID_Agencia`) REFERENCES `agencias` (`ID_Agencia`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`ID_Multimedia`) REFERENCES `multimedia` (`ID_Multimedia`);

--
-- Filtros para la tabla `redes_sociales`
--
ALTER TABLE `redes_sociales`
  ADD CONSTRAINT `redes_sociales_ibfk_1` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicaciones` (`ID_Publicacion`);

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`ID_Estadisticas`) REFERENCES `estadisticas` (`ID_Estadisticas`);

--
-- Filtros para la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD CONSTRAINT `ID_IA` FOREIGN KEY (`ID_IA`) REFERENCES `influencer_ia` (`ID_IA`),
  ADD CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`ID_Token`) REFERENCES `tokens` (`ID_Token`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
