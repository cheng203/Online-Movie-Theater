# Backend
Language: php
Provide api for frontend in same server. 

## Internal/Core Class/Function
src path: ```./core/* ```

1. Class: MysqlConnector;
2. User: UserSql;

TODO:
- [x] Wrapperedd Database Connector
- [x] User create/find/manipulate object
- [ ] Movie manager  

## External Class/Function
src path: ```./external/* ```
1. Register.php: providing api for registerring user


TODO:
- [x] User Login/Register
- [ ] Customer: movie info and price info query
- [ ] Customer: goods info query
- [ ] Customer: order create/query
- [ ] Customer: session query
- [ ] Customer: seats query by day&&movie&&room
- [ ] Admin: page create/delete/modify
- [ ] Admin: room create/delete/modify
- [ ] Admin: session create/delete/modify
- [ ] Admin: movie add/delete/modify
- [ ] Admin: price set/delete/modify
- [ ] Admin: goods manage/delete/modify
- [ ] Admin: order manage/delete/modify
