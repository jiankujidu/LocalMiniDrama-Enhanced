# UpingDrama - 项目配置

## 环境变量

```env
# 后端配置
PORT=3000
NODE_ENV=development

# 数据库
DB_PATH=./data/upingdrama.db

# AI API (可选)
SEEDANCE_API_KEY=
VOLCENGINE_API_KEY=
GEMINI_API_KEY=
```

## 开发环境

### 安装依赖

```bash
# 根目录
npm install

# 后端
cd backend-node && npm install

# 前端
cd frontweb && npm install

# 桌面端
cd desktop && npm install
```

### 启动开发模式

```bash
# 方式一：并行启动（推荐）
npm run dev

# 方式二：单独启动
npm run dev:backend  # 后端
npm run dev:front    # 前端
npm run dev:desktop  # 桌面端
```

### 构建

```bash
# 构建前端
npm run build:front

# 构建桌面应用
npm run build:desktop
```

## 数据库

使用 SQLite，数据文件位于 `backend-node/data/upingdrama.db`

### 表结构

- `projects` - 项目档案
- `assets` - 资产库（CH/SC/PR/CO/ST/CL/NP/AU）
- `storyboards` - 分镜
- `bgm_library` - BGM 库
- `sfx_library` - 音效库
- `sound_references` - 声音参考

## API 端点

### 资产库
- `GET /api/assets` - 获取所有资产
- `GET /api/assets/:code` - 获取单个资产
- `POST /api/assets` - 创建资产
- `PUT /api/assets/:code` - 更新资产
- `DELETE /api/assets/:code` - 删除资产
- `GET /api/assets/stats` - 统计

### 分镜
- `GET /api/storyboards` - 获取分镜列表
- `POST /api/storyboards` - 创建分镜
- `PUT /api/storyboards/:shot_number` - 更新分镜
- `POST /api/storyboards/batch` - 批量创建
- `POST /api/storyboards/:shot_number/prompt` - 生成提示词
- `POST /api/storyboards/batch-prompt` - 批量生成提示词

### 项目
- `GET /api/projects` - 获取项目列表
- `POST /api/projects` - 创建项目
- `GET /api/projects/:id` - 获取单个项目
- `PUT /api/projects/:id` - 更新项目
- `DELETE /api/projects/:id` - 删除项目
- `GET /api/projects/platform-profiles` - 平台档案
- `GET /api/projects/recommend/:platform` - 推荐配置

## 功能模块

### 1. 资产编号体系 (P0-4)
- CH - 角色 (Character)
- SC - 场景 (Scene)
- PR - 道具 (Prop)
- CO - 服装 (Costume)
- ST - 风格 (Style)
- CL - 色彩光影 (Color & Lighting)
- NP - 防跑偏 (No-Pivot)
- AU - 声音参考 (Audio)
- MAP - 调度图 (Map)
- SCV - 场景多角度 (Scene View)
- SB - 空间侧别 (Side View)
- CR - 人群 (Crowd)
- FF - 首帧 (First Frame)

### 2. 节奏档位控制 (P1)
- cinematic - 电影感（中速，3-8秒/镜）
- short_video - 短视频高密度（快，1-3秒/镜）
- action - 高强度动作（极快，0.5-2秒/镜）
- slow - 慢节奏高信息（慢，5-15秒/镜）

### 3. Seedance C 模式提示词
完整结构：
1. 特别注意
2. 素材锚定
3. 参考连续性声明
4. 风格锁定
5. 场景锚定
6. 镜头轨
7. 主体动作
8. 声音轨（可选）
9. 硬锁
10. 段末状态锚定
11. 光影参数
12. 构图

### 4. 声音设计模块
- BGM 库管理
- 音效库管理
- 声音参考库
- BGM 曲线生成
- SFX 分层

### 5. 项目档案管理
- 竖屏 9:16 / 横版 16:9 双模板
- 多平台适配（抖音、快手、B站、视频号、Netflix）
- 自动推荐配置

## 更新日志

### v1.3.0
- 新增资产编号体系
- 新增节奏档位控制
- 新增 Seedance C 模式完整实现
- 新增声音设计模块
- 新增项目档案管理
- 优化分镜编辑器字段
