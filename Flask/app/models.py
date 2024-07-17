from app.database import get_db

class Libro:
    def __init__(self, id=None, titulo=None, autor=None, generos=None, cover=None, sinopsis=None, epub=None, pdf=None):
        self.id = id
        self.titulo = titulo
        self.autor = autor
        self.generos = generos
        self.cover = cover
        self.sinopsis = sinopsis
        self.epub = epub
        self.pdf = pdf

    @staticmethod
    def __get_libros_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
    
        libros = []
        for row in rows:
            libros.append(
                Libro(
                    id=row[0],
                    titulo=row[1],
                    autor=row[2],
                    generos=row[3],
                    cover=row[4],
                    sinopsis=row[5],
                    epub=row[6],
                    pdf=row[7]
                )
            )
        cursor.close()
        return libros

    @staticmethod
    def get_all_pending():
        return Libro.__get_libros_by_query(
            """ 
                SELECT * 
                FROM libros 
            """)

    def save(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """
            INSERT INTO libros
            (titulo, autor, generos, cover, sinopsis, epub, pdf)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (self.titulo, self.autor, self.generos, self.cover, self.sinopsis, self.epub, self.pdf)
            )
        self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'autor': self.autor,
            'generos': self.generos,
            'cover': self.cover,
            'sinopsis': self.sinopsis,
            'epub': self.epub,
            'pdf': self.pdf
        }