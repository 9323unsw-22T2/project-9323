
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

    pass
# update table
@expert_page.route('/expert/<int:comment_id>/update',methods=["POST"])
@authenticated
def edit_comment(comment_id):
    # get qustion and its answers which write by the user?
    
    pass

def get_question_comment(user_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # get the comment for this user
    sql = f"select * from comment where author={user_id};"
    all_info_comment = cur.execute(sql).fetchall()
    com_num = len(all_info_comment)

    sql = f"select questionId from comment where author={user_id};"
    all_question_id = cur.execute(sql).fetchall()
    print(all_info_comment)
    pass

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
