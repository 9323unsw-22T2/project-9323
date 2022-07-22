from config import *
from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS
import sqlite3
import random
import json
from math import ceil

newsfeed_page = Blueprint("newsfeed", __name__)
CORS(newsfeed_page)

def generate_all_dit(seed):
    # get the number of question and article
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    question_num = cur.execute("select count(id) from questions;").fetchall()[0][0]
    article_num = cur.execute("select count(id) from articles where articleId is null;").fetchall()[0][0]
    # print(article_num)
    con.close()
    # max page, and max_num
    max_num = question_num+article_num
    max_page = ceil(max_num/EACH_PAGE_NUMBER)
    
    # random seed
    random.seed(seed)
    # ramdom generate the list to store the question and aricle (use id)
    # from 1 to num+1 is due the begin id is 1
    question_random = random.sample(range(1,question_num+1), question_num)
    article_random = random.sample(range(1,article_num+1), article_num)

    # random article or question
    # que is 0, art is 1
    que_or_art = []
    for i in range(max_num):
        temp = random.randint(0,1)
        if temp == 0:
            if que_or_art.count(0) < question_num:
                que_or_art.append(0)
            elif que_or_art.count(1) < article_num:
                que_or_art.append(1)
            
        if temp == 1:
            if que_or_art.count(1) < article_num:
                que_or_art.append(1)
            elif que_or_art.count(0) < question_num:
                que_or_art.append(0)
    
    

    # print(que_or_art)
    con.close()
    # print("def", max_page, max_num)
    return max_page, max_num, que_or_art,question_random,article_random


global seed
seed = 1

# test for ping
@newsfeed_page.route('/newsfeed/ping', methods=['GET'])
def newsfeed_ping():
    return "Pong", 200

@newsfeed_page.route('/newsfeed/<int:page>', methods=['GET'])
def newsfeed_random(page):
    # max_num is the all number of questions and articles,
    # the 
    max_page, max_num, que_or_art,question_random,article_random  = generate_all_dit(seed)
    if page > max_page or page <= 0:
        return make_response(jsonify({"error": f"out range of pages, page should be 1 to {max_page}"})), 404
    # print(que_or_art)
    # if page is in , just go on 
    result={}
    # caculate the each page has how much thing in this page
    # 这页显示多少个项目
    item_list = []
    for i in range(EACH_PAGE_NUMBER):
        item = i+1+(page-1)*EACH_PAGE_NUMBER
        if item <= max_num:
            item_list.append(item)
    # get column name from other table
    col_que = get_table_column("questions")
    col_art = get_table_column("articles")
    # print(col_que, len(col_que))
    for i in item_list:
        temp={}
        if que_or_art[i-1] == 0:
            temp["TYPE"]="QUESTION"
            # print("page ", page, 'que id',que_or_art[:i].count(0))
            t = que_or_art[:i].count(0)
            que_id = question_random[t-1]
            content_que = get_qeustion(que_id)[0]
            # print("content!!!", content)
            for _ in range(len(col_que)):
                temp[col_que[_]] = content_que[_]
            
        if que_or_art[i-1] == 1:
            temp["TYPE"]="ARTICLE"
            # print("page ", page,'art id',que_or_art[:_].count(1))
            t = que_or_art[:i].count(1)
            art_id = article_random[t-1]
            art_all_id = get_all_artilce_id()
            content_art = get_article(art_all_id[art_id-1])
            len_step=len(content_art)

            for _ in range(len(col_art)):
                temp[col_art[_]] = content_art[0][_]
            t_list = []
            
            for j in range(len_step):
                tm = {}
                for _ in range(len(col_art)):
                    tm[col_art[_]] = content_art[j][_]
                t_list.append(tm)
            temp["each_step"] = t_list
            temp["articleId"] = content_art[0][0]
        result[i] = temp
    # print(result)    
    return jsonify(result)


# just fresh the page
@newsfeed_page.route('/newsfeed/fresh',methods=["POST"])
def newsfeed_fresh():
    global seed
    seed = random.randint(0,100)
    return make_response("Alread freshed"),200



def get_qeustion(id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # sql = f"select id,title,content,timeCreated,timeUpdated,author,thumbUpby,isDeleted from questions where id = {id};"
    sql = f"select * from questions where id = {id};"
    res = cur.execute(sql).fetchall()
    # print(res)
    return res
def get_all_artilce_id():
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # sql = f"select id,articleId,stepTitle,content,image,timeCreated,timeUpdated,author,thumbUpby,isDeleted,video from articles where id = {id};"
    sql = f"select articleId from articles where articleId is not null;"
    res = cur.execute(sql).fetchall()
    res = set(res)
    temp =[]
    for i in res:
        temp.append(i[0])
    res = temp
    # print("all articles id", res)
    return res

def get_article(article_id):
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    # sql = f"select id,articleId,stepTitle,content,image,timeCreated,timeUpdated,author,thumbUpby,isDeleted,video from articles where id = {id};"
    sql = f"select * from articles where articleId = {article_id} or (articleId is Null and id = {article_id});"
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


# test for ping
@newsfeed_page.route('/newsfeed/trending', methods=['GET'])
def newsfeed_trending():
    # only question!!!
    col_que = get_table_column("questions")
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    
    # get all question_thumb up by
    sql = "select id,title,content,thumbUpBy,replyIds from questions;"
    all_thumb = cur.execute(sql).fetchall()
    num_question = len(all_thumb)
    print(all_thumb,num_question)
    tem_list=[]
    for i in all_thumb:
        temp ={}
        num_thu = len(json.loads(i[3]))
        temp["id"] = i[0]
        temp["title"]=i[1]
        temp['content']=i[2]
        temp['thumbUpBy']=i[3]
        temp['answer_nums'] = i[4]
        temp["num-thum"] = num_thu
        tem_list.append(temp)
    res = sorted(tem_list, key=lambda i: i['num-thum'],reverse=True)

    

    return make_response(jsonify(res[:5])),200