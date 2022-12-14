from flask import render_template, redirect, session
from flask_app import app

@app.route('/login', methods=['POST'])
def login():
    #do stuff
    return redirect('/dashboard')

@app.route('/register', methods=['POST'])
def register():
    #do stuff
    return  redirect('/dashboard')