@echo off
title Dossie do Terror - Servidor Web
echo ==============================================
echo   Iniciando o servidor do Dossie do Terror...
echo ==============================================
echo.
echo Cuidado para nao olhar para tras.
echo O site sera aberto automaticamente no seu navegador.
echo Para escapar, feche esta janela ou pressione CTRL+C.
echo.

:: O Vite possui o parametro --open nativamente para abrir o navegador
npm run dev -- --open
