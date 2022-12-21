from flask_app import app
from flask_app.controllers import users, main_controller, timers, states

if __name__ == '__main__':
    app.run(debug=True)