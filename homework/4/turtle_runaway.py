# This example is not working in Spyder directly (F5 or Run)
# Please type '!python turtle_runaway.py' on IPython console in your Spyder.
import turtle, random
import time

# sprites 기능 turtle
class AnimatedTurtle(turtle.Turtle):
    def __init__(self, screen, gif_frames):
        super().__init__()
        self.screen = screen
        self.current_frame = 0
        self.is_moving = False
        self.last_position = self.position()
        self.gif_frames = gif_frames

        # 모든 GIF 프레임을 등록
        for frame in gif_frames:
            screen.addshape(frame)

        self.penup()
        self.animation_speed = 300  # 밀리초 단위

    # state에 따른 frames 변경
    def change_frames(self):
        print("abstract")

    def animate(self):
        current_position = self.position()
        self.is_moving = current_position != self.last_position

        if self.is_moving: # 움직이는 동안 gif 재생
            self.run_animation()
        else:
            self.shape(self.gif_frames[0]) # 정지 시 첫 번째 frame으로 설정

        
        self.last_position = current_position
        self.screen.ontimer(self.animate, self.animation_speed)

    def run_animation(self):
        for frame in self.gif_frames:
            self.shape(frame)
            time.sleep(0.1)  # 각 프레임 사이에 0.1초 지연
        

    def start_animation(self):
        self.change_frames()
        self.animate()

# Coin turtle
class Coin(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)
        self.screen.ontimer(self.run_animation(), self.animation_speed)

    def animate(self):
        self.run_animation()     
        self.screen.ontimer(self.animate, self.animation_speed)

    

# coin manager
class CoinFactory:
    def __init__(self, screen, coin_frames, max_coins=2):
        self.screen = screen
        self.coin_frames = coin_frames
        self.max_coins = max_coins
        self.coins = []

    def create_coin(self):
        if len(self.coins) < self.max_coins:
            x = random.randint(-300, 300)
            y = random.randint(-300, 300)
            new_coin = Coin(self.screen, self.coin_frames)
            new_coin.goto(x, y)
            new_coin.start_animation()
            self.coins.append(new_coin)

    def remove_coin(self, coin):
        coin.hideturtle()
        self.coins.remove(coin)

    def check_collision(self, player):
        for coin in self.coins[:]:
            if player.distance(coin) < 20:  # Adjust this value based on your coin size
                self.remove_coin(coin)
                return True
        return False
    
    def clear(self):
        for coin in self.coins:
            coin.hideturtle()
        self.coins.clear()

# Item turtle
# class Item(AnimatedTurtle):
#     def __init__(self, screen, gif_frames):
#         super().__init__(screen, gif_frames)

# Player turtle
class Player(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)
        self.current_state = 0
        self.spawn_frames = self.gif_frames[0:4]
        self.idle_frames = self.gif_frames[4:8]
        self.hit_frames = self.gif_frames[8:12]
        self.gif_frames = self.spawn_frames

        # self.screen.ontimer(self.animate, self.animation_speed)

    # state에 따른 frames 변경
    def change_frames(self):
        if self.current_state == 0:
            self.gif_frames = self.spawn_frames
        elif self.current_state == 1:
            self.gif_frames = self.idle_frames
        elif self.current_state == 2:
            self.gif_frames = self.hit_frames

    def animate(self):
        current_position = self.position()
        self.is_moving = current_position != self.last_position

        if self.is_moving: # 움직이는 동안 gif 재생
            self.run_animation()
        else:
            self.shape(self.gif_frames[0]) # 정지 시 첫 번째 frame으로 설정

        
        self.last_position = current_position
        self.screen.ontimer(self.animate, self.animation_speed)

    def start_animation(self):
        # spawn animation
        self.run_animation()
        self.current_state = 1
        self.change_frames()
        self.animate()
        
