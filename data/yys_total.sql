SET NAMES utf8;
DROP DATABASE IF EXISTS yys;
CREATE DATABASE yys CHARSET=UTF8;
USE yys;
DROP TABLE IF EXISTS yys_tongrenList;
DROP TABLE IF EXISTS yys_tongrenIterm;
CREATE TABLE yys_tongrenList(
    lid INT NOT NULL DEFAULT 0,
    lName VARCHAR(20) NOT NULL DEFAULT ''
);
INSERT INTO yys_tongrenList VALUE(1,'精选推荐'),
(2,'同人绘画'),
(3,'玩家COS'),
(4,'视频'),
(5,'同人小说'),
(6,'高手在民间');
CREATE TABLE yys_tongrenIterm(
    iid INT PRIMARY KEY AUTO_INCREMENT,
    pname VARCHAR(30) NOT NULL DEFAULT '',
    pic VARCHAR(30) NOT NULL DEFAULT '',
    content VARCHAR(50) NOT NULL DEFAULT  '',
    lid INT NOT NULL DEFAULT 0
);
INSERT INTO yys_tongrenIterm VALUE(NULL,'jingxuan','jingxuan/jingxuan-1.jpg','挚友！【作者】实也也也也',1),
(NULL,'jingxuan','jingxuan/jingxuan-2.jpg','大江山高中【作者】煌豹小队长',1),
(NULL,'jingxuan','jingxuan/jingxuan-3.jpg','又呆又萌又可爱 【作者】小胜',1),
(NULL,'jingxuan','jingxuan/jingxuan-4.jpg','萌萌的小肥龟！【作者】肥鬼',1),
(NULL,'jingxuan','jingxuan/jingxuan-5.jpg','机智的小肥龟 【作者】小肥龟',1),
(NULL,'jingxuan','jingxuan/jingxuan-6.jpg','神乐！【作者】无名',1),
(NULL,'jingxuan','jingxuan/jingxuan-7.jpg','钉宫理惠！【作者】恐龙',1),
(NULL,'jingxuan','jingxuan/jingxuan-8.jpg','Miku！【作者】初音未来',1),
(NULL,'paint','paint/paint-1.jpg','极乐净土！【作者】钉宫',2),
(NULL,'paint','paint/paint-2.jpg','跨越的警戒线！【作者】三角形',2),
(NULL,'paint','paint/paint-3.jpg','航海王！【作者】不知道',2),
(NULL,'paint','paint/paint-4.jpg','似荻花江上【作者】李大师',2),
(NULL,'paint','paint/paint-5.jpg','哔哩哔哩！【作者】bilibili',2),
(NULL,'paint','paint/paint-6.jpg','青行灯！【作者】 我',2),
(NULL,'paint','paint/paint-7.jpg','腿灯【作者】老司mh机',2),
(NULL,'paint','paint/paint-8.jpg','后面直接复制！【作者】复制',2),
(NULL,'cos','cos/cos-1.jpg','挚友！【作者】实也也也也',3),
(NULL,'cos','cos/cos-2.jpg','大江山高中【作者】煌豹小队长',3),
(NULL,'cos','cos/cos-3.jpg','又呆又萌又可爱 【作者】小胜',3),
(NULL,'cos','cos/cos-4.jpg','萌萌的小肥龟！【作者】肥鬼',3),
(NULL,'cos','cos/cos-5.jpg','机智的小肥龟 【作者】小肥龟',3),
(NULL,'cos','cos/cos-6.jpg','神乐！【作者】无名',3),
(NULL,'cos','cos/cos-7.jpg','钉宫理惠！【作者】恐龙',3),
(NULL,'cos','cos/cos-8.jpg','Miku！【作者】初音未来',3),
(NULL,'mov','movie/mov-1.jpg','极乐净土！【作者】钉宫',4),
(NULL,'mov','movie/mov-2.jpg','跨越的警戒线！【作者】三角形',4),
(NULL,'mov','movie/mov-3.jpg','航海王！【作者】不知道',4),
(NULL,'mov','movie/mov-4.jpg','似荻花江上【作者】李大师',4),
(NULL,'mov','movie/mov-5.jpg','哔哩哔哩！【作者】bilibili',4),
(NULL,'mov','movie/mov-6.jpg','青行灯！【作者】 我',4),
(NULL,'mov','movie/mov-7.jpg','腿灯【作者】老司机',4),
(NULL,'mov','movie/mov-8.jpg','后面直接复制！【作者】复制',4),
(NULL,'novel','novel/novel-1.jpg','挚友！【作者】实也也也也',5),
(NULL,'novel','novel/novel-2.jpg','大江山高中【作者】煌豹小队长',5),
(NULL,'novel','novel/novel-3.jpg','又呆又萌又可爱 【作者】小胜',5),
(NULL,'novel','novel/novel-4.jpg','萌萌的小肥龟！【作者】肥鬼',5),
(NULL,'novel','novel/novel-5.jpg','机智的小肥龟 【作者】小肥龟',5),
(NULL,'novel','novel/novel-6.jpg','神乐！【作者】无名',5),
(NULL,'novel','novel/novel-7.jpg','钉宫理惠！【作者】恐龙',5),
(NULL,'novel','novel/novel-8.jpg','Miku！【作者】初音未来',5),
(NULL,'mh','master-hand/mh-1.jpg','极乐净土！【作者】钉宫',6),
(NULL,'mh','master-hand/mh-2.jpg','跨越的警戒线！【作者】三角形',6),
(NULL,'mh','master-hand/mh-3.jpg','航海王！【作者】不知道',6),
(NULL,'mh','master-hand/mh-4.jpg','似荻花江上【作者】李大师',6),
(NULL,'mh','master-hand/mh-5.jpg','哔哩哔哩！【作者】bilibili',6),
(NULL,'mh','master-hand/mh-6.jpg','青行灯！【作者】 我',6),
(NULL,'mh','master-hand/mh-7.jpg','腿灯【作者】老司机',6),
(NULL,'mh','master-hand/mh-8.jpg','后面直接复制！【作者】复制',6);
SET NAMES GBK;
SELECT * FROM yys_tongrenIterm;
SELECT * FROM yys_tongrenList;



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
	regtime LONG,
	lasttime LONG,
	lv LONG,
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
	null,'15625096894','123456789', 1498008414961,1498008414961,1000,'user_header.jpg',1
);
INSERT INTO t_user VALUES(
	null,'xiaosheng@hikvision.com','123456789',1498008414961,1498008414961,50000,'user_header_1.jpg',0
);
INSERT INTO t_user VALUES(
	null,'xiaosheng@hikvision.com.cn','123456789',1498008414961,1498008414961,10000,'user_header_2.jpg',0
);
SELECT * FROM t_user;



