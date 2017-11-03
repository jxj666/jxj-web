import turtle
def drawSnake(rad,angle,len,neckrad):
	for i in range(len):
		turtle.circle(rad,angle)
		turtle.circle(-rad,angle)
	turtle.circle(rad,angle/2)
	turtle.fd(rad)
	turtle.circle(neckrad+1,180)
	turtle.fd(rad*2s/3)
def main():
	turtle.setup(1000,200,0,0)
	pythonsize=3
	turtle.pensize(pythonsize)
	turtle.pencolor('blue')
	turtle.seth(-70)
	drawSnake(7,140,5,pythonsize/2)
main()

