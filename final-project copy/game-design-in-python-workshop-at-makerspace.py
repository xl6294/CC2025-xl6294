# Game Design in Python starter code

import pygame, random
from pygame.locals import *

# pygame setup
pygame.init()
width, height = 400, 400
screen = pygame.display.set_mode((width, height))
clock = pygame.time.Clock()
running = True


pygame.display.set_caption("Reaction Time Game")


duck = pygame.image.load("duck.png")
egg = pygame.image.load("egg.png")

duck_width, duck_height = 50, 50
duck = pygame.transform.scale(duck,(duck_width, duck_height))

egg_width, egg_height = 50, 50
egg = pygame.transform.scale(egg,(egg_width, egg_height))

# image positions
duck_x_pos, duck_y_pos = 0, height - duck_height
egg_x_pos, egg_y_pos = 50, 0

# speed
duck_speed = 1
egg_speed = 1

# Duck Movement
duck_movement = 0
    
score = 0
game_font = pygame.font.Font(None, 40)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            
        if event.type == pygame.KEYDOWN:
          if event.key == pygame.K_LEFT:
            duck_movement -= duck_speed
          if event.key == pygame.K_RIGHT:
            duck_movement += duck_speed
        if event.type == pygame.KEYUP:
          duck_movement = 0
      
    screen.fill("blue")
    
    # update the duck position
    # duck_x_pos += duck_speed
    duck_x_pos += duck_movement
    # check duck's position
    # if duck_x_pos <= 0 or duck_x_pos + duck_width >= width:
    #   duck_speed = -duck_speed
    if duck_x_pos < 0:
      duck_x_pos = 0
    elif duck_x_pos > width - duck_width:
      duck_x_pos = width - duck_width
    
    egg_rect = egg.get_rect()
    egg_rect.left, egg_rect.top = egg_x_pos, egg_y_pos
    
    duck_rect = duck.get_rect()
    duck_rect.left, duck_rect.top = duck_x_pos, duck_y_pos
    
    if pygame.Rect.colliderect(duck_rect, egg_rect):
      # print("collide")
      running = False
      
    score_text = game_font.render("Score: " + str(score), True, (255, 255, 255))
    screen.blit(score_text, (10,10))
    
    # display images
    screen.blit(duck,(duck_x_pos,duck_y_pos))
    screen.blit(egg,(egg_x_pos,egg_y_pos))

    # update egg position
    egg_y_pos += egg_speed
    if egg_y_pos > height:
      egg_y_pos = 0
      egg_x_pos = random.randint(0, width - egg_width)
      score += 1
      egg_speed *= 1.2

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()

# how do I remix this?