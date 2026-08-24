# UpingDrama 快速启动指南

## 环境要求
- Node.js >= 18
- npm >= 9

## 安装依赖

```bash
# 进入项目目录
cd D:/Users/Administrator/Desktop/LocalMiniDrama-Enhanced

# 安装后端依赖
cd backend-node
npm install

# 安装前端依赖
cd ../frontweb
npm install

# 安装桌面端依赖
cd ../desktop
npm install
```

## 启动开发服务器

### 方法 1：分别启动
```bash
# 终端 1 - 启动后端
cd D:/Users/Administrator/Desktop/LocalMiniDrama-Enhanced/backend-node
npm start

# 终端 2 - 启动前端
cd D:/Users/Administrator/Desktop/LocalMiniDrama-Enhanced/frontweb
npm run dev
```

### 方法 2：使用 quickstart
```bash
cd D:/Users/Administrator/Desktop/LocalMiniDrama-Enhanced
npm install -g concurrently
npm run dev
```

## 构建桌面应用

```bash
cd D:/Users/Administrator/Desktop/LocalMiniDrama-Enhanced/desktop
npm run build
```

## 访问地址

- 前端: http://localhost:5173
- 后端 API: http://localhost:3000/health
- API 文档: http://localhost:3000/api/docs

## 功能模块

### 1. 资产库 (Assets)
- 角色管理 (CH)
- 场景管理 (SC)
- 道具管理 (PR)
- 服装管理 (CO)
- 风格定义 (ST)
- 色彩光影 (CL)
- 防跑偏 (NP)
- 声音参考 (AU)

### 2. 分镜编辑器 (Storyboard)
- 11 字段完整分镜
- 焦段/光圈/景深
- 运镜参数
- 资产关联
- 节奏档位
- Seedance C 模式提示词生成

### 3. 声音设计 (Sound Design)
- BGM 库管理
- 音效库管理
- 声音参考
- 混音导出

### 4. 项目档案 (Project Archive)
- 竖屏/横版双模板
- 多平台适配
- 节奏预设

## 技术栈

- **前端**: Vue 3 + Vite + Element Plus + Pinia
- **后端**: Node.js + Express + SQLite
- **桌面端**: Electron
- **数据库**: SQLite (better-sqlite3)
