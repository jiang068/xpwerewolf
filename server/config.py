#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
XP狼人杀 - 配置文件
所有服务器配置项都在这里管理
"""

import os

# 服务器配置
SERVER_CONFIG = {
    "PORT": 12741,
    "HOST": "0.0.0.0",
    "LOG_LEVEL": "info",
    "DEBUG": False
}

# 安全配置
SECURITY_CONFIG = {
    "JWT_SECRET": "xpwerewolf_secret_key",
    "SECRET_KEY": "your-secret-key-for-jwt",
    "ALGORITHM": "HS256",
    "ACCESS_TOKEN_EXPIRE_MINUTES": 30
}

# 数据库配置
DATABASE_CONFIG = {
    "DATABASE_DIR": "data",
    "DATABASE_FILE": "xpwerewolf.db",
    "SQLITE_SETTINGS": {
        "journal_mode": "WAL",
        "synchronous": "NORMAL",
        "cache_size": 10000,
        "temp_store": "MEMORY",
        "mmap_size": 268435456  # 256MB
    }
}

# 目录配置
DIRECTORY_CONFIG = {
    "PLAYERS_DIR": "players",
    "FRONTEND_DIR": "frontend"
}

# 游戏配置
GAME_CONFIG = {
    "MIN_PLAYERS": 4,
    "DEFAULT_MAX_PLAYERS": 8,
    "WOLF_SELECTION_MODE": "fixed",  # 狼人选择模式: "fixed" 固定一个狼人, "ratio" 按比例分配
    "WOLF_RATIO": 1/3,  # 狼人比例(当WOLF_SELECTION_MODE为"ratio"时使用)
    "DEBUG_ROLE_ASSIGNMENT": False,  # 是否显示角色分配调试信息
    "XP_CONTENTS": [
        "今晚月色真美，适合做点什么...",
        "我有一个秘密，但我不能说...",
        "村子里最近总是有奇怪的声音...",
        "我觉得有人在监视我们...",
        "昨晚我做了一个可怕的梦...",
        "这个村子隐藏着什么秘密？",
        "我总觉得有双眼睛在暗中观察...",
        "夜深人静时，谁还在外面游荡？",
        "我听说森林里有野兽出没...",
        "村民们的表情都很奇怪..."
    ]
}

# CORS配置
CORS_CONFIG = {
    "allow_origins": ["*"],
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"]
}

# Socket.IO配置
SOCKETIO_CONFIG = {
    "cors_allowed_origins": "*",
    "async_mode": "asgi",
    "logger": True,
    "engineio_logger": True
}

# 路径辅助函数
def get_base_dir():
    """获取项目根目录"""
    return os.path.dirname(__file__)

def get_database_dir():
    """获取数据库目录绝对路径"""
    return os.path.join(get_base_dir(), DATABASE_CONFIG["DATABASE_DIR"])

def get_database_path():
    """获取数据库文件绝对路径"""
    return os.path.join(get_database_dir(), DATABASE_CONFIG["DATABASE_FILE"])

def get_players_dir():
    """获取玩家数据目录绝对路径"""
    return os.path.join(get_base_dir(), '..', DIRECTORY_CONFIG["PLAYERS_DIR"])

def get_frontend_dir():
    """获取前端文件目录绝对路径"""
    return os.path.join(get_base_dir(), '..', DIRECTORY_CONFIG["FRONTEND_DIR"])

def get_frontend_file_path(filename):
    """获取前端文件的绝对路径"""
    return os.path.join(get_frontend_dir(), filename)

# 环境变量覆盖配置（可选）
def load_config_from_env():
    """从环境变量加载配置覆盖"""
    if os.getenv("XP_WEREWOLF_PORT"):
        SERVER_CONFIG["PORT"] = int(os.getenv("XP_WEREWOLF_PORT"))
    
    if os.getenv("XP_WEREWOLF_HOST"):
        SERVER_CONFIG["HOST"] = os.getenv("XP_WEREWOLF_HOST")
    
    if os.getenv("XP_WEREWOLF_JWT_SECRET"):
        SECURITY_CONFIG["JWT_SECRET"] = os.getenv("XP_WEREWOLF_JWT_SECRET")
    
    if os.getenv("XP_WEREWOLF_DEBUG"):
        SERVER_CONFIG["DEBUG"] = os.getenv("XP_WEREWOLF_DEBUG").lower() == "true"

# 自动加载环境变量配置
load_config_from_env()

# 导出主要配置项（向后兼容）
PORT = SERVER_CONFIG["PORT"]
HOST = SERVER_CONFIG["HOST"]
JWT_SECRET = SECURITY_CONFIG["JWT_SECRET"]
SECRET_KEY = SECURITY_CONFIG["SECRET_KEY"]
ALGORITHM = SECURITY_CONFIG["ALGORITHM"]
ACCESS_TOKEN_EXPIRE_MINUTES = SECURITY_CONFIG["ACCESS_TOKEN_EXPIRE_MINUTES"]
PLAYERS_DIR = get_players_dir()
DATABASE_DIR = get_database_dir()
DATABASE_FILE = DATABASE_CONFIG["DATABASE_FILE"]
