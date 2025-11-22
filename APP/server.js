const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Conexão direta com MySQL do Docker
const pool = mysql.createPool({
  host: 'localhost',
  user: 'serviconecta_user',
  password: 'senha123',
  database: 'serviconecta',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.set('db', pool);
app.set('io', io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Rotas
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/demandas', require('./src/routes/demanda.routes'));
app.use('/api/categorias', require('./src/routes/demanda.routes'));
app.use('/api/categorias', require('./src/routes/categoria.routes'));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// WebSocket Chat
require('./src/websocket/chat')(io);

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log('\nSERVICONECTA RODANDO!');
  console.log('http://localhost:3000');
  console.log('MySQL conectado automaticamente\n');
});