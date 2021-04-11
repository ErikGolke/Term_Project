PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE quote(id INTEGER PRIMARY KEY AUTOINCREMENT, quote TEXT, email TEXT);
INSERT INTO quote VALUES(1,'big bit','doionks@gmail.com');
INSERT INTO quote VALUES(43,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(44,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(45,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(46,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(47,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(48,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(49,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(50,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(51,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(52,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(53,'nastyboyssssssssss','bigchungy@gmail.com');
INSERT INTO quote VALUES(57,'hellooooo','OK');
INSERT INTO quote VALUES(58,'hellooooo','OK');
INSERT INTO quote VALUES(59,'hellooooo','OK');
INSERT INTO quote VALUES(60,'helloooooddd','OK');
INSERT INTO quote VALUES(61,'hello there','testy@gmail.com');
INSERT INTO quote VALUES(66,'BIG N JUICY DOGS','bignthicc@gmail.com');
INSERT INTO quote VALUES(67,'TEST QUOTE','bignthicc@gmail.com');
INSERT INTO quote VALUES(68,'TEST QUOTE2','bignthicc@gmail.com');
INSERT INTO quote VALUES(69,'TEST QUOTE3','bignthicc@gmail.com');
CREATE TABLE metrics(method TEXT, endpoint TEXT, hits INTEGER, PRIMARY KEY(method, endpoint));
INSERT INTO metrics VALUES('POST','/API/v1/newUser',8);
INSERT INTO metrics VALUES('PUT','/API/v1/changeUserName',3);
INSERT INTO metrics VALUES('GET','/API/v1/quote',56);
INSERT INTO metrics VALUES('POST','/API/v1/quote',14);
INSERT INTO metrics VALUES('POST','/API/v1/login',6);
INSERT INTO metrics VALUES('PUT','/API/v1/quote',2);
INSERT INTO metrics VALUES('DELETE','/API/v1/quote',1);
INSERT INTO metrics VALUES('DELETE','/API/v1/quoteAll',3);
INSERT INTO metrics VALUES('GET','/API/v1/quoteAll',6);
CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);
INSERT INTO users VALUES(1,'abuser@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
INSERT INTO users VALUES(2,'abuser@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
INSERT INTO users VALUES(3,'abuser@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
INSERT INTO users VALUES(4,'testy@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
INSERT INTO users VALUES(5,'bigboy@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
INSERT INTO users VALUES(6,'bignthicc@gmail.com','b3b72248f4a4912a53c29435ba1a367c47b9de36711e95417457d2e4b86088ae');
INSERT INTO users VALUES(7,'bignthiccc@gmail.com','36814705d6815ed0de7b5c63ab75f1220179c00a5c6b0e9d683a69e9ccec317f');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('quote',70);
INSERT INTO sqlite_sequence VALUES('users',7);
COMMIT;