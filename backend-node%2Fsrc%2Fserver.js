/**
 * 主服务器入口
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 导入路由
const assetsRouter = require('./routes/assets');
const storyboardsRouter = require('./routes/storyboards');
const projectsRouter = require('./routes/projects');

// 初始化应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/public', express.static(path.join(__dirname, '../../frontweb/dist')));

// API 路由
app.use('/api/assets', assetsRouter);
app.use('/api/storyboards', storyboardsRouter);
app.use('/api/projects', projectsRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    timestamp: new Date().toISOString(),
    version: '1.3.0',
    name: 'UpingDrama Backend'
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: err.message,
    message: err.message 
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`UpingDrama Backend running on port ${PORT}`);
  console.log(`API docs: http://localhost:${PORT}/api/docs`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  process.exit(0);
});

module.exports = app;
