@echo off
echo Iniciando servidor local na porta 8000 para evitar erro de CORS...
start http://localhost:8000
python -m http.server 8000
