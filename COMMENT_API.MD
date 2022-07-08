# COMMENT:
## For articles
```cpp
curl --location --request POST '127.0.0.1:5000/comment/articles/<int:article_id>' \
--header 'user_id: 1' \
--header 'token: 1301ccf6-1891-42ba-8cbb-310e3bdda032' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content":"this is a comment for a article"
}'
```
IF EXISTS:
```json
{
    "comment_content": "this is a comment for a article",
    "comment_id": 2
}
```

IF THIS QUESTION NOT EXSTS
```json
{
    "error": "this article can not be found"
}
```
## For questions
```cpp
curl --location --request POST '127.0.0.1:5000/comment/questions/<int:question_id>' \
--header 'user_id: 1' \
--header 'token: 1301ccf6-1891-42ba-8cbb-310e3bdda032' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content":"this is a comment for a question"
}'
```
IF EXIST THIS QUESTION:
```json
{
    "comment_content": "this is a comment for a question",
    "comment_id": 1
}
```

IF THIS QUESTION NOT EXSTS:
```json
{
    "error": "this question can not be found"
}
```