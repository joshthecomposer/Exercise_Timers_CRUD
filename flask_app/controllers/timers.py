from flask import render_template, redirect, request, jsonify
from flask_app import app
from flask_app.models import timer

@app.route('/view/timer/<int:id>')
def view_timer(id):
    return render_template('view_timer.html',timer=timer.Timer.by_id(id))

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