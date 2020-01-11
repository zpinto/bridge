from flask import Flask
import db

# create the app instance
app = Flask(__name__)

@app.route('/')
def test():
    db.create("test", "doc", {"hello":"World"})
    print(type(db.read("test", "doc")))

    return "Hello World"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
