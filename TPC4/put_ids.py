import json

def put_ids(movies):
    id = 1
    for movie in movies:
        print(movie)
        movie['id'] = id
        id += 1
    return movies

with open("cinema.json", 'r',encoding='utf-8') as file:
    movies = json.load(file)

movies_ids = put_ids(movies['Filmes'])

# Write the updated data back to the file
with open("cinema.json", 'w',encoding='utf-8') as file:
    json.dump(movies_ids, file, indent=4,ensure_ascii=False)
