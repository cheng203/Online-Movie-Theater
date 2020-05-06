create table if not exists `movies`(
   `movie_id` int unsigned auto_increment,
   `name` varchar(256) not null,
   `type_name` varchar(64) not null,
   `release_date` date not null,
   `off_date` date not null,
   `director` varchar(64) not null,
   `info` varchar(512) not null,
   `duration` smallint unsigned not null,
   `rating` tinyint unsigned,
   primary key ( `movie_id` ),
   index(`release_date`),
   index(`off_date`),
   index(`duration`),
   index(`rating`),
   index(`director`),
   index(`type_name`)
)engine=innodb default charset=utf8;

create table if not exists `rooms`(
    `room_id` tinyint unsigned auto_increment,
    `room_name` varchar(64) not null unique,
    `capacity` tinyint,
    primary key (`room_id`)
)engine=innodb default charset=utf8;


create table if not exists `rooms_by_date`(
    `room_id` tinyint unsigned not null,
    `date` date not null,
    `time_flag` varchar(128) not null,
    primary key(`room_id`, `date`),
    index (`date`),
    foreign key(`room_id`) references `rooms` (`room_id`)
)engine=innodb default charset=utf8;

create table if not exists `sessions`(
    `session_id` int unsigned auto_increment,
    `movie_id` int unsigned not null,
    `room_id` tinyint unsigned not null,
    `date` date not null,
    `time_flag` varchar(128) not null,
    `available` tinyint unsigned not null,
    primary key (`session_id`),
    foreign key(`room_id`, `date`) references `rooms_by_date` (`room_id`, `date`),
    index (`date`),
    index (`room_id`),
    index (`movie_id`)
)engine=innodb default charset=utf8;


create table if not exists `ticket_types`(
    `ticket_type_id` tinyint unsigned auto_increment,
    `ticket_name` varchar(128) not null unique,
    primary key (`ticket_type_id`)
)engine=innodb default charset=utf8;
insert into `ticket_types` values(null, 'adult');
insert into `ticket_types` values(null, 'senior');
insert into `ticket_types` values(null, 'children');

