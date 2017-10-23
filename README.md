# Innovation Hub

## Setup Instructions

#### Backend

 - Create a `virtualenv` and install the backend dependencies by typing `pip install -r requirements.txt`
 - Migrate your database so your tables are created (will use sqlite3 by default) `python manage.py makemigrations && python manage.py migrate`
 - Create a superuser so you can log into your application. `python manage.py createsuperuser`
 - Run your server `python manage.py runserver`

Now you're ready to open a new terminal tab or however you want to start a new process.

#### Frontend

 - Change the current directory to `example_app/static/example_app/`
 - Install your frontend dependencies by running the command `npm install`. This can take a while.
 - Install your bower dependencies by running the command `bower install`. This should not take a while.
 - Run your frontend watch server to built your `dist` directory by running the command `ember serve`

Once it finishes its initial build of your application you can navigate your browser to `http://localhost:8000/posts` and login with your superuser credentials.

Now you can get started making new ideas!