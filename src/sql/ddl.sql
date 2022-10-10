CREATE TABLE dessert(
  id INT NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `detail` varchar(255),
  `price` DECIMAL(5, 2) NOT NULL,

  PRIMARY KEY(id)
);

INSERT INTO dessert(name, detail, price) VALUES ('Test', 'Test Detail', 10.4);
