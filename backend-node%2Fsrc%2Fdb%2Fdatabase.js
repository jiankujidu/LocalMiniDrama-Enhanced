/**
 * 数据库连接管理
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class DBManager {
  constructor(options = {}) {
    this.dataDir = options.dataDir || path.join(process.cwd(), 'data');
    this.dbPath = path.join(this.dataDir, 'upingdrama.db');
    this.db = null;
    
    // 确保数据目录存在
    fs.mkdirSync(this.dataDir, { recursive: true });
  }

  /**
   * 初始化数据库连接
   */
  connect() {
    if (this.db) return this.db;
    
    this.db = new Database(this.dbPath);
    
    // 性能优化
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('synchronous = NORMAL');
    this.db.pragma('cache_size = -64000');
    this.db.pragma('temp_store = MEMORY');
    
    return this.db;
  }

  /**
   * 获取数据库实例
   */
  get() {
    return this.connect();
  }

  /**
   * 关闭数据库连接
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * 执行事务
   */
  transaction(fn) {
    const db = this.connect();
    return db.transaction(fn)();
  }

  /**
   * 批量插入
   */
  batchInsert(table, records) {
    const db = this.connect();
    const cols = Object.keys(records[0]);
    const placeholders = cols.map(() => '?').join(',');
    const sql = `INSERT INTO ${table} (${cols.join(',')}) VALUES (${placeholders})`;
    
    const stmt = db.prepare(sql);
    const insert = db.transaction(() => {
      for (const record of records) {
        stmt.run(...cols.map(c => record[c]));
      }
    });
    
    insert();
    return records.length;
  }
}

// 导出单例
const dbManager = new DBManager();
module.exports = dbManager;
module.exports.DBManager = DBManager;
