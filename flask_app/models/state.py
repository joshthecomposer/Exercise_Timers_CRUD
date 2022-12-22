from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash,session

DB='railway'

class State:
    def __init__(self, data ):
        self.id = data['id']
        self.timer_id = data['timer_id']
        self.in_progress =  data['in_progress']
        self.currentTime = data['currentTime']
        self.activity = data['activity']
        self.sets_completed = data['sets_completed']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    @classmethod
    def by_timer_id(cls, data):
        query = "SELECT * FROM states WHERE timer_id = %(id)s"
        return connectToMySQL(DB).query_db(query,data)
    
    @classmethod
    def set_activity(cls, data):
        query = "UPDATE states SET activity = %(activity)s, in_progress=%(in_progress)s WHERE timer_id = %(timer_id)s"
        return connectToMySQL(DB).query_db(query,data)
    
    @classmethod
    def set_sets_completed(cls, data):
        query = "UPDATE states SET sets_completed = %(sets_completed)s WHERE timer_id = %(timer_id)s"
        return connectToMySQL(DB).query_db(query,data)
    
    @classmethod
    def reset_timer(cls, data):
        query = "SELECT * FROM timers WHERE id = %(timer_id)s"
        t = connectToMySQL(DB).query_db(query,data)
        t = t[0]
        data = {
            'timer_id' : t['id'],
            'in_progress' : 0,
            'currentTime': t['exercise_time'],
            'activity' : 'exercise',
            'sets_completed' : 0
        }
        query = "UPDATE states SET in_progress  = %(in_progress)s, currentTime = %(currentTime)s, activity = %(activity)s, sets_completed = %(sets_completed)s WHERE states.timer_id = %(timer_id)s"
        return connectToMySQL(DB).query_db(query,data)
    
    @classmethod
    def set_current_time(cls, data):
        query = "UPDATE states SET currentTime = %(currentTime)s WHERE states.timer_id = %(timer_id)s"
        return connectToMySQL(DB).query_db(query,data)