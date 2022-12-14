from flask import render_template, redirect, session
from flask_app import app

@app.route('/')
def index():
    #TODO: Check if user is signed in and redirect to /dashboard
    return render_template('index.html')