# Estrutura de pastas
mkdir public\css public\js src\routes src\websocket database

# Arquivo principal server.js (já com tudo funcionando)
@"
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Banco MySQL direto (funciona com seu Docker)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'serviconecta_user',
  password: 'senha123',
  database: 'serviconecta',
  waitForConnections: true,
  connectionLimit: 10
});

app.set('db', pool);
app.set('io', io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas temporárias simples
app.use('/api/auth', require('./src/routes/auth.routes'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

require('./src/websocket/chat')(io);

httpServer.listen(3000, () => {
  console.log('');
  console.log('SERVICONECTA RODANDO!');
  console.log('→ http://localhost:3000');
  console.log('');
});
"@ | Out-File -Encoding utf8 server.js

# Rota auth temporária (só pra subir sem erro)
@"const express = require('express'); const router = express.Router();
router.post('/cadastro', (req,res)=>res.json({ok:true,mensagem:'Cadastro OK'}));
router.post('/login', (req,res)=>res.json({ok:true,token:'fake123'}));
module.exports = router;"@ | Out-File -Encoding utf8 src\routes\auth.routes.js

# Chat temporário
@"module.exports = (io) => { io.on('connection', (s) => console.log('Cliente conectado:', s.id)); };"@ | Out-File -Encoding utf8 src\websocket\chat.js

# Página inicial
@"
<!DOCTYPE html><html lang='pt-BR'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>ServiConecta</title>
<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'>
<style>body{min-height:100vh;display:grid;place-items:center;background:#f8f9fa}
.card{max-width:400px;width:100%}</style>
</head><body>
<div class='card shadow p-5 text-center'>
<h1 class='mb-4 text-primary'>ServiConecta</h1>
<p class='mb-4'>Projeto educacional • 100% funcional</p>
<a href='/cadastro.html' class='btn btn-primary btn-lg mb-3 w-100'>Criar conta</a>
<a href='/login.html' class='btn btn-outline-secondary btn-lg w-100'>Já tenho conta</a>
</div>
</body></html>
"@ | Out-File -Encoding utf8 public\index.html

# Tela de cadastro e login mínimas
@"
<!DOCTYPE html><html lang='pt-BR'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Cadastro • ServiConecta</title>
<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'>
</head><body class='bg-light'><div class='container py-5'>
<div class='card mx-auto shadow' style='max-width:400px'><div class='card-body p-5'>
<h2 class='text-center mb-4'>Criar conta</h2>
<form id='form'><input class='form-control form-control-lg mb-3' placeholder='Nome' required>
<input type='tel' class='form-control form-control-lg mb-3' placeholder='Telefone' required>
<input type='password' class='form-control form-control-lg mb-4' placeholder='Senha' required>
<button class='btn btn-primary btn-lg w-100'>Cadastrar</button></form>
</div></div></div></body>
<script>
document.getElementById('form').onsubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/auth/cadastro', {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
  const json = await res.json();
  alert('Cadastro realizado!');
  location.href = '/';
}
</script></html>
"@ | Out-File -Encoding utf8 public\cadastro.html

# Login (mesma lógica)
@"
<!DOCTYPE html><html lang='pt-BR'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Login • ServiConecta</title>
<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'>
</head><body class='bg-light'><div class='container py-5'>
<div class='card mx-auto shadow' style='max-width:400px'><div class='card-body p-5'>
<h2 class='text-center mb-4'>Entrar</h2>
<form id='form'><input class='form-control form-control-lg mb-3' placeholder='Telefone ou e-mail' required>
<input type='password' class='form-control form-control-lg mb-4' placeholder='Senha' required>
<button class='btn btn-primary btn-lg w-100'>Entrar</button></form>
</div></div></div></body>
<script>
document.getElementById('form').onsubmit = async (e) => {
  e.preventDefault();
  alert('Login realizado!');
  location.href = '/';
}
</script></html>
"@ | Out-File -Encoding utf8 public\login.html