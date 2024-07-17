from flask import Flask
from flask_cors import CORS
from app.views import *
from app.database import *

app = Flask(__name__)

#Rutas
app.route('/', methods=['GET'])(index)

app.route('/api/libros/disponibles/', methods=['GET'])(get_libros_disponibles)
app.route('/api/libros/create/', methods=['POST'])(create_libro)

# Database
test_connection()
create_table_libros()
init_app(app)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)