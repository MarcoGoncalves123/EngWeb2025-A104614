import csv
import json

csv_filename = "contratos2024.csv"

contratos = []

with open(csv_filename, mode="r", encoding="utf-8") as file:
    reader = csv.DictReader(file, delimiter=";")
    for row in reader:
        
        if row['idcontrato']:
            row['_id'] = row.pop("idcontrato")
        
        if row["precoContratual"]:
            row["precoContratual"] = float(row["precoContratual"].replace(",", "."))
        
        if row["prazoExecucao"].isdigit():
            row["prazoExecucao"] = int(row["prazoExecucao"])

        contratos.append(row)

json_output = json.dumps(contratos, indent=4, ensure_ascii=False)

with open("contratos2024.json", "w", encoding="utf-8") as json_file:
    json_file.write(json_output)

print("JSON criado com sucesso!")
