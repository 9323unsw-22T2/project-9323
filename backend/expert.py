from flask import Blueprint, make_response, jsonify,request
from config import *
from flask_cors import CORS
import sqlite3
import json
from helper import get_user_id_from_header,get_unix_time,authenticated

expert_page = Blueprint("expert", __name__)
CORS(expert_page)


@expert_page.route('/expert/ping', methods=['GET'])
def expert_ping():
    return "Pong", 200

@expert_page.route('/expert/answer_history',methods=["GET"])
@authenticated
def get_history():
    # get user iD
    # get qustion and its answers which write by the user?
    user_id = get_user_id_from_header()
    com_que_id = get_question_comment(user_id)
    res=[]
    q_id = []
    for j in com_que_id:
        q_id.append(j[1])
    q_id = set(q_id)

    
    for i in com_que_id:
        if get_question(i[1])==False:
            return make_response("no such question, please check your databases"), 404
        temp={}
        que_id = i[1]
        com_id = i[0]
        tab_que = get_question(que_id)
        tab_com = get_comment(com_id)
        print(f"com_id is {com_id}, que_id is {que_id}")
        temp['qes_id'] = que_id
        temp['title'] = tab_que[0]
        temp['qes'] = tab_que[1]
        temp['ans'] = tab_com[0]
        temp['ans_id'] = com_id
        temp['photoURL'] = tab_com[1]
        temp['score'] = tab_com[2]
        temp['time'] = tab_com[3]
        res.append(temp)

    if get_all_queid() != False:

        all_que_id = [_[0] for _ in get_all_queid()]
        not_ans=[]
        print(all_que_id)
        for i in all_que_id:
            if i not in q_id:
                not_ans.append(i)
        # print(not_ans)

        for i in not_ans[:5]:
            if get_question(i)==False:
                return make_response("no such question, please check your databases or just delete it tu rebuild"), 404
            temp={}
            
            tab_que = get_question(i)

            temp['qes_id'] = i
            temp['title'] = tab_que[0]
            temp['qes'] = tab_que[1]
            temp['ans'] = None
            temp['ans_id'] = None
            temp['photoURL'] = None
            temp['score'] = None
            temp['time'] = tab_que[2]
            res.append(temp)
    else:
        not_ans = []
    if len(q_id) >=5 and len(not_ans)>=5:
        return jsonify(res[:5]+ res[-5:])
    else:
        return jsonify(res[:10])
# update table
@expert_page.route('/expert/<int:comment_id>/update',methods=["POST"])
@authenticated
def edit_comment(comment_id):
    # get qustion and its answers which write by the user?
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # user_id = get_user_id_from_header()
    
    data = request.get_json()
    content = data.get('content', None)

    sql=f"update comments SET content = '{content}' where id = {comment_id}"
    cur.execute(sql)
    con.commit()

    sql=f"update comments SET timeUpdated = {get_unix_time()} where id = {comment_id}"
    cur.execute(sql)
    con.commit()
    return make_response(jsonify({"already updated content with":f"{content}" })),200
    # else:
    #     sql=f"update comments SET isDeleted = 1 where id = {comment_id}"
    #     cur.execute(sql)
    #     con.commit()

def get_question_comment(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # get the comment for this user
    sql = f"select id,questionId from comments where author={user_id} and questionId is not null and isDeleted = 0;"
    com_que_id = cur.execute(sql).fetchall()
    print(com_que_id)
    return com_que_id

def get_que_id_no_answer(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql=f"select questionId from comments where questionId is not Null and author != {user_id} and isDeleted = 0;"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return "no such question that your ever answered"
    # print("12s3",rows)
    return rows
def get_all_queid():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql=f"select id from questions;"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return False
    # print("12s3",rows)
    return rows

def get_question(question_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    print("que_id",question_id)
    sql=f"select title,content,image,timeUpdated from questions where isDeleted = 0 and id = {question_id}"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return False

    return rows[0]
def get_comment(comment_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql=f"select content,image,score,timeUpdated from comments where id = {comment_id} and isDeleted=0"
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return "no such comment"

    return rows[0]


def isExpert(user_id):
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


def get_table_column(table_name):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    sql=f'PRAGMA table_info([{table_name}])'
    all = cur.execute(sql).fetchall()
    res = []
    for _ in all:
        res.append(_[1])
    return res
