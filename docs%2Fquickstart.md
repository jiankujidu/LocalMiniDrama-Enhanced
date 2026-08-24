# UpingDrama - 快速开始

## 安装

```bash
# 克隆仓库
git clone https://github.com/jiankujidu/LocalMiniDrama-Enhanced.git
cd LocalMiniDrama-Enhanced

# 安装依赖
npm install
cd backend-node && npm install && cd ..
cd frontweb && npm install && cd ..
cd desktop && npm install && cd ..
```

## 运行

### 开发模式
```bash
npm run dev
```

### 构建
```bash
npm run build
```

## 使用指南

### 1. 创建项目
1. 进入"项目档案"页面
2. 点击"新建项目"
3. 选择格式（竖屏/横版）
4. 选择目标平台
5. 设置节奏档位

### 2. 管理资产
1. 进入"资产库"页面
2. 按类型添加资产：
   - 角色：录入外貌、性格、声音特征
   - 场景：录入位置、时间、天气
   - 服装：关联角色和场景
   - 风格：定义视觉风格
3. 上传图片作为参考

### 3. 创建分镜
1. 进入项目，点击"分镜"
2. 批量创建分镜模板
3. 填写每个镜头的 11 个必需字段
4. 关联资产（角色、场景、服装）
5. 设置段末状态锚定

### 4. 生成提示词
1. 在分镜编辑页面点击"生成提示词"
2. 系统自动生成 Seedance C 模式提示词
3. 可复制后用于 AI 视频生成

### 5. 声音设计
1. 进入"声音设计"页面
2. 添加 BGM 到库
3. 添加音效到库
4. 为分镜关联声音元素

## 技术栈

- **前端**: Vue 3 + Vite + Element Plus + Pinia
- **后端**: Node.js + Express + SQLite
- **桌面端**: Electron
- **AI 模型**: Seedance 2.0、可灵、Gemini、Vidu

## 许可证

MIT
