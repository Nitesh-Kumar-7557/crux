CREATE TABLE arguments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT,
    content_keyword TEXT,
    statement_id INT NOT NULL,
    affirmative INT DEFAULT 50,
    negative INT DEFAULT 50,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (statement_id) REFERENCES statements(id) ON DELETE CASCADE
)