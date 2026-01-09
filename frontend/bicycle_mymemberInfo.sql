/******************************************************
	bicycle DB 초기 세팅 - 강기종
******************************************************/
-- 0) bicycle DB 생성(show databases; -> DB 목록에 bicycle가 없을 시에 실행)
CREATE DATABASE bicycle CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- 1) 서버 안의 모든 데이터베이스 목록 보기
show databases;
use shoppy;
select * from product;
-- 2) 사용할 데이터베이스 선택
use bicycle;

-- 3) 현재 선택된 데이터베이스 확인
select database();
-- 4) 테이블 목록 확인
show tables;

/******************************************************
	챗봇 FAQ 테이블 생성 - 강기종
******************************************************/
CREATE TABLE chatbot_faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(200) NOT NULL,
    question VARCHAR(200),
    answer TEXT NOT NULL,
    link_text VARCHAR(100),
    link_url VARCHAR(255)
);
-- 테이블 생성 되었는지 구조 확인
desc chatbot_faq;
-- 백엔드 실행 후 데이터가 정상적으로 데이터가 들어갔는지 확인
SELECT * FROM chatbot_faq;
-- 데이터 개수 확인
SELECT COUNT(*) FROM chatbot_faq;
-- 전체 데이터 삭제(chat-bot.json 데이터 수정 시)
-- TRUNCATE TABLE chatbot_faq;

/*********************************************
	     여행지 추천: marker 관련 테이블
*********************************************/

/** 마커 테이블 생성 : marker */
DROP TABLE marker;
create table marker(
	mid		int				auto_increment primary key,
    mname   varchar(30) not null,
    lat		DECIMAL(9,6),
    lng	    DECIMAL(9,6),
    mlink	varchar(100),
    type	varchar(10)	not null    
);

desc marker;
select * from marker;
select mname, mid, lat, lng, type from marker;

