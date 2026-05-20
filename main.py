import os
html_code = "<html><body><form><label>Nome de Usuário:</label><br><input type='text' id='username' name='username'><br><label>Senha:</label><br><input type='password' id='password' name='password'><br><input type='submit' value='Login'></form></body></html>"
with open("index.html", "w") as file:
    file.write(html_code)
os.system("git init")
os.system("git add .")
os.system("git commit -m 'Primeiro commit'")
os.system("git branch -M main")
os.system("git remote add origin https://github.com/SEU_NOME_DE_USUARIO/Teste-Openclaw.git")
os.system("git push -u origin main")