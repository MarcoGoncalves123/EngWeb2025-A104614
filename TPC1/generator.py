import os
import json

def open_json():
    """Abre o ficheiro dataset_reparacoes.json e retorna os dados."""
    file_path = os.path.join(os.getcwd(), "TPC1", "dataset_reparacoes.json")
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def extract_and_save(field_name):
    
    data = open_json()
    extracted_data = [reparacao[field_name] for reparacao in data['reparacoes']]

    output_path = os.path.join(os.getcwd(), "TPC1", f"{field_name}.json")
    with open(output_path, 'w', encoding='utf-8') as output_file:
        json.dump({field_name: extracted_data}, output_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    fields_to_extract = ["intervencoes", "viatura"]

    for field in fields_to_extract:
        extract_and_save(field)
    
