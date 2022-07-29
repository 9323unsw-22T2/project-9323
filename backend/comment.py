from flask import Blueprint, make_response, jsonify,request
from newsfeed import get_author_name
from config import *
from flask_cors import CORS
import sqlite3
import json
from helper import get_user_id_from_header,get_unix_time,authenticated

comment_page = Blueprint("comment", __name__)
CORS(comment_page)

con = sqlite3.connect(DATABASE_NAME)
cur = con.cursor()

def update_score(user_id,sco):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    ret = dict()

    sql = "SELECT scores from users where id = {} or token == '{}'".format(user_id,user_id)

    rows = cur.execute(sql).fetchall()
    score = int(rows[0][0])
    score+=sco
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
        userPaied=json.dumps(list())
        is_deleted=0
        #############for regular################
        data = request.get_json()
        content = data.get('content', None)
        userID = get_user_id_from_header()
        score = data.get('score', 0)
        update_score(userID,1)   
        image = data.get('image',None)
    

        # check whether the user is expert 
        if get_isExpert(userID):
            score = data.get('score', 0)
        
        ###########user for post man############
        # just create an comment not edit
        cur.execute(f"insert into comments values(?,?,?,?,?,?,?,?,?,?,?,?)",
                    [id, question_id, articleId, content,timeCreated, timeUpdated, userID, thumbUpBy, is_deleted, score, userPaied,image ])
        con.commit()
        sql = f"select count(id) from comments where questionId={question_id} and isDeleted= 0"
        com_num_que = cur.execute(sql).fetchall()[0][0]
        sql = f"UPDATE questions SET replyIds = {com_num_que} where id ={question_id};"
        cur.execute(sql)
        con.commit()

    else:
        print('error')
        con.close()
        return make_response(jsonify({"error": "this question can not be found"})), 405
    
    id = cur.lastrowid
    content=cur.execute(f"select content from comments where id={id}").fetchall()[0][0]
    con.close()
    
    # can get the last autoincrement data(for this table  is the id)
    return make_response(jsonify({ "comment_content":content,"comment_id": id, "score":score})), 200
   



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
        userPaied=json.dumps(list())
        is_deleted=0
        #############for regular################
        data = request.get_json()
        content = data.get('content', None)
        userID = get_user_id_from_header()
        update_score(userID,1)
        score = 0
        image = data.get('image',None)
        # check whether the user is expert 
        if get_isExpert(userID):
            score = data.get('score', 0)
        
        # just create an comment not edit
        cur.execute(f"insert into comments values(?,?,?,?,?,?,?,?,?,?,?,?)",
                    [id, questionId, article_id, content,timeCreated, timeUpdated, userID, thumbUpBy,is_deleted,score,userPaied,image])
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
    return make_response(jsonify({"comment_content":content,"comment_id": id,"score":score})), 200


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
        
        sql=f"select id,content,timeCreated,timeUpdated,thumbUpBy,author,questionId,score,isDeleted,userPaid from comments where questionId={question_id};"
        
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
            temp["score"] = show_
            temp['questionId']= all_data[i][6]
            temp['isdeleted']=all_data[i][8]
            temp['userPaid']=all_data[i][9]
            temp['author_name'] = get_author_name(user)
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
        sql=f"select id,content,timeCreated,timeUpdated,thumbUpBy,author,articlesId,score,isDeleted,userPaid from comments where articlesId={article_id};"
        
        num_of_art = cur.execute(f"SELECT count(articlesId) FROM comments where articlesId={article_id}").fetchall()[0][0]
        all_data = cur.execute(sql).fetchall()
        # print(all_data)
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
            temp["score"] = show_
            temp["articlesid"]= all_data[i][6]
            temp["isDeleted"]=all_data[i][8]
            temp["userPaid"]=all_data[i][9]
            temp['author_name'] = get_author_name(user)
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
def comment_thumb_up_patch(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = f"SELECT * from comments where id = '{comment_id}' and isDeleted =0 ;"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": f"No such comment with comment_id = {comment_id}"})), 400

    user_id = get_user_id_from_header()

    thumb_up_by = json.loads(rows[0][7])

    if user_id not in thumb_up_by:
        thumb_up_by.append(user_id)
        # get the id of artucleid 
        liked_user_id = get_comm_author_id(comment_id)
        # add score for author
        update_score(liked_user_id,1)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = f"UPDATE comments SET thumbUpBy = '{thumb_up_by_string}' where id = '{comment_id}' and isDeleted != '1';"

    cur.execute(sql)
    con.commit()
    con.close()
    

    return make_response(jsonify({"like by":user_id})),200

# delete user_id from the thumbup list if existed
@comment_page.route('/comment/<int:comment_id>/un_thumb_up', methods=['PATCH'])
@authenticated
def comment_un_thumb_up_patch(comment_id):
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
        # get the author id of comment
        liked_user_id = get_comm_author_id(comment_id)
        # add negative score for author
        update_score(liked_user_id,-1)
        
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
    sql=f"select id,author,questionId,articlesId from comments where id={comment_id} and isDeleted = 0 "
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
    # print(rows)
    if rows[0][2]:
        sql = f"select replyIds from questions where id = {rows[0][2]}"
        num_replys = cur.execute(sql).fetchall()[0][0]
        # print(num_replys)
        num_replys = int(num_replys) - 1
        sql = f"UPDATE questions SET replyIds = {num_replys} where id = '{rows[0][1]}' ;"
        cur.execute(sql)
        con.commit()
    return make_response(jsonify(f"this comment {comment_id} has been deleted")), 200


# get the article or questions author id by comment id
def get_user_id_by_comment(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # check whether the user comment to article
    sql = f"SELECT articlesId from comments where id = {comment_id} and articlesId is not null;"
    rows = cur.execute(sql).fetchall()
    # if len（row） == 0  means that this comment is for question
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

def get_isExpert(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = f"select expertOrNot from users where id={user_id};"
    res = cur.execute(sql).fetchall()
    if res != None:
        flag = res[0][0]
    # print(flag)
    if flag == 1:
        return True
    else:
        return False



## buy to see comment
@comment_page.route('/comment/<int:comment_id>/buy', methods=['POST'])
@authenticated
def buy(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = f"select id from comments where id= {comment_id};"
    if len(cur.execute(sql).fetchall()) == 0:
        return make_response(jsonify({"error": "this comment is not exist"})),404
    userID = get_user_id_from_header()
    sql = f"select userPaid from comments where id = {comment_id}"
    user_paid = json.loads(cur.execute(sql).fetchall()[0][0])
    # print(user_paid,type(user_paid))
    if userID not in user_paid:
        sql = f"select scores from users where id={userID};"
        current_user_score = cur.execute(sql).fetchall()[0][0]
        # print(current_user_score,type(current_user_score))
        sql = f"select score from comments where id = {comment_id}"
        comment_score = cur.execute(sql).fetchall()[0][0]
        if comment_score == 0:
            return "this comment is free, no need to pay"
        # print(comment_score, type(comment_score))
        if current_user_score < comment_score:
            return jsonify("your score is not enough to see this comment")
        else:
            user_score =current_user_score - comment_score
            sql = f"update users SET scores = {user_score} where id ={userID};"
            cur.execute(sql)
            con.commit()
            user_paid.append(userID)
            
            user_paid_s = json.dumps(user_paid)
            # print(user_paid_s,type(user_paid_s))
            com_author = get_comm_author_id(comment_id)
            update_score(com_author,comment_score)
            sql = f"UPDATE comments SET userPaid = '{user_paid_s}' where id = {comment_id};"
            cur.execute(sql)
            con.commit()

        return make_response({"user_score":f"{user_score}"}),200
    else:
        return "You already bought this, please enjoy"

# get the comment's author id
def get_comm_author_id(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql = f"select author from comments where id = {comment_id}"
    row = cur.execute(sql).fetchall()
    return row[0][0]




####################################################################################################################
# add thumdown
@comment_page.route('/comment/<int:comment_id>/thumb_down', methods=['PATCH'])
@authenticated
def comment_thumb_down_patch(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = f"SELECT * from comments where id = '{comment_id}' and isDeleted =0 ;"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": f"No such comment with comment_id = {comment_id}"})), 400

    user_id = get_user_id_from_header()

    # thumb_up_by is a list add for id
    # if id is postive , it is thumb_up
    # if id is negative, it is thumb_down
    thumb_up_by = json.loads(rows[0][7])

    if -user_id not in thumb_up_by:
        thumb_up_by.append(-user_id)
        # get the author id of comment
        unliked_user_id = get_comm_author_id(comment_id)
        # add negative score for author
        update_score(unliked_user_id,-1)

    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = f"UPDATE comments SET thumbUpBy = '{thumb_up_by_string}' where id = '{comment_id}' and isDeleted != '1';"

    cur.execute(sql)
    con.commit()
    con.close()
    

    return make_response(jsonify({"unlike by":user_id})),200

# delete user_id from the thumbup list if existed
@comment_page.route('/comment/<int:comment_id>/un_thumb_down', methods=['PATCH'])
@authenticated
def comment_un_thumb_down_patch(comment_id):
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
    if -user_id in thumb_up_by:
        thumb_up_by.remove(-user_id)
        # get the author id of comment
        unliked_user_id = get_comm_author_id(comment_id)
        # add negative score for author
        update_score(unliked_user_id,1)
    thumb_up_by_string = json.dumps(thumb_up_by)

    sql = f"UPDATE comments SET thumbUpBy = '{thumb_up_by_string}' where id={comment_id} and isDeleted != 1;"

    cur.execute(sql)
    con.commit()
    con.close()
    return make_response(jsonify({f"this comment {comment_id} unlike by":user_id})),200
