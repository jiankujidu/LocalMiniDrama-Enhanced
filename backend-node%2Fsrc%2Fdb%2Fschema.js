/**
 * 数据库初始化脚本
 * 包含增强版的表结构
 */

const Database = require('./database');

class Schema {
  static init(db) {
    this.createTables(db);
    this.createIndexes(db);
    return db;
  }

  static createTables(db) {
    // 项目档案表
    db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        format TEXT DEFAULT '9:16',
        platform TEXT DEFAULT 'douyin',
        status TEXT DEFAULT 'draft',
        aspect_ratio TEXT,
        resolution TEXT,
        frame_rate INTEGER,
        rhythm_preset TEXT,
        art_style TEXT,
        color_grade TEXT,
        lighting_style TEXT,
        ai_models TEXT DEFAULT '["seedance"]',
        output_format TEXT DEFAULT 'mp4',
        quality TEXT DEFAULT 'high',
        character_count INTEGER DEFAULT 0,
        scene_count INTEGER DEFAULT 0,
        prop_count INTEGER DEFAULT 0,
        episode_count INTEGER DEFAULT 0,
        episode_duration INTEGER DEFAULT 60,
        total_shots INTEGER DEFAULT 0,
        hook_duration INTEGER DEFAULT 3,
        tags TEXT DEFAULT '[]',
        notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // 资产库表
    db.exec(`
      CREATE TABLE IF NOT EXISTS assets (
        code TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        references TEXT DEFAULT '[]',
        metadata TEXT DEFAULT '{}',
        project_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);

    // 分镜表
    db.exec(`
      CREATE TABLE IF NOT EXISTS storyboards (
        id TEXT PRIMARY KEY,
        shot_number TEXT NOT NULL,
        project_id TEXT NOT NULL,
        segment_index INTEGER DEFAULT 0,
        shot_index INTEGER DEFAULT 0,
        
        -- 画面参数
        shot_type TEXT,
        movement TEXT,
        angle TEXT,
        focal_length TEXT,
        aperture TEXT,
        depth_of_field TEXT,
        composition TEXT,
        
        -- 内容
        action TEXT,
        expression TEXT,
        dialogue TEXT,
        tone TEXT,
        
        -- 环境
        location TEXT,
        time TEXT,
        lighting TEXT,
        
        -- 风格
        style TEXT,
        
        -- 结果和衔接
        result TEXT,
        next_segment_anchor TEXT,
        
        -- 限制
        constraints TEXT,
        required_elements TEXT,
        
        -- 声音
        bgm TEXT,
        sfx TEXT,
        
        -- 节奏
        rhythm_preset TEXT,
        duration REAL,
        
        -- 资产关联
        characters TEXT DEFAULT '[]',
        scenes TEXT DEFAULT '[]',
        props TEXT DEFAULT '[]',
        costumes TEXT DEFAULT '[]',
        
        -- 元数据
        prompt TEXT,
        status TEXT DEFAULT 'draft',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);

    // BGM 库表
    db.exec(`
      CREATE TABLE IF NOT EXISTS bgm_library (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        genre TEXT,
        mood TEXT,
        bpm INTEGER,
        duration INTEGER,
        tags TEXT DEFAULT '[]',
        file_path TEXT,
        project_id TEXT,
        created_at TEXT NOT NULL
      )
    `);

    // 音效库表
    db.exec(`
      CREATE TABLE IF NOT EXISTS sfx_library (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        file_path TEXT,
        tags TEXT DEFAULT '[]',
        project_id TEXT,
        created_at TEXT NOT NULL
      )
    `);

    // 声音参考表
    db.exec(`
      CREATE TABLE IF NOT EXISTS sound_references (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT,
        url TEXT,
        description TEXT,
        tags TEXT DEFAULT '[]',
        project_id TEXT,
        created_at TEXT NOT NULL
      )
    `);
  }

  static createIndexes(db) {
    db.exec(`CREATE INDEX IF NOT EXISTS idx_projects_platform ON projects(platform)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(type)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_assets_project ON assets(project_id)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_storyboards_project ON storyboards(project_id)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_storyboards_segment ON storyboards(segment_index)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_storyboards_status ON storyboards(status)`);
  }
}

module.exports = Schema;
