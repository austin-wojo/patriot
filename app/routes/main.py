from flask import Blueprint, render_template, url_for
import os
# Create a Blueprint for 'main'
main = Blueprint('main', __name__)

COUNTER_FILE = 'counter.txt'

def read_counter():
    if not os.path.exists(COUNTER_FILE):
        return 0
    with open(COUNTER_FILE, 'r') as file:
        return int(file.read())

def write_counter(count):
    with open(COUNTER_FILE, 'w') as file:
        file.write(str(count))


@main.route('/')
def index():
    count = read_counter() + 1
    write_counter(count)
    """Render the homepage."""
    return render_template('main/index.html')

@main.route('/counter')
def counter():
    count = read_counter()
    return render_template('main/counter.html', count = count)