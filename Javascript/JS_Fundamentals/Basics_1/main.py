

# x = [4, 6, 1, 3, 5, 7, 25]

# for i in x: 
#     stars = '*' * i
#     print stars

x = [4, "Tom", 1, "Michael", 5, 7, "Jimmy Smith"]

for i in x:
    if type(i) == str:
        i = i.lower()
        output = i[0] * len(i)
        print output
    else:
        stars = '*' * i
