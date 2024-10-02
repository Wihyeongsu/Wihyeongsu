# 게임 방식
knight를 피해서 coin을 획득하여 오래버티는 게임

# AnimatedTurtle
- turtle에 sprites를 적용하기 위한 class

# Coin/CoinFactory
- 추가 점수를 위한 coin class
- coin을 관리하기 위한 coinfactory class

# player/enemy
- 각각의 animation을 관리하기 위한 class

# ai 구현
```python
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
```
- player의 방향을 계산해서 확률적으로 방향 전환, 전진