-- 여러개 insert
insert into marker(mname, lat, lng, mlink, type) values("춘천 공지천", 37.8733, 127.7127, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=a14084d4-e9da-4be4-b17f-faa0077bdc3d", "coord"),
												 ("창녕 우포늪", 35.5539, 128.4161, "https://www.cng.go.kr/tour/upo.web", "coord"),
												 ("가평 호명산", 37.721,  127.408, "https://www.thebike.co.kr/bbs/board.php?bo_table=56&wr_id=163&page=5", "coord"),
												 ("속초 영랑호", 38.2163, 128.6025, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=876c8f68-208f-4c0a-ab5a-77e37f21ad98", "coord"),
												 ("부산 삼락생태공원", 35.1745, 128.9740, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=3cce5d2d-5bc6-46d4-ad77-a36c6288451f", "coord"),                                         
												 ("화천 파로호 산소 100리길", 38.1579, 127.6912, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=1e4f0ef5-b352-4604-b1b8-01b0ec39e011", "coord"),
												 ("파주 DMZ", 37.9501, 126.6790, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=97fc93d4-e259-4a38-bdb1-45bfcb8691ba", "coord"),
												 ("남양주 북한강", 37.6325, 127.2002, "https://www.nyj.go.kr/culture/contents.do?key=249", "coord"),
												 ("강릉 경포호 산소길", 37.8021, 128.9148, "https://hey-route.com/tracking-course/976", "coord"),
												 ("인천 신시모도", 37.4686, 126.4517, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=b0a732a7-bbee-464f-be69-fafa201a07cd", "coord"),
												 ("인천 아라뱃길", 37.6112, 126.7079, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=57d81233-696d-44a8-a751-915ee2fc580d", "coord"),
												 ("시흥 그린웨이", 37.3938, 126.8025, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=328a61e7-9ca7-4bfd-b29e-66891181f3a8", "coord"),
												 ("서울 한강 잠실지구", 37.5110, 127.0994, "https://hangang.seoul.go.kr/www/contents/651.do?mid=444", "coord"),
												 ("양평 남한강", 37.5192, 127.5276, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=b75a4dff-68c3-4099-afae-eb3fd07008dd", "coord"),
												 ("세종 호수공원", 36.4801, 127.2892, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=d25bea6d-fce9-4dea-b98c-76b70932ec01", "coord"),
												 ("옥천 향수 100리길", 36.3030, 127.6950, "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=7ea7bc42-72c0-4e8f-abf4-c584a52053da", "coord"),
												 ("군산 선유도", 35.9574, 126.5424, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=bd7f2b9d-82d5-4457-b560-ce0216da591c", "coord"),
                                                 ("부안 변산반도", 35.7070, 126.5640, "https://www.thebike.co.kr/bbs/board.php?bo_table=56&wr_id=82", "coord"),
												 ("곡성 섬진강", 35.2815, 127.2810, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=2bd14c6c-ec5f-4882-bf61-c6eb4efa34c9", "coord"),
												 ("경주 역사탐방 자건거길", 35.8569, 129.2249, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=7de842ce-b9f9-40c8-a5bb-b0dd21b02e25", "coord"),
												 ("울산 태화강", 35.5569, 129.3204, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=48c8cb22-1d62-44b8-be4c-2be2e0c02ebc", "coord"),
												 ("통영 삼칭이길", 34.8087, 128.4338, "https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=829aace1-0b6f-4a20-a043-7f4d804aec34", "coord"),
												 ("제주 우도", 33.5105, 126.9470, "https://m.blog.naver.com/bl85219/223185587601?isInf=true", "coord");
                                          
-- mysql에서 json, csv, excel... 데이터 파일을 업로드 하는 경로
show variables like 'secure_file_priv';

/*********************************************
	     여행지 추천: marker 관련 테이블 (끝)
*********************************************/

/*********************************************
	     여행지 추천: travel 관련 테이블
*********************************************/

/** 맛집 테이블 생성 : travel_food */
DROP TABLE travel_food;

create table travel_food(
	fid			int				auto_increment primary key,
    region   	varchar(100) not null,
    fname   	varchar(30) not null,
	lat			DECIMAL(10,8),
    lng	    	DECIMAL(11,8),
    flike		DECIMAL(4,1),
    score	    int,
    evaluation	int,
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    full_image1	varchar(100),
    full_image2	varchar(100),
    full_image3	varchar(100),
    description	varchar(300)
);

desc travel_food;
select * from travel_food;

-- json 파일의 travel_food 정보 매핑
insert into travel_food(region, fname, lat, lng, flike, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description)
select 
	jt.region,
	jt.fname,
    jt.lat,
    jt.lng,
    jt.flike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.full_image1,
    jt.full_image2,
    jt.full_image3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelFoods.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 region			varchar(100)	PATH '$.region',
			 fname   		varchar(30) 	PATH '$.fname', 
             lat			DECIMAL(10,8)	PATH '$.lat',
			 lng			DECIMAL(11,8)   PATH '$.lng',
             flike   		DECIMAL(4,1) 	PATH '$.flike',
			 score   		int 			PATH '$.score',
			 evaluation		int			 	PATH '$.evaluation',
             tag           	json 			PATH '$.tag',  
             image1        	varchar(100)	PATH '$.image1',  
             image2        	varchar(100)	PATH '$.image2',  
             image3        	varchar(100)	PATH '$.image3',  
             full_image1   	varchar(100)	PATH '$.fullImage1',  
             full_image2   	varchar(100)	PATH '$.fullImage2',  
             full_image3  	varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_food;

/** 숙소 테이블 생성 : travel_hotel */
DROP TABLE travel_hotel;
create table travel_hotel(
	hid			int				auto_increment primary key,
    region   	varchar(100) not null,
    hname   	varchar(30) not null,
	lat			DECIMAL(10,8),
    lng	    	DECIMAL(11,8),
    hlike		DECIMAL(4,1),
    score	    int,
    evaluation	int,
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    full_image1	varchar(100),
    full_image2	varchar(100),
    full_image3	varchar(100),
    description	varchar(300)
);

desc travel_hotel;
select * from travel_hotel;

-- json 파일의 travel_food 정보 매핑
insert into travel_hotel(region, hname, lat, lng, hlike, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description)
select 
	jt.region,
	jt.hname,
    jt.lat,
    jt.lng,
    jt.hlike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.full_image1,
    jt.full_image2,
    jt.full_image3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelHotels.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 region				varchar(100)	PATH '$.region',
			 hname   			varchar(30) 	PATH '$.hname',
             lat				DECIMAL(10,8)	PATH '$.lat',
			 lng				DECIMAL(11,8)   PATH '$.lng',
			 hlike   			DECIMAL(4,1) 	PATH '$.hlike',
			 score   			int 			PATH '$.score',
			 evaluation			int 			PATH '$.evaluation',
             tag           		json 			PATH '$.tag',  
             image1        		varchar(100)	PATH '$.image1',  
             image2        		varchar(100)	PATH '$.image2',  
             image3        		varchar(100)	PATH '$.image3',  
             full_image1    	varchar(100)	PATH '$.fullImage1',  
             full_image2    	varchar(100)	PATH '$.fullImage2',  
             full_image3    	varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_hotel;


/** 수리 테이블 생성 : travel_repair */
DROP TABLE travel_repair;
create table travel_repair(
	rid			int				auto_increment primary key,
    region   	varchar(100) not null,
    rname   	varchar(30) not null,
    lat			DECIMAL(10,8),
    lng	    	DECIMAL(11,8),
    `rlike`		DECIMAL(4,1),
    score	    int,
    evaluation	int,
    tag			json,  
    image1		varchar(100),
    image2		varchar(100),
    image3		varchar(100),
    full_image1	varchar(100),
    full_image2	varchar(100),
    full_image3	varchar(100),
    description	varchar(300)
);

desc travel_repair;
select * from travel_repair;

-- json 파일의 travel_food 정보 매핑
insert into travel_repair(region, rname, lat, lng, `rlike`, score, evaluation, tag, image1, image2, image3, full_image1, full_image2, full_image3, description)
select 
	jt.region,
	jt.rname,
    jt.lat,
    jt.lng,
    jt.rlike,
    jt.score,
    jt.evaluation,
    jt.tag,
    jt.image1,
    jt.image2,
    jt.image3,
    jt.full_image1,
    jt.full_image2,
    jt.full_image3,
    jt.description
from
	json_table(
		cast(load_file('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelRepairs.json') 
				AS CHAR CHARACTER SET utf8mb4 ),
		'$[*]' COLUMNS (
			 region			varchar(100)    PATH '$.region',
			 rname   		varchar(30) 	PATH '$.rname', 
             lat			DECIMAL(10,8)	PATH '$.lat',
			 lng			DECIMAL(11,8)   PATH '$.lng',
			 `rlike`   		DECIMAL(4,1) 	PATH '$.rlike',
			 score   		int 			PATH '$.score',
			 evaluation		int	 			PATH '$.evaluation',
             tag           	json 			PATH '$.tag',  
             image1        	varchar(100)	PATH '$.image1',  
             image2        	varchar(100)	PATH '$.image2',  
             image3        	varchar(100)	PATH '$.image3',  
             full_image1    varchar(100)	PATH '$.fullImage1',  
             full_image2    varchar(100)	PATH '$.fullImage2',  
             full_image3    varchar(100)	PATH '$.fullImage3',  
             description    varchar(300)	PATH '$.description'  
		   )   
    ) as jt ;
    
select * from travel_repair;

/*********************************************
	     여행지 추천: travel 관련 테이블 (끝)
*********************************************/

/***************************************************
	     여행지 추천: travel_food_detail 관련 테이블
****************************************************/

/** 맛집 상세페이지 테이블 생성 : travel_food_detail */
DROP TABLE travel_food_detail;
create table travel_food_detail(
	did					int				auto_increment primary key,
    fname   			varchar(30) not null,
    flike				DECIMAL(4,1),
    score	    		int,
    tag	    			json,
    location			varchar(100),
    food				varchar(100), 
    address				varchar(100),
    local_address		varchar(100),
    business			json,
    phone				varchar(100),
    other				json,
    menu				json,
    main_images			json,
    image_list			json
);

desc travel_food_detail;
select * from travel_food_detail;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_food_detail(fname, flike, score, tag, location, food, address, local_address, business, phone, other, menu, main_images, image_list)
SELECT
    jt.fname,
    jt.flike,
    jt.score,
    jt.tag,
    jt.location,
    jt.food,
    jt.address,
    jt.local_address,
    jt.business,
    jt.phone,
    jt.other,
    jt.menu,
    jt.main_images,
    jt.image_list
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelFoodDetails.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        fname            VARCHAR(30)  PATH '$.fname',
        flike            DECIMAL(4,1) PATH '$.flike',
        score   		 int 		  PATH '$.score',
        tag              JSON PATH '$.tag',
        location         VARCHAR(100) PATH '$.location',
        food             VARCHAR(100) PATH '$.food',
        address          VARCHAR(100) PATH '$.address',
        local_address    VARCHAR(100) PATH '$.localAddress',
        business		 JSON PATH '$.business',
        phone            VARCHAR(100) PATH '$.phone',
        other            JSON PATH '$.other',
		menu			 JSON PATH '$.menu', 
        main_images      JSON PATH '$.mainImages',
        image_list       JSON PATH '$.imageList'
    )
) AS jt;



/** 숙소 상세페이지 테이블 생성 : travel_hotel_detail */
DROP TABLE travel_hotel_detail;
create table travel_hotel_detail(
	did					int				auto_increment primary key,
    hname   			varchar(30) not null,
    hlike				DECIMAL(4,1),
    score	    		int,
    tag	    			json,
    location			varchar(100),
    hotel				varchar(100), 
    address				varchar(100),
    local_address		varchar(100),
    business			json,
    phone				varchar(100),
    other				json,
    menu				json,
    main_images			json,
    image_list			json
);

desc travel_hotel_detail;
select * from travel_hotel_detail;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_hotel_detail(hname, hlike, score, tag, location, hotel, address, local_address, business, phone, other, menu, main_images, image_list)
SELECT
    jt.hname,
    jt.hlike,
    jt.score,
    jt.tag,
    jt.location,
    jt.hotel,
    jt.address,
    jt.local_address,
    jt.business,
    jt.phone,
    jt.other,
    jt.menu,
    jt.main_images,
    jt.image_list
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelHotelDetails.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        hname            VARCHAR(30) PATH '$.hname',
        hlike            DECIMAL(4,1) PATH '$.hlike',
        score   		 int 		  PATH '$.score',
        tag              JSON PATH '$.tag',
        location         VARCHAR(100) PATH '$.location',
        hotel             VARCHAR(100) PATH '$.hotel',
        address          VARCHAR(100) PATH '$.address',
        local_address    VARCHAR(100) PATH '$.localAddress',
        business		 JSON PATH '$.business',
        phone            VARCHAR(100) PATH '$.phone',
        other            JSON PATH '$.other',
		menu			 JSON PATH '$.menu', 
        main_images      JSON PATH '$.mainImages',
        image_list       JSON PATH '$.imageList'
    )
) AS jt;



/** 수리 상세페이지 테이블 생성 : travel_repair_detail */
DROP TABLE travel_repair_detail;
create table travel_repair_detail(
	did					int				auto_increment primary key,
    rname   			varchar(30) not null,
    `rlike`				DECIMAL(4,1),
    score	    		int,
    tag	    			json,
    location			varchar(100),
    `repair`				varchar(100), 
    address				varchar(100),
    local_address		varchar(100),
    business			json,
    phone				varchar(100),
    other				json,
    menu				json,
    main_images			json,
    image_list			json
);

desc travel_repair_detail;
select * from travel_repair_detail;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_repair_detail(rname, `rlike`, score, tag, location, `repair`, address, local_address, business, phone, other, menu, main_images, image_list)
SELECT
    jt.rname,
    jt.`rlike`,
    jt.score,
    jt.tag,
    jt.location,
    jt.`repair`,
    jt.address,
    jt.local_address,
    jt.business,
    jt.phone,
    jt.other,
    jt.menu,
    jt.main_images,
    jt.image_list
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelRepairDetails.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        rname            VARCHAR(30) PATH '$.rname',
        `rlike`            DECIMAL(4,1) PATH '$.rlike',
        score   		 int 		  PATH '$.score',
        tag              JSON PATH '$.tag',
        location         VARCHAR(100) PATH '$.location',
        `repair`             VARCHAR(100) PATH '$.repair',
        address          VARCHAR(100) PATH '$.address',
        local_address    VARCHAR(100) PATH '$.localAddress',
        business		 JSON PATH '$.business',
        phone            VARCHAR(100) PATH '$.phone',
        other            JSON PATH '$.other',
		menu			 JSON PATH '$.menu', 
        main_images      JSON PATH '$.mainImages',
        image_list       JSON PATH '$.imageList'
    )
) AS jt;

/***************************************************
	     여행지 추천: travel_food_detail 관련 테이블 (끝)
****************************************************/

/***************************************************
	     여행지 추천: travel_save 관련 테이블 
****************************************************/

DROP TABLE travel_save;
create table travel_save(
	sid					int				auto_increment primary key,
    uid   				varchar(100) 	not null,
    fid	    			json,
    hid	    			json,
    rid	    			json,    
    constraint fk_travel_save
        foreign key (uid)
        references userinfo(uid)
        on delete cascade
        on update cascade
);

desc travel_save;
select * from travel_save;

/***************************************************
	     여행지 추천: travel_save 관련 테이블 (끝)
****************************************************/

/***************************************************
	     여행지 추천: travel_review 관련 테이블 
****************************************************/

/** 맛집 리뷰 테이블 생성 : travel_food_review */
DROP TABLE travel_food_review;
create table travel_food_review(
	frid				int				auto_increment primary key,
    uid   				varchar(100) 	not null,
    fid	    			int				not null,
    user_image			varchar(100),
    user_fllowers		varchar(100),
    star				DECIMAL(4,1),
    content				text,
    `date`				date,
    image_list			json,
    constraint fk_travel_food_review
        foreign key (uid)
        references userinfo(uid)
        on delete cascade
        on update cascade
);

desc travel_food_review;
select * from travel_food_review;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_food_review(uid, fid, user_image, user_fllowers, star, content, `date`, image_list)
SELECT
    jt.uid,
    jt.fid,
    jt.user_image,
    jt.user_fllowers,
    jt.star,
    jt.content,
    jt.`date`,
    jt.image_list
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelFoodReviews.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        uid            VARCHAR(100) PATH '$.uid',
        fid            int			PATH '$.fid',
        user_image     VARCHAR(100)	PATH '$.userImage',
        user_fllowers  VARCHAR(100)	PATH '$.userFllowers',
        star           DECIMAL(4,1) PATH '$.star',
        content        TEXT 		PATH '$.content',
        `date`         DATE 	    PATH '$.date',
        image_list     JSON 	    PATH '$.imageList'
    )
) AS jt;

/** 숙소 리뷰 테이블 생성 : travel_hotel_review */
DROP TABLE travel_hotel_review;
create table travel_hotel_review(
	hrid				int				auto_increment primary key,
    uid   				varchar(100) 	not null,
    hid	    			int				not null,
    user_image			varchar(100),
    user_fllowers		varchar(100),
    star				DECIMAL(4,1),
    content				text,
    `date`				date,
    image_list			json,
    constraint fk_travel_hotel_review
        foreign key (uid)
        references userinfo(uid)
        on delete cascade
        on update cascade
);

desc travel_hotel_review;
select * from travel_hotel_review;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_hotel_review(uid, hid, user_image, user_fllowers, star, content, `date`, image_list)
SELECT
    jt.uid,
    jt.hid,
    jt.user_image,
    jt.user_fllowers,
    jt.star,
    jt.content,
    jt.`date`,
    jt.image_list
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelHotelReviews.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        uid            VARCHAR(100) PATH '$.uid',
        hid            int			PATH '$.hid',
        user_image     VARCHAR(100)	PATH '$.userImage',
        user_fllowers  VARCHAR(100)	PATH '$.userFllowers',
        star           DECIMAL(4,1) PATH '$.star',
        content        TEXT 		PATH '$.content',
        `date`         DATE 	    PATH '$.date',
        image_list     JSON 	    PATH '$.imageList'
    )
) AS jt;

/** 수리 리뷰 테이블 생성 : travel_repair_review */
DROP TABLE travel_repair_review;
create table travel_repair_review(
	rrid				int				auto_increment primary key,
    uid   				varchar(100) 	not null,
    rid	    			int				not null,
    user_image			varchar(100),
    user_fllowers		varchar(100),
    star				DECIMAL(4,1),
    content				text,
    `date`				date,
    image_list			json,
    constraint fk_travel_repair_review
        foreign key (uid)
        references userinfo(uid)
        on delete cascade
        on update cascade
);

desc travel_repair_review;
select * from travel_repair_review;

-- json 파일의 travel_food_detail 정보 매핑
INSERT INTO travel_repair_review(uid, rid, user_image, user_fllowers, star, content, `date`, image_list)
SELECT
    jt.uid,
    jt.rid,
    jt.user_image,
    jt.user_fllowers,
    jt.star,
    jt.content,
    jt.`date`,
    jt.image_list
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/travelRepairReviews.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        uid            VARCHAR(100) PATH '$.uid',
        rid            int			PATH '$.rid',
        user_image     VARCHAR(100)	PATH '$.userImage',
        user_fllowers  VARCHAR(100)	PATH '$.userFllowers',
        star           DECIMAL(4,1) PATH '$.star',
        content        TEXT 		PATH '$.content',
        `date`         DATE 	    PATH '$.date',
        image_list     JSON 	    PATH '$.imageList'
    )
) AS jt;

/***************************************************
	     여행지 추천: travel_review 관련 테이블 (끝)
****************************************************/


/*********************************************
	     회원정보 테이블 : userinfo 테이블 
			251110 수정 - 패스워드 길이 문제로 인하여 테이블 삭제 및 생성, 데이터 삽입을 요청드립니다.
*********************************************/
use bicycle;
select database();
show tables;
select * from userinfo;
desc userinfo;

drop table userinfo;

create table userinfo(
    uid   		varchar(100) not null primary key,
    upass		varchar(100) not null,
    uname	    varchar(50) not null,
    uage		int not null,
    ugender		varchar(10) not null,
    uaddress	varchar(100) not null,
    uemail	varchar(100) default null,
    uphone	varchar(100) default null,
    role	ENUM('USER', 'ADMIN') DEFAULT 'USER'
);
/*기존에 테이블을 만드신 분은 아래의 ADD column*/
ALTER TABLE userinfo ADD COLUMN role ENUM('USER','ADMIN') DEFAULT 'USER' AFTER uphone;

insert into userinfo(uid, upass, uname, uage, ugender, uaddress, uemail, uphone)
value (
"test111","$2a$10$D/b6eWYeHIL.LWGOmZcMJewK1sj93Emq58YDCyYL32EdN8X97ept2","asdf","102","남성","아리랑로 6 (동선동4가) 121","111@gmail.com","11111111111"
);

UPDATE userinfo SET uid = "test111" where uid="test112";

/***********************************************************
		251127 - 자전거 구매 관련 요청 - 우편번호 컬럼 추가
************************************************************/
ALTER TABLE userinfo ADD COLUMN postcode varchar(100) DEFAULT "00000" AFTER uaddress;


/***********************************************************
		251127 - 아이디 검색 및 비밀번호 변경 - 확인용 인증 코드 및 유효시간 받는 용도의 테이블 추가
***********************************************************/

create table userinfoauthsearch(
    authcode varchar(100) primary key,
    uemail	varchar(100) not null,
    uname	    varchar(50) not null,
    uid   		varchar(100),
    deadtime DATETIME
);

select * from userinfoauthsearch;
drop table userinfoauthsearch;



/***************************************************
		대여 자전거 : rental_history 테이블 (시작)
****************************************************/
use bicycle;
drop table rental_history;
select * from rental_history;

create table rental_history(
	bid bigint auto_increment primary key,
    user_id varchar(50) not null,
    station_name varchar(100) not null,
    station_id varchar(255) null,
    amount bigint not null,
    method VARCHAR(50) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES userinfo(uid)
);
ALTER TABLE rental_history ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT '대기';

drop table kakaopay_history;
select * from kakaopay_history;
CREATE TABLE kakaopay_history (
    id				  BIGINT	   AUTO_INCREMENT PRIMARY KEY,
    tid				  VARCHAR(50)  NOT NULL UNIQUE, 
    partner_order_id  BIGINT       NOT NULL UNIQUE, 
    partner_user_id   VARCHAR(100) NOT NULL, 
    amount            BIGINT       NOT NULL, 
    status            VARCHAR(20)  NOT NULL, 
    created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    updated_at        DATETIME     NULL, 
    FOREIGN KEY (partner_user_id) REFERENCES userinfo(uid)
);

/***************************************************
		대여 자전거 : rental_history 테이블 (끝)
****************************************************/

/******************************************************
	251124 - 조 해성 -- 개인정보 수정을 위해 ID와 FK로 연결된 컬럼에 on Update Cascade 부여
******************************************************/

ALTER TABLE `rental_history` DROP FOREIGN KEY `rental_history_ibfk_1`;

ALTER TABLE `rental_history`
ADD CONSTRAINT `rental_history_ibfk_1` 
FOREIGN KEY (`user_id`) 
REFERENCES `userinfo` (`uid`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
/******************************************************
******************************************************/


/***************************************************
		대여 자전거 : rental_history 테이블 (끝)
****************************************************/
select * from userinfo;


/******************************************************
	일반 회원 / 관리자 구분용 컬럼 추가 - 강기종
******************************************************/
ALTER TABLE userinfo
ADD COLUMN role ENUM('USER','ADMIN') DEFAULT 'USER' AFTER uphone;
select * from userinfo;


-- 251119 -- 위 컬럼 추가 후 데이터 추가 부탁드립니다--------------------------------------------------------------------
insert into userinfo(uid, upass, uname, uage, ugender, uaddress, uemail, uphone,role)
value ("1","$2a$10$FWC6QTGIGaCgx5tlrhvocOrAQdP0o8bcVE28UwG7qXNiKVN8FcyNy","1","1","남성","1순환로44(율량동,동청주세무서)" , "1@gmail.com","1","USER");
-- 251119 -- 위 컬럼 추가 후 데이터 추가 부탁드립니다-------------------------------------------------------------------

/******************************************************
	게시판 - 강기종
******************************************************/
-- 1. 기존 테이블이 있다면 제거 (안전용)
-- DROP TABLE IF EXISTS board_post;
-- DROP TABLE IF EXISTS board_category;

-- 2. 게시판 종류 테이블
CREATE TABLE board_category (
  bid INT AUTO_INCREMENT PRIMARY KEY,
  bname VARCHAR(50) NOT NULL,   -- 식별용 코드 (예: news, event, review)
  btitle VARCHAR(100) NOT NULL  -- 한글 표시용 이름
);

/******************************************************
	251124 - 조 해성 -- 개인정보 수정을 위해 ID와 FK로 연결된 컬럼에 on Update Cascade 부여
******************************************************/

ALTER TABLE `rental_history` DROP FOREIGN KEY `rental_history_ibfk_1`;

ALTER TABLE `rental_history`
ADD CONSTRAINT `rental_history_ibfk_1` 
FOREIGN KEY (`user_id`) 
REFERENCES `userinfo` (`uid`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
/******************************************************
******************************************************/

-- 기본 게시판 등록
INSERT INTO board_category (bname, btitle) VALUES
('news', '뉴스'),
('event', '이벤트'),
('review', '리뷰');
select * from board_category;

-- 3. 게시글 테이블
CREATE TABLE board_post (
  pid INT AUTO_INCREMENT PRIMARY KEY,       -- 게시글 고유 ID
  bid INT NOT NULL,                         -- 게시판 FK
  uid varchar(100) NOT NULL,                        -- 작성자 (userinfo FK)
  title VARCHAR(150) NOT NULL,              -- 제목
  content TEXT NOT NULL,                    -- 본문
  image_url VARCHAR(255),                   -- 본문 내 이미지
  thumbnail_url VARCHAR(255),               -- 카드 썸네일
  category_tag VARCHAR(50) DEFAULT '일반',  -- 세부 분류 (공지, 후기 등)
  view_count INT DEFAULT 0,                 -- 조회수
  status ENUM('PUBLIC','PRIVATE','DELETED') DEFAULT 'PUBLIC', -- 상태
  created_at DATETIME DEFAULT NOW(),
  updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (bid) REFERENCES board_category(bid) ON DELETE CASCADE,
  FOREIGN KEY (uid) REFERENCES userinfo(uid) ON DELETE CASCADE
);

/******************************************************
	251124 - 조 해성 -- 개인정보 수정을 위해 ID와 FK로 연결된 컬럼에 on Update Cascade 부여
******************************************************/

ALTER TABLE `board_post` DROP FOREIGN KEY `board_post_ibfk_2`;

ALTER TABLE `board_post`
ADD CONSTRAINT `board_post_ibfk_2` 
FOREIGN KEY (`uid`) 
REFERENCES `userinfo` (`uid`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
/******************************************************
******************************************************/
show tables;
select * from board_post;
ALTER TABLE board_post ADD COLUMN writer VARCHAR(50);

-- 4. 확인용 쿼리
SELECT * FROM board_category;
SELECT pid, bid, uid, title, category_tag, status, view_count, created_at FROM board_post;

show tables;
select * from board_post;
-- 전체 데이터 삭제(자동 증가값도 초기화됨)
-- TRUNCATE TABLE board_post;
/***************************************************
	     상품 테이블 : product 테이블 - 황동주
****************************************************/
drop table product;
use bicycle;
desc product;
select * from product;
create table product (
	product_id int not null primary key auto_increment,
    pid varchar(50) not null,
    category varchar(100) not null,
    image varchar(600) not null,
    name varchar(300) not null,
    price int,
    color varchar(100),
    subinfo varchar(150),
    description JSON,
    
    unique key uk_pid_category(pid,category)
);
-- json 파일의 product 정보 매핑
INSERT INTO product(pid,
					category,
                    image,
                    name,
                    price,
                    color,
                    subinfo,
                    description)
SELECT
    jt.pid,
    jt.category,
    jt.image,
    jt.name,
    jt.price,
    jt.color,
    jt.subinfo,
    jt.description
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/mountainData.json') AS CHAR CHARACTER SET utf8mb4),
    -- C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/roadData.json
	-- C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/electricData.json
    -- C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/lifestyleData.json
    '$[*]' COLUMNS (
        pid         VARCHAR(50)   PATH '$.pid',
            category    VARCHAR(100)  PATH '$.category',
            image       VARCHAR(600)  PATH '$.image',
            name        VARCHAR(300)  PATH '$.name',
            price       INT           PATH '$.price',
            color       VARCHAR(100)  PATH '$.color',
            subinfo     TEXT          PATH '$.subInfo',
            description JSON          PATH '$.description'
    )
) AS jt;
select * from product;
/***************************************************
	     스토어위치테이블 : store_location 테이블 - 황동주
****************************************************/
drop table store_location;
create table store_location(
	sid int not null primary key auto_increment,
    name varchar(100) not null,
    address varchar(150),
    phone varchar(20),
    lat decimal(10,8),
    lng decimal(11,8)
);
ALTER TABLE store_location ADD COLUMN url varchar(1000) AFTER lng;
-- json 파일의 productlocation 정보 매핑
INSERT INTO store_location(name,
               address,
                    phone,
                    lat,
                    lng,
                    url)
SELECT
    jt.name,
    jt.address,
    jt.phone,
    jt.lat,
    jt.lng,
    jt.url
FROM JSON_TABLE(
    CAST(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/productLocation.json') AS CHAR CHARACTER SET utf8mb4),
    '$[*]' COLUMNS (
        name         VARCHAR(100)   PATH '$.name',
            address    VARCHAR(150)  PATH '$.address',
            phone       VARCHAR(20)  PATH '$.phone',
            lat        decimal(10,8)  PATH '$.lat',
            lng       decimal(11,8)           PATH '$.lng',
            url      VARCHAR(1000) PATH '$.url'
    )
) AS jt;
select * from store_location;
desc store_location;
/***************************************************
	     카트테이블 : cart 테이블 - 황동주
****************************************************/
use bicycle;
drop table cart;
desc product;
select count(*) from product;
create table cart(
	cid			int 	auto_increment		primary key,
    qty			int		not null,
    product_id	int		not null,
    uid   		varchar(100) not null,
    cdate		date 	not null,
    checked     BOOLEAN NOT NULL DEFAULT true,
    constraint fk_cart_product_id	foreign key(product_id) references product(product_id) 
	on delete cascade		on update cascade,
	constraint fk_cart_uid	foreign key(uid) references userinfo(uid) 
	on delete cascade		on update cascade,
    UNIQUE KEY uk_userinfo_product (uid, product_id)
);
use bicycle;
desc userinfo;
desc cart;
select * from cart;
/***************************************************
	     주문테이블 : orders 테이블 - 황동주
****************************************************/
create table orders(
	order_id varchar(50) primary key not null,
    uid varchar(100) not null,
    order_name varchar(300) not null,
    total_price int not null,
    status varchar(20) default 'READY',
    payment_key varchar(200),
    odate datetime,
    
    foreign key(uid) references userinfo(uid)
);
desc orders;
select * from orders;
desc userinfo;
/******************************************************
	251127 -- 주문내역에 우편번호 주소 추가
******************************************************/
ALTER TABLE orders ADD COLUMN uaddress varchar(100) AFTER payment_key;
ALTER TABLE orders ADD COLUMN postcode varchar(100) AFTER uaddress;
/******************************************************
	251124 - 조 해성 -- 개인정보 수정을 위해 ID와 FK로 연결된 컬럼에 on Update Cascade 부여
******************************************************/

ALTER TABLE `orders` DROP FOREIGN KEY `orders_ibfk_1`;

ALTER TABLE `orders`
ADD CONSTRAINT `order_ibfk_1` 
FOREIGN KEY (`uid`) 
REFERENCES `userinfo` (`uid`) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
/******************************************************
******************************************************/


/***************************************************
	     주문상세아이템테이블 : orders_items 테이블 - 황동주
****************************************************/
create table orders_items(
	oid int auto_increment primary key,
	order_id varchar(50) not null,
    product_id int not null,
    product_name varchar(300) not null,
    price int not null,
    qty int not null,
    foreign key(order_id) references orders(order_id) on delete cascade,
    foreign key(product_id) references product(product_id)
);
desc orders_items;
select * from orders_items;