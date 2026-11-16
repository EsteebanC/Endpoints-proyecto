SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `agencias` (
  `ID_Agencia` int(11) NOT NULL AUTO_INCREMENT,
  `Correo` varchar(255) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `ID_Reporte` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Agencia`),
  KEY `ID_Reporte` (`ID_Reporte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categoria` (
  `ID_Categoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `comentarios` (
  `ID_Comentario` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) DEFAULT NULL,
  `ID_Publicacion` int(11) DEFAULT NULL,
  `Contenido` varchar(255) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  PRIMARY KEY (`ID_Comentario`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Publicacion` (`ID_Publicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contratos` (
  `ID_Contratos` int(11) NOT NULL AUTO_INCREMENT,
  `ID_IA` int(11) DEFAULT NULL,
  `Condiciones` varchar(255) DEFAULT NULL,
  `Presupuesto` float DEFAULT NULL,
  `Fecha_Inicio` date DEFAULT NULL,
  `Fecha_Fin` date DEFAULT NULL,
  PRIMARY KEY (`ID_Contratos`),
  KEY `ID_IA` (`ID_IA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `estadisticas` (
  `ID_Estadisticas` int(11) NOT NULL AUTO_INCREMENT,
  `Total_Likes` int(11) DEFAULT NULL,
  `Total_Comentarios` int(11) DEFAULT NULL,
  `Total_Publicaciones` int(11) DEFAULT NULL,
  `Numero_Seguidores` int(11) DEFAULT NULL,
  `Numero_Compartidos` int(11) DEFAULT NULL,
  `ID_Publicacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Estadisticas`),
  KEY `ID_Publicacion` (`ID_Publicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `influencer_ia` (
  `ID_IA` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Algoritmo` varchar(255) DEFAULT NULL,
  `Fecha_Creacion` date DEFAULT NULL,
  `ID_Agencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_IA`),
  KEY `ID_Agencia` (`ID_Agencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `marcas` (
  `ID_Marca` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Contratos` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Producto` varchar(255) DEFAULT NULL,
  `Requisitos` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Marca`),
  KEY `ID_Contratos` (`ID_Contratos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `medios_pago` (
  `ID_Pago` int(11) NOT NULL AUTO_INCREMENT,
  `Moneda` varchar(255) DEFAULT NULL,
  `Proveedor` varchar(255) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `ID_Transaccion` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Pago`),
  KEY `ID_Transaccion` (`ID_Transaccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `multimedia` (
  `ID_Multimedia` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Categoria` int(11) DEFAULT NULL,
  `ID_IA` int(11) DEFAULT NULL,
  `Tamaño` int(11) DEFAULT NULL,
  `Duracion` int(11) DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Formato` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Multimedia`),
  KEY `ID_Categoria` (`ID_Categoria`),
  KEY `ID_IA` (`ID_IA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `nacionalidad` (
  `ID_Nacionalidad` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Persona` int(11) DEFAULT NULL,
  `ID_Agencia` int(11) DEFAULT NULL,
  `Pais` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Codigo_Postal` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Nacionalidad`),
  KEY `ID_Persona` (`ID_Persona`),
  KEY `ID_Agencia` (`ID_Agencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `notificaciones` (
  `ID_Notificacion` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Tipo` varchar(255) DEFAULT NULL,
  `Estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Notificacion`),
  KEY `ID_Usuario` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `personas` (
  `ID_Persona` int(11) NOT NULL AUTO_INCREMENT,
  `Edad` int(11) DEFAULT NULL,
  `Genero` varchar(255) DEFAULT NULL,
  `Pais` varchar(255) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Persona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `personas` (`ID_Persona`, `Edad`, `Genero`, `Pais`, `Nombre`) VALUES
(1, NULL, NULL, NULL, 'costa67'),
(2, NULL, NULL, NULL, 'isaac777'),
(3, NULL, NULL, NULL, 'costa67'),
(4, NULL, NULL, NULL, 'villahuila'),
(5, NULL, NULL, NULL, 'megufi');

CREATE TABLE `publicaciones` (
  `ID_Publicacion` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo_publicacion` varchar(255) DEFAULT NULL,
  `Fecha_Publicacion` datetime DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Numero_likes` int(11) DEFAULT NULL,
  `Numero_comentarios` int(11) DEFAULT NULL,
  `ID_Multimedia` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Publicacion`),
  KEY `ID_Multimedia` (`ID_Multimedia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `redes_sociales` (
  `ID_Redes` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `URL_Perfil` varchar(255) DEFAULT NULL,
  `ID_Publicacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Redes`),
  KEY `ID_Publicacion` (`ID_Publicacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `reportes` (
  `ID_Reporte` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Estadisticas` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Reporte`),
  KEY `ID_Estadisticas` (`ID_Estadisticas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `seguidores` (
  `ID_Seguidor` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) DEFAULT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Telefono` varchar(255) DEFAULT NULL,
  `ID_IA` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Seguidor`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_IA` (`ID_IA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tokens` (
  `ID_Token` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(255) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Token`),
  KEY `ID_Usuario` (`ID_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `transacciones` (
  `ID_Transaccion` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Token` int(11) DEFAULT NULL,
  `Monto` float DEFAULT NULL,
  `Estado` varchar(255) DEFAULT NULL,
  `Fecha` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Transaccion`),
  KEY `ID_Token` (`ID_Token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuarios` (
  `ID_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Persona` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `Fecha_Registro` datetime DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Usuario`),
  KEY `ID_Persona` (`ID_Persona`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuarios` (`ID_Usuario`, `ID_Persona`, `Email`, `Contrasena`, `Fecha_Registro`, `Username`) VALUES
(2, 2, 'donisaias@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2026-05-25 17:15:00', 'isaac777'),
(3, 3, 'costa67@gmail.com', '94026ed3f20a217455d5b63d7a7fea452955e5f9ebbef9c803006317212947a7', '2026-05-25 17:23:56', 'costa67'),
(4, 4, 'huilacampeon@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2026-05-25 17:31:44', 'villahuila'),
(5, 5, 'megufi@gmail.com', '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', '2026-05-26 21:16:22', 'megufi');

ALTER TABLE `agencias`
  ADD CONSTRAINT `agencias_ibfk_1` FOREIGN KEY (`ID_Reporte`) REFERENCES `reportes` (`ID_Reporte`);

ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicaciones` (`ID_Publicacion`);

ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`ID_IA`) REFERENCES `influencer_ia` (`ID_IA`);

ALTER TABLE `estadisticas`
  ADD CONSTRAINT `estadisticas_ibfk_1` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicaciones` (`ID_Publicacion`);

ALTER TABLE `influencer_ia`
  ADD CONSTRAINT `influencer_ia_ibfk_1` FOREIGN KEY (`ID_Agencia`) REFERENCES `agencias` (`ID_Agencia`);

ALTER TABLE `marcas`
  ADD CONSTRAINT `marcas_ibfk_1` FOREIGN KEY (`ID_Contratos`) REFERENCES `contratos` (`ID_Contratos`);

ALTER TABLE `medios_pago`
  ADD CONSTRAINT `medios_pago_ibfk_1` FOREIGN KEY (`ID_Transaccion`) REFERENCES `transacciones` (`ID_Transaccion`);

ALTER TABLE `multimedia`
  ADD CONSTRAINT `multimedia_ibfk_1` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`),
  ADD CONSTRAINT `multimedia_ibfk_2` FOREIGN KEY (`ID_IA`) REFERENCES `influencer_ia` (`ID_IA`);

ALTER TABLE `nacionalidad`
  ADD CONSTRAINT `nacionalidad_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`),
  ADD CONSTRAINT `nacionalidad_ibfk_2` FOREIGN KEY (`ID_Agencia`) REFERENCES `agencias` (`ID_Agencia`);

ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`ID_Multimedia`) REFERENCES `multimedia` (`ID_Multimedia`);

ALTER TABLE `redes_sociales`
  ADD CONSTRAINT `redes_sociales_ibfk_1` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicaciones` (`ID_Publicacion`);

ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`ID_Estadisticas`) REFERENCES `estadisticas` (`ID_Estadisticas`);

ALTER TABLE `seguidores`
  ADD CONSTRAINT `ID_IA` FOREIGN KEY (`ID_IA`) REFERENCES `influencer_ia` (`ID_IA`),
  ADD CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`ID_Usuario`);

ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`ID_Token`) REFERENCES `tokens` (`ID_Token`);

ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ID_Persona`) REFERENCES `personas` (`ID_Persona`);

COMMIT;