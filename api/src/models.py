from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    biography = db.Column(db.String(500), unique=False, nullable=True)
    username = db.Column(db.String(120), unique=False, nullable=False)
    firstname = db.Column(db.String(120), unique=False, nullable=True)
    lastname = db.Column(db.String(120), unique=False, nullable=True)
    image = db.Column(db.String(500), unique=False, nullable=True)
    myscripts = db.relationship(
        'Scripts', cascade='all, delete', backref='user')
    userpicture = db.relationship(
        'Userpicture', cascade='all, delete', backref='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def serialize_with_scripts(self):
        return {
            "id": self.id,
            "email": self.email,
            "biography": self.biography,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            'userpicture': [pic.serialize() for pic in self.userpicture],
            'myscripts': [script.serialize() for script in self.myscripts]
        }

    def serialize_with_profile_image(self):
        return {
            "id": self.id,
            "email": self.email,
            "biography": self.biography,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            'userpicture': [pic.serialize() for pic in self.userpicture]
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Scripts(db.Model):
    __tablename__ = 'scripts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    year = db.Column(db.String(50), unique=False, nullable=False)
    logline = db.Column(db.String(500), unique=False, nullable=False)
    cover = db.Column(db.String(250), unique=False, nullable=False)
    url = db.Column(db.String(250), unique=False, nullable=False)
    scriptcover = db.relationship(
        'Scriptcover', cascade='all, delete', backref='scripts')
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id', ondelete='CASCADE'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            'year': self.year,
            'logline': self.logline,
            'cover': self.cover,
            'url': self.url,
            'user_id': self.user_id,
        }

    def serialize_with_covers(self):
        return {
            "id": self.id,
            "title": self.title,
            'year': self.year,
            'logline': self.logline,
            'cover': self.cover,
            'url': self.url,
            'scriptcover': [cover.serialize() for cover in self.scriptcover],
            'user_id': self.user_id,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Userpicture(db.Model):
    __tablename__ = 'userpicture'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id', ondelete='CASCADE'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "filename": self.filename,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session


class Scriptcover(db.Model):
    __tablename__ = 'scriptcover'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    script_id = db.Column(db.Integer, db.ForeignKey(
        'scripts.id', ondelete='CASCADE'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "script_id": self.script_id,
            "filename": self.filename,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session
