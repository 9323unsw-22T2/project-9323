import enum
from flask import request, Blueprint
import sqlite3
import uuid
from flask import jsonify, make_response
from config import *
from flask_cors import CORS
from helper import authenticated, get_user_id_from_header


auth_page = Blueprint("auth", __name__)
CORS(auth_page)


@auth_page.route('/auth/register', methods=['POST'])
def auth_register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    # check if the email address has been used
    sql = "SELECT id from users where email = '{}'".format(email)
    rows = cur.execute(sql).fetchall()
    if len(rows) > 0:
        return make_response(jsonify({"error": "This email has been registed, please login"})), 400

    # check if the username has been used
    sql = "SELECT name from users where name = '{}'".format(name)
    rows = cur.execute(sql).fetchall()
    if len(rows) > 0:
        return make_response(jsonify({"error": "This name has been used, please use another name"})), 400

    # generate token, currently is just uuid
    # uuid4 is a random UUID
    token = str(uuid.uuid4())

    # passed all the check, insert into database
    cur.execute("insert into users values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)",
                [None, name, email, password, token, None, 0, 0,"0","0","[]","[]","{}"])
    con.commit()

    sql = "SELECT id, token from users where email = '{}' and password = '{}'".format(
        email, password)
    rows = cur.execute(sql).fetchall()
    user_id = rows[0][0]
    token = rows[0][1]

    return make_response(jsonify({"token": token, "user_id": user_id})), 200


def _get_user_info(cur, user_id):
    sql = "SELECT * from users where id = '{}'".format(user_id)
    rows = cur.execute(sql).fetchall()
    row = rows[0]
    user_info = dict()

    for index, value in enumerate(["id", "name", "email", "password", "token", "expertArea", "scores", "coins", "expertOrNot", "isPpublic"]):
        user_info[value] = row[index]

    return user_info


@auth_page.route('/auth/login', methods=['POST'])
def auth_login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "SELECT id, token from users where email = '{}' and password = '{}'".format(
        email, password)
    rows = cur.execute(sql).fetchall()
    if len(rows) == 0:
        return make_response(jsonify({"error": "Email and password don't match"})), 400

    user_id = rows[0][0]

    user_info = _get_user_info(cur, user_id)

    return make_response(jsonify(user_info)), 200


@auth_page.route('/auth/logout', methods=['POST'])
def auth_logout():
    body = {}
    response = make_response(jsonify(body))
    return response


@auth_page.route('/auth/ping', methods=['GET'])
def auth_ping():
    return "Pong", 200


@auth_page.route('/auth/info', methods=['GET'])
@authenticated
def auth_info_get():
    user_id = get_user_id_from_header()

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    user_info = _get_user_info(cur, user_id)

    return make_response(jsonify(user_info)), 200


@auth_page.route('/auth/expert_by_certificate', methods=['POST'])
@authenticated
def auth_expert_by_certificate():
    user_id = get_user_id_from_header()

    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()

    sql = "UPDATE users SET expertOrNot = 1 where id = {}".format(user_id)
    cur.execute(sql)
    con.commit()

    user_info = _get_user_info(cur, user_id)

    return make_response(jsonify(user_info)), 200


@auth_page.route('/auth/auth_ping', methods=['GET'])
@authenticated
def authenticated_ping():
    return "Pong", 200
