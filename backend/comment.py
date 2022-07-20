from flask import Blueprint, make_response, jsonify,request
from config import *
from flask_cors import CORS
import sqlite3
import json
from helper import get_user_id_from_header,get_unix_time,authenticated

comment_page = Blueprint("comment", __name__)
CORS(comment_page)

con = sqlite3.connect(DATABASE_NAME)
cur = con.cursor()

def update_score(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores from users where id = {} or token == '{}'".format(user_id,user_id)

    rows = cur.execute(sql).fetchall()
    score = int(rows[0][0])
    score+=1
    sql = "UPDATE users SET scores = {} where id = {} or token = '{}'".format(
         score,user_id,user_id)
    cur.execute(sql)
    con.commit()
    con.close()

@comment_page.route('/comment/questions/<int:question_id>',methods=['POST'])
@authenticated#check whether the user login
def comment_question_add(question_id):
    # connect to the sqlite3
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ## check whether the questions exists
    c1=cur.execute(f'SELECT 1 FROM questions WHERE id={question_id} LIMIT 1;').fetchall()
    if c1 != []:
        id=None
        articleId=None
        timeCreated=get_unix_time()
        timeUpdated=timeCreated
        thumbUpBy=json.dumps(list()) # user id starts from 1?
        is_deleted=0
        #############for regular################
        data = request.get_json()
        content = data.get('content', None)
        userID = get_user_id_from_header()
        update_score(userID)
        show=1
        ###########user for post man############
        # content = 'aaa'
        # userID=2          
        ###########user for post man############
        # just create an comment not edit
        cur.execute(f"insert into comments values(?,?,?,?,?,?,?,?,?,?)",
                    [id, question_id, articleId, content,timeCreated, timeUpdated, userID, thumbUpBy, is_deleted, show ])
        con.commit()
    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this question can not be found"})), 405
    
    id = cur.lastrowid
    content=cur.execute(f"select content from comments where id={id}").fetchall()[0][0]
    con.close()
    
    # can get the last autoincrement data(for this table  is the id)
    # print(id)
    return make_response(jsonify({ "comment_content":content,"comment_id": id})), 200
   



@comment_page.route('/comment/articles/<int:article_id>',methods=['POST'])
@authenticated#check whether the user login
def comment_article_add(article_id):
    # connect to the sqlite3
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ## check whether the articles exists
    c1=cur.execute(f'SELECT 1 FROM articles WHERE articleId={article_id} LIMIT 1;').fetchall()
    if c1 != []:
        id=None
        questionId=None
        timeCreated=get_unix_time()
        timeUpdated=timeCreated
        thumbUpBy=json.dumps(list()) # user id starts from 1?
        is_deleted=0
        show=1
        #############for regular################
        data = request.get_json()
        content = data.get('content', None)
        userID = get_user_id_from_header()
        update_score(userID)
        ###########user for post man############
        # content = 'aaa'
        # userID=2          
        ###########user for post man############
        # just create an comment not edit
        cur.execute(f"insert into comments values(?,?,?,?,?,?,?,?,?,?)",
                    [id, questionId, article_id, content,timeCreated, timeUpdated, userID, thumbUpBy,is_deleted,show ])
        con.commit()
    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this article can not be found"})), 404
    
    # can get the last autoincrement data(for this table  is the id)        
    id = cur.lastrowid
    content=cur.execute(f"select content from comments where id={id}").fetchall()[0][0]
    con.close()
    
    # can get the last autoincrement data(for this table  is the id)
    # print(id)
    return make_response(jsonify({"comment_content":content,"comment_id": id})), 200


# just see comment for questions
@comment_page.route('/comment/questions/<int:question_id>',methods=['GET'])
def comment_question(question_id):
    # connect to the sqlite3
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ## check whether the questions exists
    c1=cur.execute(f'SELECT 1 FROM questions WHERE id={question_id} LIMIT 1;').fetchall()
    if c1 != []:
        res = {}
        
        sql=f"select id,content,timeCreated,timeUpdated,thumbUpBy,author,questionId,show,isDeleted from comments where questionId={question_id};"
        
        num_of_que = cur.execute(f"SELECT count(questionId) FROM comments where questionId={question_id}").fetchall()[0][0]
        all_data = cur.execute(sql).fetchall()
        for i in range(num_of_que):
            temp = {}
        
            id = all_data[i][0]
            content = all_data[i][1]
            timeCreated = all_data[i][2]
            timeUpdated = all_data[i][3]
            thumbUpBy = all_data[i][4]
            user=all_data[i][5]
            show_=all_data[i][7]
            temp["id"] = id
            temp["content"] = content
            temp["timeCreated"] = timeCreated
            temp["timeUpdated"] = timeUpdated
            temp["thumbUpBy"] = thumbUpBy
            temp["user"] = user
            temp["show"] = show_
            temp['questionId']= all_data[i][6]
            temp['isdeleted']=all_data[i][8]
            res[i] = temp
        
        # can get the last autoincrement data(for this table  is the id)        
        # id = cur.lastrowid
        con.close()

        return make_response(jsonify(res)), 200
    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this question can not be found"})), 404
    



# just see comment for articles
@comment_page.route('/comment/articles/<int:article_id>',methods=['GET'])
def comment_article(article_id):
    # connect to the sqlite3
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    ## check whether the articles exists
    c1=cur.execute(f'SELECT 1 FROM articles WHERE articleId={article_id} LIMIT 1;').fetchall()
    if c1 != []:
        res = {}
        sql=f"select id,content,timeCreated,timeUpdated,thumbUpBy,author,articlesId,show,isDeleted from comments where articlesId={article_id};"
        
        num_of_art = cur.execute(f"SELECT count(articlesId) FROM comments where articlesId={article_id}").fetchall()[0][0]
        all_data = cur.execute(sql).fetchall()
        print(all_data)
        for i in range(num_of_art):
            temp = {}
        
            id = all_data[i][0]
            content = all_data[i][1]
            timeCreated = all_data[i][2]
            timeUpdated = all_data[i][3]
            thumbUpBy = all_data[i][4]
            user=all_data[i][5]
            show_=all_data[i][7]
            temp["id"] = id
            temp["content"] = content
            temp["timeCreated"] = timeCreated
            temp["timeUpdated"] = timeUpdated
            temp["thumbUpBy"] = thumbUpBy
            temp["user"] = user
            temp["show"] = show_
            temp["articlesid"]= all_data[i][6]
            temp["isDeleted"]=all_data[i][8]
            res[i] = temp
            
        # can get the last autoincrement data(for this table  is the id)        
        # id = cur.lastrowid
        con.close()  
    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this article can not be found"})), 404
    
    
    return make_response(jsonify(res)),200

####################################################################################################################
# add thumbp
@comment_page.route('/comment/<int:comment_id>/thumb_up', methods=['PATCH'])
@authenticated
def question_thumb_up_patch(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = f"SELECT * from comments where id = '{comment_id}' and isDeleted != '1';"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": f"No such comment with comment_id = {comment_id}"})), 400

    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][7])

    if user_id not in thumb_up_by:
        thumb_up_by.append(user_id)
        # get the id of artucleid 
        liked_user_id = get_user_id_by_comment(comment_id)
        # add score for author
        update_score(liked_user_id)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = f"UPDATE comments SET thumbUpBy = '{thumb_up_by_string}' where id = '{comment_id}' and isDeleted != '1';"

    cur.execute(sql)
    con.commit()
    con.close()
    

    return make_response(jsonify({"like by":user_id})),200

