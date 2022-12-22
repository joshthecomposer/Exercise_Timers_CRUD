from flask import render_template, redirect, request, jsonify, session
from flask_app import app
from flask_app.models import timer, state

@app.route('/get_activity', methods=['POST'])
def get_activity():
    one_state = state.State.by_timer_id(request.form)[0]
    data = {
        'in_progress': one_state['in_progress'],
        'currentTime': one_state['currentTime'],
        'activity': one_state['activity'],
        'sets_completed':one_state['sets_completed'],
    }
    print(one_state)
    return data

@app.route('/set_activity', methods=['POST'])
def set_activity():
    state.State.set_activity(request.form)
    return jsonify(True)

@app.route('/set_sets_completed', methods=['POST'])
def set_sets_completed():
    state.State.set_sets_completed(request.form)
    return jsonify(True)

@app.route('/reset_timer', methods=['POST'])
def reset_timer():
    state.State.reset_timer(request.form)
    return jsonify(True)

@app.route('/set_current_time', methods=['POST'])
def set_current_time():
    state.State.set_current_time(request.form)
    return jsonify(True)