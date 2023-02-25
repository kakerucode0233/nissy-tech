<template>
  <div class="introduction-top-wrapper">
    <div class="introduction-top-wrapper">
        <model-viewer
          id="functionality-animation-demo"
          src="assets/models/functionality-animation.glb" 
          camera-controls
          enable-pan
          exposure = 0.7
          touch-action = none
          camera-target="0m 1m 0m"
          camera-orbit="30deg 80deg 10%"
          autoplay
          class="model-viewer">
        </model-viewer>
        <div>
          <h3 class="introduction-detail-title">家具の利用方法もアニメーションに</h3>
          <ul class="introduction-detail-text">
            <li>
              機能性を推したい家具では、アニメーションを使うことでその用途を効果的に説明可能
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'functionalityAnimation',
  data(){
    return {
      modelViewerObj: null,
    }
  },
  async mounted() {
    await loadModelViewer();
    this.initModelViewer();
  },
  methods: {
    initModelViewer(){
      const modelViewer = document.querySelector('#functionality-animation-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
      })
    }
  }
}
</script>

<style>
.introduction-top-wrapper{
  display: flex;
  column-gap: 80px;
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 10px solid #ddd;
}

.introduction-detail-title{
  margin-bottom: 10px;
}

.introduction-detail-text{
  width: 450px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.model-viewer{
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
</style>