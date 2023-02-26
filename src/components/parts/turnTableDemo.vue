<template>
  <div class="introduction-top-wrapper">
    <model-viewer
      id="turn-table-demo"
      src="assets/models/model.glb"
      auto-rotate
      camera-orbit="-30deg 60deg"
      exposure = "0.7"
      shadow-intensity="1"
      shadow-softness = "0.5"
      :rotation-per-second = "rotateSpeed * Math.PI + 'rad'"
      class="model-viewer">
      <div class="model-viewer-rotation-range-bar">
        <p class="range-bar-text">回転速度: {{rotateSpeed}}</p>
        <input v-model="rotateSpeed" type="range" min="-1.2" max="1.2" step="0.01"/>
      </div>
    </model-viewer>
    <div class="introduction-detail">
      <h3 class="introduction-detail-title">ターンテーブル</h3>
      <ul class="introduction-detail-text">
        <li>
          回転・拡縮・移動など永続的な動きを加えられる
        </li>
        <li>
          この動きはglbファイル内に埋め込まなくとも、フロント側で設定可能
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'turnTableDemo',
  data(){
    return {
      modelViewerObj: null,
      rotateSpeed: 1,
    }
  },
  async mounted() {
    await loadModelViewer();
    this.initModelViewer();
  },
  methods: {
    initModelViewer(){
      const modelViewer = document.querySelector('#default-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
      })
    }
  }
}
</script>

<style>
.range-bar-text{
  width: 135px;
}

.model-viewer-rotation-range-bar{
  position: absolute;
  bottom: 5px;
  right: 10px;
}
</style>