<template>
  <div class="home-container">
    <el-header>
      <div class="logo">🎬 UpingDrama</div>
      <el-menu mode="horizontal" :ellipsis="false">
        <el-menu-item index="/projects">项目</el-menu-item>
        <el-menu-item index="/assets">资产库</el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
      </el-menu>
    </el-header>
    
    <el-main>
      <div class="hero">
        <h1>专业 AI 短剧创作平台</h1>
        <p>基于 LocalMiniDrama 增强版 - 完整的资产编号体系、节奏档位控制、Seedance C模式</p>
        
        <div class="features">
          <el-card class="feature-card" v-for="feature in features" :key="feature.title">
            <el-icon :size="40" :color="feature.color"><component :is="feature.icon" /></el-icon>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </el-card>
        </div>
        
        <div class="actions">
          <el-button type="primary" size="large" @click="$router.push('/projects')">
            开始创作
          </el-button>
          <el-button size="large" @click="$router.push('/assets')">
            资产库
          </el-button>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { VideoCamera, Folder, Picture, Mic, Document, Setting } from '@element-plus/icons-vue'

const router = useRouter()

const features = ref([
  {
    icon: 'VideoCamera',
    title: '多模型支持',
    desc: 'Seedance 2.0、可灵 AI、Gemini、Vidu 等主流 AI 视频模型',
    color: '#409EFF'
  },
  {
    icon: 'Picture',
    title: '资产编号体系',
    desc: 'CH/SC/PR/CO/ST/CL/NP/AU 标准化资产编号管理',
    color: '#67C23A'
  },
  {
    icon: 'Document',
    title: '节奏档位控制',
    desc: '电影感/短视频/高密度/慢节奏四档预设',
    color: '#E6A23C'
  },
  {
    icon: 'Mic',
    title: '声音设计模块',
    desc: 'BGM 曲线、SFX 分层、声音参考库完整管理',
    color: '#F56C6C'
  },
  {
    icon: 'Setting',
    title: 'Seedance C模式',
    desc: '素材锚定、风格锁定、硬锁、段末状态锚定',
    color: '#909399'
  },
  {
    icon: 'Folder',
    title: '项目档案管理',
    desc: '竖屏/横版双模板，多平台适配配置',
    color: '#8279FA'
  }
])
</script>

<style scoped>
.home-container {
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

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.el-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero {
  text-align: center;
  color: #fff;
  max-width: 1200px;
  padding: 40px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-card h3 {
  margin: 10px 0;
}

.feature-card p {
  font-size: 14px;
  opacity: 0.8;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
