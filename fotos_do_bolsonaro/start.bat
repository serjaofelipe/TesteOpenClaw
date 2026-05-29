@echo off
echo Iniciando servidor local para evitar erro de CORS (file://)...
start http://localhost:8000
python -m http.server 8000
