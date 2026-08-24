<template>
  <div class="sound-view">
    <el-header>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/projects' }">项目</el-breadcrumb-item>
          <el-breadcrumb-item>{{ project?.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>声音设计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button @click="showBGMDialog = true">添加 BGM</el-button>
        <el-button @click="showSFXDialog = true">添加音效</el-button>
        <el-button type="primary" @click="exportSoundDesign">导出</el-button>
      </div>
    </el-header>
    
    <el-main>
      <el-row :gutter="20">
        <!-- BGM 库 -->
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>BGM 库</span>
                <el-tag>{{ bgmLib.length }} 首</el-tag>
              </div>
            </template>
            
            <el-table :data="bgmLib" stripe height="400">
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="genre" label="风格">
                <template #default="{ row }">
                  <el-tag size="small">{{ row.genre }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="bpm" label="BPM" width="80" />
              <el-table-column prop="duration" label="时长" width="80">
                <template #default="{ row }">
                  {{ Math.floor(row.duration / 60) }}分{{ row.duration % 60 }}秒
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template #default="{ row }">
                  <el-button size="small" @click="playBGM(row)">播放</el-button>
                  <el-button size="small" type="danger" @click="deleteBGM(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        
        <!-- 音效库 -->
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>音效库</span>
                <el-tag>{{ sfxLib.length }} 个</el-tag>
              </div>
            </template>
            
            <el-table :data="sfxLib" stripe height="400">
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="category" label="分类">
                <template #default="{ row }">
                  <el-tag size="small">{{ row.category }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template #default="{ row }">
                  <el-button size="small" @click="playSFX(row)">播放</el-button>
                  <el-button size="small" type="danger" @click="deleteSFX(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 声音参考 -->
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>声音参考</span>
                <el-button size="small" @click="showRefDialog = true">添加参考</el-button>
              </div>
            </template>
            
            <el-table :data="references" stripe>
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="type" label="类型">
                <template #default="{ row }">
                  <el-tag size="small">{{ row.type }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="url" label="链接">
                <template #default="{ row }">
                  <el-link :href="row.url" target="_blank">{{ row.url }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="描述" show-overflow-tooltip />
              <el-table-column label="操作" width="100">
                <template #default="{ row }">
                  <el-button size="small" type="danger" @click="deleteReference(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    
    <!-- BGM 添加对话框 -->
    <el-dialog v-model="showBGMDialog" title="添加 BGM">
      <el-form :model="bgmForm" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="bgmForm.name" />
        </el-form-item>
        <el-form-item label="风格">
          <el-select v-model="bgmForm.genre">
            <el-option label="氛围" value="ambient" />
            <el-option label="电子" value="electronic" />
            <el-option label="钢琴" value="piano" />
            <el-option label="弦乐" value="orchestral" />
            <el-option label="流行" value="pop" />
            <el-option label="摇滚" value="rock" />
          </el-select>
        </el-form-item>
        <el-form-item label="情绪">
          <el-select v-model="bgmForm.mood">
            <el-option label="平静" value="calm" />
            <el-option label="紧张" value="tense" />
            <el-option label="激动" value="exciting" />
            <el-option label="悲伤" value="sad" />
            <el-option label="欢快" value="happy" />
            <el-option label="史诗" value="epic" />
          </el-select>
        </el-form-item>
        <el-form-item label="BPM">
          <el-input-number v-model="bgmForm.bpm" :min="40" :max="200" />
        </el-form-item>
        <el-form-item label="时长（秒）">
          <el-input-number v-model="bgmForm.duration" :min="10" :max="600" />
        </el-form-item>
        <el-form-item label="音频文件">
          <el-upload action="#" :auto-upload="false">
            <el-button>选择文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showBGMDialog = false">取消</el-button>
        <el-button type="primary" @click="saveBGM">保存</el-button>
      </template>
    </el-dialog>
    
    <!-- 音效添加对话框 -->
    <el-dialog v-model="showSFXDialog" title="添加音效">
      <el-form :model="sfxForm" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="sfxForm.name" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="sfxForm.category">
            <el-option label="环境音" value="ambient" />
            <el-option label="动作音效" value="action" />
            <el-option label="生物音效" value="biological" />
            <el-option label="科技音效" value="tech" />
            <el-option label="自然音效" value="nature" />
          </el-select>
        </el-form-item>
        <el-form-item label="音效文件">
          <el-upload action="#" :auto-upload="false">
            <el-button>选择文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showSFXDialog = false">取消</el-button>
        <el-button type="primary" @click="saveSFX">保存</el-button>
      </template>
    </el-dialog>
    
    <!-- 参考添加对话框 -->
    <el-dialog v-model="showRefDialog" title="添加声音参考">
      <el-form :model="refForm" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="refForm.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="refForm.type">
            <el-option label="BGM" value="bgm" />
            <el-option label="音效" value="sfx" />
            <el-option label="配音" value="voice" />
            <el-option label="混合" value="mixed" />
          </el-select>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="refForm.url" placeholder="https://..." />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="refForm.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showRefDialog = false">取消</el-button>
        <el-button type="primary" @click="saveReference">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const projectId = route.params.projectId

const project = ref(null)
const bgmLib = ref([])
const sfxLib = ref([])
const references = ref([])

const showBGMDialog = ref(false)
const showSFXDialog = ref(false)
const showRefDialog = ref(false)

const bgmForm = ref({
  name: '',
  genre: 'ambient',
  mood: 'calm',
  bpm: 120,
  duration: 60
})

const sfxForm = ref({
  name: '',
  category: 'ambient'
})

const refForm = ref({
  name: '',
  type: 'bgm',
  url: '',
  description: ''
})

// 加载项目
async function loadProject() {
  try {
    const res = await fetch(`/api/projects/${projectId}`)
    const data = await res.json()
    if (data.success) {
      project.value = data.data
    }
  } catch (error) {
    console.error('Failed to load project:', error)
  }
}

// 加载 BGM
async function loadBGM() {
  try {
    const res = await fetch('/api/sound/bgm')
    const data = await res.json()
    if (data.success) {
      bgmLib.value = data.data
    }
  } catch (error) {
    console.error('Failed to load BGM:', error)
  }
}

// 加载音效
async function loadSFX() {
  try {
    const res = await fetch('/api/sound/sfx')
    const data = await res.json()
    if (data.success) {
      sfxLib.value = data.data
    }
  } catch (error) {
    console.error('Failed to load SFX:', error)
  }
}

// 加载参考
async function loadReferences() {
  try {
    const res = await fetch('/api/sound/references')
    const data = await res.json()
    if (data.success) {
      references.value = data.data
    }
  } catch (error) {
    console.error('Failed to load references:', error)
  }
}

// 保存 BGM
async function saveBGM() {
  try {
    const res = await fetch('/api/sound/bgm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bgmForm.value)
    })
    const data = await res.json()
    if (data.success) {
      bgmLib.value.push(data.data)
      ElMessage.success('BGM 已添加')
      showBGMDialog.value = false
      bgmForm.value = { name: '', genre: 'ambient', mood: 'calm', bpm: 120, duration: 60 }
    }
  } catch (error) {
    ElMessage.error('添加失败')
  }
}

// 保存音效
async function saveSFX() {
  try {
    const res = await fetch('/api/sound/sfx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sfxForm.value)
    })
    const data = await res.json()
    if (data.success) {
      sfxLib.value.push(data.data)
      ElMessage.success('音效已添加')
      showSFXDialog.value = false
      sfxForm.value = { name: '', category: 'ambient' }
    }
  } catch (error) {
    ElMessage.error('添加失败')
  }
}

// 保存参考
async function saveReference() {
  try {
    const res = await fetch('/api/sound/references', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(refForm.value)
    })
    const data = await res.json()
    if (data.success) {
      references.value.push(data.data)
      ElMessage.success('参考已添加')
      showRefDialog.value = false
      refForm.value = { name: '', type: 'bgm', url: '', description: '' }
    }
  } catch (error) {
    ElMessage.error('添加失败')
  }
}

// 删除 BGM
async function deleteBGM(id) {
  try {
    await fetch(`/api/sound/bgm/${id}`, { method: 'DELETE' })
    bgmLib.value = bgmLib.value.filter(b => b.id !== id)
    ElMessage.success('已删除')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 删除音效
async function deleteSFX(id) {
  try {
    await fetch(`/api/sound/sfx/${id}`, { method: 'DELETE' })
    sfxLib.value = sfxLib.value.filter(s => s.id !== id)
    ElMessage.success('已删除')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 删除参考
async function deleteReference(id) {
  try {
    await fetch(`/api/sound/references/${id}`, { method: 'DELETE' })
    references.value = references.value.filter(r => r.id !== id)
    ElMessage.success('已删除')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 播放 BGM
function playBGM(bgm) {
  ElMessage.info(`正在播放: ${bgm.name}`)
}

// 播放音效
function playSFX(sfx) {
  ElMessage.info(`正在播放: ${sfx.name}`)
}

// 导出
function exportSoundDesign() {
  const data = {
    bgms: bgmLib.value,
    sfx: sfxLib.value,
    references: references.value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sound-design-${projectId}.json`
  a.click()
}

onMounted(() => {
  loadProject()
  loadBGM()
  loadSFX()
  loadReferences()
})
</script>

<style scoped>
.sound-view {
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

.el-main {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
