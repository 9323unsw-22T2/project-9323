from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time, get_user_id_from_header, get_user_name_from_user_id
import sqlite3
import json
from flask_cors import CORS

article_page = Blueprint("article", __name__)
CORS(article_page)

def get_article(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # sql = f"select id,articleId,stepTitle,content,image,timeCreated,timeUpdated,author,thumbUpby,isDeleted,video from articles where id = {id};"
    sql = f"select * from articles where (articleId = {article_id} or (articleId is Null and id = {article_id})) and isDeleted = 0;"
    res = cur.execute(sql).fetchall()
    # print("get !!! article : ","article_id is ",article_id,res)
    return res

def get_table_column(table_name):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql=f'PRAGMA table_info([{table_name}])'
    all = cur.execute(sql).fetchall()
    res = []
    for _ in all:
        res.append(_[1])
    return res
@article_page.route('/article', methods=['POST'])
@authenticated
def article_create():
    data = request.get_json()
    title_page = data.get("0", None)
    # print(data)
    if not title_page:
        return make_response(jsonify({"error": "missing title or content"})), 400
    article_id = _article_title_create(title_page)

    for i in range(1, len(data)):
        content_page = data.get(str(i), None)
        _article_page_create(content_page, article_id, i)

    return make_response(jsonify({"article_id": article_id})), 200

def update_score(user_id,scorex):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores from users where id = {} or token == '{}'".format(user_id,user_id)

    rows = cur.execute(sql).fetchall()
    score = int(rows[0][0])
    score+=scorex
    sql = "UPDATE users SET scores = {} where id = {} or token = '{}'".format(
         score,user_id,user_id)
    cur.execute(sql)
    con.commit()

def _article_title_create(data):
    id = None
    article_id = None
    step_number = 0
    step_title = data.get('step_title', None)
    title = data.get('title', None)
    content = json.dumps(data.get('content', None))
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = get_user_id_from_header()
    reploy_ids = json.dumps(list())
    thumb_up_by = json.dumps(list())
    is_deleted = 0
    video=data.get('video', None)

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into articles values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)",
                [id, article_id, step_number, step_title, title, content, image, time_created, time_modified, author, reploy_ids, thumb_up_by, is_deleted, video])
    id = cur.lastrowid
    con.commit()
    update_score(author,1)
    return id


def _article_page_create(data, article_id, step_number):

    id = None
    article_id = article_id
    step_number = step_number
    step_title = data.get('step_title', None)
    title = None
    content = json.dumps(data.get('content', None))
    image = None
    time_created = get_unix_time()
    time_modified = get_unix_time()
    author = get_user_id_from_header()
    reploy_ids = json.dumps(list())
    thumb_up_by = json.dumps(list())
    is_deleted = 0
    video=None

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    cur.execute("insert into articles values (?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)",
                [id, article_id, step_number, step_title, title, content, image, time_created, time_modified, author, reploy_ids, thumb_up_by, is_deleted, video])
    con.commit()

    return make_response(jsonify({"article_id": article_id})), 200


