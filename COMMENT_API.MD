# COMMENT:
## For articles
```cpp
curl --location --request POST '127.0.0.1:5000/comment/articles/<int:article_id>'
```
IF EXISTS:
```json
{
    "comment_id": ' '
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
curl --location --request POST '127.0.0.1:5000/comment/questions/<int:question_id>'
```
IF EXITS:
```json
{
    "comment_id": ' '
}
```

IF THIS QUESTION NOT EXSTS:
```json
{
    "error": "this question can not be found"
}
```