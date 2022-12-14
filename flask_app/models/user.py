from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 
DB='et'
class User:
    def __init__(self, data ):
        self.id=data['id']
        self.username=data['username']
        self.email=data['email']
        self.password=data['password']
        self.updated_at=data['updated_at']
        self.created_at=data['created_at']
    @classmethod
    def user_email(cls,email):
        data={'email':email}
        query='SELECT * from users where email=%(email)s;'
        result=connectToMySQL(DB).query_db(query,data)
        if len(result) < 1:
            return False
        return cls(result[0])
    @classmethod
    def user_id(cls, user_id):

        data = {"id": user_id}
        query = "SELECT * FROM users WHERE id = %(id)s;"
        result = connectToMySQL(DB).query_db(query,data)
        

        if len(result) < 1:
            return False
        return cls(result[0])

    @classmethod
    def save(cls,data):
        query='INSERT INTO users(username,email,password,created_at,updated_at)VALUES(%(username)s,%(email)s,%(password)s,NOW(),NOW())'
        return connectToMySQL(DB).query_db(query,data)
    @staticmethod
    def validate_user(user):
        is_valid=True
        if len(user['username'])<=0:
            flash('username has to be at least one character','register')
            is_valid=False
        if not EMAIL_REGEX.match(user['email']): 
            flash("Invalid email address!",'register')
            is_valid = False
        if len(user['password'])<=8:
            flash('password has to be at least 8 characters','register')
            is_valid=False   
        if user['password']!=user['confirmpassword']:
            flash("password did not match!,'register'")
            is_valid = False
        email_already=User.user_email(user['email'])
        if email_already:
            flash('account already exists','register')
            is_valid=False
        return is_valid
    
