# -*- coding: utf-8 -*-

import os
from datetime import timedelta
from functools import update_wrapper
from flask import Flask, render_template
from flask import make_response, request, current_app, jsonify

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')
STATIC_DIR = os.path.join(FRONTEND_DIR, 'build')        # set 'bin` instead of 'build' to serve production files

# create our little application :)
app = Flask(__name__, static_url_path='/static', static_folder=STATIC_DIR, template_folder=STATIC_DIR)
app.debug = True


# Helper decorator to enable CORS

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator


# Served pages

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@crossdomain(origin='*')
def index(path):
    return render_template('index.html')


@app.route('/session/create', methods=['GET', 'OPTIONS', 'POST'])
@crossdomain(origin='*', headers=['Authorization', 'Content-Type'])
def token():
	return jsonify(token='i-am-authentication-token', expire='2020-06-30T14:31:50.374Z')


if __name__ == "__main__":
    app.run()