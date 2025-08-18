#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
XP狼人杀 - Python服务器
替代Node.js实现，提供完整的游戏后端服务
"""

import json
import os
import uuid
import bcrypt
import sqlite3
import asyncio
import signal
import sys
import random
import secrets
import time
import hashlib
from datetime import datetime, timedelta
from typing import Optional, Dict, List, Any
import socketio
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import jwt
from pydantic import BaseModel

# 导入配置
from config import (
    SERVER_CONFIG, SECURITY_CONFIG, DATABASE_CONFIG, DIRECTORY_CONFIG, 
    GAME_CONFIG, CORS_CONFIG, SOCKETIO_CONFIG,
    PORT, HOST, JWT_SECRET, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES,
    PLAYERS_DIR, DATABASE_DIR, DATABASE_FILE,
    get_database_dir, get_database_path, get_players_dir, 
    get_frontend_file_path
)

# 初始化随机数生成器以确保更好的随机性
random.seed()
# 使用系统时间和随机数增强随机性
import time
random.seed(int(time.time() * 1000000) % (2**32))

# 创建FastAPI应用
app = FastAPI(title="XP狼人杀服务器")

# CORS设置
app.add_middleware(
    CORSMiddleware,
    **CORS_CONFIG
)

# Socket.IO服务器
sio = socketio.AsyncServer(**SOCKETIO_CONFIG)
socket_app = socketio.ASGIApp(sio, app)

# 数据库初始化
def ensure_database_dir():
    """确保数据库目录存在"""
    db_dir = get_database_dir()
    if not os.path.exists(db_dir):
        os.makedirs(db_dir)
    return db_dir

def get_db_path():
    """获取数据库文件路径"""
    return get_database_path()

def init_database():
    """初始化SQLite文件数据库"""
    db_path = get_db_path()
    print(f"数据库路径: {db_path}")
    
    # 检查数据库文件是否已存在
    db_exists = os.path.exists(db_path)
    
    conn = sqlite3.connect(db_path, check_same_thread=False)
    cursor = conn.cursor()
    
    # 启用SQLite性能优化
    sqlite_settings = DATABASE_CONFIG["SQLITE_SETTINGS"]
    cursor.execute(f"PRAGMA journal_mode={sqlite_settings['journal_mode']}")
    cursor.execute(f"PRAGMA synchronous={sqlite_settings['synchronous']}")
    cursor.execute(f"PRAGMA cache_size={sqlite_settings['cache_size']}")
    cursor.execute(f"PRAGMA temp_store={sqlite_settings['temp_store']}")
    cursor.execute(f"PRAGMA mmap_size={sqlite_settings['mmap_size']}")
    
    # 如果数据库文件不存在，创建表
    if not db_exists:
        print("创建数据库表...")
        # 创建表
        tables = [
            """CREATE TABLE users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )""",
            
            """CREATE TABLE rooms (
                id TEXT PRIMARY KEY,
                code TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                owner_id TEXT NOT NULL,
                status TEXT DEFAULT 'waiting',
                max_players INTEGER DEFAULT 8,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (owner_id) REFERENCES users (id)
            )""",
            
            """CREATE TABLE room_members (
                id TEXT PRIMARY KEY,
                room_id TEXT NOT NULL,
                user_id TEXT NOT NULL,
                is_ready BOOLEAN DEFAULT FALSE,
                joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (room_id) REFERENCES rooms (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            )""",
            
            """CREATE TABLE games (
                id TEXT PRIMARY KEY,
                room_id TEXT NOT NULL,
                status TEXT DEFAULT 'submitting_xp',
                round INTEGER DEFAULT 1,
                public_xp TEXT,
                winner TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (room_id) REFERENCES rooms (id)
            )""",
            
            """CREATE TABLE game_players (
                id TEXT PRIMARY KEY,
                game_id TEXT NOT NULL,
                user_id TEXT NOT NULL,
                is_wolf BOOLEAN NOT NULL,
                is_alive BOOLEAN DEFAULT TRUE,
                xp_content TEXT,
                FOREIGN KEY (game_id) REFERENCES games (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            )""",
            
            """CREATE TABLE votes (
                id TEXT PRIMARY KEY,
                game_id TEXT NOT NULL,
                voter_id TEXT NOT NULL,
                target_id TEXT NOT NULL,
                round INTEGER NOT NULL,
                vote_type TEXT DEFAULT 'day',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (game_id) REFERENCES games (id),
                FOREIGN KEY (voter_id) REFERENCES users (id),
                FOREIGN KEY (target_id) REFERENCES users (id)
            )"""
        ]
        
        for table_sql in tables:
            cursor.execute(table_sql)
        
        conn.commit()
        print("数据库表创建完成")
    else:
        print("数据库文件已存在，跳过表创建")
    
    print("数据库初始化完成")
    return conn

def get_db_connection():
    """获取数据库连接"""
    db_path = get_db_path()
    conn = sqlite3.connect(db_path, check_same_thread=False)
    
    # 启用SQLite性能优化
    cursor = conn.cursor()
    sqlite_settings = DATABASE_CONFIG["SQLITE_SETTINGS"]
    cursor.execute(f"PRAGMA journal_mode={sqlite_settings['journal_mode']}")
    cursor.execute(f"PRAGMA synchronous={sqlite_settings['synchronous']}")
    cursor.execute(f"PRAGMA cache_size={sqlite_settings['cache_size']}")
    cursor.execute(f"PRAGMA temp_store={sqlite_settings['temp_store']}")
    cursor.execute(f"PRAGMA mmap_size={sqlite_settings['mmap_size']}")
    
    return conn

def close_db_connection():
    """关闭数据库连接"""
    global db
    if db:
        db.close()
        print("数据库连接已关闭")

# 玩家数据管理
def ensure_players_dir():
    """确保players目录存在"""
    players_dir = get_players_dir()
    if not os.path.exists(players_dir):
        os.makedirs(players_dir)
    return players_dir

def get_player_file_path(username: str) -> str:
    """获取玩家数据文件路径"""
    return os.path.join(get_players_dir(), f"{username}.json")

def load_player(username: str) -> Optional[Dict]:
    """加载玩家数据"""
    try:
        file_path = get_player_file_path(username)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None
    except Exception as e:
        print(f"Error loading player {username}: {e}")
        return None

def load_all_users_to_database():
    """启动时将所有用户文件加载到数据库中"""
    print("开始加载用户数据到数据库...")
    cursor = db.cursor()
    
    try:
        players_dir = ensure_players_dir()
        loaded_count = 0
        
        for filename in os.listdir(players_dir):
            if filename.endswith('.json'):
                username = filename[:-5]  # 移除.json后缀
                player_data = load_player(username)
                
                if player_data and 'id' in player_data and 'username' in player_data and 'password' in player_data:
                    # 检查数据库中是否已存在该用户
                    cursor.execute("SELECT id FROM users WHERE username = ?", (username,))
                    existing_user = cursor.fetchone()
                    
                    if not existing_user:
                        # 插入用户到数据库
                        try:
                            cursor.execute(
                                "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
                                (player_data["id"], player_data["username"], player_data["password"])
                            )
                            loaded_count += 1
                            print(f"已加载用户: {username}")
                        except Exception as e:
                            print(f"加载用户 {username} 失败: {e}")
                    else:
                        print(f"用户 {username} 已存在于数据库中，跳过")
                else:
                    print(f"用户文件 {filename} 数据不完整，跳过")
        
        db.commit()
        print(f"用户数据加载完成，共加载 {loaded_count} 个用户")
        
    except Exception as e:
        print(f"加载用户数据时发生错误: {e}")
        db.rollback()

# 全局数据库连接
db = init_database()

# 启动时加载所有用户数据
load_all_users_to_database()

def save_player(username: str, data: Dict) -> bool:
    """保存玩家数据"""
    try:
        players_dir = ensure_players_dir()
        file_path = get_player_file_path(username)
        
        # 确保数据包含必要字段
        default_data = {
            "username": username,
            "password": "",
            "total_games": 0,
            "wins": 0,
            "losses": 0,
            "created_at": datetime.now().isoformat(),
            "last_login": datetime.now().isoformat()
        }
        
        # 合并数据
        player_data = {**default_data, **data}
        player_data["last_login"] = datetime.now().isoformat()
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(player_data, f, ensure_ascii=False, indent=2)
        
        return True
    except Exception as e:
        print(f"Error saving player {username}: {e}")
        return False

def update_player_stats(username: str, won: bool = False) -> bool:
    """更新玩家统计数据"""
    try:
        player_data = load_player(username)
        if not player_data:
            print(f"无法加载玩家数据: {username}")
            return False
        
        # 增加总游戏局数
        old_total = player_data.get("total_games", 0)
        old_wins = player_data.get("wins", 0)
        old_losses = player_data.get("losses", 0)
        
        player_data["total_games"] = old_total + 1
        
        if won:
            player_data["wins"] = old_wins + 1
        else:
            player_data["losses"] = old_losses + 1
        
        print(f"玩家 {username} 统计更新: 总局数 {old_total} -> {player_data['total_games']}, 胜利 {old_wins} -> {player_data['wins']}, 失败 {old_losses} -> {player_data['losses']}")
        
        result = save_player(username, player_data)
        if result:
            print(f"玩家 {username} 统计保存成功")
        else:
            print(f"玩家 {username} 统计保存失败")
        return result
    except Exception as e:
        print(f"Error updating player stats {username}: {e}")
        return False

def list_players() -> List[Dict]:
    """列出所有玩家"""
    try:
        players_dir = ensure_players_dir()
        players = []
        for filename in os.listdir(players_dir):
            if filename.endswith('.json'):
                username = filename[:-5]  # 移除.json后缀
                player_data = load_player(username)
                if player_data:
                    players.append(player_data)
        return players
    except Exception as e:
        print(f"Error listing players: {e}")
        return []

# 认证相关
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    """验证JWT令牌"""
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="访问令牌已过期")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="访问令牌无效")

# 数据模型
class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class RoomReady(BaseModel):
    room_id: str

class RoomLeave(BaseModel):
    room_id: str

class RoomStart(BaseModel):
    room_id: str

class XPSubmit(BaseModel):
    game_id: str
    xp_content: str

class GameVote(BaseModel):
    game_id: str
    target_id: str

class GameExit(BaseModel):
    game_id: str

# 工具函数
def generate_room_code() -> str:
    """生成随机房间号"""
    return str(random.randint(1000, 9999))

def generate_xp_content() -> str:
    """生成狼人杀XP内容"""
    return random.choice(GAME_CONFIG["XP_CONTENTS"])

def shuffle_roles(player_count: int) -> List[bool]:
    """
    改进的角色分配函数，确保真正的随机性
    返回角色列表，True表示狼人，False表示村民
    """
    wolf_count = max(1, int(player_count * GAME_CONFIG["WOLF_RATIO"]))
    
    if GAME_CONFIG.get("DEBUG_ROLE_ASSIGNMENT", False):
        print(f"玩家总数: {player_count}, 狼人数: {wolf_count}, 村民数: {player_count - wolf_count}")
    
    # 创建角色列表
    roles = [True] * wolf_count + [False] * (player_count - wolf_count)
    
    # 多层随机化策略，确保极高的随机性
    import time
    import hashlib
    
    # 1. 使用高精度时间、进程ID和随机数创建随机种子
    current_microseconds = int(time.time() * 1000000)
    process_id = os.getpid()
    random_bytes = secrets.token_bytes(16)
    
    # 创建复合种子
    seed_string = f"{current_microseconds}_{process_id}_{random_bytes.hex()}_{player_count}"
    seed_hash = hashlib.sha256(seed_string.encode()).hexdigest()
    seed_value = int(seed_hash[:8], 16)  # 取前8个十六进制字符作为种子
    
    # 2. 重新初始化随机数生成器
    random.seed(seed_value)
    
    # 3. 使用 secrets 模块进行第一轮打乱
    for i in range(len(roles)):
        j = secrets.randbelow(len(roles))
        roles[i], roles[j] = roles[j], roles[i]
    
    # 4. 使用标准 random 进行多轮打乱
    for round_num in range(3):  # 进行3轮打乱
        random.shuffle(roles)
        
        # 每轮中再进行手动交换
        for _ in range(player_count * 2):  # 交换次数与玩家数成比例
            i = random.randint(0, len(roles) - 1)
            j = random.randint(0, len(roles) - 1)
            roles[i], roles[j] = roles[j], roles[i]
    
    # 5. 最后使用时间戳进行额外打乱
    final_time = int(time.time() * 1000000) % 1000
    for _ in range(final_time % 20 + 10):  # 10-29次额外交换
        i = secrets.randbelow(len(roles))
        j = secrets.randbelow(len(roles))
        roles[i], roles[j] = roles[j], roles[i]
    
    # 验证角色分配（仅在调试模式下显示）
    if GAME_CONFIG.get("DEBUG_ROLE_ASSIGNMENT", False):
        wolf_assigned = sum(roles)
        wolf_positions = [i for i, is_wolf in enumerate(roles) if is_wolf]
        print(f"角色分配完成: 狼人 {wolf_assigned} 人, 村民 {len(roles) - wolf_assigned} 人")
        print(f"狼人位置: {wolf_positions}")
        print(f"角色序列: {['狼人' if r else '村民' for r in roles]}")
        print(f"种子值: {seed_value} (基于时间: {current_microseconds})")
    
    return roles

# 健康检查和基础API
@app.get("/api/health")
async def health_check():
    """健康检查"""
    return {"status": "ok", "message": "服务器运行正常"}

@app.get("/api/status")
async def get_status():
    """获取服务器状态"""
    cursor = db.cursor()
    
    # 统计数据
    cursor.execute("SELECT COUNT(*) FROM users")
    user_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM rooms WHERE status = 'waiting'")
    waiting_rooms = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM games WHERE status != 'finished'")
    active_games = cursor.fetchone()[0]
    
    return {
        "status": "running",
        "stats": {
            "total_users": user_count,
            "waiting_rooms": waiting_rooms,
            "active_games": active_games
        }
    }

# API路由

@app.post("/api/auth/register")
async def register(user_data: UserRegister):
    """用户注册"""
    if not user_data.username or not user_data.password:
        raise HTTPException(status_code=400, detail="用户名和密码不能为空")
    
    # 检查用户是否已存在（文件和数据库两处检查）
    existing_user = load_player(user_data.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="用户名已存在")
    
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (user_data.username,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="用户名已存在")
    
    # 创建新用户
    user_id = str(uuid.uuid4())
    hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user_info = {
        "id": user_id,
        "username": user_data.username,
        "password": hashed_password,
        "total_games": 0,
        "wins": 0,
        "losses": 0
    }
    
    # 保存到文件
    if not save_player(user_data.username, user_info):
        raise HTTPException(status_code=500, detail="创建用户失败")
    
    # 保存到数据库
    try:
        cursor.execute(
            "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
            (user_id, user_data.username, hashed_password)
        )
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail="数据库创建用户失败")
    
    # 生成JWT令牌
    token = jwt.encode({"id": user_id, "username": user_data.username}, JWT_SECRET, algorithm="HS256")
    
    return {
        "token": token,
        "user": {"id": user_id, "username": user_data.username, "nickname": user_data.username}
    }

@app.post("/api/auth/login")
async def login(user_data: UserLogin):
    """用户登录"""
    if not user_data.username or not user_data.password:
        raise HTTPException(status_code=400, detail="用户名和密码不能为空")
    
    # 加载用户数据（优先从文件读取）
    user = load_player(user_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="用户不存在")
    
    # 验证密码
    if not bcrypt.checkpw(user_data.password.encode('utf-8'), user["password"].encode('utf-8')):
        raise HTTPException(status_code=400, detail="密码错误")
    
    # 确保用户也存在于数据库中
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (user_data.username,))
    db_user = cursor.fetchone()
    if not db_user:
        # 如果数据库中不存在，插入用户信息
        try:
            print(f"登录时同步用户到数据库: id={user['id']}, username={user['username']}")
            cursor.execute(
                "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
                (user["id"], user["username"], user["password"])
            )
            db.commit()
            print(f"用户数据已同步到数据库")
            
            # 验证插入结果
            cursor.execute("SELECT * FROM users WHERE username = ?", (user_data.username,))
            verify_user = cursor.fetchone()
            print(f"验证用户数据: {verify_user}")
        except Exception as e:
            print(f"同步用户到数据库失败: {e}")
            pass  # 可能已存在，忽略错误
    else:
        print(f"用户已存在于数据库中: {db_user}")
    
    # 更新最后登录时间
    save_player(user_data.username, user)
    
    # 生成JWT令牌
    token = jwt.encode({"id": user["id"], "username": user["username"]}, JWT_SECRET, algorithm="HS256")
    
    return {
        "token": token,
        "user": {"id": user["id"], "username": user["username"], "nickname": user["username"]}
    }

@app.get("/api/user/profile")
async def get_profile(current_user: Dict = Depends(verify_token)):
    """获取用户信息"""
    user = load_player(current_user["username"])
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    
    return {
        "id": user["id"],
        "username": user["username"],
        "nickname": user["username"],
        "total_games": user.get("total_games", 0),
        "wins": user.get("wins", 0),
        "losses": user.get("losses", 0)
    }

@app.get("/api/user/stats")
async def get_stats(current_user: Dict = Depends(verify_token)):
    """获取所有玩家统计"""
    players = list_players()
    stats = []
    for player in players:
        total_games = player.get("total_games", 0)
        wins = player.get("wins", 0)
        win_rate = (wins / total_games * 100) if total_games > 0 else 0
        
        stats.append({
            "username": player["username"],
            "total_games": total_games,
            "wins": wins,
            "losses": player.get("losses", 0),
            "win_rate": f"{win_rate:.1f}"
        })
    
    # 按总游戏局数排序
    stats.sort(key=lambda x: x["total_games"], reverse=True)
    return stats

# 房间管理API
@app.get("/api/rooms")
async def list_rooms(current_user: Dict = Depends(verify_token)):
    """获取房间列表"""
    cursor = db.cursor()
    
    cursor.execute("""
        SELECT r.*, u.username as owner_nickname,
               COUNT(rm.user_id) as member_count
        FROM rooms r
        JOIN users u ON r.owner_id = u.id
        LEFT JOIN room_members rm ON r.id = rm.room_id
        WHERE r.status = 'waiting'
        GROUP BY r.id, r.code, r.name, r.owner_id, r.status, r.max_players, r.created_at, u.username
        ORDER BY r.created_at DESC
    """)
    rooms = cursor.fetchall()
    
    rooms_data = []
    for room in rooms:
        rooms_data.append({
            "id": room[0],
            "code": room[1],
            "name": room[2],
            "owner_id": room[3],
            "status": room[4],
            "max_players": room[5],
            "created_at": room[6],
            "owner_nickname": room[7],
            "member_count": room[8]
        })
    
    return {"rooms": rooms_data}

@app.post("/api/room/create")
async def create_room(current_user: Dict = Depends(verify_token)):
    """创建房间"""
    room_id = str(uuid.uuid4())
    room_code = generate_room_code()
    room_name = f"{current_user['username']}的房间"
    
    print(f"创建房间: room_id={room_id}, room_code={room_code}, owner_id={current_user['id']}")
    
    cursor = db.cursor()
    try:
        # 创建房间
        cursor.execute(
            "INSERT INTO rooms (id, code, name, owner_id) VALUES (?, ?, ?, ?)",
            (room_id, room_code, room_name, current_user["id"])
        )
        print(f"房间数据已插入数据库")
        
        # 房主自动加入房间
        member_id = str(uuid.uuid4())
        cursor.execute(
            "INSERT INTO room_members (id, room_id, user_id, is_ready) VALUES (?, ?, ?, ?)",
            (member_id, room_id, current_user["id"], True)
        )
        print(f"房主已加入房间")
        
        db.commit()
        print(f"数据库提交成功")
        
        # 验证插入结果
        cursor.execute("SELECT * FROM rooms WHERE code = ?", (room_code,))
        verify_room = cursor.fetchone()
        print(f"验证房间数据: {verify_room}")
        
        # 通知房间更新
        await notify_room_update(room_code, 'room_created')
        
        return {"room_code": room_code}
    
    except Exception as e:
        print(f"创建房间失败: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="创建房间失败")

@app.post("/api/room/join/{code}")
async def join_room(code: str, current_user: Dict = Depends(verify_token)):
    """加入房间"""
    cursor = db.cursor()
    
    # 检查房间是否存在
    cursor.execute("SELECT * FROM rooms WHERE code = ? AND status = 'waiting'", (code,))
    room = cursor.fetchone()
    if not room:
        raise HTTPException(status_code=404, detail="房间不存在或已开始游戏")
    
    room_id = room[0]
    
    # 检查是否已在房间中
    cursor.execute("SELECT * FROM room_members WHERE room_id = ? AND user_id = ?", (room_id, current_user["id"]))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="您已在房间中")
    
    # 检查房间人数
    cursor.execute("SELECT COUNT(*) FROM room_members WHERE room_id = ?", (room_id,))
    count = cursor.fetchone()[0]
    if count >= room[5]:  # max_players
        raise HTTPException(status_code=400, detail="房间已满")
    
    # 加入房间
    try:
        member_id = str(uuid.uuid4())
        cursor.execute(
            "INSERT INTO room_members (id, room_id, user_id) VALUES (?, ?, ?)",
            (member_id, room_id, current_user["id"])
        )
        db.commit()
        
        # 通知房间更新
        cursor.execute("SELECT code FROM rooms WHERE id = ?", (room_id,))
        room_code = cursor.fetchone()[0]
        await notify_room_update(room_code, 'user_joined')
        
        return {"message": "成功加入房间"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="加入房间失败")

@app.get("/api/room/info/{code}")
async def get_room_info(code: str, current_user: Dict = Depends(verify_token)):
    """获取房间信息"""
    print(f"查询房间信息: code={code}")
    
    cursor = db.cursor()
    
    # 先查看数据库中所有房间
    cursor.execute("SELECT * FROM rooms")
    all_rooms = cursor.fetchall()
    print(f"数据库中的所有房间: {all_rooms}")
    
    # 查看数据库中所有用户
    cursor.execute("SELECT * FROM users")
    all_users = cursor.fetchall()
    print(f"数据库中的所有用户: {all_users}")
    
    # 先单独查询房间
    cursor.execute("SELECT * FROM rooms WHERE code = ?", (code,))
    room_only = cursor.fetchone()
    print(f"单独查询的房间: {room_only}")
    
    if room_only:
        # 检查房主是否存在
        cursor.execute("SELECT * FROM users WHERE id = ?", (room_only[3],))
        owner_user = cursor.fetchone()
        print(f"房主用户: {owner_user}")
    
    # 获取房间信息（包含房主昵称）
    cursor.execute("""
        SELECT r.*, u.username as owner_nickname 
        FROM rooms r 
        JOIN users u ON r.owner_id = u.id 
        WHERE r.code = ?
    """, (code,))
    room = cursor.fetchone()
    print(f"JOIN查询到的房间: {room}")
    
    if not room:
        if room_only:
            # 房间存在但JOIN失败，使用默认值
            room = room_only + ("未知用户",)
            print(f"使用默认房主名称的房间: {room}")
        else:
            raise HTTPException(status_code=404, detail="房间不存在")
    
    # 获取房间成员
    cursor.execute("""
        SELECT rm.*, u.username 
        FROM room_members rm 
        JOIN users u ON rm.user_id = u.id 
        WHERE rm.room_id = ?
    """, (room[0],))
    members = cursor.fetchall()
    print(f"房间成员: {members}")
    
    # 检查是否有正在进行的游戏
    cursor.execute("SELECT id FROM games WHERE room_id = ? AND status != 'finished'", (room[0],))
    game = cursor.fetchone()
    
    # 转换房间数据
    room_data = {
        "id": room[0],
        "code": room[1],
        "name": room[2],
        "owner_id": room[3],
        "status": room[4],
        "max_players": room[5],
        "created_at": room[6],
        "owner_nickname": room[7] if len(room) > 7 else "未知用户"
    }
    
    # 转换成员数据
    members_data = [
        {
            "user_id": member[2],  # user_id
            "username": member[5],  # username from JOIN
            "nickname": member[5],  # username from JOIN
            "is_ready": bool(member[3])  # is_ready
        }
        for member in members
    ]
    
    return {
        "room": room_data,
        "members": members_data,
        "game_id": game[0] if game else None
    }

@app.put("/api/room/ready")
async def toggle_ready(ready_data: RoomReady, current_user: Dict = Depends(verify_token)):
    """切换准备状态"""
    cursor = db.cursor()
    
    try:
        cursor.execute(
            "UPDATE room_members SET is_ready = NOT is_ready WHERE room_id = ? AND user_id = ?",
            (ready_data.room_id, current_user["id"])
        )
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="未找到房间成员")
        
        # 获取更新后的状态
        cursor.execute(
            "SELECT is_ready FROM room_members WHERE room_id = ? AND user_id = ?",
            (ready_data.room_id, current_user["id"])
        )
        result = cursor.fetchone()
        
        db.commit()
        
        # 通知房间更新
        cursor.execute("SELECT r.code FROM rooms r JOIN room_members rm ON r.id = rm.room_id WHERE rm.room_id = ? LIMIT 1", (ready_data.room_id,))
        room_result = cursor.fetchone()
        if room_result:
            await notify_room_update(room_result[0], 'ready_status_changed')
        
        return {"is_ready": bool(result[0])}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="数据库错误")

@app.post("/api/room/leave")
async def leave_room(leave_data: RoomLeave, current_user: Dict = Depends(verify_token)):
    """离开房间"""
    cursor = db.cursor()
    
    try:
        cursor.execute(
            "DELETE FROM room_members WHERE room_id = ? AND user_id = ?",
            (leave_data.room_id, current_user["id"])
        )
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="未找到房间成员")
        
        db.commit()
        
        # 通知房间更新
        cursor.execute("SELECT r.code FROM rooms r WHERE r.id = ?", (leave_data.room_id,))
        room_result = cursor.fetchone()
        if room_result:
            await notify_room_update(room_result[0], 'user_left')
        
        return {"message": "成功离开房间"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="数据库错误")

@app.post("/api/room/start")
async def start_game(start_data: RoomStart, current_user: Dict = Depends(verify_token)):
    """开始游戏"""
    cursor = db.cursor()
    
    # 检查是否是房主
    cursor.execute("SELECT * FROM rooms WHERE id = ? AND owner_id = ?", (start_data.room_id, current_user["id"]))
    room = cursor.fetchone()
    if not room:
        raise HTTPException(status_code=403, detail="只有房主可以开始游戏")
    
    # 检查房间成员数量和准备状态
    cursor.execute("SELECT * FROM room_members WHERE room_id = ?", (start_data.room_id,))
    members = cursor.fetchall()
    
    if len(members) < GAME_CONFIG["MIN_PLAYERS"]:
        raise HTTPException(status_code=400, detail=f"至少需要{GAME_CONFIG['MIN_PLAYERS']}名玩家")
    
    not_ready = [m for m in members if not m[3]]  # is_ready字段
    if not_ready:
        raise HTTPException(status_code=400, detail="所有玩家必须准备就绪")
    
    try:
        # 创建游戏
        game_id = str(uuid.uuid4())
        cursor.execute(
            "INSERT INTO games (id, room_id, status) VALUES (?, ?, ?)",
            (game_id, start_data.room_id, 'submitting_xp')
        )
        
        # 分配角色 (使用改进的随机分配函数)
        player_count = len(members)
        roles = shuffle_roles(player_count)
        
        # 创建游戏玩家
        for i, member in enumerate(members):
            player_id = str(uuid.uuid4())
            if GAME_CONFIG.get("DEBUG_ROLE_ASSIGNMENT", False):
                role_name = "狼人" if roles[i] else "村民"
                print(f"玩家 {member[2]} 分配角色: {role_name}")
            cursor.execute(
                "INSERT INTO game_players (id, game_id, user_id, is_wolf) VALUES (?, ?, ?, ?)",
                (player_id, game_id, member[2], roles[i])
            )
        
        # 更新房间状态
        cursor.execute("UPDATE rooms SET status = 'playing' WHERE id = ?", (start_data.room_id,))
        
        db.commit()
        
        # 通知游戏开始
        cursor.execute("SELECT code FROM rooms WHERE id = ?", (start_data.room_id,))
        room_code = cursor.fetchone()[0]
        await notify_room_update(room_code, 'game_started')
        await notify_game_update(game_id, 'game_created')
        
        return {"game_id": game_id}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="创建游戏失败")

# 游戏相关API
@app.get("/api/game/state")
async def get_game_state(game_id: str, current_user: Dict = Depends(verify_token)):
    """获取游戏状态"""
    cursor = db.cursor()
    
    # 获取游戏信息
    cursor.execute("SELECT * FROM games WHERE id = ?", (game_id,))
    game = cursor.fetchone()
    if not game:
        raise HTTPException(status_code=404, detail="游戏不存在")
    
    # 获取玩家信息
    cursor.execute("""
        SELECT gp.*, u.username 
        FROM game_players gp 
        JOIN users u ON gp.user_id = u.id 
        WHERE gp.game_id = ?
    """, (game_id,))
    players = cursor.fetchall()
    
    # 获取当前轮次的投票
    cursor.execute("""
        SELECT v.*, u.username as voter_name, t.username as target_name
        FROM votes v
        JOIN users u ON v.voter_id = u.id
        JOIN users t ON v.target_id = t.id
        WHERE v.game_id = ? AND v.round = ?
    """, (game_id, game[3]))  # round字段
    votes = cursor.fetchall()
    
    # 转换游戏数据
    game_data = {
        "id": game[0],
        "room_id": game[1],
        "status": game[2],
        "round": game[3],
        "public_xp": game[4],
        "winner": game[5],
        "created_at": game[6]
    }
    
    # 转换玩家数据
    players_data = []
    my_role = None
    for player in players:
        player_data = {
            "user_id": player[2],  # user_id
            "username": player[6],  # username from JOIN
            "nickname": player[6],  # username from JOIN
            "is_wolf": bool(player[3]),  # is_wolf
            "is_alive": bool(player[4]),  # is_alive
            "xp_content": player[5] if player[2] == current_user["id"] and player[5] else None  # xp_content
        }
        players_data.append(player_data)
        
        if player[2] == current_user["id"]:
            my_role = "wolf" if player[3] else "villager"
    
    # 转换投票数据
    votes_data = [
        {
            "id": vote[0],
            "game_id": vote[1],
            "voter_id": vote[2],
            "target_id": vote[3],
            "round": vote[4],
            "vote_type": vote[5],
            "created_at": vote[6],
            "voter_name": vote[7],
            "target_name": vote[8]
        }
        for vote in votes
    ]
    
    return {
        "game": game_data,
        "players": players_data,
        "my_role": my_role,
        "votes": votes_data
    }

@app.post("/api/game/submit-xp")
async def submit_xp(xp_data: XPSubmit, current_user: Dict = Depends(verify_token)):
    """提交XP"""
    if not xp_data.xp_content:
        raise HTTPException(status_code=400, detail="XP内容不能为空")
    
    cursor = db.cursor()
    
    # 检查游戏状态
    cursor.execute("SELECT * FROM games WHERE id = ? AND status = 'submitting_xp'", (xp_data.game_id,))
    game = cursor.fetchone()
    if not game:
        raise HTTPException(status_code=400, detail="当前不是提交XP时间")
    
    # 检查玩家是否在游戏中
    cursor.execute("SELECT * FROM game_players WHERE game_id = ? AND user_id = ?", (xp_data.game_id, current_user["id"]))
    player = cursor.fetchone()
    if not player:
        raise HTTPException(status_code=400, detail="您不在游戏中")
    
    try:
        # 更新玩家的XP内容
        cursor.execute(
            "UPDATE game_players SET xp_content = ? WHERE game_id = ? AND user_id = ?",
            (xp_data.xp_content, xp_data.game_id, current_user["id"])
        )
        
        # 检查是否所有玩家都已提交XP
        cursor.execute("SELECT * FROM game_players WHERE game_id = ? AND is_alive = 1", (xp_data.game_id,))
        players = cursor.fetchall()
        
        all_submitted = all(p[5] and p[5].strip() for p in players)  # xp_content字段
        
        if all_submitted:
            # 随机选择一个玩家的XP作为公开XP
            selected_player = random.choice(players)
            
            # 更新游戏状态为投票阶段，并设置公开的XP
            cursor.execute(
                "UPDATE games SET status = 'voting', public_xp = ? WHERE id = ?",
                (selected_player[5], xp_data.game_id)
            )
            message = "XP提交成功，游戏进入投票阶段"
            
            # 通知游戏状态更新
            await notify_game_update(xp_data.game_id, 'xp_phase_complete', {'status': 'voting'})
        else:
            message = "XP提交成功，等待其他玩家"
            
            # 通知XP提交进度
            await notify_game_update(xp_data.game_id, 'xp_submitted', {
                'submitted_count': len([p for p in players if p[5] and p[5].strip()]),
                'total_count': len(players)
            })
        
        db.commit()
        return {"message": message}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="XP提交失败")

@app.post("/api/game/vote")
async def vote_player(vote_data: GameVote, current_user: Dict = Depends(verify_token)):
    """投票淘汰玩家"""
    cursor = db.cursor()
    
    # 检查游戏状态
    cursor.execute("SELECT * FROM games WHERE id = ? AND status = 'voting'", (vote_data.game_id,))
    game = cursor.fetchone()
    if not game:
        raise HTTPException(status_code=400, detail="当前不是投票时间")
    
    # 检查玩家是否存活
    cursor.execute("SELECT * FROM game_players WHERE game_id = ? AND user_id = ? AND is_alive = 1", 
                   (vote_data.game_id, current_user["id"]))
    player = cursor.fetchone()
    if not player:
        raise HTTPException(status_code=400, detail="您已死亡或不在游戏中")
    
    # 检查是否已投票
    cursor.execute("SELECT * FROM votes WHERE game_id = ? AND voter_id = ? AND round = ? AND vote_type = 'voting'",
                   (vote_data.game_id, current_user["id"], game[3]))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="您已经投过票了")
    
    try:
        # 记录投票
        vote_id = str(uuid.uuid4())
        cursor.execute(
            "INSERT INTO votes (id, game_id, voter_id, target_id, round, vote_type) VALUES (?, ?, ?, ?, ?, ?)",
            (vote_id, vote_data.game_id, current_user["id"], vote_data.target_id, game[3], 'voting')
        )
        
        # 检查是否所有存活玩家都已投票
        cursor.execute("SELECT COUNT(*) FROM game_players WHERE game_id = ? AND is_alive = 1", (vote_data.game_id,))
        alive_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM votes WHERE game_id = ? AND round = ? AND vote_type = 'voting'",
                       (vote_data.game_id, game[3]))
        vote_count = cursor.fetchone()[0]
        
        if vote_count >= alive_count:
            # 所有人都投票完成，统计投票结果
            cursor.execute("""
                SELECT target_id, COUNT(*) as vote_count, u.username as target_name
                FROM votes v
                JOIN users u ON v.target_id = u.id
                WHERE v.game_id = ? AND v.round = ? AND v.vote_type = 'voting'
                GROUP BY target_id
                ORDER BY vote_count DESC
            """, (vote_data.game_id, game[3]))
            vote_results = cursor.fetchall()
            
            if vote_results:
                max_votes = vote_results[0][1]
                top_voted = [v for v in vote_results if v[1] == max_votes]
                
                if len(top_voted) == 1:
                    # 有明确的被投票最多的玩家，淘汰该玩家
                    eliminated_player_id = top_voted[0][0]
                    
                    cursor.execute("UPDATE game_players SET is_alive = 0 WHERE game_id = ? AND user_id = ?",
                                   (vote_data.game_id, eliminated_player_id))
                    
                    # 检查游戏是否结束
                    message = await check_game_end(cursor, vote_data.game_id, current_user["username"])
                    if message:
                        db.commit()
                        return {"message": message}
                    
                    # 游戏继续，进入夜晚阶段
                    cursor.execute("UPDATE games SET status = 'night' WHERE id = ?", (vote_data.game_id,))
                    message = "投票成功，进入夜晚阶段"
                else:
                    # 投票平局，重新投票
                    cursor.execute("DELETE FROM votes WHERE game_id = ? AND round = ? AND vote_type = 'voting'",
                                   (vote_data.game_id, game[3]))
                    message = "投票平局，请重新投票"
            else:
                message = "投票成功"
        else:
            message = "投票成功"
        
        db.commit()
        return {"message": message}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="投票失败")

@app.post("/api/game/kill")
async def kill_player(kill_data: GameVote, current_user: Dict = Depends(verify_token)):
    """狼人击杀玩家"""
    cursor = db.cursor()
    
    # 检查游戏状态
    cursor.execute("SELECT * FROM games WHERE id = ? AND status = 'night'", (kill_data.game_id,))
    game = cursor.fetchone()
    if not game:
        raise HTTPException(status_code=400, detail="当前不是夜晚时间")
    
    # 检查玩家是否是狼人
    cursor.execute("SELECT * FROM game_players WHERE game_id = ? AND user_id = ? AND is_wolf = 1 AND is_alive = 1",
                   (kill_data.game_id, current_user["id"]))
    player = cursor.fetchone()
    if not player:
        raise HTTPException(status_code=400, detail="您不是狼人或已死亡")
    
    # 检查是否已投票
    cursor.execute("SELECT * FROM votes WHERE game_id = ? AND voter_id = ? AND round = ? AND vote_type = 'night'",
                   (kill_data.game_id, current_user["id"], game[3]))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="您已经投过票了")
    
    try:
        # 记录击杀投票
        vote_id = str(uuid.uuid4())
        cursor.execute(
            "INSERT INTO votes (id, game_id, voter_id, target_id, round, vote_type) VALUES (?, ?, ?, ?, ?, ?)",
            (vote_id, kill_data.game_id, current_user["id"], kill_data.target_id, game[3], 'night')
        )
        
        # 检查是否所有存活狼人都已投票
        cursor.execute("SELECT COUNT(*) FROM game_players WHERE game_id = ? AND is_wolf = 1 AND is_alive = 1",
                       (kill_data.game_id,))
        wolf_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM votes WHERE game_id = ? AND round = ? AND vote_type = 'night'",
                       (kill_data.game_id, game[3]))
        vote_count = cursor.fetchone()[0]
        
        if vote_count >= wolf_count:
            # 所有狼人都投票完成，统计击杀结果
            cursor.execute("""
                SELECT target_id, COUNT(*) as vote_count, u.username as target_name
                FROM votes v
                JOIN users u ON v.target_id = u.id
                WHERE v.game_id = ? AND v.round = ? AND v.vote_type = 'night'
                GROUP BY target_id
                ORDER BY vote_count DESC
            """, (kill_data.game_id, game[3]))
            kill_results = cursor.fetchall()
            
            if kill_results:
                max_votes = kill_results[0][1]
                top_voted = [v for v in kill_results if v[1] == max_votes]
                
                if len(top_voted) == 1:
                    # 有明确的击杀目标，击杀该玩家
                    killed_player_id = top_voted[0][0]
                    
                    cursor.execute("UPDATE game_players SET is_alive = 0 WHERE game_id = ? AND user_id = ?",
                                   (kill_data.game_id, killed_player_id))
                    
                    # 检查游戏是否结束
                    message = await check_game_end(cursor, kill_data.game_id, current_user["username"])
                    if message:
                        db.commit()
                        return {"message": message}
                    
                    # 游戏继续，进入下一轮XP提交阶段
                    cursor.execute("UPDATE games SET status = 'submitting_xp', round = round + 1 WHERE id = ?",
                                   (kill_data.game_id,))
                    
                    # 清空所有玩家的XP内容，准备下一轮
                    cursor.execute("UPDATE game_players SET xp_content = NULL WHERE game_id = ?",
                                   (kill_data.game_id,))
                    
                    message = "击杀成功，进入新一轮"
                else:
                    # 击杀投票平局，重新投票
                    cursor.execute("DELETE FROM votes WHERE game_id = ? AND round = ? AND vote_type = 'night'",
                                   (kill_data.game_id, game[3]))
                    message = "击杀投票平局，请重新投票"
            else:
                message = "投票成功"
        else:
            message = "投票成功"
        
        db.commit()
        return {"message": message}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="投票失败")

@app.post("/api/game/exit")
async def exit_game(exit_data: GameExit, current_user: Dict = Depends(verify_token)):
    """退出游戏"""
    cursor = db.cursor()
    
    try:
        # 将玩家标记为死亡
        cursor.execute("UPDATE game_players SET is_alive = 0 WHERE game_id = ? AND user_id = ?",
                       (exit_data.game_id, current_user["id"]))
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="未找到游戏玩家")
        
        # 检查游戏是否应该结束
        message = await check_game_end(cursor, exit_data.game_id, current_user["username"])
        if message:
            db.commit()
            return {"message": "已退出游戏", "game_terminated": True, "winner": message.split("，")[1] if "，" in message else None}
        
        db.commit()
        return {"message": "已退出游戏", "game_terminated": False}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="数据库错误")

async def check_game_end(cursor, game_id: str, current_username: str) -> Optional[str]:
    """检查游戏是否结束并更新统计"""
    cursor.execute("SELECT is_wolf, is_alive FROM game_players WHERE game_id = ?", (game_id,))
    players = cursor.fetchall()
    
    alive_players = [p for p in players if p[1]]  # is_alive
    alive_wolves = [p for p in alive_players if p[0]]  # is_wolf
    alive_villagers = [p for p in alive_players if not p[0]]
    
    print(f"游戏结束检查: 总玩家{len(players)}, 存活玩家{len(alive_players)}, 存活狼人{len(alive_wolves)}, 存活村民{len(alive_villagers)}")
    
    winner = None
    if len(alive_wolves) == 0:
        winner = "villagers"
        print(f"判定村民胜利: 狼人全部死亡")
    elif len(alive_wolves) >= len(alive_villagers):
        winner = "wolves"
        print(f"判定狼人胜利: 狼人数({len(alive_wolves)}) >= 村民数({len(alive_villagers)})")
    
    if winner:
        # 更新游戏状态
        cursor.execute("UPDATE games SET status = 'finished', winner = ? WHERE id = ?", (winner, game_id))
        
        # 更新所有玩家的统计数据
        cursor.execute("""
            SELECT gp.*, u.username 
            FROM game_players gp 
            JOIN users u ON gp.user_id = u.id 
            WHERE gp.game_id = ?
        """, (game_id,))
        game_players = cursor.fetchall()
        
        print(f"游戏结束，胜者: {winner}")
        for player in game_players:
            username = player[6]  # username from JOIN
            is_wolf = bool(player[3])  # is_wolf (转换为布尔值)
            # 修正胜负判定逻辑
            if winner == "wolves":
                is_winner = is_wolf  # 狼人胜利时，狼人获胜
            else:  # winner == "villagers"
                is_winner = not is_wolf  # 村民胜利时，村民获胜
                
            print(f"更新玩家 {username} 统计: is_wolf={is_wolf}, is_winner={is_winner}")
            update_player_stats(username, is_winner)
        
        if winner == "villagers":
            return "游戏结束，村民胜利"
        else:
            return "游戏结束，狼人胜利"
    
    return None

# Socket.IO事件处理
@sio.event
async def connect(sid, environ):
    print(f'Socket.IO用户连接: {sid}')

@sio.event
async def disconnect(sid):
    print(f'Socket.IO用户断开连接: {sid}')

@sio.event
async def join_room(sid, data):
    """加入房间事件"""
    room_code = data.get('room_code')
    if room_code:
        await sio.enter_room(sid, f"room_{room_code}")
        print(f'Socket.IO用户 {sid} 加入房间 {room_code}')
        # 通知房间内其他用户
        await sio.emit('user_joined', {'sid': sid}, room=f"room_{room_code}", skip_sid=sid)

@sio.event
async def leave_room(sid, data):
    """离开房间事件"""
    room_code = data.get('room_code')
    if room_code:
        await sio.leave_room(sid, f"room_{room_code}")
        print(f'Socket.IO用户 {sid} 离开房间 {room_code}')
        # 通知房间内其他用户
        await sio.emit('user_left', {'sid': sid}, room=f"room_{room_code}")

@sio.event
async def join_game(sid, data):
    """加入游戏事件"""
    game_id = data.get('game_id')
    if game_id:
        await sio.enter_room(sid, f"game_{game_id}")
        print(f'Socket.IO用户 {sid} 加入游戏 {game_id}')

@sio.event
async def game_update(sid, data):
    """游戏状态更新事件"""
    game_id = data.get('game_id')
    if game_id:
        # 广播游戏状态更新
        await sio.emit('game_state_changed', data, room=f"game_{game_id}")

# 辅助函数：通知房间更新
async def notify_room_update(room_code: str, event_type: str = 'room_updated'):
    """通知房间状态更新"""
    await sio.emit(event_type, {'room_code': room_code}, room=f"room_{room_code}")

# 辅助函数：通知游戏更新
async def notify_game_update(game_id: str, event_type: str = 'game_updated', data: dict = None):
    """通知游戏状态更新"""
    emit_data = {'game_id': game_id}
    if data:
        emit_data.update(data)
    await sio.emit(event_type, emit_data, room=f"game_{game_id}")

# 静态文件服务
@app.get("/")
async def read_index():
    """返回主页"""
    return FileResponse(get_frontend_file_path('index.html'))

@app.get("/xpwerewolf.js")
async def get_js():
    """返回JS文件"""
    return FileResponse(get_frontend_file_path('xpwerewolf.js'))

@app.get("/style.css")
async def get_css():
    """返回CSS文件"""
    return FileResponse(get_frontend_file_path('style.css'))

@app.get("/favicon.ico")
async def get_favicon():
    """返回图标文件"""
    # 返回一个空的图标响应，避免404
    from fastapi.responses import Response
    return Response(content="", media_type="image/x-icon")

# 挂载静态文件（作为备用）
app.mount("/assets", StaticFiles(directory=get_frontend_file_path('')), name="assets")

if __name__ == "__main__":
    print(f"服务器运行在端口 {PORT}")
    print(f"本地访问: http://localhost:{PORT}")
    print(f"网络访问: http://{HOST}:{PORT}")
    print("服务器启动中...")
    
    # 优雅关闭处理
    def signal_handler(signum, frame):
        print("\n正在关闭服务器...")
        close_db_connection()
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    try:
        uvicorn.run(
            socket_app,
            host=HOST,
            port=PORT,
            log_level=SERVER_CONFIG["LOG_LEVEL"]
        )
    except KeyboardInterrupt:
        print("\n服务器关闭中...")
        close_db_connection()
    finally:
        close_db_connection()