create table if not exists `ticket_price`(
    `movie_id` int unsigned not null,
    `ticket_type_id` tinyint unsigned not null,
    `price` decimal(8,2) unsigned not null,
    primary key (`movie_id`, `ticket_type_id`),
    foreign key(`movie_id`) references `movies` (`movie_id`),
    foreign key(`ticket_type_id`) references `ticket_types` (`ticket_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `image_library`(
    `image_id` int unsigned auto_increment,
    `image_name` varchar(128) not null unique,
    primary key (`image_id`)
)engine=innodb default charset=utf8;
insert into `image_library` values (null, "holder");

create table if not exists `image_types`(
    `image_type_id` tinyint unsigned auto_increment,
    `image_type_name` varchar(128) not null unique,
    primary key (`image_type_id`)
)engine=innodb default charset=utf8;
insert into `image_types` values(null, 'carousel');
insert into `image_types` values(null, 'search');
insert into `image_types` values(null, 'movie');
insert into `image_types` values(null, 'cart');
insert into `image_types` values(null, 'stage');

create table if not exists `movie_images`(
    `movie_id` int unsigned not null,
    `image_type_id` tinyint unsigned not null,
    `image_id` int unsigned not null,
    primary key (`movie_id`, `image_type_id`, `image_id`),
    foreign key(`movie_id`) references `movies` (`movie_id`),
    foreign key(`image_type_id`) references `image_types` (`image_type_id`),
    foreign key(`image_id`) references `image_library` (`image_id`)
)engine=innodb default charset=utf8;


create table if not exists `persons`(
    `person_id` int unsigned auto_increment,
    `person_type` tinyint unsigned not null,
    `username` varchar (64) unique not null check (`username`!="null"),
    `password_hash` char(64) not null,
    `email` varchar (128) unique not null,
    primary key (`person_id`),
    index (`username`),
    index (`email`)
)engine=innodb default charset=utf8;

create table if not exists `orders`(
    `order_id` int unsigned auto_increment,
    `create_time` timestamp default current_timestamp not null,
    `user_id` int unsigned not null,
    `number_tickets` smallint unsigned not null,
    `session_id` int unsigned not null, 
    `total_amount` decimal(8,2) unsigned not null,
    foreign key(`user_id`) references `persons` (`person_id`),
    foreign key(`session_id`) references `sessions` (`session_id`),
    index (`user_id`), 
    primary key (`order_id`)
)engine=innodb default charset=utf8;

create table if not exists `order_tickets_detail`(
    `order_id` int unsigned not null,
    `ticket_type_id` tinyint unsigned not null,
    `price` decimal(8,2) unsigned not null,
    `quantity` smallint unsigned not null,
    primary key (`order_id`, `ticket_type_id`),
    index (`order_id`),
    foreign key(`order_id`) references `orders` (`order_id`),
    foreign key(`ticket_type_id`) references `ticket_types` (`ticket_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `goods`(
    `goods_id` tinyint unsigned auto_increment,
    `goods_name` varchar(64) not null unique,
    `price` decimal(8,2) unsigned not null,
    `image_id` int unsigned not null, 
    primary key (`goods_id`),
    foreign key (`image_id`) references `image_library` (`image_id`),
    index (`price`),
    index (`goods_name`)
)engine=innodb default charset=utf8;
insert into `goods` values(null, 'pop', '15', '1');
insert into `goods` values(null, 'drink', '10', '1');
insert into `goods` values(null, 'pop+drink', '20', '1');


create table if not exists `order_goods_detail`(
    `order_id` int unsigned not null,
    `goods_id` tinyint unsigned not null,
    `quantity` tinyint unsigned not null,
    primary key(`order_id`, `goods_id` ),
    index (`order_id`),
    foreign key(`order_id`) references `orders` (`order_id`),
    foreign key(`goods_id`) references `goods` (`goods_id`)
)engine=innodb default charset=utf8;

create table if not exists `carts`(
    `user_id` int unsigned not null,
    `number_tickets` smallint unsigned not null,
    `session_id` int unsigned not null, 
    `total_amount` decimal(8,2) unsigned not null,
    foreign key(`user_id`) references `persons` (`person_id`),
    foreign key(`session_id`) references `sessions` (`session_id`),
    primary key (`user_id`)
)engine=innodb default charset=utf8;

create table if not exists `cart_tickets_detail`(
    `user_id` int unsigned not null,
    `ticket_type_id` tinyint unsigned not null,
    `price` decimal(8,2) unsigned not null,
    `quantity` smallint unsigned not null,
    primary key (`user_id`, `ticket_type_id`),
    index (`user_id`),
    foreign key(`user_id`) references `carts` (`user_id`),
    foreign key(`ticket_type_id`) references `ticket_types` (`ticket_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `cart_goods_detail`(
    `user_id` int unsigned not null,
    `goods_id` tinyint unsigned not null,
    `quantity` tinyint unsigned not null,
    primary key(`user_id`, `goods_id` ),
    index (`user_id`),
    foreign key(`user_id`) references `carts` (`user_id`),
    foreign key(`goods_id`) references `goods` (`goods_id`)
)engine=innodb default charset=utf8;

INSERT INTO `persons` (`person_id`, `person_type`, `username`, `password_hash`, `email`) VALUES (NULL, '1', 'root', '63A9F0EA7BB98050796B649E85481845', 'admin@admin.com');
INSERT INTO `rooms` (`room_id`, `room_name`, `capacity`) VALUES (NULL, 'Room 01', '36');
INSERT INTO `rooms` (`room_id`, `room_name`, `capacity`) VALUES (NULL, 'Room 02', '32');
INSERT INTO `rooms` (`room_id`, `room_name`, `capacity`) VALUES (NULL, 'Room 03', '64');