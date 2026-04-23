CREATE TABLE against_comments (
    id SERIAL PRIMARY KEY,
    argument_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (argument_id) REFERENCES arguments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)