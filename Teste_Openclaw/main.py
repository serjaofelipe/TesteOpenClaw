import cv2
# Abre a câmera padrão (index 0)
camera = cv2.VideoCapture(0)

while True:
    # Lê um frame da câmera
    ret, frame = camera.read()
    
    # Se não conseguiu ler, sai do loop
    if not ret:
        break
    
    # Exibe o frame
    cv2.imshow('Camera', frame)
    
    # Se a tecla 'q' for pressionada, sai do loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Libera a câmera e fecha as janelas
# (sempre faça isso após usar o objeto camera)
camera.release()
cv2.destroyAllWindows()