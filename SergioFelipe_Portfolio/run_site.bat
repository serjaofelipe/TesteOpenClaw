@echo off
echo Iniciando o Portfolio Oficial de Sergio Felipe...
start cmd /k "npm run dev"
timeout /t 5 /nobreak
start http://localhost:5173
exit
