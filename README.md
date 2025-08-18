# XP 狼人杀游戏

这是一个基于 Web 的狼人杀游戏，包含前端和后端。现已升级为 Python FastAPI 后端，支持 SQLite 文件数据库存储。

## 项目结构

```
xpwerewolf/
├── frontend/                # 前端文件目录
│   ├── index.html          # 前端页面
│   ├── xpwerewolf.js       # 前端 JavaScript 代码
│   └── style.css           # 前端样式
├── server/                 # 后端服务器
│   ├── config.py           # 配置文件
│   ├── server.py           # 后端服务器代码
│   ├── requirements.txt    # Python 依赖
│   ├── data/              # 数据库目录
│   │   └── xpwerewolf.db  # SQLite 数据库文件
│   └── xpvenv/            # Python 虚拟环境
├── players/               # 玩家数据文件
├── http_server_python_8080.bat  # 旧版启动脚本
└── README.md              # 说明文档
```

## 快速开始

### 方法一：使用虚拟环境启动（推荐）

1. 进入 server 目录：
   ```bash
   cd server
   ```

2. 激活虚拟环境：
   ```bash
   # Windows
   .\xpvenv\Scripts\Activate.ps1
   
   # Linux/Mac
   source xpvenv/bin/activate
   ```

3. 启动服务器：
   ```bash
   python server.py
   ```

4. 打开浏览器访问 `http://localhost:5050`

### 方法二：直接启动（需要安装依赖）

1. 确保已安装 Python 3.10+
2. 安装依赖：
   ```bash
   cd server
   pip install -r requirements.txt
   ```
3. 启动服务器：
   ```bash
   python server.py
   ```
4. 打开浏览器访问 `http://localhost:5050`

## 游戏功能

- **用户系统**：注册、登录、用户统计
- **数据持久化**：SQLite 文件数据库，支持数据永久保存
- **房间管理**：创建房间、加入房间、准备开始
- **游戏流程**：角色分配、白天投票、夜晚行动
- **实时通信**：基于 Socket.IO 的实时游戏状态同步
- **XP 系统**：每个玩家都有独特的角色设定内容
- **统计系统**：玩家胜负记录、游戏历史统计
- **性能优化**：SQLite WAL 模式，支持高并发访问

## 游戏规则

1. 玩家分为狼人和村民两个阵营
2. 狼人需要在夜晚击杀村民
3. 村民需要在白天投票淘汰狼人
4. 狼人获胜条件：狼人数量 ≥ 村民数量
5. 村民获胜条件：淘汰所有狼人

## 技术栈

### 前端
- HTML5/CSS3/JavaScript
- Socket.IO Client
- 响应式设计

### 后端
- Python 3.10+
- FastAPI
- Socket.IO
- SQLite (文件数据库)
- JWT 认证
- bcrypt 密码加密
- uvicorn ASGI 服务器

## 配置管理

项目使用 `server/config.py` 文件集中管理所有配置项，使配置更加清晰和可维护。

### 配置文件结构

#### 1. 服务器配置 (SERVER_CONFIG)
```python
SERVER_CONFIG = {
    "PORT": 5050,           # 服务器端口
    "HOST": "0.0.0.0",      # 服务器主机地址
    "LOG_LEVEL": "info",    # 日志级别
    "DEBUG": False          # 调试模式
}
```

#### 2. 安全配置 (SECURITY_CONFIG)
```python
SECURITY_CONFIG = {
    "JWT_SECRET": "xpwerewolf_secret_key",    # JWT密钥
    "SECRET_KEY": "your-secret-key-for-jwt",  # 通用密钥
    "ALGORITHM": "HS256",                     # 加密算法
    "ACCESS_TOKEN_EXPIRE_MINUTES": 30         # 令牌过期时间(分钟)
}
```

#### 3. 数据库配置 (DATABASE_CONFIG)
```python
DATABASE_CONFIG = {
    "DATABASE_DIR": "data",              # 数据库目录
    "DATABASE_FILE": "xpwerewolf.db",    # 数据库文件名
    "SQLITE_SETTINGS": {                 # SQLite优化设置
        "journal_mode": "WAL",           # WAL模式
        "synchronous": "NORMAL",         # 同步级别
        "cache_size": 10000,             # 缓存大小
        "temp_store": "MEMORY",          # 临时表存储
        "mmap_size": 268435456           # 内存映射大小(256MB)
    }
}
```

#### 4. 游戏配置 (GAME_CONFIG)
```python
GAME_CONFIG = {
    "MIN_PLAYERS": 4,         # 最少玩家数
    "DEFAULT_MAX_PLAYERS": 8, # 默认最大玩家数
    "WOLF_RATIO": 1/3,        # 狼人比例
    "XP_CONTENTS": [...]      # 预设XP内容列表
}
```

