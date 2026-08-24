/**
 * 资产编号体系管理器
 * 支持 CH/SC/PR/CO/ST/CL/NP/AU/MAP 等编号系统
 */

class AssetManager {
  constructor() {
    this.assets = new Map();
    this.counters = {
      CH: 0,  // 角色 (Character)
      SC: 0,  // 场景 (Scene)
      PR: 0,  // 道具 (Prop)
      CO: 0,  // 服装 (Costume)
      ST: 0,  // 风格 (Style)
      CL: 0,  // 色彩光影 (Color & Lighting)
      NP: 0,  // 防跑偏 (No-Pivot)
      AU: 0,  // 声音参考 (Audio)
      MAP: 0, // 调度图 (Map)
      SCV: 0, // 场景多角度 (Scene View)
      SB: 0,  // 空间侧别 (Side View)
      CR: 0,  // 人群 (Crowd)
      FF: 0   // 首帧 (First Frame)
    };
  }

  /**
   * 获取下一个编号
   */
  getNextCode(type) {
    this.counters[type]++;
    return `${type}${String(this.counters[type]).padStart(3, '0')}`;
  }

  /**
   * 注册新资产
   */
  registerAsset(type, name, options = {}) {
    const code = this.getNextCode(type);
    const asset = {
      code,
      type,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      references: options.references || [],
      metadata: options.metadata || {},
      ...options
    };
    
    if (!this.assets.has(code)) {
      this.assets.set(code, asset);
    }
    
    return asset;
  }

  /**
   * 批量注册角色
   */
  registerCharacters(characters) {
    return characters.map(char => this.registerAsset('CH', char.name, {
      ...char,
      references: char.references || [],
      metadata: {
        appearance: char.appearance || {},
        personality: char.personality || {},
        voice: char.voice || {}
      }
    }));
  }

  /**
   * 批量注册场景
   */
  registerScenes(scenes) {
    return scenes.map(scene => this.registerAsset('SC', scene.name, {
      ...scene,
      metadata: {
        location: scene.location || {},
        timeOfDay: scene.timeOfDay || 'day',
        weather: scene.weather || 'clear'
      }
    }));
  }

  /**
   * 获取资产库统计
   */
  getStats() {
    const stats = {
      total: this.assets.size,
      byType: {}
    };
    
    this.assets.forEach(asset => {
      stats.byType[asset.type] = (stats.byType[asset.type] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * 导出资产库为 JSON
   */
  exportJSON() {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      counters: Object.fromEntries(this.counters),
      assets: Array.from(this.assets.values())
    };
  }

  /**
   * 从 JSON 导入资产库
   */
  importJSON(data) {
    if (data.counters) {
      this.counters = { ...this.counters, ...data.counters };
    }
    
    if (data.assets) {
      data.assets.forEach(asset => {
        this.assets.set(asset.code, asset);
      });
    }
    
    return this;
  }

  /**
   * 根据编号查找资产
   */
  findByCode(code) {
    return this.assets.get(code) || null;
  }

  /**
   * 按类型查找资产
   */
  findByType(type) {
    return Array.from(this.assets.values()).filter(a => a.type === type);
  }

  /**
   * 更新资产
   */
  updateAsset(code, updates) {
    const asset = this.assets.get(code);
    if (asset) {
      Object.assign(asset, updates, { updatedAt: new Date().toISOString() });
      return asset;
    }
    return null;
  }

  /**
   * 删除资产
   */
  deleteAsset(code) {
    return this.assets.delete(code);
  }
}

// 导出单例
export const assetManager = new AssetManager();
export default assetManager;
