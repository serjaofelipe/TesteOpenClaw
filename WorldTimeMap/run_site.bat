@echo off
echo Iniciando o WorldTimeMap...
start cmd /k "npm run dev"
timeout /t 5 /nobreak
start http://localhost:5173
exit
