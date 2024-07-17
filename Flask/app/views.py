from flask import jsonify, request
from app.models import Libro
from datetime import date

def index():
    return jsonify(
        {
            'mensaje': 'Hola Mundo APIS con Flask'
        }
    )

def get_libros_disponibles():
    libros = Libro.get_all_pending()
    return jsonify([libro.serialize() for libro in libros])

def create_libro():
    data = request.json
    new_libro = Libro(
        titulo = data['titulo'],
        autor = data['autor'],
        generos = data['generos'],
        cover = data['cover'],
        sinopsis = data['sinopsis'],
        epub = data['epub'],
        pdf = data['pdf']
    )
    new_libro.save()
    return jsonify({'message': 'Task created successfully'}), 201
