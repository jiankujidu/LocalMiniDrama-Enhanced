/**
 * 项目档案 API 路由
 */

const express = require('express');
const router = express.Router();
const projectArchive = require('../modules/projectArchive');

// 获取所有项目
router.get('/', (req, res) => {
  try {
    const { platform, status } = req.query;
    let projects = projectArchive.listProjects();
    
    if (platform) {
      projects = projects.filter(p => p.platform === platform);
    }
    if (status) {
      projects = projects.filter(p => p.status === status);
    }
    
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 创建项目
router.post('/', (req, res) => {
  try {
    const project = projectArchive.createProject(req.body);
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取单个项目
router.get('/:id', (req, res) => {
  try {
    const project = projectArchive.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 更新项目
router.put('/:id', (req, res) => {
  try {
    const project = projectArchive.updateProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 删除项目
router.delete('/:id', (req, res) => {
  try {
    const deleted = projectArchive.deleteProject(req.params.id);
    res.json({ success: true, deleted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取平台档案
router.get('/platform-profiles', (req, res) => {
  try {
    const { platform } = req.query;
    if (platform) {
      const profile = projectArchive.getPlatformProfile(platform);
      return res.json({ success: true, data: profile });
    }
    res.json({ success: true, data: projectArchive.platformProfiles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取推荐配置
router.get('/recommend/:platform', (req, res) => {
  try {
    const config = projectArchive.recommendConfig(req.params.platform);
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 统计
router.get('/stats', (req, res) => {
  try {
    const stats = projectArchive.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 导出
router.get('/export', (req, res) => {
  try {
    const data = projectArchive.exportJSON();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 导入
router.post('/import', (req, res) => {
  try {
    projectArchive.importJSON(req.body.data);
    res.json({ success: true, message: 'Imported successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
