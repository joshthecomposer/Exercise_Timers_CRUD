from flask_app import application
from dotenv import load_dotenv
load_dotenv()
from flask_app.controllers import users, main_controller, timers, states

if __name__ == '__main__':
    application.run(debug=True)