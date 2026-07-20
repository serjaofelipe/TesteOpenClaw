@echo off
echo Iniciando o painel do Grupo da Van...
start cmd /k "npm run dev"
timeout /t 5 /nobreak
start http://localhost:5173
exit
