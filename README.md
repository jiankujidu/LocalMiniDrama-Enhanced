# UpingDrama - 专业 AI 短剧创作平台

> 基于 LocalMiniDrama 增强版，增加资产编号体系、节奏档位控制、Seedance C模式完整实现

## 🚀 项目特性

### 核心功能
- ✅ 从故事到成片的一站式 AI 短剧生成
- ✅ 支持多模型：Seedance 2.0、可灵 AI、Gemini、Vidu 等
- ✅ 本地优先架构（数据不出本机）
- ✅ 电影感分镜（焦段、光圈、景深字段）

### 增强功能（基于 script-writing-studio 标准）
- ✅ **资产编号体系** (CH/SC/PR/CO/ST/CL/NP/AU/MAP)
- ✅ **节奏档位预设** (电影感/短视频/高密度/慢节奏)
- ✅ **防跑偏机制** (NP 图、硬锁、段末状态锚定)
- ✅ **声音设计模块** (BGM 曲线、SFX 分层、声音参考库)
- ✅ **Seedance C 模式完整版** (素材锚定/风格锁定/硬锁/段末锚定)
- ✅ **多平台适配** (竖屏 9:16 / 横版 16:9)

## 📦 技术栈

- **前端**: Vue 3 + Vite + Element Plus + Pinia + Vue Flow
- **后端**: Node.js + Express + SQLite
- **桌面端**: Electron
- **AI 模型**: 通义、火山引擎、可灵、Gemini、Vidu、Ollama

## 🛠️ 开发计划

### Phase 1 (1周) - P0 优先级
- [x] 项目骨架搭建
- [ ] P0-1: 焦段/光圈/限制字段完善
- [ ] P0-4: 资产编号体系 (CH/SC/PR/CO/ST/CL/NP/AU)
- [ ] P0-5: Seedance C 模式提示词强化

### Phase 2 (1周) - P1 优先级
- [ ] P1-1: 节奏档位预设 (电影感/短视频/高密度/慢节奏)
- [ ] P1-2: 服装系统增强
- [ ] P1-3: 声音参考库
- [ ] P1-4: 防跑偏机制完善

### Phase 3 (1月) - P2 优先级
- [ ] P2-1: 调度图功能
- [ ] P2-2: 项目档案模块
- [ ] P2-3: 多平台适配 (竖屏/横版双模板)

## 📁 项目结构

```
LocalMiniDrama-Enhanced/
├── desktop/          # Electron 桌面端
├── backend-node/     # Node.js 后端服务
├── frontweb/         # Vue 3 前端应用
├── docs/             # 文档
├── example_drama/    # 示例项目
└── openclaw-skill/   # AI 技能包
```

## 📄 许可证

MIT License

## 🙏 致谢

- 原始项目: [LocalMiniDrama](https://github.com/xuanyustudio/LocalMiniDrama)
- 专业标准参考: [script-writing-studio](https://github.com/jiankujidu/script-writing-studio)
