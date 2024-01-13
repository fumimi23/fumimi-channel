CREATE TABLE thread (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(120) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    displayed_id VARCHAR(9) NOT NULL,
    thread_id INT NOT NULL,
    message VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (thread_id) REFERENCES thread(id)
);
