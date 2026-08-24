/**
 * 资产库 API 路由
 */

const express = require('express');
const router = express.Router();
const assetManager = require('../modules/assetManager');

// 获取所有资产
router.get('/', (req, res) => {
  try {
    const type = req.query.type;
    if (type) {
      const assets = assetManager.findByType(type);
      return res.json({ success: true, data: assets });
    }
    res.json({ success: true, data: Array.from(assetManager.assets.values()) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 根据编号获取资产
router.get('/:code', (req, res) => {
  try {
    const asset = assetManager.findByCode(req.params.code);
    if (!asset) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }
    res.json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 创建资产
router.post('/', (req, res) => {
  try {
    const { type, name, ...options } = req.body;
    const asset = assetManager.registerAsset(type, name, options);
    res.json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 批量注册角色
router.post('/characters', (req, res) => {
  try {
    const characters = req.body.characters || [];
    const assets = assetManager.registerCharacters(characters);
    res.json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 批量注册场景
router.post('/scenes', (req, res) => {
  try {
    const scenes = req.body.scenes || [];
    const assets = assetManager.registerScenes(scenes);
    res.json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 更新资产
router.put('/:code', (req, res) => {
  try {
    const asset = assetManager.updateAsset(req.params.code, req.body);
    if (!asset) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }
    res.json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 删除资产
router.delete('/:code', (req, res) => {
  try {
    const deleted = assetManager.deleteAsset(req.params.code);
    res.json({ success: true, deleted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取统计
router.get('/stats', (req, res) => {
  try {
    const stats = assetManager.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 导出资产库
router.get('/export', (req, res) => {
  try {
    const data = assetManager.exportJSON();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 导入资产库
router.post('/import', (req, res) => {
  try {
    const data = req.body.data;
    assetManager.importJSON(data);
    res.json({ success: true, message: 'Imported successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
