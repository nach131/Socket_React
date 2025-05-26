from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
# socketio = SocketIO(
#     app, cors_allowed_origins="http://localhost:5173"
# )  # Permitir conexiones desde React


socketio = SocketIO(
    app, cors_allowed_origins="*"
)  # Permitir conexiones desde cualquier origen


@socketio.on("connect")
def handle_connect():
    print("Cliente conectado")
    emit("message", "Bienvenido al servidor Socket.IO")


@socketio.on("message")
def handle_message(data):
    print(f"Mensaje recibido: {data}")
    emit("message", data, broadcast=True)  # Enviar mensaje a todos los clientes


@socketio.on("disconnect")
def handle_disconnect(motivo):
    print(f"Cliente desconectado: {motivo}")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5500, debug=True)
