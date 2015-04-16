Server side
===========

Here is simple web-server, built with Python/Flask, that serves the client application `angular-boilerplate`.
In order to be able to work with client app correctly, web-server has to respond with `index.html` page to any request,
since routing performs on client side. The exception make static files, that are available by url `/static/...` .

Virtual environment installation
--------------------------------

All of the following commands have to be executed from `backend` folder.

First we need [virtualenv](https://virtualenv.pypa.io/en/latest/index.html) - virtual environment for Python.

```
pip install virtualenv
```

After `virtualenv` installation, we are ready to deploy virtual environment:

```
virtualenv env
```

As a result, `env` folder will appear.

Next we need to activate virtual environment:

```
source env/bin/activate
```

Or for Windows users:

```
env\Scripts\activate
```

After that your command line will change: just before username will appear the name of virtual environment in brackets.
From now on any package installation command (e.g. `pip install Flask`) or package deletion command will affect only
virtual environment. All following commands have to be executed with virtual environment activated. To deactivate virtual
environment simply run:

```
deactivate
```

See more information about virtual environment usage [here](https://virtualenv.pypa.io/en/latest/userguide.html).
It's worth to mention, we could do without virtual environment, but who wants to clog the system with junk.

Requirements installation
-------------------------

To bring our little server to life, it needs a set of packages, described at `requirements.txt`. To install
requirements, activate virtual environment and run:

```
pip install -r requirements.txt
```

Server start
------------

After requirements installation server is ready to start:

```
python backend.py
```

You will see a message on the server startup. Now you can see `angular-boilerplate` client application at
http://127.0.0.1:5000/ . You can find detailed information about Flask configuration (port, static path,
templates path etc) [here](http://flask.pocoo.org/docs/0.10/api/).