# Enemy turtle
class Enemy(AnimatedTurtle):
    def __init__(self, screen, gif_frames):
        super().__init__(screen, gif_frames)
        self.current_state = 0
        self.idle_frames = self.gif_frames[0:4]
        self.run_frames = self.gif_frames[4:20]
        self.roll_frames = self.gif_frames[20:28]
        self.hit_frames = self.gif_frames[28:32]
        self.death_frames = self.gif_frames[32:36]
        self.gif_frames = self.idle_frames

        # self.screen.ontimer(self.animate, self.animation_speed)

    # state에 따른 frames 변경
    def change_frames(self):
        if self.current_state == 0:
            self.gif_frames = self.idle_frames
        elif self.current_state == 1:
            self.gif_frames = self.run_frames
        elif self.current_state == 2:
            self.gif_frames = self.roll_frames
        elif self.current_state == 3:
            self.gif_frames = self.hit_frames
        elif self.current_state == 4:
            self.gif_frames = self.death_frames

    def animate(self):
        current_position = self.position()
        self.is_moving = current_position != self.last_position

        if self.is_moving: # 움직이는 동안 gif 재생
            self.run_animation()
        else:
            # idle로 전환
            self.current_state = 0
            self.shape(self.gif_frames[0]) # 정지 시 첫 번째 frame으로 설정

        self.last_position = current_position
        if self.current_state != 4:
            self.screen.ontimer(self.animate, self.animation_speed)
        else:
            self.shape(self.gif_frames[3])

    def start_animation(self):
        self.change_frames()
        self.animate()

class RunawayGame:
    def __init__(self, canvas, enemy, player, coin_factory, catch_radius=30):
        self.canvas = canvas
        self.enemy = enemy
        self.player = player
        self.coin_factory = coin_factory
        self.catch_radius2 = catch_radius**2
        self.start_time = None
        self.coin_cnt = 0
        self.score = 0

        # Instantiate an another turtle for drawing
        # is_catched_drawer
        self.is_catched_drawer = turtle.RawTurtle(canvas)
        self.is_catched_drawer.hideturtle()
        self.is_catched_drawer.penup()

        # time_drawer
        self.time_drawer = turtle.RawTurtle(canvas)
        self.time_drawer.hideturtle()
        self.time_drawer.penup()

        # score drawer
        self.score_drawer = turtle.RawTurtle(canvas)
        self.score_drawer.hideturtle()
        self.score_drawer.penup()


    def is_catched(self):
        p = self.enemy.pos()
        q = self.player.pos()
        dx, dy = p[0] - q[0], p[1] - q[1]
        return dx**2 + dy**2 < self.catch_radius2

    def start(self, init_dist=400, ai_timer_msec=150):
        self.enemy.setpos((-init_dist / 2, 0))
        self.enemy.setheading(0)
        self.player.setpos((+init_dist / 2, 0))
        self.player.setheading(180)
        self.coin_factory


        # TODO) You can do something here and follows.
        self.ai_timer_msec = ai_timer_msec
        self.canvas.ontimer(self.step, self.ai_timer_msec)

        # game time
        self.start_time = time.time()

        self.score = 0

    def step(self):
        try:
            self.enemy.run_ai(self.player.pos(), self.player.heading())
            self.player.run_ai(self.enemy.pos(), self.enemy.heading())

            # coin 생성
            if random.random() < 0.1:
                self.coin_factory.create_coin()

            # TODO) You can do something here and follows.
            # draw is_catched
            is_catched = self.is_catched()
            self.is_catched_drawer.undo()
            self.is_catched_drawer.penup()
            self.is_catched_drawer.setpos(-300, 300)
            self.is_catched_drawer.write(f'Is catched? {is_catched}',font=('Arial', 12, 'normal'))

            # draw time
            self.elapsed_time = time.time() - self.start_time
            self.time_drawer.undo()
            self.time_drawer.penup()
            self.time_drawer.setpos(-300, 280)
            self.time_drawer.write(f'time: {self.elapsed_time:.2f}', font=('Arial', 12, 'normal'))

            # coin 충돌 검사
            if self.coin_factory.check_collision(player):
                print("collect coin")
                self.coin_cnt += 1


            # terminal
            if is_catched == True:
                self.end_game()
            else:
                # Note) The following line should be the last of this function to keep the game playing
                self.canvas.update()
                self.canvas.ontimer(self.step, self.ai_timer_msec)

        except turtle.Terminator:
            print("Game window was closed")
        except Exception as e:
            print(f"An error occurred: {e}")
            self.end_game()


    def end_game(self):
        try:
            # Clear existing drawings
            self.is_catched_drawer.clear()
            self.time_drawer.clear()
            self.score_drawer.clear()
            self.enemy.clear()
            self.player.clear()
            self.coin_factory.clear()

            # player hit animation
            self.player.current_state = 2
            self.player.change_frames()
            self.player.run_animation()

            # enemy death animation
            self.enemy.current_state = 4
            self.enemy.change_frames()
            self.enemy.run_animation()

            # calculate score
            self.score = self.elapsed_time * (100 + self.coin_cnt) / 100

            # Draw final score and time
            end_drawer = turtle.RawTurtle(self.canvas)
            end_drawer.hideturtle()
            end_drawer.penup()
            end_drawer.setpos(0, 0)
            end_drawer.write(f'Game Over!\nFinal Score: {self.score:.1f}\n', 
                            align='center', font=('Arial', 24, 'normal'))
            
            # Wait for 3 seconds before closing
            self.canvas.ontimer(turtle.bye, 3000)

        except Exception as e:
            print(f"Error during game end: {e}")

