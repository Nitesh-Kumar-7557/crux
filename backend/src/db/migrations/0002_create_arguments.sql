CREATE TABLE arguments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT,
    content_keyword TEXT,
    domain VARCHAR(20),
    affirmative INT DEFAULT 50,
    negative INT DEFAULT 50,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)