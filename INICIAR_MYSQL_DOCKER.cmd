@echo off
echo.
echo ================================================
echo   SERVICONECTA - MySQL 8 + Docker (1 clique)
echo ================================================
echo.

:: Verifica se tem Docker
where docker >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERRO] Docker não encontrado. Instale o Docker Desktop primeiro!
  pause
  exit /b 1
)

:: Verifica se tem Docker Compose
where docker-compose >nul 2>&1
if %errorlevel% neq 0 (
  echo Usando docker compose (novo formato)
  set COMPOSE=docker compose
) else (
  set COMPOSE=docker-compose
)

echo [1/3] Parando container antigo (se existir)...
%COMPOSE% down -v >nul 2>&1

echo [2/3] Criando pasta init (se não existir)...
if not exist init mkdir init
copy NUL init\01-schema-serviconecta.sql >nul

echo [3/3] Subindo MySQL com todo o schema do ServiConecta...
%COMPOSE% up -d

echo.
echo Aguarde 15-20 segundos para o MySQL inicializar...
timeout /t 20 >nul

echo.
echo PRONTO! Banco rodando!
echo.
echo Dados de acesso:
echo   Host: localhost
echo   Porta: 3306
echo   Database: serviconecta
echo   User: serviconecta_user
echo   Password: senha123
echo   Root password: root123
echo.
echo Conecte no seu Node.js assim:
echo   host: 'localhost',
echo   user: 'serviconecta_user',
echo   password: 'senha123',
echo   database: 'serviconecta'
echo.
echo Para parar: rode novamente esse .cmd e escolha "down"
pause