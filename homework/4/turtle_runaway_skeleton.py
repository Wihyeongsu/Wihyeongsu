# This example is not working in Spyder directly (F5 or Run)
# Please type '!python turtle_runaway.py' on IPython console in your Spyder.
import turtle, random
import time

# sprite를 지원하지 않아서 gif 사용
class AnimatedTurtle(turtle.Turtle):
    def __init__(self, screen, gif_frames):
        super().__init__()
        self.screen = screen
        self.gif_frames = gif_frames
        self.current_frame = 0
        self.is_moving = False
        self.last_position = self.position()
        
        # 모든 GIF 프레임을 등록
        for frame in gif_frames:
            screen.addshape(frame)
        
        self.penup()
        self.animation_speed = 200  # 밀리초 단위

    def start_animation(self):
        self.animate()

# Coin turtle
class Coin(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)
    
# Item turtle
class Item(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)

# Player turtle
class Player(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)
        self.current_state = 0
        self.spawn_frames = self.gif_frames[0:4]
        self.idle_frames = self.gif_frames[4:8]
        self.attacked_frames = self.gif_frames[8:12]

        self.screen.ontimer(self.animate, self.animation_speed)

    def animate(self):
        current_position = self.position()
        self.is_moving = current_position != self.last_position
    
        # state에 따른 frames 변경
        if self.current_state == 0:
            self.gif_frames = self.spawn_frames
        elif self.current_state == 1:
            self.gif_frames = self.idle_frames
        elif self.current_state == 2:
            self.gif_frames = self.attacked_frames


        if self.is_moving: # 움직이는 동안 gif 재생
            self.shape(self.gif_frames[self.current_frame])
            self.current_frame = (self.current_frame + 1) % len(self.gif_frames)
        
        self.last_position = current_position
        self.screen.ontimer(self.animate, self.animation_speed)

    def start_animation(self):
        self.animate()


        
# Enemy turtle
class Enemy(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)

class RunawayGame:
    def __init__(self, canvas, runner, chaser, catch_radius=50):
        self.canvas = canvas
        self.runner = runner
        self.chaser = chaser
        self.catch_radius2 = catch_radius**2
        
        # Initialize 'runner' and 'chaser'

        # self.runner.shape(coin)
        # # self.runner.color('blue')
        # self.runner.penup()

        # self.chaser.shape(slime_green[0])
        # self.chaser.color('red')
        # self.chaser.penup()

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

class ManualMover(Player):
    def __init__(self, canvas, gif_frames, step_move=5, step_turn=5):
        super().__init__(canvas, gif_frames)
        self.step_move = step_move
        self.step_turn = step_turn
        self.is_moving = False

        # Register event handlers
        canvas.onkeypress(lambda: self.start_move_forward(), 'Up')
        canvas.onkeyrelease(lambda: self.stop_move(), 'Up')
        canvas.onkeypress(lambda: self.start_move_backward(), 'Down')
        canvas.onkeyrelease(lambda: self.stop_move(), 'Down')
        canvas.onkeypress(lambda: self.left(self.step_turn), 'Left')
        canvas.onkeypress(lambda: self.right(self.step_turn), 'Right')
        canvas.listen()

    def start_move_forward(self):
        self.is_moving = True
        self.move_forward()

    def start_move_backward(self):
        self.is_moving = True
        self.move_backward()
    
    def stop_move(self):
        self.is_moving = False

    def move_forward(self):
        if self.is_moving:
            self.forward(self.step_move)
            self.screen.ontimer(self.move_forward, 50)

    def move_backward(self):
        if self.is_moving:
            self.backward(self.step_move)
            self.screen.ontimer(self.move_backward, 50)

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
    images = "assets/images"

    # coin gif
    coin = []
    for n in range(0,12):
        coin.append(images + f"/coin/tile{n:03d}.gif")

    # slime_green gif
    slime_green = []
    for n in range(0,12):
        slime_green.append(images + f"/slime_green/tile{n:03d}.gif")
        
    # register gif
    for frame in coin + slime_green:
        screen.register_shape(frame)

    # TODO) Change the follows to your turtle if necessary
    runner = RandomMover(screen)
    chaser = ManualMover(screen, slime_green)
    chaser.start_animation()
    game = RunawayGame(screen, runner, chaser)
    game.start()
    screen.mainloop()
