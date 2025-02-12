import json
import os

CDN_URL = "https://cdn.pabloeguilaz.dev/images/icons/"

def main():
    # Leer directorio actual
    path = "./images/icons"
    # Crear un diccionario vacío
    print(path)
    icons = []
    # Recorrer los archivos del directorio
    for file in os.listdir(path):
        print(file)
        # Si el archivo es un .svg
        icons.append({"icon": CDN_URL + file})
    # Crear un archivo .json
    with open('icons.json', 'w', encoding='utf-8') as file:
        # Guardar el diccionario en el archivo con formato legible
        json.dump(icons, file, indent=4)

if __name__ == '__main__':
    main()
