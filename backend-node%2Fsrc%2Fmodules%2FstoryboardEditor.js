/**
 * 分镜编辑器增强版
 * 包含 11 个必需字段和资产关联
 */

class StoryboardEditor {
  constructor() {
    this.requiredFields = [
      'shot_number',      // 镜头编号
      'shot_type',        // 景别
      'movement',         // 运镜
      'action',           // 主体动作
      'expression',       // 表情
      'dialogue',         // 台词
      'tone',             // 语气
      'location',         // 地点
      'time',             // 时间
      'style',            // 风格
      'result'            // 结果/段末状态
    ];
    
    this.optionalFields = [
      'focal_length',     // 焦段
      'aperture',         // 光圈
      'depth_of_field',   // 景深与焦点锁
      'angle',            // 机位角度
      'composition',      // 构图
      'lighting',         // 光影
      'constraints',      // 限制
      'next_segment_anchor', // 下一段衔接
      'bgm',              // BGM
      'sfx',              // 音效
      'rhythm_preset'     // 节奏档位
    ];
    
    this.assetFields = [
      'characters',       // 角色资产关联
      'scenes',           // 场景资产关联
      'props',            // 道具资产关联
      'costumes'          // 服装资产关联
    ];
  }

  /**
   * 创建默认分镜模板
   */
  createTemplate(segmentIndex, shotIndex) {
    return {
      // 基础信息
      shot_number: `S${String(segmentIndex + 1).padStart(2, '0')}-S${String(shotIndex + 1).padStart(3, '0')}`,
      segment_index: segmentIndex,
      shot_index: shotIndex,
      
      // 画面参数
      shot_type: '中景',           // 景别：大特写/特写/近景/中景/全景/远景
      movement: '固定',             // 运镜：固定/推/拉/摇/移/升降/手持
      angle: '平视',               // 机位角度：平视/仰视/俯视/虫视/鸟视
      
      // 内容
      action: '',                   // 主体动作
      expression: '中性',          // 表情
      dialogue: '',                 // 台词
      tone: '正常',                 // 语气
      
      // 环境
      location: '',                 // 地点
      time: '白天',                 // 时间：清晨/上午/中午/下午/黄昏/夜晚
      lighting: '自然光',          // 光影
      
      // 风格
      style: '动漫风格',           // 整体风格
      composition: '居中构图',     // 构图方式
      
      // 结果
      result: '动作完成',          // 本镜结束时状态
      
      // 衔接
      next_segment_anchor: '',     // 下一镜开始要求
      
      // 限制
      constraints: '',              // 禁止事项
      required_elements: '',        // 必须包含
      
      // 资产关联
      characters: [],
      scenes: [],
      props: [],
      costumes: [],
      
      // 高级参数
      focal_length: '',             // 焦段
      aperture: '',                 // 光圈
      depth_of_field: '',           // 景深
      bgm: '',                      // BGM
      sfx: '',                      // 音效
      rhythm_preset: 'cinematic'    // 节奏档位
    };
  }

  /**
   * 验证分镜字段
   */
  validate(storyboard) {
    const errors = [];
    const warnings = [];
    
    // 必填字段检查
    this.requiredFields.forEach(field => {
      if (!storyboard[field] || storyboard[field].toString().trim() === '') {
        warnings.push(`建议填写：${this.getFieldName(field)}`);
      }
    });
    
    // 资产关联检查
    if (storyboard.characters && storyboard.characters.length === 0) {
      warnings.push('建议关联角色资产');
    }
    
    // 节奏档位检查
    if (storyboard.rhythm_preset) {
      const validPresets = ['cinematic', 'short_video', 'action', 'slow'];
      if (!validPresets.includes(storyboard.rhythm_preset)) {
        errors.push(`无效的节奏档位：${storyboard.rhythm_preset}`);
      }
    }
    
    // 场景锚定检查
    if (storyboard.result && !storyboard.next_segment_anchor) {
      warnings.push('建议设置段末状态锚定以衔接下一镜');
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * 获取字段中文名
   */
  getFieldName(field) {
    const names = {
      shot_number: '镜头编号',
      shot_type: '景别',
      movement: '运镜',
      action: '主体动作',
      expression: '表情',
      dialogue: '台词',
      tone: '语气',
      location: '地点',
      time: '时间',
      style: '风格',
      result: '段末状态',
      focal_length: '焦段',
      aperture: '光圈',
      depth_of_field: '景深',
      angle: '机位角度',
      composition: '构图',
      lighting: '光影',
      constraints: '限制',
      next_segment_anchor: '下一段衔接',
      bgm: 'BGM',
      sfx: '音效',
      rhythm_preset: '节奏档位'
    };
    return names[field] || field;
  }

  /**
   * 批量创建分镜
   */
  batchCreate(segmentCount, shotsPerSegment) {
    const storyboards = [];
    
    for (let seg = 0; seg < segmentCount; seg++) {
      for (let shot = 0; shot < shotsPerSegment; shot++) {
        storyboards.push(this.createTemplate(seg, shot));
      }
    }
    
    return storyboards;
  }

  /**
   * 更新分镜
   */
  update(storyboard, updates) {
    return {
      ...storyboard,
      ...updates,
      updated_at: new Date().toISOString()
    };
  }

  /**
   * 克隆分镜
   */
  clone(storyboard) {
    return {
      ...storyboard,
      shot_number: `${storyboard.shot_number}_copy`,
      updated_at: new Date().toISOString()
    };
  }
}

// 导出单例
export const storyboardEditor = new StoryboardEditor();
export default storyboardEditor;
