/**
 * 分镜 API 路由
 */

const express = require('express');
const router = express.Router();
const storyboardEditor = require('../modules/storyboardEditor');
const seedancePrompt = require('../modules/seedancePrompt');
const rhythmController = require('../modules/rhythmController');

// 获取分镜列表
router.get('/', (req, res) => {
  try {
    const { project_id, segment, status } = req.query;
    // TODO: 从数据库查询
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 创建分镜
router.post('/', (req, res) => {
  try {
    const { segment_index, shot_index, ...data } = req.body;
    const template = storyboardEditor.createTemplate(segment_index, shot_index);
    const storyboard = storyboardEditor.update(template, data);
    
    // 生成提示词
    if (storyboard.rhythm_preset) {
      const preset = rhythmController.getPreset(storyboard.rhythm_preset);
      if (preset) {
        storyboard.recommended_duration = preset.shot_duration.avg;
      }
    }
    
    res.json({ success: true, data: storyboard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 批量创建分镜
router.post('/batch', (req, res) => {
  try {
    const { segment_count, shots_per_segment, ...overrides } = req.body;
    const storyboards = storyboardEditor.batchCreate(segment_count, shots_per_segment);
    
    // 应用覆盖参数
    if (Object.keys(overrides).length > 0) {
      storyboards.forEach(sb => {
        Object.assign(sb, overrides);
      });
    }
    
    res.json({ success: true, data: storyboards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取单个分镜
router.get('/:shot_number', (req, res) => {
  try {
    // TODO: 从数据库查询
    res.json({ success: true, data: null });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 更新分镜
router.put('/:shot_number', (req, res) => {
  try {
    const storyboard = storyboardEditor.update(
      { shot_number: req.params.shot_number },
      req.body
    );
    res.json({ success: true, data: storyboard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 生成 Seedance C 模式提示词
router.post('/:shot_number/prompt', (req, res) => {
  try {
    const storyboard = req.body.storyboard;
    const assets = req.body.assets || {};
    
    const prompt = seedancePrompt.generateCModePrompt(storyboard, assets);
    
    res.json({ success: true, data: { prompt } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 批量生成提示词
router.post('/batch-prompt', (req, res) => {
  try {
    const { storyboards, assets } = req.body;
    const prompts = seedancePrompt.batchGenerate(storyboards, assets);
    res.json({ success: true, data: prompts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 验证分镜
router.post('/:shot_number/validate', (req, res) => {
  try {
    const storyboard = req.body;
    const result = storyboardEditor.validate(storyboard);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 应用节奏档位
router.post('/:shot_number/rhythm', (req, res) => {
  try {
    const { preset_name } = req.body;
    const storyboard = storyboardEditor.applyPreset(req.body.storyboard, preset_name);
    res.json({ success: true, data: storyboard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 生成节奏曲线
router.post('/rhythm-curve', (req, res) => {
  try {
    const { preset_name, shot_count } = req.body;
    const curve = rhythmController.generateRhythmCurve(preset_name, shot_count);
    res.json({ success: true, data: curve });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 克隆分镜
router.post('/:shot_number/clone', (req, res) => {
  try {
    const storyboard = storyboardEditor.clone(req.body);
    res.json({ success: true, data: storyboard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
