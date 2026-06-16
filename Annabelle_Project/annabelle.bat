@echo off
echo ===================================================
echo Iniciando o Servidor de Desenvolvimento do Site...
echo ===================================================
echo Prepare-se para ver Annabelle...
timeout /t 2 > nul
start http://localhost:5173
npm run dev
