-- select all articles with their author’s email
SELECT article.*, user.email as author_mail
FROM article
JOIN user ON article.author_id = user.id;


-- select articles from 7th to 12th sorted by id
SELECT *
FROM article
ORDER BY id
LIMIT 6 OFFSET 6;

-- 額外紀錄，建立文章
CREATE TABLE article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user(id)
);