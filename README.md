# feature-switch

## This is a takehome assignment that need to be delivered within 168 hours.

## Requirements to run this project

1. Nodejs installed ( link: https://nodejs.org/en/ )
1. MySQL/MariaDB installed ( link: https://dev.mysql.com/downloads/mysql/ )
1. Postman ( link: https://www.postman.com/downloads/ )

## Steps to run this project

1. Clone this project
1. Run `npm install`
1. Create database by running this sql
```sql
CREATE DATABASE IF NOT EXISTS `feature_switch`
USE `feature_switch`;

CREATE TABLE IF NOT EXISTS `feature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
4. Edit file config.js and update the value according to your environment
```
'db_host': 'localhost',
'db_name': 'feature_switch',
'db_user': 'root',
'db_pass': '',
```
5. Run `npm run start`
6. Run Postman and import the collection from here https://www.getpostman.com/collections/4205a60257fb2154412b
7. Start on requesting from Postman