DROP TABLE IF EXISTS yys_user_shishen;
CREATE TABLE yys_user_shishen(
    u_sid INT PRIMARY KEY AUTO_INCREMENT,
    sid INT NOT NULL DEFAULT 0,
    uid INT NOT NULL DEFAULT 0,
    getTime LONG
);
INSERT INTO yys_user_shishen VALUES
(null,2,1,1497777815658),
(null,70,1,1497777815658),
(null,66,1,1497777815658),
(null,50,1,1497777815658),
(null,13,1,1497777815658),
(null,22,1,1497777815658),
(null,8,1,1497777815658),
(null,46,1,1497777815658),
(null,25,1,1497777815658),
(null,65,1,1497777815658),
(null,33,1,1497777815658),
(null,23,1,1497777815658),
(null,12,1,1497777815658),
(null,2,1,1497777815658),
(null,61,1,1497777815658),
(null,52,1,1497777815658),
(null,77,1,1497777815658),
(null,16,1,1497777815658),
(null,58,1,1497777815658),
(null,35,1,1497777815658),
(null,28,1,1497777815658),
(null,36,1,1497777815658),
(null,5,1,1497777815658),
(null,64,1,1497777815658),
(null,75,1,1497777815658),
(null,74,1,1497777815658),
(null,62,1,1497777815658),
(null,52,1,1497777815658),
(null,18,1,1497777815658),
(null,32,1,1497777815658),
(null,2,2,1497777815658),
(null,7,2,1497777815658),
(null,45,2,1497777815658),
(null,10,2,1497777815658),
(null,44,2,1497777815658),
(null,26,2,1497777815658),
(null,18,2,1497777815658),
(null,64,2,1497777815658),
(null,35,2,1497777815658),
(null,75,2,1497777815658),
(null,3,2,1497777815658),
(null,23,2,1497777815658),
(null,13,2,1497777815658),
(null,21,2,1497777815658),
(null,11,2,1497777815658),
(null,56,2,1497777815658),
(null,73,2,1497777815658),
(null,18,2,1497777815658),
(null,18,2,1497777815658),
(null,32,2,1497777815658),
(null,69,2,1497777815658),
(null,71,2,1497777815658),
(null,51,2,1497777815658),
(null,6,2,1497777815658),
(null,65,2,1497777815658),
(null,14,2,1497777815658),
(null,22,2,1497777815658),
(null,42,2,1497777815658),
(null,58,2,1497777815658),
(null,1,2,1497777815658),
(null,63,2,1497777815658),
(null,65,2,1497777815658),
(null,4,2,1497777815658),
(null,24,2,1497777815658),
(null,52,2,1497777815658),
(null,5,2,1497777815658),
(null,3,2,1497777815658),
(null,69,1,1497777815658);
SELECT * FROM yys_user_shishen;










