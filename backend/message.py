from flask import Blueprint, request, make_response, jsonify
from config import *
from helper import authenticated, get_unix_time, get_user_id_from_header
import sqlite3
import json
from flask_cors import CORS
from flask import Flask

message_page = Blueprint("message", __name__)
CORS(message_page)

@message_page.route('/message/send', methods=['POST'])
@authenticated
def message_add():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    data = request.get_json()
    message = data.get("message", None)
    time = data.get("time", None)
    user_id = get_user_id_from_header()
    user_id = str(user_id)
    target_id = data.get("target_user", None)
    target_id = str(target_id)

    sql = "SELECT name,messagelist from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    message_list = json.loads(rows[0][1])
    name = rows[0][0]
    message_body = {"sender":name,
                    "message":message,
                    "readed":False,
                    "sender_id":user_id
                    }
    if target_id in message_list:
        message_list[target_id].append(message_body)
    else:
        message_list[target_id] = [message_body]
    sql = "UPDATE users SET messagelist = '{}' where id = '{}';".format(json.dumps(message_list), user_id)
    cur.execute(sql)
    con.commit()


    sql = "SELECT name,messagelist from users where id = '{}'".format(target_id)
    rows = cur.execute(sql).fetchall()
    name = rows[0][0]
    message_list = json.loads(rows[0][1])

    if user_id in message_list:
        message_list[user_id].append(message_body)
    else:
        message_list[user_id] = [message_body]

    message_body = {"sender":name,
                    "message":message,
                    "readed":False,
                    "sender_id":target_id
                    }
    sql = "UPDATE users SET messagelist = '{}' where id = '{}';".format(json.dumps(message_list), target_id)
    cur.execute(sql)
    con.commit()

    return make_response(jsonify({"message_body": message_body})), 200

@message_page.route('/message/get_all', methods=['GET'])
@authenticated
def message_get_all():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    user_id = get_user_id_from_header()
    sql = "SELECT messagelist from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    message_list = json.loads(rows[0][0])
    return make_response(jsonify({"message_list": message_list})), 200

@message_page.route('/message/get_one', methods=['POST'])
@authenticated
def message_get_one():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    user_id = get_user_id_from_header()
    data = request.get_json()
    target_id = data.get("target_user", None)
    target_id = str(target_id)

    sql = "SELECT messagelist from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    message_list = json.loads(rows[0][0])
    ret = {}
    if target_id in message_list:
        ret = message_list[target_id]
    return make_response(jsonify({"message_list": ret})), 200

@message_page.route('/message/delete', methods=['POST'])
@authenticated
def message_delete():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    data = request.get_json()
    user_id = get_user_id_from_header()
    target_id = data.get("target_user", None)
    target_id = str(target_id)
    sql = "SELECT messagelist from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    message_list = json.loads(rows[0][0])

    if target_id in message_list:
        del message_list[target_id]

    sql = "UPDATE users SET messagelist = '{}' where id = '{}';".format(json.dumps(message_list), user_id)
    cur.execute(sql)
    con.commit()

    return make_response(jsonify({"message_list": message_list})), 200

