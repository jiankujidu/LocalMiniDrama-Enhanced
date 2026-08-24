/**
 * Seedance 2.0 C 模式提示词生成器
 * 完整版：素材锚定/风格锁定/硬锁/段末状态锚定
 */

class SeedancePromptGenerator {
  constructor(options = {}) {
    this.options = {
      mode: 'C', // A/B/C 三种模式
      strictMode: options.strictMode !== false,
      includeSound: options.includeSound !== false,
      language: options.language || 'zh-CN'
    };
  }

  /**
   * 生成完整 C 模式提示词
   */
  generateCModePrompt(storyboard, assets = {}) {
    const lines = [];
    
    // 1. 特别注意
    lines.push('【特别注意】');
    if (storyboard.focal_length) {
      lines.push(`- 使用 ${storyboard.focal_length} 焦段拍摄`);
    }
    if (storyboard.aperture) {
      lines.push(`- 光圈 ${storyboard.aperture}`);
    }
    if (storyboard.depth_of_field) {
      lines.push(`- ${storyboard.depth_of_field} 景深`);
    }
    lines.push('- 保持画面稳定，无抖动');
    lines.push('- 人物动作自然流畅');
    
    // 2. 素材锚定
    lines.push('\n【素材锚定】');
    const charRefs = assets.characters || [];
    if (charRefs.length > 0) {
      const refCodes = charRefs.map(c => c.asset_code || c.code).join(', ');
      lines.push(`- 角色：${refCodes}（参考图中的人物形象）`);
    }
    
    const scRefs = assets.scenes || [];
    if (scRefs.length > 0) {
      const refCodes = scRefs.map(s => s.asset_code || s.code).join(', ');
      lines.push(`- 场景：${refCodes}（参考图中的场景设计）`);
    }
    
    // 3. 参考连续性声明
    lines.push('\n【参考连续性声明】');
    lines.push('- 本镜头与前后镜头保持一致的角色造型和场景设计');
    lines.push('- 服装、发型、妆容需与前镜衔接');
    lines.push('- 光影方向保持一致');
    
    // 4. 风格锁定
    lines.push('\n【风格锁定】');
    if (storyboard.style) {
      lines.push(`- 整体风格：${storyboard.style}`);
    }
    lines.push('- 动漫风格渲染');
    lines.push('- 电影感调色');
    
    // 5. 场景锚定
    lines.push('\n【场景锚定】');
    if (storyboard.location) {
      lines.push(`- 地点：${storyboard.location}`);
    }
    if (storyboard.time) {
      lines.push(`- 时间：${storyboard.time}`);
      lines.push(`- 光源方向：${this.getTimeLighting(storyboard.time)}`);
    }
    
    // 6. 镜头轨
    lines.push('\n【镜头轨】');
    if (storyboard.shot_type) {
      lines.push(`- 景别：${storyboard.shot_type}`);
    }
    if (storyboard.movement) {
      lines.push(`- 运镜：${storyboard.movement}`);
    }
    if (storyboard.angle) {
      lines.push(`- 角度：${storyboard.angle}`);
    }
    
    // 7. 主体动作
    lines.push('\n【主体动作】');
    if (storyboard.action) {
      lines.push(`- 主体动作：${storyboard.action}`);
    }
    if (storyboard.expression) {
      lines.push(`- 表情：${storyboard.expression}`);
    }
    
    // 8. 台词与语气
    if (this.options.includeSound && storyboard.dialogue) {
      lines.push('\n【声音轨】');
      lines.push(`- 台词：${storyboard.dialogue}`);
      if (storyboard.tone) {
        lines.push(`- 语气：${storyboard.tone}`);
      }
      if (storyboard.bgm) {
        lines.push(`- BGM：${storyboard.bgm}`);
      }
    }
    
    // 9. 硬锁
    lines.push('\n【硬锁】');
    if (storyboard.constraints) {
      lines.push(`- 禁止：${storyboard.constraints}`);
    }
    if (storyboard.required_elements) {
      lines.push(`- 必须包含：${storyboard.required_elements}`);
    }
    
    // 10. 段末状态锚定
    lines.push('\n【段末状态锚定】');
    if (storyboard.result) {
      lines.push(`- 本镜结束时：${storyboard.result}`);
    }
    if (storyboard.next_segment_anchor) {
      lines.push(`- 要求下一镜开始时：${storyboard.next_segment_anchor}`);
    }
    
    // 11. 光影参数
    if (storyboard.lighting) {
      lines.push('\n【光影参数】');
      lines.push(`- 光照：${storyboard.lighting}`);
    }
    
    // 12. 构图
    if (storyboard.composition) {
      lines.push('\n【构图】');
      lines.push(`- 构图：${storyboard.composition}`);
    }
    
    return lines.join('\n');
  }

  /**
   * 生成 B 模式提示词（简化版）
   */
  generateBModePrompt(storyboard) {
    const lines = [];
    
    lines.push('【镜头描述】');
    lines.push(`- 景别：${storyboard.shot_type || '中景'}`);
    lines.push(`- 运镜：${storyboard.movement || '固定'}`);
    lines.push(`- 主体：${storyboard.action || '人物站立'}`);
    
    if (storyboard.expression) {
      lines.push(`- 表情：${storyboard.expression}`);
    }
    
    if (storyboard.bgm) {
      lines.push(`- BGM：${storyboard.bgm}`);
    }
    
    return lines.join('\n');
  }

  /**
   * 生成 A 模式提示词（极简版）
   */
  generateAModePrompt(storyboard) {
    return `【景别：${storyboard.shot_type || '中景'}】【运镜：${storyboard.movement || '固定'}】【动作：${storyboard.action || ''}】【表情：${storyboard.expression || ''}】`;
  }

  /**
   * 根据时间获取光源方向
   */
  getTimeLighting(time) {
    const lightingMap = {
      '清晨': '低角度暖光，来自东方',
      '上午': '高角度柔光，来自东南',
      '中午': '顶光，强烈直射',
      '下午': '侧光，来自西方',
      '黄昏': '低角度暖光，来自西方',
      '夜晚': '人工光源，多方向',
      '黎明': '低角度冷光，来自东方'
    };
    
    for (const [key, value] of Object.entries(lightingMap)) {
      if (time.includes(key)) return value;
    }
    
    return '自然光，方向不定';
  }

  /**
   * 批量生成提示词
   */
  batchGenerate(storyboards, assets = {}) {
    return storyboards.map(sb => ({
      ...sb,
      prompt: this.generateCModePrompt(sb, assets),
      timestamp: new Date().toISOString()
    }));
  }

  /**
   * 生成资产参考文本
   */
  generateAssetReferences(assets) {
    const lines = [];
    
    if (assets.characters) {
      lines.push('【角色参考】');
      assets.characters.forEach(char => {
        lines.push(`- ${char.code || char.asset_code}: ${char.name}`);
        if (char.appearance) {
          lines.push(`  外貌：${char.appearance}`);
        }
        if (char.costume) {
          lines.push(`  服装：${char.costume}`);
        }
      });
    }
    
    if (assets.scenes) {
      lines.push('\n【场景参考】');
      assets.scenes.forEach(scene => {
        lines.push(`- ${scene.code || scene.asset_code}: ${scene.name}`);
        if (scene.description) {
          lines.push(`  描述：${scene.description}`);
        }
      });
    }
    
    return lines.join('\n');
  }
}

// 导出实例
export const seedancePrompt = new SeedancePromptGenerator();
export default seedancePrompt;
