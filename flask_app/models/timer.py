from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash,session
from flask_app.models import user, state

DB='ET'

class Timer:
    def __init__(self, data ):
        self.id=data['id']
        self.name=data['name']
        self.exercise_time=data['exercise_time']
        self.rest_time=data['rest_time']
        self.sets=data['sets']
        self.created_at=data['created_at']
        self.updated_at=data['updated_at']
        self.user_id=data['user_id']
        self.user=None
        self.state = None

    @staticmethod
    def is_valid(data):
        valid=True
        big_int = False
        flash_string='is required'
        if len(data['name'])<1:
            flash('Name '+ flash_string,'timer')
            valid=False
        if len(data['exercise_time'])<1:
            flash('Exercise time '+flash_string,'timer')
            valid=False
        if len(data['rest_time'])<1:
            flash('Rest time '+flash_string,'timer')
            valid=False
        if len(data['sets'])<1:
            flash('Amount of sets '+flash_string,'timer')
            valid=False
        if len(data['exercise_time']) >= 1:
            if int(data['exercise_time']) < 1 or int(data['exercise_time']) > 300:
                big_int = True
                valid=False
        if len(data['rest_time']) >= 1:
            if int(data['rest_time']) < 1 or int(data['rest_time']) > 300:
                big_int = True
                valid=False
        if len(data['sets']) >= 1:
            if int(data['sets']) < 1 or int(data['sets']) > 300:
                big_int = True
                valid=False
        if big_int == True:
            flash('Please enter a number between 1 and 301')
        return valid

    @classmethod
    def save_timer(cls, data):
        if not Timer.is_valid(data):
            return False
        query='''INSERT INTO timers(name,exercise_time,rest_time,sets,user_id,updated_at,created_at)
        VALUES(%(name)s,%(exercise_time)s,%(rest_time)s,%(sets)s,%(user_id)s,NOW(),NOW())'''
        result = connectToMySQL(DB).query_db(query,data)
        data = {
            'exercise_time': data['exercise_time'],
            'timer_id': result
        }
        query = 'INSERT INTO states (timer_id, in_progress, sets_completed, currentTime, activity) VALUES (%(timer_id)s, 0 , 0 , %(exercise_time)s, "exercise")'
        connectToMySQL(DB).query_db(query,data)
        return result

    @classmethod
    def update_timer(cls,data):
        this_timer=cls.by_id(data['id'])
        if this_timer.user.id!=session['user_id']:
            return False
        if not Timer.is_valid(data):
            return False
        query='''UPDATE timers SET name=%(name)s,exercise_time=%(exercise_time)s,rest_time=%(rest_time)s,sets=%(sets)s
        WHERE id=%(id)s'''
        connectToMySQL(DB).query_db(query,data)
        query = "UPDATE states SET currentTime = %(exercise_time)s, activity = 'exercise', sets_completed = 0, in_progress = 0 WHERE timer_id=%(id)s"
        return connectToMySQL(DB).query_db(query,data)

    @classmethod
    def by_id(cls, id):
        data={'id':id}
        query='''SELECT * FROM timers 
        JOIN users ON users.id=timers.user_id 
        JOIN states on states.timer_id  = timers.id
        WHERE timers.id=%(id)s'''
        result=connectToMySQL(DB).query_db(query,data)
        timer=result[0]
        timer_obj=cls(timer)
        timer_obj.user=user.User({
                'id':timer['users.id'],
                'username':timer['username'],
                'email':timer['email'],
                'password':timer['password'],
                'updated_at':timer['users.updated_at'],
                'created_at':timer['users.created_at']
        })
        timer_obj.state=state.State({
                'id':timer['states.id'],
                'timer_id':timer['id'],
                'in_progress':timer['in_progress'],
                'currentTime':timer['currentTime'],
                'activity':timer['activity'],
                'sets_completed':timer['sets_completed'],
                'updated_at':timer['states.updated_at'],
                'created_at':timer['states.created_at']
        })
        return timer_obj

    @classmethod
    def destroy(cls, id):
        this_timer = cls.by_id(id)
        if this_timer.user_id != session['user_id']:
            return False
        data={'id':id,
            }
        query = 'DELETE FROM states WHERE timer_id = %(id)s'
        connectToMySQL(DB).query_db(query,data)
        query='DELETE FROM timers WHERE id=%(id)s'
        return connectToMySQL(DB).query_db(query,data)

    @classmethod
    def show_all(cls):
        data = {'id': session['user_id']}
        query='''SELECT * FROM timers 
                JOIN users on users.id=timers.user_id
                JOIN states ON states.timer_id= timers.id
                WHERE users.id = %(id)s ORDER BY timers.created_at DESC'''
        all_timers=[]
        result= connectToMySQL(DB).query_db(query, data)
        print(result)
        for i in result:
            a=cls(i)
            a.user=user.User({
                'id':i['user_id'],
                'username':i['username'],
                'email':i['email'],
                'password':i['password'],
                'created_at':i['users.created_at'],
                'updated_at':i['users.updated_at']
            })
            a.state = state.State({
                'id': i['states.id'],
                'timer_id':i['timer_id'],
                'in_progress':i['in_progress'],
                'currentTime': i['currentTime'],
                'activity': i['activity'],
                'sets_completed': i['sets_completed'],
                'created_at':i['states.created_at'],
                'updated_at':i['states.updated_at']
            })
            all_timers.append(a)
        return all_timers