class ManualMover(Player):
    def __init__(self, canvas, gif_frames, step_move=2, step_turn=10):
        super().__init__(canvas, gif_frames)
        self.step_move = step_move
        self.step_turn = step_turn
        self.is_moving = False

        # Register event handlers
        canvas.onkeypress(lambda: self.forward(self.step_move), 'Up')
        canvas.onkeypress(lambda: self.backward(self.step_move), 'Down')
        canvas.onkeypress(lambda: self.left(self.step_turn), 'Left')
        canvas.onkeypress(lambda: self.right(self.step_turn), 'Right')
        canvas.listen()

    def run_ai(self, opp_pos, opp_heading):
        pass

class RandomMover(Enemy):
    def __init__(self, canvas, gif_frames, step_move=15, step_turn=20):
        super().__init__(canvas, gif_frames)
        self.step_move = step_move
        self.step_turn = step_turn

    def run_ai(self, opp_pos, opp_heading):
        # 상대방(player)의 위치로 향하는 각도 계산
        target_angle = self.towards(opp_pos)
        
        # 현재 각도와 목표 각도의 차이 계산
        angle_diff = target_angle - self.heading()
        
        # 각도 차이를 -180에서 180 사이로 조정
        if angle_diff > 180:
            angle_diff -= 360
        elif angle_diff < -180:
            angle_diff += 360

        # 랜덤 행동 결정 (60% 확률로 player 추적, 40% 확률로 랜덤 행동)
        if random.random() < 0.6:
            if angle_diff > 0:
                # player가 오른쪽에 있으면 오른쪽으로 회전
                self.right(angle_diff)
            else:
                # player가 왼쪽에 있으면 왼쪽으로 회전
                self.left(angle_diff)
        else:
            # 랜덤 행동
            mode = random.randint(0, 2)
            if mode == 0:
                self.forward(self.step_move)
            elif mode == 1: # run
                if self.current_state != 1:
                    self.current_state = 1
                    self.change_frames()
                # self.animate()
                self.forward(self.step_move * 2)
            elif mode == 2: # roll
                if self.current_state != 2:
                    self.current_state = 2
                    self.change_frames()
                # self.animate()
                self.forward(self.step_move * 10)


if __name__ == '__main__':
    # Use 'TurtleScreen' instead of 'Screen' to prevent an exception from the singleton 'Screen'
    screen = turtle.Screen()
    screen.setup(700, 700)
    screen.title("turtle runaway")
    screen.bgcolor("#136D15")
    images = "assets/images/"

    # coin gif
    coin = []
    for n in range(0,12):
        coin.append(images + f"coin/tile{n:03d}.gif")

    # slime_green gif
    slime_green = []
    images_slime_green = images + "slime_green/"
    for n in range(0,4):
        slime_green.append(images_slime_green + f"spawn/tile{n:03d}.gif")
    for n in range(0,4):
        slime_green.append(images_slime_green + f"idle/tile{n:03d}.gif")
    for n in range(0,4):
        slime_green.append(images_slime_green + f"hit/tile{n:03d}.gif")
        
    # knight gif
    knight = []
    images_knight = images + "knight/"
    for n in range(0,4):
        knight.append(images_knight + f"idle/tile{n:03d}.gif")
    for n in range(0,16):
        knight.append(images_knight + f"run/tile{n:03d}.gif")
    for n in range(0,8):
        knight.append(images_knight + f"roll/tile{n:03d}.gif")
    for n in range(0,4):
        knight.append(images_knight + f"hit/tile{n:03d}.gif")
    for n in range(0,4):
        knight.append(images_knight + f"death/tile{n:03d}.gif")

    # register gif
    for frame in coin + slime_green + knight:
        screen.register_shape(frame)


    # TODO) Change the follows to your turtle if necessary
    enemy = RandomMover(screen, knight)
    enemy.start_animation()
    player = ManualMover(screen, slime_green)
    player.start_animation()
    game = RunawayGame(screen, enemy, player, CoinFactory(screen, coin))
    game.start()
    screen.mainloop()
