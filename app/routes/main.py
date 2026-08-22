from flask import Blueprint, render_template, url_for
import os
import tempfile

# Create a Blueprint for 'main'
main = Blueprint('main', __name__)

# Anchor to the project root so the path never depends on the process CWD
_PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
COUNTER_FILE = os.path.join(_PROJECT_ROOT, 'counter.txt')

def read_counter():
    """Return the current count, or 0 if the file is missing, empty or corrupt."""
    try:
        with open(COUNTER_FILE, 'r') as file:
            return int(file.read().strip() or 0)
    except (OSError, ValueError):
        return 0

def write_counter(count):
    """Write atomically so a killed worker can't leave a half-written file."""
    try:
        fd, tmp = tempfile.mkstemp(dir=_PROJECT_ROOT, prefix='.counter-')
        try:
            with os.fdopen(fd, 'w') as file:
                file.write(str(count))
            os.replace(tmp, COUNTER_FILE)
        except BaseException:
            os.unlink(tmp)
            raise
    except OSError:
        pass  # Counting is best-effort; never fail a page render over it


@main.route('/')
def index():
    """Render the homepage."""
    write_counter(read_counter() + 1)
    return render_template('main/index.html')

@main.route('/counter')
def counter():
    count = read_counter()
    return render_template('main/counter.html', count = count)
