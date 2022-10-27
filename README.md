# Login System

a short guide

## Installation

Download this packages

```bash
npm install express
npm install ejs
npm install express-session
npm install mysql
npm install nodemon
```

## express-session

This module help us remember if user is logged or not 
## Mysql
mysql module for node.js
## Nodemon
update server itself
## Mysql database start up

Use mysql editor and start a server Make sure that your mysql server running on 3306 port

```sql
CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`) VALUES ('test', '123');
```
## Connect your server with mysql
```javascript
const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodelogin'
})