SET NAMES utf8;
USE yys;
DROP TABLE IF EXISTS yys_newsList;
DROP TABLE IF EXISTS yys_newsItem;


CREATE TABLE yys_newsItem(
    iid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL DEFAULT '',
    content VARCHAR(1000) NOT NULL DEFAULT '',
    addTime LONG,
    uid INT NOT NULL DEFAULT 0,
    type TINYINT NOT NULL DEFAULT 0
);
INSERT INTO yys_newsItem VALUES
(null,'-【新闻】《阴阳师》即将参展AnimeJapan','',1498142883484,1,2),
(null,'-【新闻】闻道清明春正好《阴阳师》清明漫展回顾','',1498142883484,1,2),
(null,'-【新闻】再一次改变世界！《光明大陆》今日全平台公测','',1498142883484,1,2),
(null,'-【新闻】 夏日焕新颜《阴阳师》万年竹·花鸟卷皮肤即将上架','',1498142883484,1,2),
(null,'-【新闻】"心之羁绊"《阴阳师》亲友系统重磅来袭','',1498142883484,1,2),
(null,'-【公告】 《阴阳师》体验服6月23日维护更新公告','',1498142883484,1,3),
(null,'-【公告】 《阴阳师》体验服6月22日维护更新公告','',1498142883484,1,3),
(null,'-【公告】 《阴阳师》体验服6月21日维护更新公告','',1498142883484,1,3),
(null,'-【公告】 《阴阳师》体验服6月20日维护更新公告','',1498142883484,1,3),
(null,'-【公告】 《阴阳师》体验服6月2日维护更新公告','',1498142883484,1,3),
(null,'-【活动】 声控召唤 第二季《阴阳师》广播剧配音大赛来袭','',1498142883484,1,4),
(null,'-【活动】 “浮妖百态”式神设计大赛投稿开启！一起画崽吧！','',1498142883484,1,4),
(null,'-【活动】 "舔瓶我崽"，跨界表白，揭盖召唤果味崽','',1498142883484,1,4),
(null,'-【活动】 "浮妖百态"《阴阳师》式神设计大赛，邀你画崽！','',1498142883484,1,4),
(null,'-【活动】 KFC跨界应援！炸鸡可乐与式神召唤','',1498142883484,1,4),
(null,'-【媒体】 [18183]专访网易游戏贾海漠：让阴阳师文化渗透到大众生活','',1498142883484,1,5),
(null,'-【媒体】 AppSo2016 《阴阳师》登年度榜单','',1498142883484,1,5),
(null,'-【媒体】 【17173】我的领导是个极品 他为抽SSR去了晴明神社','',1498142883484,1,5),
(null,'-【媒体】 【17173】没想到你是这样的姑获鸟 一个SR为何有SSR的实力？','',1498142883484,1,5),
(null,'-【媒体】 【18183】阴阳师协同斗技登顶阵容:无拉条无控制','',1498142883484,1,5);
SET NAMES GBK;
Select * FROM yys_newsItem;



