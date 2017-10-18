diet = ['西红柿','花菜','牛排','虾仁','黄瓜']
for x in range(0,5):
 	for y in range(0,5):
 		if not(x ==y):
 			print('{}{}'.format(diet[x],diet[y]))
