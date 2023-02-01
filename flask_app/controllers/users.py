from flask import render_template, redirect, session, request, flash
from flask_app import application as app
from flask_app.models import user, timer
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/login', methods=['POST'])
def login():
    one_user = user.User.username_lookup(request.form['username'])
    print(one_user)
    if not one_user or not bcrypt.check_password_hash(one_user.password, request.form['password']):
        flash('Username or Password incorrect.')
        return redirect('/')
    session['user_id'] = one_user.id
    session['username'] = one_user.username
    return redirect('/dashboard')

@app.route('/register', methods=['POST'])
def register():
    is_valid = user.User.validate_user(request.form)
    if not is_valid:
        return redirect('/')
    pw_hash  = bcrypt.generate_password_hash(request.form['password'])
    data =  {
        'username' : request.form['username'],
        'email' : request.form['email'],
        'password' : pw_hash
    }
    user_id = user.User.save(data)
    session['user_id'] = user_id
    session['username'] = request.form['username']
    return  redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect('/')
    all_timers = timer.Timer.show_all()
    return render_template('dashboard.html', all_timers=all_timers)