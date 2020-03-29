create table if not exists `movie_types`(
    `movie_type_id` tinyint unsigned auto_increment,
    `movie_type_name` varchar(64) unique,
    primary key (`movie_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `movie`(
   `movie_id` int unsigned auto_increment,
   `name` varchar(256) not null,
   `movie_type_id` tinyint unsigned not null,
   `release_date` date not null,
   `off_date` date not null,
   `director` varchar(64) not null,
   `info` varchar(512) not null,
   `duration` smallint unsigned not null,
   `rating` tinyint unsigned,
   `url` varchar(512) unique,
   primary key ( `movie_id` ),
   index(`release_date`),
   index(`off_date`),
   index(`duration`),
   index(`rating`),
   index(`director`),
   index(`movie_type_id`),
   foreign key (`movie_type_id`) references `movie_types` (`movie_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `room`(
    `room_id` tinyint unsigned auto_increment,
    `room_name` varchar(64),
    `seats` varchar(256),
    primary key (`room_id`)
)engine=innodb default charset=utf8;



create table if not exists `rooms`(
    `room_id` tinyint unsigned auto_increment,
    `date` date not null,
    `time_flag` varchar(512) not null,
    `seats_info` varchar(1024) not null,
    primary key(`room_id`),
    index (`date`),
    foreign key(`room_id`) references `room` (`room_id`)
)engine=innodb default charset=utf8;

create table if not exists `ticket_types`(
    `ticket_type_id` tinyint unsigned auto_increment,
    `ticket_name` varchar(128) not null,
    primary key (`ticket_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `price_sets`(
    `price_set_id` mediumint unsigned auto_increment,
    `ticket_type_id` tinyint unsigned not null,
    `date` date not null,
    `price` smallint unsigned not null,
    primary key (`price_set_id`, `ticket_type_id`),
    foreign key(`ticket_type_id`) references `ticket_types` (`ticket_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `sessions`(
    `session_id` int unsigned auto_increment,
    `movie_id` int unsigned not null,
    `room_id` tinyint unsigned not null,
    `time_flag` varchar(512) not null,
    `price_set_id` mediumint unsigned not null,
    `date` date not null,
    primary key (`session_id`),
    foreign key(`room_id`) references `rooms` (`room_id`),
    foreign key(`price_set_id`) references `price_sets` (`price_set_id`),
    index (`date`),
    index (`room_id`),
    index (`movie_id`)
)engine=innodb default charset=utf8;


create table if not exists `persons`(
    `person_id` int unsigned auto_increment,
    `person_type` tinyint unsigned,
    `user_name` varchar (64),
    `password_hash` char(64),
    `email` varchar (128),
    primary key (`person_id`),
    index (`user_name`)
)engine=innodb default charset=utf8;



create table if not exists `orders`(
    `order_id` int unsigned auto_increment,
    `create_time` timestamp default current_timestamp not null,
    `user_id` int unsigned not null,
    `number_tickets` smallint unsigned not null,
    `number_goods` smallint unsigned not null,
    `tickets_amount` int unsigned not null,
    `goods_amount` int unsigned not null,
    `order_amount` int unsigned not null,
    `session_id` int unsigned not null, 
    foreign key(`user_id`) references `persons` (`person_id`),
    foreign key(`session_id`) references `sessions` (`session_id`),
    index (`user_id`), 
    primary key (`order_id`)
)engine=innodb default charset=utf8;

create table if not exists `order_tickets_detail`(
    `order_ticket_detail_id` int unsigned auto_increment,
    `order_id` int unsigned not null,
    `ticket_type_id` tinyint unsigned not null,
    `price_set_id` mediumint unsigned not null,
    `amount` smallint unsigned not null,
    primary key (`order_ticket_detail_id`),
    index (`order_id`),
    foreign key(`order_id`) references `orders` (`order_id`),
    foreign key(`price_set_id`, `ticket_type_id`) references `price_sets` (`price_set_id`, `ticket_type_id`)
)engine=innodb default charset=utf8;

create table if not exists `goods`(
    `goods_id` tinyint unsigned auto_increment,
    `goods_name` varchar(64) not null,
    `price` smallint unsigned not null,
    primary key (`goods_id`),
    index (`price`),
    index (`goods_name`)
)engine=innodb default charset=utf8;

create table if not exists `order_goods_detail`(
    `order_good_detail_id` int unsigned auto_increment,
    `order_id` int unsigned,
    `goods_id` tinyint unsigned,
    `amount` tinyint unsigned,
    primary key(`order_good_detail_id`),
    index (`order_id`),
    foreign key(`order_id`) references `orders` (`order_id`),
    foreign key(`goods_id`) references `goods` (`goods_id`)

)engine=innodb default charset=utf8;