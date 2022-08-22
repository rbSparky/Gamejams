import pygame
import chess
import chess.pgn
import os
import pickle
import sys

sys.setrecursionlimit(15000)

TILESIZE = 50
BOARD_POS = (10, 10)

def create_board_surf():
    board_surf = pygame.Surface((TILESIZE*8, TILESIZE*8))
    dark = False
    for y in range(8):
        for x in range(8):
            rect = pygame.Rect(x*TILESIZE, y*TILESIZE, TILESIZE, TILESIZE)
            pygame.draw.rect(board_surf, pygame.Color('darkgrey' if dark else 'beige'), rect)
            dark = not dark
        dark = not dark
    return board_surf

def get_square_under_mouse(board):
    mouse_pos = pygame.Vector2(pygame.mouse.get_pos()) - BOARD_POS
    x, y = [int(v // TILESIZE) for v in mouse_pos]
    try: 
        if x >= 0 and y >= 0: return (board[y][x], x, y)
    except IndexError: pass
    return None, None, None

def create_board():
    board = []
    for y in range(8):
        board.append([])
        for x in range(8):
            board[y].append(None)
    board[7][0] = ('white', 'wr') 
    board[7][1] = ('white', 'wn') 
    board[7][2] = ('white', 'wb') 
    board[7][3] = ('white', 'wq') 
    board[7][4] = ('white', 'wk') 
    board[7][5] = ('white', 'wb') 
    board[7][6] = ('white', 'wn') 
    board[7][7] = ('white', 'wr') 

    board[0][0] = ('black', 'br') 
    board[0][1] = ('black', 'bn') 
    board[0][2] = ('black', 'bb') 
    board[0][3] = ('black', 'bq') 
    board[0][4] = ('black', 'bk') 
    board[0][5] = ('black', 'bb') 
    board[0][6] = ('black', 'bn') 
    board[0][7] = ('black', 'br') 
    for x in range(0, 8):
        board[1][x] = ('black', 'bp')
    for x in range(0, 8):
        board[6][x] = ('white', 'wp') 
    for l in board:
        print(l)
    return board

def draw_pieces(screen, board, font, selected_piece):
    sx, sy = None, None
    if selected_piece:
        piece, sx, sy = selected_piece

    for y in range(8):
        for x in range(8): 
            piece = board[y][x]
            if piece:
                selected = x == sx and y == sy
                color, type = piece
                s1 = s2 = pygame.image.load(type+'.png')
                pos = pygame.Rect(BOARD_POS[0] + x * TILESIZE+1, BOARD_POS[1] + y * TILESIZE + 1, TILESIZE, TILESIZE)
                screen.blit(s2, s2.get_rect(center=pos.center).move(1, 1))
                screen.blit(s1, s1.get_rect(center=pos.center))

def draw_selector(screen, piece, x, y):
    if piece != None:
        rect = (BOARD_POS[0] + x * TILESIZE, BOARD_POS[1] + y * TILESIZE, TILESIZE, TILESIZE)
        pygame.draw.rect(screen, (255, 0, 0, 50), rect, 2)

def draw_drag(screen, board, selected_piece, font):
    if selected_piece:
        piece, x, y = get_square_under_mouse(board)
        if x != None:
            rect = (BOARD_POS[0] + x * TILESIZE, BOARD_POS[1] + y * TILESIZE, TILESIZE, TILESIZE)
            pygame.draw.rect(screen, (0, 255, 0, 50), rect, 2)

        color, type = selected_piece[0]
        s1 = pygame.image.load(type+'.png')
        s2 = pygame.image.load(type+'.png')
        pos = pygame.Vector2(pygame.mouse.get_pos())
        screen.blit(s2, s2.get_rect(center=pos + (1, 1)))
        screen.blit(s1, s1.get_rect(center=pos))
        selected_rect = pygame.Rect(BOARD_POS[0] + selected_piece[1] * TILESIZE, BOARD_POS[1] + selected_piece[2] * TILESIZE, TILESIZE, TILESIZE)
        pygame.draw.line(screen, pygame.Color('red'), selected_rect.center, pos)
        return (x, y)

def main():
    pygame.init()
    pygame.mixer.init()
    s = 'sound'
    move = pygame.mixer.Sound('move.ogg')
    captures = pygame.mixer.Sound('capture.ogg')
    font = pygame.font.SysFont('', 32)
    screen = pygame.display.set_mode((640, 480))
    board = create_board()
    board_surf = create_board_surf()
    clock = pygame.time.Clock()
    selected_piece = None
    drop_pos = None
    pos = "abcdefgh"
    d = dict()
    d1 = dict()
    for i in range(0, len(pos)):
        d[i] = pos[i]
        d1[pos[i]] = i
    turn = 0

    allboards = list()
    allboards.append(board)
    while True:
        piece, x, y = get_square_under_mouse(board)
        events = pygame.event.get()
        #s = eval(input('tell pls: '))


        for e in events:
            if e.type == pygame.QUIT:
                return
            if e.type == pygame.MOUSEBUTTONDOWN:
                if piece != None:
                    selected_piece = piece, x, y
                
            if e.type == pygame.MOUSEBUTTONUP:
                
                '''
                s1 = input('pls: ')
                if(len(s1) == 2):
                    s = (d1[s1[0]], 8-int(s1[1]))
                    if(turn == 0):
                        selected_piece = (('white', 'wp'), 4, 6)
                else:
                    s = (d1[s1[1]], 8-int(s1[2]))
                '''
                if drop_pos:
                    
                    
                    print(selected_piece)
                    if(selected_piece[0][1][1] != 'p'):
                        print(selected_piece[0][1][1].capitalize(), d[drop_pos[0]], 9-drop_pos[1]-1, sep = '')
                    else:
                        print(d[drop_pos[0]], 9-drop_pos[1]-1, sep = '')    
                    #selected_piece = (('white', 'wp'), 4, 6)
                    #drop_pos = s
                    piece, old_x, old_y = selected_piece
                    board[old_y][old_x] = 0
                    new_x, new_y = drop_pos
                    print(board[new_y][new_x])
                    if(board[new_y][new_x] != None and board[new_y][new_x] != 0):
                        pygame.mixer.Sound.play(captures)
                    else:
                        pygame.mixer.Sound.play(move)
                    board[new_y][new_x] = piece
                    allboards.append(board)
                selected_piece = None
                drop_pos = None

        screen.fill(pygame.Color('grey'))
        screen.blit(board_surf, BOARD_POS)
        draw_pieces(screen, board, font, selected_piece)
        draw_selector(screen, piece, x, y)
        drop_pos = draw_drag(screen, board, selected_piece, font)

        #print(drop_pos)

        pygame.display.flip()
        #clock.tick(60)
        #print(allboards)

def setup():

    f = open('pgns.dat', 'rb')
    d = dict()
    try:
        d = pickle.load(f)
    except:
        print('PYTHON IS DUMB')
    print(d)

    
    board = d['Kasparov'][0].board()
    print(d['Kasparov'][0].headers["Black"])
    for move in d['Kasparov'][0].mainline_moves():
        board.push(move)
        #print(board, '\n\n\n\n')
    print(board)
    
    f.close()

def setup2():
    f = open('pgns.dat', 'rb')
    l = list()
    datt = list()
    
    try:
        l = pickle.load(f)
    except:
        print('PYTHON IS DUMB')
    print(l)

    datt.append(l)
    
    board = l[0].board()
    print(l[0].headers["Black"])
    for move in l[0].mainline_moves():
        board.push(move)
        #print(board, '\n\n\n\n')
    print(board)
    try:
        l = pickle.load(f)
    except:
        print('PYTHON IS DUMB')
    print(l)

    datt.append(l)
    
    board = l[0].board()
    print(l[0].headers["White"])
    for move in l[0].mainline_moves():
        board.push(move)
        #print(board, '\n\n\n\n')
    print(board)
    f.close()

    d = dict()
    d['Fischer, Robert James'] = datt[0]
    d['Karpov, Anatoly'] = datt[1]
    f = open('pgns.dat', 'wb')
    pickle.dump(d, f)
    f.close()

    f = open('pgns.dat', 'rb')
    try:
        d2 = pickle.load(f)
    except:
        pass
    print(d2)
    
    board = d['Fischer, Robert James'][0].board()
    for move in d['Fischer, Robert James'][0].mainline_moves():
        board.push(move)
        #print(board, '\n\n\n\n')
    print(board)
    f.close()

def setop0():
    f = open('pgns.dat', 'rb')
    d = pickle.load(f)
    f.close()
    f = open('pgns.dat', 'wb')
    pgn = open("Kasparov.pgn")
    games = []
    i = 0

    
    try:
        for i in range(2110):
            temp = chess.pgn.read_game(pgn)
            games.append(temp)
            print(i)
            i += 1
    except:
        print('done')
        
    print(games)
    d['Kasparov'] = games
    pickle.dump(d, f)
    f.close()


def setup011():
    f = open('pgns.dat', 'rb')
    d = dict()
    try:
        d = pickle.load(f)
    except:
        pass
    print(d)
    print(d['Kasparov'][0].headers["Black"])
    print(d['Kasparov'][0].headers["White"])
    board = d['Kasparov'][0].board()
    for move in d['Kasparov'][0].mainline_moves():
        board.push(move)
        print(board, '\n\n\n\n')
    print(board)
    f.close()


def setup012():
    f = open('pgns.dat', 'rb')
    ddd = dict()
    try:
        ddd = pickle.load(f)
    except:
        pass
    players = list(ddd.keys())
    print('choose player')
    ch = int(input(players))
    ch2 = int(input('choose game number '))
    print(ddd[players[ch]][ch2].headers["Black"])
    print(ddd[players[ch]][ch2].headers["White"])
    bboard = ddd[players[ch]][ch2].board()

    pygame.init()
    pygame.mixer.init()
    s = 'sound'
    move = pygame.mixer.Sound('move.ogg')
    captures = pygame.mixer.Sound('capture.ogg')
    font = pygame.font.SysFont('', 32)
    screen = pygame.display.set_mode((640, 480))
    board = create_board()
    board_surf = create_board_surf()

    clock = pygame.time.Clock()
    selected_piece = None
    drop_pos = None
    pos = "abcdefgh"
    d = dict()
    d1 = dict()
    for i in range(0, len(pos)):
        d[i] = pos[i]
        d1[pos[i]] = i
    turn = 0
  
    while True:
        piece, x, y = get_square_under_mouse(board)
        events = pygame.event.get()

        for move in ddd[players[ch]][ch2].mainline_moves():
            bboard.push(move)
            print(bboard, '\n\n\n\n')
            temppp = input()
        
        for e in events:
            if e.type == pygame.QUIT:
                return
       
        screen.fill(pygame.Color('grey'))
        screen.blit(board_surf, BOARD_POS)
        draw_pieces(screen, board, font, selected_piece)
        draw_selector(screen, piece, x, y)
        drop_pos = draw_drag(screen, board, selected_piece, font)

        #print(drop_pos)

        pygame.display.flip()

        
    


if __name__ == '__main__':
    #main()
    main()

