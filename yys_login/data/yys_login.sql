SET NAMES utf8;
USE yys;
DROP TABLE IF EXISTS t_check;
DROP TABLE IF EXISTS t_user;
CREATE TABLE t_check(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(20) NOT NULL DEFAULT '',
	check_num VARCHAR(20) NOT NULL DEFAULT ''
);
CREATE TABLE t_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(50) NOT NULL DEFAULT '',
	upwd VARCHAR(50) NOT NULL DEFAULT '',
	regtime DATETIME NOT NULL DEFAULT 0,
	lasttime DATETIME NOT NULL DEFAULT 0,
	pic VARCHAR(20) NOT NULL DEFAULT '',
	vip INT NOT NULL DEFAULT 0
);
INSERT INTO t_check VALUES(
	null,'captcha-0.jpg','MPC6N'
);
INSERT INTO t_check VALUES(
	null,'captcha-1.jpg','BCM4E'
);
INSERT INTO t_check VALUES(
	null,'captcha-2.jpg','6AWPY'
);
SELECT * FROM t_check;
INSERT INTO t_user VALUES(
	null,'15625096894','123456789','',now(),'',0
);
INSERT INTO t_user VALUES(
	null,'xiaosheng@hikvision.com','123456789','',now(),'',0
);
INSERT INTO t_user VALUES(
	null,'xiaosheng@hikvision.com.cn','123456789','',now(),'',0
);
SELECT * FROM t_user;