# delete user_id from the thumbup list if existed
@comment_page.route('/comment/<int:comment_id>/un_thumb_up', methods=['PATCH'])
@authenticated
def question_un_thumb_up_patch(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = f"SELECT * from comments where id='{comment_id}'and isDeleted != '1'"
    rows = cur.execute(sql).fetchall()
    # print(rows)
    if len(rows) == 0:
        return make_response(jsonify({"error": f"No such comment with id = {comment_id}"})), 400

    # get user for now
    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][7])
    # print(thumb_up_by," ", user_id)
    if user_id in thumb_up_by:
        thumb_up_by.remove(user_id)
    # print(thumb_up_by)
    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = f"UPDATE comments SET thumbUpBy = '{thumb_up_by_string}' where id={comment_id} and isDeleted != 1;"

    cur.execute(sql)
    con.commit()
    con.close()
    return make_response(jsonify({f"this comment {comment_id} unlike by":user_id})),200

@comment_page.route("/comment/<int:comment_id>/delete",methods=["DELETE"])
@authenticated
def delete_comment(comment_id):
    sql=f"select id,author from comments where id='{comment_id}' and isDeleted == 0 "
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    rows = cur.execute(sql).fetchall()

    if len(rows) == 0:
        return make_response(jsonify({"error": "No such comment = {}".format(comment_id)})), 400
    
    user_id = get_user_id_from_header()
    comment_auth_id = rows[0][1]
    if user_id != comment_auth_id:
        return make_response(jsonify({"error":"you can not delete this, because this is not write by you"})), 400
    sql = f"UPDATE comments SET isDeleted = 1 where id = '{comment_id}';"
    cur.execute(sql)
    con.commit()
    return make_response(jsonify(f"this comment {comment_id} has been deleted")), 200


def get_user_id_by_comment(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = f"SELECT articlesId from comments where id = {comment_id};"
    rows = cur.execute(sql).fetchall()
    if len(rows)==0:
        sql = f"SELECT questionId from comments where id = {comment_id};"
        rows = cur.execute(sql).fetchall()
        question_id = rows[0][0]
        sql2=f"SELECT author from questions where id = {question_id};"
        rows2 = cur.execute(sql2).fetchall()
        user_id = rows2[0][0]
        return user_id
    article_id = rows[0][0]
    sql2=f"SELECT author from articles where articleId = {article_id};"
    rows2 = cur.execute(sql2).fetchall()
    user_id = rows2[0][0]
    con.close()
    return user_id