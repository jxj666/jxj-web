CREATE TABLE  `app_jxjweb`.`test1` (
`id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`username` VARCHAR( 32 ) NOT NULL ,
`password` CHAR( 64 ) NOT NULL ,
`email` VARCHAR( 32 ) NOT NULL ,
UNIQUE (
`username`
)
) ENGINE = INNODB;

INSERT INTO  `app_jxjweb`.`test1` (
`id` ,
`username` ,
`password` ,
`email`
)
VALUES (
NULL ,  'ftj',  '666666',  '228322991@qq.com'
);

UPDATE  `app_jxjweb`.`test1` SET  `id` =  '2' WHERE  `test1`.`id` =3;

INSERT INTO  `app_jxjweb`.`test1` (
`id` ,
`username` ,
`password` ,
`email`
)
VALUES (
NULL ,  'wsh',  '666666',  '228322991@qq.com'
);

SELECT * 
FROM  `test1` 
WHERE  `id` =1
LIMIT 0 , 30