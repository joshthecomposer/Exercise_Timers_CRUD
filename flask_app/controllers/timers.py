from flask import render_template, redirect, session
from flask_app import app

@app.route('/view/timer/')
def view_timer():
    #TODO: Add /<timerid> to /view/timer above.
    return render_template('view_timer.html')