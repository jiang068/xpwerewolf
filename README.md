# XP 狼人杀游戏

这是一个基于 Web 的狼人杀游戏，包含前端和后端。

**作者：** jiang068

## 项目结构

```
xpwerewolf/
├── index.html          # 前端页面
├── xpwerewolf.js       # 前端 JavaScript 代码
├── style.css           # 前端样式
├── start.bat           # Windows 启动脚本
├── server/             # 后端服务器
│   ├── package.json    # 后端依赖配置
│   └── server.js       # 后端服务器代码
└── README.md           # 说明文档
```

## 快速开始

### 方法一：使用批处理文件（推荐）

1. 双击运行 `start.bat` 文件
2. 等待依赖安装完成和服务器启动
3. 打开浏览器访问 `http://localhost:5050`

### 方法二：手动启动

1. 安装 Node.js（如果还未安装）
2. 打开命令行，进入 `server` 目录
3. 运行 `npm install` 安装依赖
4. 运行 `npm start` 启动服务器
5. 打开浏览器访问 `http://localhost:5050`

## 游戏功能

- **用户系统**：注册、登录
- **房间管理**：创建房间、加入房间、准备开始
- **游戏流程**：角色分配、白天投票、夜晚行动
- **实时通信**：基于 Socket.IO 的实时游戏状态同步
- **XP 系统**：每个玩家都有独特的角色设定内容

## 游戏规则

1. 玩家分为狼人和村民两个阵营
2. 狼人需要在夜晚击杀村民
3. 村民需要在白天投票淘汰狼人
4. 狼人获胜条件：狼人数量 ≥ 村民数量
5. 村民获胜条件：淘汰所有狼人

## 技术栈

### 前端
- React
- Socket.IO Client
- Tailwind CSS

### 后端
- Node.js
- Express
- Socket.IO
- SQLite
- JWT 认证
- bcryptjs 密码加密

## API 接口

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/user/profile` - 获取用户信息

### 房间管理
- `POST /api/room/create` - 创建房间
- `POST /api/room/join/:code` - 加入房间
- `GET /api/room/info/:code` - 获取房间信息
- `PUT /api/room/ready` - 准备/取消准备
- `POST /api/room/leave` - 离开房间
- `POST /api/room/start` - 开始游戏（房主）

### 游戏相关
- `GET /api/game/state` - 获取游戏状态
- `POST /api/game/vote` - 白天投票
- `POST /api/game/kill` - 狼人击杀投票
- `POST /api/game/exit` - 退出游戏

### Socket.IO 事件
- `join_game` - 加入游戏房间
- `game_terminated` - 游戏终止
- `game_over` - 游戏结束
- `vote_tie` - 投票平局
- `player_eliminated` - 玩家被淘汰
- `new_round` - 新回合开始

## 注意事项

1. 确保端口 5050 未被其他程序占用
2. 首次启动会自动安装依赖，需要网络连接
3. 游戏数据存储在内存中，重启服务器会丢失数据
4. 建议使用现代浏览器（Chrome、Firefox、Edge等）

## 故障排除

如果遇到问题：

1. **端口被占用**：修改 `server/server.js` 中的 `PORT` 变量
2. **依赖安装失败**：检查网络连接，尝试手动运行 `npm install`
3. **页面加载失败**：确保服务器已启动且端口正确
4. **游戏连接问题**：检查浏览器控制台错误信息

## 开发模式

如果需要开发或调试：

```bash
cd server
npm install nodemon -g
npm run dev
```

这将启用自动重启功能，代码修改后服务器会自动重启。
