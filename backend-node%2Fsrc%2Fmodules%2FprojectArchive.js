/**
 * 项目档案管理器
 * 支持竖屏/横版双模板和平台节奏档案
 */

class ProjectArchive {
  constructor() {
    this.archives = new Map();
    this.platformProfiles = {
      douyin: {
        name: '抖音',
        format: '9:16 竖屏',
        resolution: '1080x1920',
        max_duration: 60,
        min_hook_duration: 3,
        rhythm: 'fast',
        style: 'high_saturation',
        sound: 'trendy_bgm'
      },
      kuaishou: {
        name: '快手',
        format: '9:16 竖屏',
        resolution: '1080x1920',
        max_duration: 60,
        min_hook_duration: 3,
        rhythm: 'fast',
        style: 'high_saturation',
        sound: 'local_music'
      },
      bilibili: {
        name: 'B站',
        format: '16:9 横版',
        resolution: '1920x1080',
        max_duration: 300,
        min_hook_duration: 5,
        rhythm: 'medium',
        style: 'anime',
        sound: 'ambient'
      },
      wechat: {
        name: '视频号',
        format: '9:16 竖屏',
        resolution: '1080x1920',
        max_duration: 60,
        min_hook_duration: 3,
        rhythm: 'medium_fast',
        style: 'balanced',
        sound: 'clear_voice'
      },
      netflix: {
        name: 'Netflix',
        format: '16:9 横版',
        resolution: '3840x2160',
        max_duration: 3600,
        min_hook_duration: 10,
        rhythm: 'cinematic',
        style: 'film_grade',
        sound: 'cinematic_audio'
      }
    };
  }

  /**
   * 创建项目档案
   */
  createProject(project) {
    const id = `PRJ${String(this.archives.size + 1).padStart(4, '0')}`;
    const archive = {
      id,
      name: project.name,
      description: project.description || '',
      format: project.format || '9:16',
      platform: project.platform || 'douyin',
      status: project.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // 基本信息
      genre: project.genre || '',
      episode_count: project.episode_count || 0,
      episode_duration: project.episode_duration || 60,
      total_shots: project.total_shots || 0,
      
      // 平台配置
      aspect_ratio: project.aspect_ratio || '9:16',
      resolution: project.resolution || '1080x1920',
      frame_rate: project.frame_rate || 24,
      
      // 节奏配置
      rhythm_preset: project.rhythm_preset || 'short_video',
      hook_duration: project.hook_duration || 3,
      
      // 风格配置
      art_style: project.art_style || 'anime',
      color_grade: project.color_grade || 'balanced',
      lighting_style: project.lighting_style || 'natural',
      
      // 资产统计
      character_count: project.character_count || 0,
      scene_count: project.scene_count || 0,
      prop_count: project.prop_count || 0,
      
      // 技术配置
      ai_models: project.ai_models || ['seedance'],
      output_format: project.output_format || 'mp4',
      quality: project.quality || 'high',
      
      // 元数据
      tags: project.tags || [],
      notes: project.notes || ''
    };
    
    this.archives.set(id, archive);
    return archive;
  }

  /**
   * 获取项目
   */
  getProject(id) {
    return this.archives.get(id) || null;
  }

  /**
   * 更新项目
   */
  updateProject(id, updates) {
    const project = this.archives.get(id);
    if (project) {
      Object.assign(project, updates, { updatedAt: new Date().toISOString() });
      return project;
    }
    return null;
  }

  /**
   * 删除项目
   */
  deleteProject(id) {
    return this.archives.delete(id);
  }

  /**
   * 获取平台档案
   */
  getPlatformProfile(platform) {
    return this.platformProfiles[platform] || null;
  }

  /**
   * 根据平台推荐配置
   */
  recommendConfig(platform) {
    const profile = this.platformProfiles[platform];
    if (!profile) return null;
    
    return {
      aspect_ratio: profile.format,
      resolution: profile.resolution,
      rhythm_preset: profile.rhythm,
      art_style: profile.style,
      hook_duration: profile.min_hook_duration
    };
  }

  /**
   * 列出所有项目
   */
  listProjects() {
    return Array.from(this.archives.values());
  }

  /**
   * 按状态筛选
   */
  filterByStatus(status) {
    return this.archives.values().filter(p => p.status === status);
  }

  /**
   * 按平台筛选
   */
  filterByPlatform(platform) {
    return this.archives.values().filter(p => p.platform === platform);
  }

  /**
   * 导出项目档案
   */
  exportJSON() {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      projects: Array.from(this.archives.values()),
      platformProfiles: this.platformProfiles
    };
  }

  /**
   * 导入项目档案
   */
  importJSON(data) {
    if (data.projects) {
      data.projects.forEach(project => this.archives.set(project.id, project));
    }
    if (data.platformProfiles) {
      this.platformProfiles = { ...this.platformProfiles, ...data.platformProfiles };
    }
    return this;
  }

  /**
   * 统计
   */
  getStats() {
    const projects = Array.from(this.archives.values());
    return {
      total: projects.length,
      byStatus: this.countByField(projects, 'status'),
      byPlatform: this.countByField(projects, 'platform'),
      byFormat: this.countByField(projects, 'format')
    };
  }

  /**
   * 辅助方法
   */
  countByField(projects, field) {
    const counts = {};
    projects.forEach(p => {
      const value = p[field] || 'unknown';
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  }
}

// 导出单例
export const projectArchive = new ProjectArchive();
export default projectArchive;
