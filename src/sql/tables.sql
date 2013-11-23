
######################################################################
######################################################################
#
# tables.sql
#
# This file contains the users table por Shared Shoppoing List app.
#
######################################################################
######################################################################

use sslist;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id                              int unsigned NOT NULL auto_increment,
  userName						  varchar(50) NOT NULL,                 # The name of the user
  emailAddress		              varchar(50) NOT NULL UNIQUE,          # The email address of the user
  password               		  varchar(50) NOT NULL,                 # The encrypted password

  PRIMARY KEY                     (id)
);





