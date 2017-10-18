import turtle
import time
turtle.pensize(2)
turtle.bgcolor('black')
colors=['red','yellow','blue']
turtle.tracer(False)
for x in range(400):
	turtle.forward(2*x)
	turtle.color(colors[x%3])
	turtle.left(121)
turtle.tracer(True)