SET NAMES utf8;
USE yys;
DROP TABLE IF EXISTS yys_shishen;
CREATE TABLE yys_shishen(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    sname VARCHAR(20) NOT NULL DEFAULT '',
    spic VARCHAR(30) NOT NULL DEFAULT '',
    bpic VARCHAR(30) NOT NULL DEFAULT '',
    RARE TINYINT NOT NULL DEFAULT 0,
    regTime DATETIME NOT NULL DEFAULT 0
);
INSERT INTO yys_shishen VALUES(NULL,'桃花妖','200.png','yaodaoji.jpg',2,now()),
(NULL,'桃花妖','200.png','cimu.jpg',2,now()),
(NULL,'鬼灯','203.png','cimu1.jpg',4,now()),
(NULL,'腐竹童子','205.png','gugu.jpg',3,now()),
(NULL,'鲤鱼精','206.png','heshang.jpg',3,now()),
(NULL,'小猫','207.png','hongye.jpg',3,now()),
(NULL,'狸猫','208.png','hongye1.jpg',3,now()),
(NULL,'河童','209.png','huiye.jpg',3,now()),
(NULL,'鬼使白','210.png','qingxingdeng.jpg',2,now()),
(NULL,'鬼使黑','211.png','taohua.jpg',2,now()),
(NULL,'白童子','212.png','yanyanluo.jpg',3,now()),
(NULL,'鸟童子','213.png','yaodao.jpg',3,now()),
(NULL,'饿鬼','214.png','yaodaoji.jpg',4,now()),
(NULL,'孟婆','215.png','yimulian.jpg',2,now()),
(NULL,'河流之主','216.png','yingcao.jpg',2,now()),
(NULL,'羽毛少年','217.png','cimu.jpg',1,now()),
(NULL,'天狗','218.png','cimu1.jpg',4,now()),
(NULL,'酒吞童子','219.png','gugu.jpg',1,now()),
(NULL,'犬神','220.png','heshang.jpg',2,now()),
(NULL,'食发鬼','221.png','hongye.jpg',3,now()),
(NULL,'米老头','222.png','hongye1.jpg',4,now()),
(NULL,'骨妖','223.png','huiye.jpg',2,now()),
(NULL,'蚌精','224.png','qingxingdeng.jpg',3,now()),
(NULL,'男跳鬼','225.png','taohua.jpg',4,now()),
(NULL,'女跳鬼','226.png','yanyanluo.jpg',4,now()),
(NULL,'兵勇','227.png','yaodao.jpg',3,now()),
(NULL,'跳跳精','228.png','yaodaoji.jpg',3,now()),
(NULL,'独眼小僧','230.png','yimulian.jpg',3,now()),
(NULL,'闺女红叶','231.png','yingcao.jpg',2,now()),
(NULL,'小老鼠','232.png','cimu.jpg',4,now()),
(NULL,'管虎','236.png','cimu1.jpg',3,now()),
(NULL,'萌萌的小山兔','237.png','gugu.jpg',3,now()),
(NULL,'萤草','238.png','heshang.jpg',3,now()),
(NULL,'蝴蝶精','241.png','hongye.jpg',3,now()),
(NULL,'傀儡师','242.png','hongye1.jpg',2,now()),
(NULL,'锤子','243.png','huiye.jpg',3,now()),
(NULL,'鬼火童子','244.png','qingxingdeng.jpg',3,now()),
(NULL,'小菜','245.png','taohua.jpg',4,now()),
(NULL,'三眼怪','246.png','yanyanluo.jpg',4,now()),
(NULL,'河流之主','247.png','yaodao.jpg',2,now()),
(NULL,'荒村之主','248.png','yaodaoji.jpg',1,now()),
(NULL,'琅琊榜','249.png','yimulian.jpg',3,now()),
(NULL,'小田鸡','250.png','yingcao.jpg',4,now()),
(NULL,'判官','251.png','cimu.jpg',2,now()),
(NULL,'凤凰火','252.png','cimu1.jpg',2,now()),
(NULL,'吸血姬','253.png','gugu.jpg',2,now()),
(NULL,'妖狐','254.png','heshang.jpg',2,now()),
(NULL,'蜘蛛精','255.png','hongye.jpg',2,now()),
(NULL,'妖琴师','256.png','hongye1.jpg',2,now()),
(NULL,'食梦猪','257.png','huiye.jpg',2,now()),
(NULL,'两面佛','258.png','qingxingdeng.jpg',1,now()),
(NULL,'小鹿楠','259.png','taohua.jpg',1,now()),
(NULL,'清姬','260.png','yanyanluo.jpg',2,now()),
(NULL,'镰肉','261.png','yaodao.jpg',2,now()),
(NULL,'股火鸟','262.png','yaodaoji.jpg',2,now()),
(NULL,'小女孩','263.png','yimulian.jpg',2,now()),
(NULL,'白狼','264.png','yingcao.jpg',2,now()),
(NULL,'次目童子','265.png','cimu.jpg',1,now()),
(NULL,'青行灯','266.png','cimu1.jpg',1,now()),
(NULL,'大菊花','267.png','gugu.jpg',2,now()),
(NULL,'惠比寿','268.png','heshang.jpg',2,now()),
(NULL,'妖刀姬','269.png','hongye.jpg',1,now()),
(NULL,'牛角女','270.png','hongye1.jpg',2,now()),
(NULL,'面具男','271.png','huiye.jpg',2,now()),
(NULL,'飞龙在天','272.png','qingxingdeng.jpg',1,now()),
(NULL,'和尚','273.png','taohua.jpg',2,now()),
(NULL,'鬼童子黑','277.png','yanyanluo.jpg',2,now()),
(NULL,'鬼童子白','278.png','yaodao.jpg',2,now()),
(NULL,'花鸟卷','279.png','yaodaoji.jpg',1,now()),
(NULL,'小龙女','280.png','yimulian.jpg',1,now()),
(NULL,'烟烟罗','281.png','huiye.jpg',2,now());
SET NAMES GBK;
SELECT * FROM yys_shishen;


SELECT s.RARE,count(s.RARE) FROM yys_user_shishen u_s,yys_shishen s WHERE u_s.sid=s.sid;




