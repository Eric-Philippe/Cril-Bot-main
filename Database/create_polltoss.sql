CREATE TABLE POLL (
   msgId VARCHAR(50),
   userid VARCHAR(50),
   answer INT NOT NULL,
   PRIMARY KEY (msgId, userid)
);

CREATE TABLE TOSS (
   msgId VARCHAR(50),
   entryDate DATE NOT NULL,
   endDate DATE NOT NULL,
   PRIMARY KEY (msgId)
)

CREATE TABLE TOSS_PARTICIPANT (
   msgId VARCHAR(50),
   userid VARCHAR(50),
   FOREIGN KEY (msgId) REFERENCES TOSS(msgId),
   PRIMARY KEY (msgId, userid)
);