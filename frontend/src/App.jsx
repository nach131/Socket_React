// src/App.js
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';

// URL del servidor Socket.IO (ajusta según tu configuración)
const socket = io('http://localhost:5500', {
  transports: ['websocket', 'polling'], // Soporte para WebSocket y polling
  reconnection: true, // Intentar reconectar automáticamente
});


console.log('socket', socket);

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Evento de conexión exitosa
    socket.on('connect', () => {
      console.log('Conectado al servidor Socket.IO');
    });

    // Escuchar mensajes del servidor (ajusta el nombre del evento según tu servidor)
    socket.on('message', (data) => {
      setReceivedMessages((prev) => [...prev, data]);
    });

    // Manejar errores de conexión
    socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
    });

    // Limpiar los eventos al desmontar el componente
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('connect_error');
    };
  }, []);

  // Enviar un mensaje al servidor
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message); // Enviar mensaje al servidor
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Cliente Socket.IO con React</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
      <h2>Mensajes recibidos:</h2>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;