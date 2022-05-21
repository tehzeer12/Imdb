import pandas as pd

df = pd.read_csv('movie_metadata (1).csv')

final = pd.DataFrame(df, columns = ['actor_2_name', 'genres','actor_1_name','actor_3_name','movie_title','plot_keywords','title_year'])

print(final)
# final = df["actor_2_name"]
# final = df["actor_2_name"]
# final = df["actor_2_name"]
# final = df["actor_2_name"]
# final = df["actor_2_name"]
# final = df["actor_2_name"]


