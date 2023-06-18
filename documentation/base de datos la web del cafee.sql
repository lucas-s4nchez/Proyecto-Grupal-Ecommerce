create database lawebdelcafee;

use lawebdelcafee;

CREATE TABLE `usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `dni` INT NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(10) NOT NULL,
  `tipo_usuario` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_usuario`));
  
CREATE TABLE `categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categoria`));
  
CREATE TABLE `Stock` (
<<<<<<< HEAD
  `id_stock` INT NOT NULL AUTO_INCREMENT,
  `stock` TINYINT NOT NULL,
  PRIMARY KEY (`id_stock`));
=======
  `id_strock` INT NOT NULL AUTO_INCREMENT,
  `stock` TINYINT NOT NULL,
  PRIMARY KEY (`id_strock`));
>>>>>>> 45adf58cd6e8d19fca49619a2bff3b949af6544f
  
CREATE TABLE `producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT NOT NULL,
<<<<<<< HEAD
  `id_stock` INT NOT NULL,
=======
  `id_strock` INT NOT NULL,
>>>>>>> 45adf58cd6e8d19fca49619a2bff3b949af6544f
  `precio_producto` DECIMAL(10,2) NOT NULL,
  `nombre` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_producto`),
  CONSTRAINT `id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
<<<<<<< HEAD
  CONSTRAINT `fk_id_stock` FOREIGN KEY (`id_stock`) REFERENCES `Stock` (`id_stock`));
=======
  CONSTRAINT `fk_id_stock` FOREIGN KEY (`id_strock`) REFERENCES `Stock` (`id_strock`));
>>>>>>> 45adf58cd6e8d19fca49619a2bff3b949af6544f
  
CREATE TABLE `carrito` (
  `id_carrito` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_carrito`),
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
);

CREATE TABLE `metodoPago` (
  `id_metodoPago` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_metodoPago`));
  
CREATE TABLE `prod_carrito` (
  `id_prod_carrito` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `id_carrito` INT NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`id_prod_carrito`),
  CONSTRAINT `fk_id_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_id_carrtio`FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`));
  
CREATE TABLE `orden` (
  `id_orden` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_metodoPago` INT NOT NULL,
  `id_prod_carrito` INT NOT NULL,
  `sumaTotal` DECIMAL(10,2) NOT NULL,
  `fecha` DATE NOT NULL,
  `estado` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_orden`),
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `fk_id_metodoPago` FOREIGN KEY (`id_metodoPago`) REFERENCES `metodoPago` (`id_metodoPago`),
  CONSTRAINT `fk_id_prod_carrito` FOREIGN KEY (`id_prod_carrito`) REFERENCES `prod_carrito` (`id_prod_carrito`));
  
  select * from detalle;
  
CREATE TABLE `detalleOrden` (
  `id_detalleOrden` INT NOT NULL AUTO_INCREMENT,
  `id_orden` INT NOT NULL,
  `precio_producto` DECIMAL(10,2) NOT NULL,
  `cantidad` INT NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_detalleOrden`),
  CONSTRAINT `fk_id_orden` FOREIGN KEY (`id_orden`) REFERENCES`orden` (`id_orden`));
    
    
    
    
    
    