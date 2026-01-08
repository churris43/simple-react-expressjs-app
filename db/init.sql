CREATE TABLE IF NOT EXISTS application(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    companyName VARCHAR(255) NOT NULL,
    ad TEXT NULL,
    create_time DATETIME COMMENT 'Create Time'
) COMMENT '';