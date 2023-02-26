<template>
  <div class="introduction-top-wrapper">
      <model-viewer
        id="functionality-animation-demo"
        src="assets/models/functionality-animation.glb" 
        camera-controls
        enable-pan
        exposure = "0.7"
        shadow-intensity="1"
        shadow-softness = "0.5"
        touch-action = none
        camera-orbit="-30deg 60deg"
        autoplay
        class="model-viewer">
      </model-viewer>
      <div class="introduction-detail">
        <h3 class="introduction-detail-title">家具の利用方法もアニメーションに</h3>
        <ul class="introduction-detail-text">
          <li>
            機能性を推したい家具では、アニメーションを使うことでその用途を効果的に説明可能
          </li>
        </ul>
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