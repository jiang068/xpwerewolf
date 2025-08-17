#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
玩家数据管理工具
用于读写JSON格式的玩家数据文件
"""

import json
import os
import sys
from datetime import datetime

PLAYERS_DIR = os.path.join(os.path.dirname(__file__), '..', 'players')

def ensure_players_dir():
    """确保players目录存在"""
    if not os.path.exists(PLAYERS_DIR):
        os.makedirs(PLAYERS_DIR)

def get_player_file_path(username):
    """获取玩家数据文件路径"""
    return os.path.join(PLAYERS_DIR, f"{username}.json")

def load_player(username):
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

def save_player(username, data):
    """保存玩家数据"""
    try:
        ensure_players_dir()
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

def update_player_stats(username, won=False):
    """更新玩家统计数据"""
    try:
        player_data = load_player(username)
        if not player_data:
            return False
        
        player_data["total_games"] = player_data.get("total_games", 0) + 1
        if won:
            player_data["wins"] = player_data.get("wins", 0) + 1
        else:
            player_data["losses"] = player_data.get("losses", 0) + 1
        
        return save_player(username, player_data)
    except Exception as e:
        print(f"Error updating player stats {username}: {e}")
        return False

def list_players():
    """列出所有玩家"""
    try:
        ensure_players_dir()
        players = []
        for filename in os.listdir(PLAYERS_DIR):
            if filename.endswith('.json'):
                username = filename[:-5]  # 移除.json后缀
                player_data = load_player(username)
                if player_data:
                    players.append(player_data)
        return players
    except Exception as e:
        print(f"Error listing players: {e}")
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python player_manager.py <command> [args...]")
        print("Commands:")
        print("  load <username>")
        print("  save <username> <json_data>")
        print("  update_stats <username> <won(true/false)>")
        print("  list")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "load" and len(sys.argv) >= 3:
        username = sys.argv[2]
        result = load_player(username)
        print(json.dumps(result) if result else "null")
    
    elif command == "save" and len(sys.argv) >= 4:
        username = sys.argv[2]
        data = json.loads(sys.argv[3])
        result = save_player(username, data)
        print(json.dumps({"success": result}))
    
    elif command == "update_stats" and len(sys.argv) >= 4:
        username = sys.argv[2]
        won = sys.argv[3].lower() == "true"
        result = update_player_stats(username, won)
        print(json.dumps({"success": result}))
    
    elif command == "list":
        result = list_players()
        print(json.dumps(result))
    
    else:
        print("Invalid command or arguments")
        sys.exit(1)