# get all the title and pages information
@article_page.route('/article/<int:article_id>', methods=['GET'])
@authenticated
def article_get_by_id(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()
    sql = "SELECT * from articles where id = '{}' and isDeleted != '1'".format(
        article_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
       return make_response(jsonify({"error": "No such article with article_id = {}".format(article_id)})), 400 
    ret[0] = _read_artical_row(rows[0])

    sql = "SELECT * from articles where articleId = '{}' and isDeleted != '1'".format(
        article_id)
    rows = cur.execute(sql).fetchall()

    for row in rows:
        ret[row[2]] = _read_artical_row(row)

    return make_response(jsonify({"article": ret})), 200


# delete all the title and pages information
@article_page.route('/article/<int:article_id>', methods=['DELETE'])
@authenticated
def article_delete_by_id(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "UPDATE articles SET isDeleted = '1' where id = '{}' or articleId = '{}'".format(
        article_id, article_id)

    cur.execute(sql)
    con.commit()

    return make_response(jsonify({"article_id": article_id})), 200


def _read_artical_row(row):
    user_name = get_user_name_from_user_id(row[9])

    ret = {
        "id": row[0],
        "article_id": row[1],
        "step_number": row[2],
        "step_title": row[3],
        "title": row[4],
        "content": json.loads(row[5]),
        "image": row[6],
        "time_created": row[7],
        "time_modified": row[8],
        "author": row[9],
        "reploy_ids": json.loads(row[10]),
        "thumb_up_by": json.loads(row[11]),
        "is_deleted": row[12],
        "video": row[13],
        "user_name": user_name
    }
    return ret
@article_page.route('/articles_like/<int:user_id>', methods=['GET'])
@authenticated
def get_user_like_articles(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ret = dict()
    sql = "SELECT likeArticles from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    # if len(rows) == 0:
    #     return make_response(jsonify({"error": "Article not found with article_id = {}".format(article_id)})), 400
    # ret['articles_like'] = rows[0]
    res = []
    # print(rows[0][0])
    for idx in json.loads(rows[0][0]):
        res.append(get_article(idx))
    ret['articles_like'] = res

    res = []
    col_art = get_table_column("articles")
    # col_art = json.loads(col_art)
    for idx in json.loads(rows[0][0]):
        tmp = {}
        # print(get_article(idx))
        tmp["TYPE"] = "ARTICLE"
        for i,j in zip(get_article(idx)[0],col_art):
            tmp[j] = i
        res.append(tmp)

    ret['articles_like'] = res

    return make_response(jsonify(ret)), 200

def get_article(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # sql = f"select id,articleId,stepTitle,content,image,timeCreated,timeUpdated,author,thumbUpby,isDeleted,video from articles where id = {id};"
    sql = f"select * from articles where (articleId = {article_id} or (articleId is Null and id = {article_id})) and isDeleted = 0;"
    res = cur.execute(sql).fetchall()
    # print("get !!! article : ","article_id is ",article_id,res)
    return res



def get_user_id_by_article(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = "SELECT author from articles where id = {} ".format(article_id)
    rows = cur.execute(sql).fetchall()
    user_id = rows[0][0]
    return user_id

# add user_id into the thumb_up list if not existed
@article_page.route('/article/<int:article_id>/thumb_up', methods=['PATCH'])
@authenticated
def article_thumb_up_patch(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT * from articles where id = '{}' and isDeleted != '1'".format(
        article_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "No such article with article_id = {}".format(article_id)})), 400

    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][11])

    if user_id not in thumb_up_by:
        thumb_up_by.append(user_id)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = "UPDATE articles SET thumbUpBy = '{}' where id = '{}' and isDeleted != '1';".format(
        thumb_up_by_string, article_id)

    cur.execute(sql)
    con.commit()

    sql = "SELECT likeArticles from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    user_like_articles = json.loads(rows[0][0])
    if article_id in user_like_articles:
        pass
    else:
        user_like_articles.append(article_id)

    sql = "UPDATE users SET likeArticles = '{}' where id = '{}';".format(
        json.dumps(user_like_articles), user_id)
    cur.execute(sql)
    con.commit()
    liked_user_id = get_user_id_by_article(article_id)
    update_score(liked_user_id,1)

    return article_get_by_id(article_id)


# delete user_id from the thumbup list if existed
@article_page.route('/article/<int:article_id>/un_thumb_up', methods=['PATCH'])
@authenticated
def article_un_thumb_up_patch(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT * from articles where id = '{}' and isDeleted != '1'".format(
        article_id)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "No such article with article_id = {}".format(article_id)})), 400
    update_score(rows[0][9],-1)
    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][11])

    if user_id in thumb_up_by:
        thumb_up_by.remove(user_id)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = "UPDATE articles SET thumbUpBy = '{}' where id = '{}' and isDeleted != '1';".format(
        thumb_up_by_string, article_id)

    cur.execute(sql)
    con.commit()

    sql = "SELECT likeArticles from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    user_like_articles = json.loads(rows[0][0])
    if article_id in user_like_articles:
        user_like_articles.remove(article_id)
    else:
        pass


    sql = "UPDATE users SET likeArticles = '{}' where id = '{}';".format(
        json.dumps(user_like_articles), user_id)
    cur.execute(sql)
    con.commit()
    return article_get_by_id(article_id)


@article_page.route('/article/ping', methods=['GET'])
def article_ping():
    return "Pong", 200
