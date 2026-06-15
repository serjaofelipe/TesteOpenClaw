@echo off
title Network Scanner Hub
color 0A

echo Inicializando servidor do Network Scanner Hub...
start /b uvicorn main:app --host 127.0.0.1 --port 8090

echo Aguardando inicializacao do servidor...
timeout /t 3 /nobreak >nul

echo Abrindo o site no navegador padrao...
start http://127.0.0.1:8090/index.html

echo Servidor rodando. Feche esta janela para encerrar.
pause
