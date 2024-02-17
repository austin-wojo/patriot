from flask import Blueprint, render_template, url_for

# Create a Blueprint for 'main'
main = Blueprint('main', __name__)

@main.route('/')
def index():
    """Render the homepage."""
    return render_template('main/index.html')