### 环境变量支持

配置文件支持通过环境变量覆盖配置：

- `XP_WEREWOLF_PORT`: 覆盖服务器端口
- `XP_WEREWOLF_HOST`: 覆盖服务器主机地址  
- `XP_WEREWOLF_JWT_SECRET`: 覆盖JWT密钥
- `XP_WEREWOLF_DEBUG`: 覆盖调试模式

### 配置修改方法

#### 方法一：直接编辑配置文件
编辑 `server/config.py` 文件中的配置字典：

```python
# 修改端口
SERVER_CONFIG["PORT"] = 8080

# 修改最少玩家数
GAME_CONFIG["MIN_PLAYERS"] = 6
```

#### 方法二：使用环境变量
```bash
# Windows
set XP_WEREWOLF_PORT=8080
python server.py

# Linux/Mac
export XP_WEREWOLF_PORT=8080
python server.py
```

### 配置管理优势

1. **集中管理**: 所有配置项都在一个文件中
2. **类型安全**: 使用字典结构，便于IDE提示
3. **环境支持**: 支持环境变量覆盖
4. **向后兼容**: 保持原有变量名的导出
5. **可扩展**: 便于添加新的配置项
6. **路径管理**: 统一的路径生成函数

## API 接口

### 健康检查
- `GET /api/health` - 健康检查
- `GET /api/status` - 获取服务器状态

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/user/profile` - 获取用户信息
- `GET /api/user/stats` - 获取所有玩家统计

### 房间管理
- `GET /api/rooms` - 获取房间列表
- `POST /api/room/create` - 创建房间
- `POST /api/room/join/:code` - 加入房间
- `GET /api/room/info/:code` - 获取房间信息
- `PUT /api/room/ready` - 准备/取消准备
- `POST /api/room/leave` - 离开房间
- `POST /api/room/start` - 开始游戏（房主）

### 游戏相关
- `GET /api/game/state` - 获取游戏状态
- `POST /api/game/submit-xp` - 提交XP内容
- `POST /api/game/vote` - 白天投票
- `POST /api/game/kill` - 狼人击杀投票
- `POST /api/game/exit` - 退出游戏

### 静态文件服务
- `GET /` - 主页 (index.html)
- `GET /xpwerewolf.js` - JavaScript 文件
- `GET /style.css` - CSS 样式文件
- `GET /assets/*` - 静态资源文件

### Socket.IO 事件
- `connect/disconnect` - 连接/断开连接
- `join_room/leave_room` - 加入/离开房间
- `join_game` - 加入游戏房间
- `game_update` - 游戏状态更新
- `room_updated` - 房间状态更新
- `user_joined/user_left` - 用户加入/离开
- `game_started` - 游戏开始
- `xp_submitted` - XP提交进度
- `xp_phase_complete` - XP阶段完成

## 注意事项

1. 确保端口 5050 未被其他程序占用
2. 首次启动会自动创建数据库和必要目录
3. 游戏数据持久化存储在 SQLite 数据库中，重启服务器不会丢失数据
4. 建议使用现代浏览器（Chrome、Firefox、Edge等）
5. 虚拟环境已预配置所有依赖，建议使用虚拟环境启动

## 故障排除

如果遇到问题：

1. **端口被占用**：修改 `server/config.py` 中的 `SERVER_CONFIG["PORT"]` 值
2. **依赖缺失**：确保使用虚拟环境或手动安装 `requirements.txt` 中的依赖
3. **页面加载失败**：确保服务器已启动且端口正确
4. **数据库错误**：检查 `server/data/` 目录权限，确保可读写
5. **游戏连接问题**：检查浏览器控制台错误信息
6. **配置问题**：检查 `server/config.py` 文件配置是否正确

## 开发模式

如果需要开发或调试：

```bash
cd server
# 激活虚拟环境
.\xpvenv\Scripts\Activate.ps1  # Windows
# source xpvenv/bin/activate    # Linux/Mac

# 修改配置启用调试模式
# 在 config.py 中设置 SERVER_CONFIG["DEBUG"] = True

# 启动服务器
python server.py
```

### 配置文件修改

可以通过以下方式自定义配置：

1. **修改端口**: 编辑 `config.py` 中的 `SERVER_CONFIG["PORT"]`
2. **修改游戏规则**: 编辑 `config.py` 中的 `GAME_CONFIG`
3. **修改数据库设置**: 编辑 `config.py` 中的 `DATABASE_CONFIG`
4. **使用环境变量**: 设置 `XP_WEREWOLF_PORT` 等环境变量
