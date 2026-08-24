<template>
  <div class="project-view">
    <el-header>
      <h2>项目档案</h2>
      <el-button type="primary" @click="showCreateDialog = true">新建项目</el-button>
    </el-header>
    
    <el-main>
      <el-table :data="projects" stripe>
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="format" label="格式">
          <template #default="{ row }">
            <el-tag>{{ row.format }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="platform" label="平台">
          <template #default="{ row }">
            <el-tag>{{ platformNames[row.platform] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="statusType[row.status]">{{ statusNames[row.status] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="episode_count" label="集数" />
        <el-table-column prop="total_shots" label="镜头数" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" @click="editProject(row)">编辑</el-button>
            <el-button size="small" type="primary" @click="gotoStoryboard(row.id)">分镜</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    
    <!-- 新建/编辑对话框 -->
    <el-dialog v-model="showCreateDialog" :title="editingProject ? '编辑项目' : '新建项目'">
      <el-form :model="form" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="项目格式">
          <el-radio-group v-model="form.format">
            <el-radio value="9:16">竖屏 9:16</el-radio>
            <el-radio value="16:9">横版 16:9</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目标平台">
          <el-select v-model="form.platform">
            <el-option label="抖音" value="douyin" />
            <el-option label="快手" value="kuaishou" />
            <el-option label="B站" value="bilibili" />
            <el-option label="视频号" value="wechat" />
            <el-option label="Netflix" value="netflix" />
          </el-select>
        </el-form-item>
        <el-form-item label="节奏档位">
          <el-select v-model="form.rhythm_preset">
            <el-option label="电影感" value="cinematic" />
            <el-option label="短视频高密度" value="short_video" />
            <el-option label="高强度动作" value="action" />
            <el-option label="慢节奏高信息" value="slow" />
          </el-select>
        </el-form-item>
        <el-form-item label="集数">
          <el-input-number v-model="form.episode_count" :min="1" />
        </el-form-item>
        <el-form-item label="每集时长">
          <el-input-number v-model="form.episode_duration" :min="30" :max="300" />
        </el-form-item>
        <el-form-item label="艺术风格">
          <el-input v-model="form.art_style" placeholder="如：动漫风格、写实风格" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateDialog = false">取消</el-button>
        <el-button type="primary" @click="saveProject">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const projects = ref([])
const showCreateDialog = ref(false)
const editingProject = ref(null)
const form = ref({
  name: '',
  format: '9:16',
  platform: 'douyin',
  rhythm_preset: 'short_video',
  episode_count: 30,
  episode_duration: 60,
  art_style: 'anime',
  description: ''
})

const platformNames = {
  douyin: '抖音',
  kuaishou: '快手',
  bilibili: 'B站',
  wechat: '视频号',
  netflix: 'Netflix'
}

const statusNames = {
  draft: '草稿',
  active: '进行中',
  completed: '已完成',
  archived: '已归档'
}

const statusType = {
  draft: 'info',
  active: 'success',
  completed: '',
  archived: 'warning'
}

onMounted(() => {
  loadProjects()
})

async function loadProjects() {
  try {
    const res = await fetch('/api/projects')
    const data = await res.json()
    if (data.success) {
      projects.value = data.data
    }
  } catch (error) {
    console.error('Failed to load projects:', error)
  }
}

function editProject(project) {
  editingProject.value = project
  form.value = { ...project }
  showCreateDialog.value = true
}

async function saveProject() {
  try {
    if (editingProject.value) {
      await fetch(`/api/projects/${editingProject.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
      ElMessage.success('项目已更新')
    } else {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
      const data = await res.json()
      if (data.success) {
        projects.value.push(data.data)
        ElMessage.success('项目已创建')
      }
    }
    showCreateDialog.value = false
    editingProject.value = null
    form.value = {
      name: '',
      format: '9:16',
      platform: 'douyin',
      rhythm_preset: 'short_video',
      episode_count: 30,
      episode_duration: 60,
      art_style: 'anime',
      description: ''
    }
    await loadProjects()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

function gotoStoryboard(projectId) {
  router.push(`/storyboards/${projectId}`)
}
</script>

<style scoped>
.project-view {
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
