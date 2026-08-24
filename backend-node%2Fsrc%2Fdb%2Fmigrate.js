/**
 * 数据库迁移脚本
 */

const dbManager = require('./database');
const Schema = require('./schema');

function migrate() {
  console.log('Running database migrations...');
  
  const db = dbManager.connect();
  Schema.init(db);
  
  console.log('Migration completed!');
  dbManager.close();
}

// 执行迁移
if (require.main === module) {
  migrate();
}

module.exports = migrate;
