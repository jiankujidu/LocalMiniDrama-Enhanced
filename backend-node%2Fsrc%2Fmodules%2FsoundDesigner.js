/**
 * 声音设计模块
 * 支持 BGM 曲线、SFX 分层、声音参考库
 */

class SoundDesigner {
  constructor() {
    this.bgms = new Map();
    this.sfxLib = new Map();
    this.references = [];
  }

  /**
   * 添加 BGM
   */
  addBGM(bgm) {
    const id = `BG${String(this.bgms.size + 1).padStart(3, '0')}`;
    this.bgms.set(id, {
      id,
      name: bgm.name || `BGM ${id}`,
      genre: bgm.genre || 'ambient',
      mood: bgm.mood || 'neutral',
      bpm: bgm.bpm || 120,
      duration: bgm.duration || 60,
      tags: bgm.tags || [],
      filePath: bgm.filePath || '',
      createdAt: new Date().toISOString()
    });
    return id;
  }

  /**
   * 添加音效库
   */
  addSFX(sfx) {
    const id = `FX${String(this.sfxLib.size + 1).padStart(3, '0')}`;
    this.sfxLib.set(id, {
      id,
      name: sfx.name || `音效 ${id}`,
      category: sfx.category || 'ambient',
      filePath: sfx.filePath || '',
      tags: sfx.tags || [],
      createdAt: new Date().toISOString()
    });
    return id;
  }

  /**
   * 生成 BGM 曲线
   */
  generateBMGCurve(segments, bgmId) {
    const bgm = this.bgms.get(bgmId);
    if (!bgm) return null;
    
    const curve = [];
    const totalDuration = segments.reduce((sum, s) => sum + (s.duration || 3), 0);
    const bpm = bgm.bpm || 120;
    const beatDuration = 60 / bpm;
    
    segments.forEach((seg, index) => {
      const segDuration = seg.duration || 3;
      const intensity = this.calculateSegmentIntensity(seg, index, segments.length);
      
      curve.push({
        segment_index: index,
        start_time: curve.reduce((sum, c) => sum + c.duration, 0),
        end_time: curve.reduce((sum, c) => sum + c.duration, 0) + segDuration,
        duration: segDuration,
        intensity,
        volume: Math.min(1, intensity * 0.8 + 0.2),
        effects: this.getSegmentEffects(seg, intensity)
      });
    });
    
    return curve;
  }

  /**
   * 计算段落强度
   */
  calculateSegmentIntensity(segment, index, totalSegments) {
    // 开头和结尾高强度
    if (index === 0 || index === totalSegments - 1) return 0.9;
    
    // 有高潮标记的段落高强度
    if (segment.climax) return 1.0;
    
    // 有紧张情绪的段落高强度
    if (segment.mood === 'tense' || segment.mood === 'dramatic') return 0.85;
    
    // 正常段落中等强度
    return 0.6;
  }

  /**
   * 获取段落音效
   */
  getSegmentEffects(segment, intensity) {
    const effects = [];
    
    if (segment.action && segment.action.includes('撞击')) {
      effects.push({ type: 'impact', intensity: 0.8 });
    }
    if (segment.action && segment.action.includes('爆炸')) {
      effects.push({ type: 'explosion', intensity: 1.0 });
    }
    if (segment.mood === 'scary') {
      effects.push({ type: 'horror_sting', intensity: 0.7 });
    }
    if (intensity > 0.8) {
      effects.push({ type: 'drum_fill', intensity: 0.6 });
    }
    
    return effects;
  }

  /**
   * 为分镜添加声音标记
   */
  annotateStoryboard(storyboard, soundDesign) {
    return {
      ...storyboard,
      sound_design: {
        bgm_track: soundDesign.bgm_track || [],
        sfx_layers: soundDesign.sfx_layers || [],
        ambient_sound: soundDesign.ambient_sound || '',
        silence_markers: soundDesign.silence_markers || [],
        notes: soundDesign.notes || ''
      }
    };
  }

  /**
   * 添加声音参考
   */
  addReference(reference) {
    const id = `REF${String(this.references.length + 1).padStart(3, '0')}`;
    this.references.push({
      id,
      name: reference.name || `参考 ${id}`,
      type: reference.type || 'bgm',
      url: reference.url || '',
      description: reference.description || '',
      tags: reference.tags || [],
      createdAt: new Date().toISOString()
    });
    return id;
  }

  /**
   * 导出声音设计
   */
  exportJSON() {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      bgms: Array.from(this.bgms.values()),
      sfxLib: Array.from(this.sfxLib.values()),
      references: this.references
    };
  }

  /**
   * 导入声音设计
   */
  importJSON(data) {
    if (data.bgms) {
      data.bgms.forEach(bgm => this.bgms.set(bgm.id, bgm));
    }
    if (data.sfxLib) {
      data.sfxLib.forEach(sfx => this.sfxLib.set(sfx.id, sfx));
    }
    if (data.references) {
      this.references = data.references;
    }
    return this;
  }

  /**
   * 统计
   */
  getStats() {
    return {
      bgmCount: this.bgms.size,
      sfxCount: this.sfxLib.size,
      referenceCount: this.references.length
    };
  }
}

// 导出单例
export const soundDesigner = new SoundDesigner();
export default soundDesigner;
