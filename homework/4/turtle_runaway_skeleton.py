# This example is not working in Spyder directly (F5 or Run)
# Please type '!python turtle_runaway.py' on IPython console in your Spyder.
import tkinter as tk
import turtle, random
import time

class RunawayGame:
    def __init__(self, canvas, runner, chaser, catch_radius=50):
        self.canvas = canvas
        self.runner = runner
        self.chaser = chaser
        self.catch_radius2 = catch_radius**2
        
        # Initialize 'runner' and 'chaser'

        self.runner.shape(coin)
        # self.runner.color('blue')
        self.runner.penup()

        self.chaser.shape('turtle')
        self.chaser.color('red')
        self.chaser.penup()

        # Instantiate an another turtle for drawing
        # is_catched_drawer
        self.is_catched_drawer = turtle.RawTurtle(canvas)
        self.is_catched_drawer.hideturtle()
        self.is_catched_drawer.penup()

        # time_drawer
        self.time_drawer = turtle.RawTurtle(canvas)
        self.time_drawer.hideturtle()
        self.time_drawer.penup()

    def is_catched(self):
        p = self.runner.pos()
        q = self.chaser.pos()
        dx, dy = p[0] - q[0], p[1] - q[1]
        return dx**2 + dy**2 < self.catch_radius2

    def start(self, init_dist=400, ai_timer_msec=100):
        self.runner.setpos((-init_dist / 2, 0))
        self.runner.setheading(0)
        self.chaser.setpos((+init_dist / 2, 0))
        self.chaser.setheading(180)

        # TODO) You can do something here and follows.
        self.ai_timer_msec = ai_timer_msec
        self.canvas.ontimer(self.step, self.ai_timer_msec)

        # game time
        self.start_time = time.time()

    def step(self):
        self.runner.run_ai(self.chaser.pos(), self.chaser.heading())
        self.chaser.run_ai(self.runner.pos(), self.runner.heading())

        # TODO) You can do something here and follows.
        # draw is_catched
        is_catched = self.is_catched()
        self.is_catched_drawer.undo()
        self.is_catched_drawer.penup()
        self.is_catched_drawer.setpos(-300, 300)
        self.is_catched_drawer.write(f'Is catched? {is_catched}')

        # draw time
        elapsed_time = time.time() - self.start_time
        self.time_drawer.undo()
        self.time_drawer.penup()
        self.time_drawer.setpos(-300, 290)
        self.time_drawer.write(f'time: {elapsed_time:.2f}')


        # Note) The following line should be the last of this function to keep the game playing
        self.canvas.ontimer(self.step, self.ai_timer_msec)

class ManualMover(turtle.RawTurtle):
    def __init__(self, canvas, step_move=10, step_turn=10):
        super().__init__(canvas)
        self.step_move = step_move
        self.step_turn = step_turn

        # Register event handlers
        canvas.onkeypress(lambda: self.forward(self.step_move), 'Up')
        canvas.onkeypress(lambda: self.backward(self.step_move), 'Down')
        canvas.onkeypress(lambda: self.left(self.step_turn), 'Left')
        canvas.onkeypress(lambda: self.right(self.step_turn), 'Right')
        canvas.listen()

    def run_ai(self, opp_pos, opp_heading):
        pass

class RandomMover(turtle.RawTurtle):
    def __init__(self, canvas, step_move=10, step_turn=10):
        super().__init__(canvas)
        self.step_move = step_move
        self.step_turn = step_turn

    def run_ai(self, opp_pos, opp_heading):
        mode = random.randint(0, 2)
        if mode == 0:
            self.forward(self.step_move)
        elif mode == 1:
            self.left(self.step_turn)
        elif mode == 2:
            self.right(self.step_turn)

if __name__ == '__main__':
    # Use 'TurtleScreen' instead of 'Screen' to prevent an exception from the singleton 'Screen'
    screen = turtle.Screen()
    screen.setup(700, 700)
    screen.title("tlqkf")
    # screen.bgcolor("")
    screen.register_shape("/workspace/Wihyeongsu/homework/4/assets/gif/coin.gif")
    coin = "/workspace/Wihyeongsu/homework/4/assets/gif/coin.gif"
    turtle.addshape(coin)

    # TODO) Change the follows to your turtle if necessary
    runner = RandomMover(screen)
    chaser = ManualMover(screen)




    game = RunawayGame(screen, runner, chaser)
    game.start()
    screen.mainloop()
