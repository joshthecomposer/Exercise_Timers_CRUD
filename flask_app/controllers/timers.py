from flask import render_template, redirect, request
from flask_app import app
from flask_app.models import timer

@app.route('/view/timer/<int:id>')
def view_timer(id):
    #TODO: Add /<timerid> to /view/timer above.
    return render_template('view_timer.html',timers=timer.Timer.by_id(id))
@app.route('/delete/<int:id>')
def delete_timer(id):
    #session user validation is done in models
    timer.Timer.destroy(id)
    return redirect('/dashboard')  


@app.route('/create_timer',methods=['POST'])
def save_timer():
    valid=timer.Timer.save_timers(request.form)
    if not valid:
        return redirect('/dashboard')
    return redirect('/dashboard')