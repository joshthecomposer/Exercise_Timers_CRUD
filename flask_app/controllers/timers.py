from flask import render_template, redirect, request, jsonify, session
from flask_app import application as app
from flask_app.models import timer

@app.route('/view/timer/<int:id>')
def view_timer(id):
    if "user_id" not in session:
        return redirect('/')
    one_timer = timer.Timer.by_id(id)
    if one_timer.user_id != session['user_id']:
        return redirect('/')
    return render_template('view_timer.html',one_timer=one_timer)

@app.route('/delete/<int:id>', methods=['POST'])
def delete_timer(id):
    timer.Timer.destroy(id)
    return jsonify(id)

@app.route('/create_timer', methods=['POST'])
def save_timer():
    valid=timer.Timer.save_timer(request.form)
    if not valid:
        return redirect('/dashboard')
    return redirect('/dashboard')

@app.route('/edit_timer',methods=['POST'])
def edit_timer():
    valid=timer.Timer.update_timer(request.form)
    return jsonify(request.form)