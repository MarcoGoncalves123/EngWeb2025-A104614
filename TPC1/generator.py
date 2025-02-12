import os
import json

def open_json():
    file_path = os.path.join(os.getcwd(), "TPC1", "dataset_reparacoes.json")
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        return data

def get_intervencoes():
    data = open_json()

    intervencoes = []
    for reparacao in data['reparacoes']:
        intervencoes.append(reparacao['intervencoes'])  
    
    output_path = os.path.join(os.getcwd(), "TPC1", "intervencoes.json")
    with open(output_path, 'w', encoding='utf-8') as output_file:
        json.dump(intervencoes, output_file, ensure_ascii=False, indent=4)  
        
def get_viaturas():
    data = open_json()
    viaturas = []
    
    for reparacao in data['reparacoes']:
        viaturas.append(reparacao['viatura'])      
    
    output_path = os.path.join(os.getcwd(),"TPC1","viaturas.json")    
    with open(output_path,"w",encoding="utf-8") as output_file:
        json.dump(viaturas,output_file, ensure_ascii=False, indent=4)
        
get_intervencoes()
get_viaturas()