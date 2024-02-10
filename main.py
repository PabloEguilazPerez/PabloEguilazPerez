import os
import json
import shutil

# Ruta del archivo JSON local
json_file = "tools.json"

# Carga el JSON desde el archivo local
with open(json_file, 'r') as f:
    data = json.load(f)

# Ruta de la carpeta 'tools'
tools_folder = 'tools'

# Elimina el contenido de la carpeta 'tools' si existe
if os.path.exists(tools_folder):
    shutil.rmtree(tools_folder)

# Crea una carpeta 'tools'
os.makedirs(tools_folder)

# Itera sobre los datos obtenidos
for item in data:
    tool_id = str(item['id'])
    tool_name = item['name']
    tool_icon = item['icon']

    # Crea la carpeta de la herramienta
    tool_folder = os.path.join(tools_folder, tool_id)
    os.makedirs(tool_folder)

    # Crea el archivo index.json
    index_data = {
        "id": item['id'],
        "name": item['name'],
        "icon": item['icon']
    }
    with open(os.path.join(tool_folder, 'index.json'), 'w') as f:
        json.dump(index_data, f, indent=4)

print("¡Carpetas y archivos creados exitosamente!")
