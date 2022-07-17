from config import *
from flask import Blueprint, request, make_response, jsonify
from flask_cors import CORS
import sqlite3
import random

from flask import Blueprint, request, make_response, jsonify
from config import *
from flask_cors import CORS
import sqlite3
import random

newsfeed_page = Blueprint("newsfeed", __name__)
CORS(newsfeed_page)

# random create the dict for question or article
def generate_dit(seed):
    # get the number of question and article
    con = sqlite3.connect(DATABASE_NAME)
    cur = con.cursor()
    question_num = cur.execute("select count(id) from questions;").fetchall()[0][0]
    article_num = cur.execute("select count(id) from articles;").fetchall()[0][0]
    con.close()
    # max page, and max_num
    global max_num
    global max_page
    max_num = question_num+article_num
    max_page = max_num//EACH_PAGE_NUMBER+1
    # random seed

    random.seed(seed)
    # ramdom generate the list to store the question and aricle
    question_random = random.sample(range(1,question_num+1), question_num)
    article_random = random.sample(range(1,article_num+1), article_num)

    que_or_art = []
    for i in range(max_num):
        # print(i)
        temp = random.randint(0,1)
        if temp == 0:
            if que_or_art.count(0) <=question_num-1:
                que_or_art.append(0)
            elif que_or_art.count(1) <=article_num-1:
                que_or_art.append(1)
            
        if temp == 1:
            if que_or_art.count(1)<=article_num-1:
                que_or_art.append(1)
            elif que_or_art.count(0) <=question_num-1:
                que_or_art.append(0)
    ## used to check the list is right   
    # print(question_random)
    # print(article_random)
    # print(que_or_art)

    all = {}
    temp = {}
    i_que = 0
    i_art = 0
    t_q = []
    t_a = []
    for page in range(max_page):
        temp = {}
        if (max_num - page*EACH_PAGE_NUMBER)>=EACH_PAGE_NUMBER:
            num_=EACH_PAGE_NUMBER
        else:
            num_=(max_num - page*EACH_PAGE_NUMBER)%EACH_PAGE_NUMBER
        # print("max", max_num,"page", page,"this page ", num_)
        t_q = []
        t_a = []
        for i in range(num_):
            
            index = (page)*EACH_PAGE_NUMBER+i
            if que_or_art[index] == 0:
                t_q.append(question_random[i_que])
                i_que+=1
            else:
                t_a.append(article_random[i_art])
                i_art+=1
        temp['question']=t_q
        temp['article']=t_a
        all[page+1] = temp
    con.close()
    return all,que_or_art

global seed
seed = 1

# test for ping
@newsfeed_page.route('/newsfeed/ping', methods=['GET'])
def newsfeed_ping():
    return "Pong", 200

@newsfeed_page.route('/newsfeed/random_list_10/<int:page>', methods=['POST'])
def newsfeed_random_list_10(page):
    if request.method == 'POST':
        
        all,que_or_art = generate_dit(seed)

        if page > max_page:
            return make_response(jsonify({"error": "out range of pages"})), 404
        else:
            con = sqlite3.connect(DATABASE_NAME)
            cur = con.cursor()
            result={}
            
            if (max_num - (page-1)*EACH_PAGE_NUMBER)>=EACH_PAGE_NUMBER:
                num_=EACH_PAGE_NUMBER
            else:
                num_=(max_num - (page-1)*EACH_PAGE_NUMBER)%EACH_PAGE_NUMBER
        
            i_q=0
            i_a=0
            for i in range(num_):
                temp={}
                
                # used to check whether it is question or article
                t = que_or_art[i+(page-1)*EACH_PAGE_NUMBER]
                
                if t==0:
                    id_=all[page]["question"][i_q]
                    q_id=cur.execute(f"select id,title,content from articles where id={id_};").fetchall()[0][0]
                    title=cur.execute(f"select id,title,content from articles where id={id_};").fetchall()[0][1]
                    content=cur.execute(f"select id,title,content from articles where id={id_};").fetchall()[0][2]
                    temp['type']='question'
                    temp['id']=q_id
                    temp['title']=title
                    temp['content']=content
                    # result.append(all[page]["question"][i_q])
                    i_q+=1
                else:
                    
                    id_= all[page]["article"][i_q]
                    a_id=cur.execute(f"select id,title,content from articles where id={id_};").fetchall()[0][0]
                    title=cur.execute(f"select id,title,content from articles where id={id_};").fetchall()[0][1]
                    content=cur.execute(f"select id,title,content from articles where id={id_};").fetchall()[0][2]
                    # result.append(all[page]["article"][i_a])
                    temp['type']='article'
                    temp['id']=a_id
                    temp['title']=title
                    temp['content']=content
                    i_a+=1
                result[i]=temp
            con.close()     
            # print(result)
            return jsonify(result)
   
# just fresh the page
@newsfeed_page.route('/newsfeed/fresh',methods=["POST"])
def newsfeed_fresh():
    global seed
    seed = random.randint(0,100)
    return make_response("Alread freshed"),200