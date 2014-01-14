﻿CREATE TABLE `User` (
  idUser                          int unsigned NOT NULL AUTO_INCREMENT, # Autogenerated User ID.
  userName						  varchar(50) NOT NULL,                 # The name of the user
  emailAddress		              varchar(50) NOT NULL UNIQUE,          # The email address of the user
  password               		  varchar(50) NOT NULL,                 # The encrypted password
  lang						  	  varchar(10) NOT NULL,					# The prefered language

  PRIMARY KEY (idUser)
);

CREATE TABLE `Group` (
	idGroup 					  int unsigned NOT NULL AUTO_INCREMENT,
	groupName 					  varchar(50) NOT NULL,
	idAdmin 					  int unsigned NOT NULL,
	
	PRIMARY KEY (idGroup)
);

CREATE TABLE `GroupAndUser` (
	idGroup 					   int unsigned NOT NULL,
	idUser                         int unsigned NOT NULL,
	
	PRIMARY KEY(idGroup, idUser)
);

CREATE TABLE `ShoppingList` (
	idList 							int unsigned NOT NULL AUTO_INCREMENT,
	idGroup 						int unsigned NOT NULL,
	listName 						varchar(50) NOT NULL,
	listState 						boolean NOT NULL,
	listCreated 					timestamp NOT NULL,
	PRIMARY KEY (idList)
);

	
CREATE TABLE `Item` (
	idList 							int unsigned NOT NULL,
	idItem 							int unsigned NOT NULL AUTO_INCREMENT,
	itemName 						varchar(50) NOT NULL,
	itemState 						boolean NOT NULL,
	quantity 						int unsigned NOT NULL,
	quantityBought 					int unsigned NOT NULL,
	metric	 						varchar(20) NOT NULL DEFAULT 'Unidades',
	
	PRIMARY KEY (idItem)
);

CREATE TABLE `Invitation` (
	idInvitation					int unsigned NOT NULL AUTO_INCREMENT,
	email							varchar(50) NOT NULL UNIQUE,
	expireDate						timestamp NOT NULL,
	idGroup							int unsigned NOT NULL,
	security						varchar(25) NOT NULL,
	
	PRIMARY KEY (idInvitation)
);

#Creación de los triggers que mantengan la integridad de la base de datos

delimiter |

CREATE TRIGGER onUserDelete BEFORE DELETE ON `User`
  FOR EACH ROW
  BEGIN
    DELETE FROM `GroupAndUser` WHERE OLD.idUser = idUser;
	DELETE FROM `Group` WHERE OLD.idUser = idAdmin;
  END;
|

CREATE TRIGGER onUserUpdate AFTER UPDATE ON `User`
  FOR EACH ROW
  BEGIN
    UPDATE `GroupAndUser` SET idUser = NEW.idUser WHERE OLD.idUser = idUser;
	UPDATE `Group` SET idUser = NEW.idUser WHERE OLD.idUser = idAdmin;
  END;
|

CREATE TRIGGER onGroupDelete BEFORE DELETE ON `Group`
  FOR EACH ROW
  BEGIN
    DELETE FROM `ShoppingList` WHERE OLD.idGroup = idGroup;
	DELETE FROM `GroupAndUser` WHERE OLD.idGroup = idGroup;
  END;
|

CREATE TRIGGER onGroupUpdate AFTER UPDATE ON `Group`
  FOR EACH ROW
  BEGIN
    UPDATE `ShoppingList` SET idGroup = NEW.idGroup WHERE OLD.idGroup = idGroup;
	UPDATE `GroupAndUser` SET idGroup = NEW.idGroup WHERE OLD.idGroup = idGroup;
  END;
|

CREATE TRIGGER onShoppingListDelete BEFORE DELETE ON `ShoppingList`
  FOR EACH ROW
  BEGIN
    DELETE FROM `Item` WHERE OLD.idList = idList;
  END;
|

CREATE TRIGGER onShoppingListUpdate AFTER UPDATE ON `ShoppingList`
  FOR EACH ROW
  BEGIN
    UPDATE `Item` SET idList = NEW.idList WHERE OLD.idList = idList;
  END;
|

delimiter ;