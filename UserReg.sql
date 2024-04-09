CREATE TABLE IF NOT EXISTS UserRegistrations (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  NewUser VARCHAR(255),
  Username VARCHAR(255) NOT NULL UNIQUE,
  Email VARCHAR(255) NOT NULL UNIQUE,
  hashedPassword VARCHAR(64) NOT NULL,
  created_at DATETIME
);

image.getComments():
SELECT "id", "title", "commentableType", "commentableId", "createdAt", "updatedAt"
FROM "comments" AS "comment"
WHERE "comment"."commentableType" = 'image' AND "comment"."commentableId" = 1;


image.createComment({ title: 'Awesome!' }):
INSERT INTO "comments" (
  "id", "title", "commentableType", "commentableId", "createdAt", "updatedAt"
) VALUES (
  DEFAULT, 'Awesome!', 'image', 1,
  '2018-04-17 05:36:40.454 +00:00', '2018-04-17 05:36:40.454 +00:00'
) RETURNING *;


image.addComment(comment): Promise<Comment> {
  return Comment.create({
    title: comment.title,
    commentableType: 'image',
    commentableId: this.id
  });
}
UPDATE "comments"
SET "commentableId"=1, "commentableType"='image', "updatedAt"='2018-04-17 05:38:43.948 +00:00'
WHERE "id" IN (1) RETURNING *;