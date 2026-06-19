import os

def main():
    codr_path = 'codr.txt'
    music_style_path = 'music_style.txt'
    
    # Criando o arquivo de amostra se não existir para o script funcionar de cara
    if not os.path.exists(codr_path):
        with open(codr_path, 'w', encoding='utf-8') as f:
            f.write("This is a heavy track with heavy sounds.")
            
    try:
        with open(codr_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'heavy' in content:
            new_content = content.replace('heavy', 'melodic')
            
            with open(codr_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            with open(music_style_path, 'w', encoding='utf-8') as f:
                f.write("heavy metal")
                
            print(f"Substituição de 'heavy' por 'melodic' concluída. O arquivo {music_style_path} foi criado.")
        else:
            print(f"A palavra 'heavy' não foi encontrada em {codr_path}.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

if __name__ == "__main__":
    main()
