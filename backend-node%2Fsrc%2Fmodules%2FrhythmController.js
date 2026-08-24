/**
 * 节奏档位控制器
 * 支持电影感/短视频/高密度/慢节奏四档预设
 */

class RhythmController {
  constructor() {
    this.presets = {
      cinematic: {
        name: '电影感',
        description: '中速节奏，注重画面质感和叙事完整性',
        shot_duration: { min: 3, max: 8, avg: 5 },
        camera_movement: '缓推/摇移/升降',
        editing_style: '长镜头为主，少切',
        bpm: '60-80',
        platform: ['院线', '长视频平台'],
        aspect_ratio: '16:9 或 2.35:1',
        color_grading: '电影调色',
        sound_design: '层次丰富，BGM 完整'
      },
      short_video: {
        name: '短视频高密度',
        description: '快节奏强钩子，适合抖音/快手等平台',
        shot_duration: { min: 1, max: 3, avg: 2 },
        camera_movement: '快速推拉/甩镜/抖动',
        editing_style: '频繁切换，每2-3秒一镜',
        bpm: '120-140',
        platform: ['抖音', '快手', '视频号'],
        aspect_ratio: '9:16 竖屏',
        color_grading: '高饱和，对比强烈',
        sound_design: '强节奏 BGM，音效突出'
      },
      action: {
        name: '高强度动作',
        description: '快节奏动作戏，紧张刺激',
        shot_duration: { min: 0.5, max: 2, avg: 1 },
        camera_movement: '手持跟拍/快速摇移/动态追踪',
        editing_style: '快速剪辑，动作连贯',
        bpm: '140-160',
        platform: ['全平台'],
        aspect_ratio: '灵活',
        color_grading: '冷色调，高对比',
        sound_design: '打击感强，音效密集'
      },
      slow: {
        name: '慢节奏高信息',
        description: '慢节奏但信息量大，适合文艺片',
        shot_duration: { min: 5, max: 15, avg: 10 },
        camera_movement: '固定/缓推/长镜头',
        editing_style: '极少切镜，完整叙事',
        bpm: '40-60',
        platform: ['院线', '电影节'],
        aspect_ratio: '2.35:1 或 16:9',
        color_grading: '自然光感',
        sound_design: '环境音丰富，BGM 克制'
      }
    };
  }

  /**
   * 获取预设
   */
  getPreset(name) {
    return this.presets[name] || null;
  }

  /**
   * 根据平台推荐档位
   */
  recommendForPlatform(platform) {
    const platformMap = {
      '抖音': 'short_video',
      '快手': 'short_video',
      '视频号': 'short_video',
      'B站': 'cinematic',
      'YouTube': 'cinematic',
      '院线': 'cinematic',
      'Netflix': 'cinematic',
      '动作片': 'action',
      '文艺片': 'slow'
    };
    
    for (const [key, value] of Object.entries(platformMap)) {
      if (platform.includes(key)) return this.presets[value];
    }
    
    return this.presets.cinematic;
  }

  /**
   * 根据类型推荐档位
   */
  recommendForGenre(genre) {
    const genreMap = {
      '爽剧': 'short_video',
      '甜宠': 'short_video',
      '悬疑': 'cinematic',
      '动作': 'action',
      '文艺': 'slow',
      '喜剧': 'short_video',
      '恐怖': 'action'
    };
    
    return this.presets[genreMap[genre]] || this.presets.cinematic;
  }

  /**
   * 计算镜头时长建议
   */
  suggestShotDuration(presetName, shotIndex, totalShots) {
    const preset = this.presets[presetName];
    if (!preset) return 3;
    
    const avg = preset.shot_duration.avg;
    const variation = (Math.sin(shotIndex * 0.5) + 1) * 0.5; // 0-1 波动
    
    return Math.round(avg * (0.7 + variation * 0.6) * 10) / 10;
  }

  /**
   * 生成节奏曲线
   */
  generateRhythmCurve(presetName, shotCount) {
    const preset = this.presets[presetName];
    const curve = [];
    
    for (let i = 0; i < shotCount; i++) {
      const duration = this.suggestShotDuration(presetName, i, shotCount);
      curve.push({
        shot_index: i,
        duration,
        intensity: this.calculateIntensity(presetName, i, shotCount)
      });
    }
    
    return curve;
  }

  /**
   * 计算镜头强度
   */
  calculateIntensity(presetName, shotIndex, totalShots) {
    const preset = this.presets[presetName];
    if (!preset) return 0.5;
    
    // 开头和结尾强度高
    const startWeight = shotIndex < totalShots * 0.1 ? 1.2 : 1;
    const endWeight = shotIndex >= totalShots * 0.9 ? 1.3 : 1;
    
    // 中间有波峰波谷
    const wave = 0.5 + 0.3 * Math.sin(shotIndex * Math.PI * 2 / totalShots);
    
    return Math.min(1, startWeight * endWeight * wave);
  }

  /**
   * 应用预设到分镜
   */
  applyPreset(storyboard, presetName) {
    const preset = this.presets[presetName];
    if (!preset) return storyboard;
    
    return {
      ...storyboard,
      rhythm_preset: presetName,
      recommended_duration: preset.shot_duration.avg,
      camera_movement_style: preset.camera_movement,
      editing_style: preset.editing_style
    };
  }

  /**
   * 批量应用预设
   */
  batchApply(storyboards, presetName) {
    return storyboards.map(sb => this.applyPreset(sb, presetName));
  }
}

// 导出单例
export const rhythmController = new RhythmController();
export default rhythmController;
