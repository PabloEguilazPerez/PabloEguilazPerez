import os
import json
import shutil

# Definir los nombres de los archivos JSON y sus datos
json_files_data = [
    ("tools.json", "tools"),
    ("changelog.json", "changelog"),
    ("resume.json", "resume")
]

# Iterar sobre los archivos JSON
for json_file, folder_name in json_files_data:
    # Cargar el JSON desde el archivo local
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Ruta de la carpeta
    folder_path = folder_name

    # Elimina el contenido de la carpeta si existe
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)

    # Crea la carpeta si no existe
    os.makedirs(folder_path)

    # Iterar sobre los datos obtenidos
    for item in data:
        item_id = str(item['id'])

        # Crear un directorio para cada item
        item_folder = os.path.join(folder_path, item_id)
        os.makedirs(item_folder)

        # Guardar los datos del item en un archivo JSON dentro de su carpeta correspondiente
        with open(os.path.join(item_folder, 'index.json'), 'w', encoding='utf-8') as f:
            json.dump(item, f, indent=4, ensure_ascii=False)

print("¡Carpetas y archivos creados exitosamente!")



