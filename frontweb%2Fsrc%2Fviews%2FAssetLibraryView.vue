<template>
  <div class="asset-view">
    <el-header>
      <h2>资产库</h2>
      <div>
        <el-button @click="showAssetDialog = true">新建资产</el-button>
        <el-button type="primary" @click="exportAssets">导出</el-button>
      </div>
    </el-header>
    
    <el-main>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="角色" name="CH">
          <el-table :data="filteredAssets('CH')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="appearance" label="外貌特征" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="场景" name="SC">
          <el-table :data="filteredAssets('SC')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="location" label="位置" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="道具" name="PR">
          <el-table :data="filteredAssets('PR')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="服装" name="CO">
          <el-table :data="filteredAssets('CO')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="风格" name="ST">
          <el-table :data="filteredAssets('ST')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="色彩光影" name="CL">
          <el-table :data="filteredAssets('CL')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="防跑偏" name="NP">
          <el-table :data="filteredAssets('NP')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="声音参考" name="AU">
          <el-table :data="filteredAssets('AU')" stripe>
            <el-table-column prop="code" label="编号" width="100" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="small" @click="editAsset(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteAsset(row.code)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    
    <!-- 资产编辑对话框 -->
    <el-dialog v-model="showAssetDialog" :title="editingAsset ? '编辑资产' : '新建资产'">
      <el-form :model="form" label-width="100px">
        <el-form-item label="资产类型">
          <el-select v-model="form.type" :disabled="!!editingAsset">
            <el-option label="角色" value="CH" />
            <el-option label="场景" value="SC" />
            <el-option label="道具" value="PR" />
            <el-option label="服装" value="CO" />
            <el-option label="风格" value="ST" />
            <el-option label="色彩光影" value="CL" />
            <el-option label="防跑偏" value="NP" />
            <el-option label="声音参考" value="AU" />
          </el-select>
        </el-form-item>
        <el-form-item label="资产名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="外貌特征" v-if="form.type === 'CH'">
          <el-input v-model="form.appearance" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="位置" v-if="form.type === 'SC'">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="参考图片">
          <el-upload action="#" list-type="picture-card">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAssetDialog = false">取消</el-button>
        <el-button type="primary" @click="saveAsset">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const activeTab = ref('CH')
const showAssetDialog = ref(false)
const editingAsset = ref(null)
const form = ref({
  type: 'CH',
  name: '',
  appearance: '',
  location: '',
  description: ''
})

const allAssets = ref([])

// 计算属性：按类型过滤
function filteredAssets(type) {
  return allAssets.value.filter(a => a.type === type)
}

// 加载资产
async function loadAssets() {
  try {
    const res = await fetch('/api/assets')
    const data = await res.json()
    if (data.success) {
      allAssets.value = data.data
    }
  } catch (error) {
    console.error('Failed to load assets:', error)
  }
}

// 编辑资产
function editAsset(asset) {
  editingAsset.value = asset
  form.value = { ...asset }
  showAssetDialog.value = true
}

// 保存资产
async function saveAsset() {
  try {
    if (editingAsset.value) {
      await fetch(`/api/assets/${editingAsset.value.code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
      ElMessage.success('资产已更新')
    } else {
      await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
      ElMessage.success('资产已创建')
    }
    showAssetDialog.value = false
    editingAsset.value = null
    form.value = { type: 'CH', name: '', appearance: '', location: '', description: '' }
    await loadAssets()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 删除资产
async function deleteAsset(code) {
  try {
    await fetch(`/api/assets/${code}`, { method: 'DELETE' })
    ElMessage.success('资产已删除')
    await loadAssets()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 导出资产
function exportAssets() {
  fetch('/api/assets/export')
    .then(res => res.json())
    .then(data => {
      const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assets-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
    })
}

loadAssets()
</script>

<style scoped>
.asset-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-header h2 {
  margin: 0;
  font-size: 20px;
}

.el-main {
  padding: 20px;
}
</style>
