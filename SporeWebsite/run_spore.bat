@echo off
title Spore Universe - Web Server
echo ==============================================
echo   Iniciando o servidor do Universo Spore...
echo ==============================================
echo.
echo O site sera aberto automaticamente no seu navegador.
echo Para fechar o servidor, feche esta janela ou pressione CTRL+C.
echo.

:: O Vite possui o parametro --open nativamente para abrir o navegador
npm run dev -- --open
