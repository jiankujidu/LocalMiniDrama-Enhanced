<template>
  <div class="storyboard-view">
    <el-header>
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/projects' }">项目</el-breadcrumb-item>
          <el-breadcrumb-item>{{ project?.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>分镜</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button @click="showRhythmDialog = true">节奏曲线</el-button>
        <el-button type="primary" @click="generatePrompts">生成提示词</el-button>
      </div>
    </el-header>
    
    <el-main>
      <el-row :gutter="20">
        <!-- 左侧：分镜列表 -->
        <el-col :span="16">
          <div class="toolbar">
            <el-button @click="showBatchDialog = true">批量创建</el-button>
            <el-button @click="applyRhythmPreset">应用档位</el-button>
            <el-select v-model="filterSegment" placeholder="筛选段落" style="width: 120px">
              <el-option label="全部" value="" />
              <el-option v-for="i in segments" :key="i" :label="`第${i}段`" :value="i" />
            </el-select>
          </div>
          
          <el-table :data="filteredStoryboards" stripe height="calc(100vh - 200px)">
            <el-table-column prop="shot_number" label="镜头编号" width="120" />
            <el-table-column prop="shot_type" label="景别" width="80" />
            <el-table-column prop="movement" label="运镜" width="80" />
            <el-table-column prop="action" label="动作" show-overflow-tooltip />
            <el-table-column prop="expression" label="表情" width="80" />
            <el-table-column prop="dialogue" label="台词" show-overflow-tooltip />
            <el-table-column prop="rhythm_preset" label="档位" width="80">
              <template #default="{ row }">
                <el-tag size="small">{{ rhythmNames[row.rhythm_preset] }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <el-button size="small" @click="editStoryboard(row)">编辑</el-button>
                <el-button size="small" type="primary" @click="viewPrompt(row)">提示词</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        
        <!-- 右侧：详细信息 -->
        <el-col :span="8">
          <el-card v-if="selectedStoryboard" class="detail-card">
            <template #header>
              <span>{{ selectedStoryboard.shot_number }}</span>
            </template>
            
            <el-descriptions :column="1" border>
              <el-descriptions-item label="景别">{{ selectedStoryboard.shot_type }}</el-descriptions-item>
              <el-descriptions-item label="运镜">{{ selectedStoryboard.movement }}</el-descriptions-item>
              <el-descriptions-item label="焦段">{{ selectedStoryboard.focal_length || '-' }}</el-descriptions-item>
              <el-descriptions-item label="光圈">{{ selectedStoryboard.aperture || '-' }}</el-descriptions-item>
              <el-descriptions-item label="动作">{{ selectedStoryboard.action }}</el-descriptions-item>
              <el-descriptions-item label="表情">{{ selectedStoryboard.expression }}</el-descriptions-item>
              <el-descriptions-item label="台词">{{ selectedStoryboard.dialogue }}</el-descriptions-item>
              <el-descriptions-item label="语气">{{ selectedStoryboard.tone }}</el-descriptions-item>
              <el-descriptions-item label="地点">{{ selectedStoryboard.location }}</el-descriptions-item>
              <el-descriptions-item label="时间">{{ selectedStoryboard.time }}</el-descriptions-item>
              <el-descriptions-item label="光影">{{ selectedStoryboard.lighting }}</el-descriptions-item>
              <el-descriptions-item label="段末状态">{{ selectedStoryboard.result }}</el-descriptions-item>
              <el-descriptions-item label="下一段衔接">
                {{ selectedStoryboard.next_segment_anchor || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    
    <!-- 分镜编辑对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑分镜" width="70%">
      <el-form :model="editForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="景别">
              <el-select v-model="editForm.shot_type">
                <el-option label="大特写" value="ECU" />
                <el-option label="特写" value="CU" />
                <el-option label="近景" value="MCU" />
                <el-option label="中景" value="MS" />
                <el-option label="全景" value="LS" />
                <el-option label="远景" value="VLS" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运镜">
              <el-select v-model="editForm.movement">
                <el-option label="固定" value="固定" />
                <el-option label="推" value="推" />
                <el-option label="拉" value="拉" />
                <el-option label="摇" value="摇" />
                <el-option label="移" value="移" />
                <el-option label="升降" value="升降" />
                <el-option label="手持" value="手持" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="焦段">
              <el-input v-model="editForm.focal_length" placeholder="如：35mm" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="光圈">
              <el-input v-model="editForm.aperture" placeholder="如：f/2.8" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="主体动作">
          <el-input v-model="editForm.action" type="textarea" :rows="2" />
        </el-form-item>
        
        <el-form-item label="表情">
          <el-input v-model="editForm.expression" />
        </el-form-item>
        
        <el-form-item label="台词">
          <el-input v-model="editForm.dialogue" type="textarea" :rows="2" />
        </el-form-item>
        
        <el-form-item label="语气">
          <el-input v-model="editForm.tone" />
        </el-form-item>
        
        <el-form-item label="地点">
          <el-input v-model="editForm.location" />
        </el-form-item>
        
        <el-form-item label="时间">
          <el-select v-model="editForm.time">
            <el-option label="清晨" value="清晨" />
            <el-option label="上午" value="上午" />
            <el-option label="中午" value="中午" />
            <el-option label="下午" value="下午" />
            <el-option label="黄昏" value="黄昏" />
            <el-option label="夜晚" value="夜晚" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="段末状态">
          <el-input v-model="editForm.result" placeholder="本镜头结束时的状态" />
        </el-form-item>
        
        <el-form-item label="下一段衔接">
          <el-input v-model="editForm.next_segment_anchor" placeholder="下一镜开始要求" />
        </el-form-item>
        
        <el-form-item label="限制">
          <el-input v-model="editForm.constraints" placeholder="禁止事项" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="saveStoryboard">保存</el-button>
      </template>
    </el-dialog>
    
    <!-- 批量创建对话框 -->
    <el-dialog v-model="showBatchDialog" title="批量创建分镜">
      <el-form label-width="100px">
        <el-form-item label="段落数">
          <el-input-number v-model="batchCount.segment_count" :min="1" :max="20" />
        </el-form-item>
        <el-form-item label="每段镜头数">
          <el-input-number v-model="batchCount.shots_per_segment" :min="1" :max="50" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showBatchDialog = false">取消</el-button>
        <el-button type="primary" @click="batchCreate">创建</el-button>
      </template>
    </el-dialog>
    
    <!-- 节奏曲线对话框 -->
    <el-dialog v-model="showRhythmDialog" title="节奏曲线" width="80%">
      <div id="rhythm-chart" style="height: 400px;"></div>
    </el-dialog>
    
    <!-- 提示词预览对话框 -->
    <el-dialog v-model="showPromptDialog" title="Seedance C模式提示词">
      <el-input 
        v-model="currentPrompt" 
        type="textarea" 
        :rows="20" 
        readonly
      />
      <template #footer>
        <el-button @click="copyPrompt">复制</el-button>
        <el-button type="primary" @click="showPromptDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const projectId = route.params.projectId

const project = ref(null)
const storyboards = ref([])
const filterSegment = ref('')
const selectedStoryboard = ref(null)

const showEditDialog = ref(false)
const showBatchDialog = ref(false)
const showRhythmDialog = ref(false)
const showPromptDialog = ref(false)
const currentPrompt = ref('')

const editForm = ref({})
const batchCount = ref({ segment_count: 3, shots_per_segment: 10 })

const rhythmNames = {
  cinematic: '电影感',
  short_video: '短视频',
  action: '高强度',
  slow: '慢节奏'
}

const segments = computed(() => {
  return [...new Set(storyboards.value.map(sb => sb.segment_index))]
})

const filteredStoryboards = computed(() => {
  if (!filterSegment.value) return storyboards.value
  return storyboards.value.filter(sb => sb.segment_index === filterSegment.value)
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

// 加载分镜
async function loadStoryboards() {
  try {
    const res = await fetch(`/api/storyboards?project_id=${projectId}`)
    const data = await res.json()
    if (data.success) {
      storyboards.value = data.data
    }
  } catch (error) {
    console.error('Failed to load storyboards:', error)
  }
}

// 编辑分镜
function editStoryboard(sb) {
  selectedStoryboard.value = sb
  editForm.value = { ...sb }
  showEditDialog.value = true
}

// 保存分镜
async function saveStoryboard() {
  try {
    await fetch(`/api/storyboards/${editForm.value.shot_number}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    })
    ElMessage.success('已保存')
    showEditDialog.value = false
    await loadStoryboards()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

// 查看提示词
async function viewPrompt(sb) {
  try {
    const res = await fetch(`/api/storyboards/${sb.shot_number}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storyboard: sb, assets: {} })
    })
    const data = await res.json()
    if (data.success) {
      currentPrompt.value = data.data.prompt
      showPromptDialog.value = true
    }
  } catch (error) {
    ElMessage.error('生成提示词失败')
  }
}

// 批量创建
async function batchCreate() {
  try {
    const res = await fetch('/api/storyboards/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        segment_count: batchCount.value.segment_count,
        shots_per_segment: batchCount.value.shots_per_segment,
        project_id: projectId
      })
    })
    const data = await res.json()
    if (data.success) {
      storyboards.value = data.data
      ElMessage.success(`已创建 ${data.data.length} 个分镜`)
      showBatchDialog.value = false
    }
  } catch (error) {
    ElMessage.error('创建失败')
  }
}

// 生成所有提示词
async function generatePrompts() {
  try {
    const res = await fetch('/api/storyboards/batch-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storyboards: storyboards.value, assets: {} })
    })
    const data = await res.json()
    if (data.success) {
      ElMessage.success(`已生成 ${data.data.length} 个提示词`)
    }
  } catch (error) {
    ElMessage.error('生成失败')
  }
}

// 复制提示词
function copyPrompt() {
  navigator.clipboard.writeText(currentPrompt.value)
  ElMessage.success('已复制到剪贴板')
}

// 应用节奏档位
function applyRhythmPreset() {
  ElMessage.info('请在节奏档位对话框中选择档位')
  showRhythmDialog.value = true
}

onMounted(() => {
  loadProject()
  loadStoryboards()
})
</script>

<style scoped>
.storyboard-view {
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

.toolbar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.detail-card {
  position: sticky;
  top: 20px;
}
</style>
