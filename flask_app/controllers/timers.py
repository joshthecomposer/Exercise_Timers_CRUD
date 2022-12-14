from flask import render_template, redirect, session
from flask_app import app

@app.route('/view/timer')
def view_timer():
    return render_template('view_timer.html')