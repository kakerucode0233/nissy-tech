<template>
  <div class="introduction-top-wrapper">
    <model-viewer
      id="exposure-demo"
      src="assets/models/model.glb"
      camera-controls 
      camera-orbit="-30deg 60deg"
      touch-action = none
      enable-pan
      :exposure = "exposure"
      shadow-intensity="1"
      shadow-softness = "0.5"
      class="model-viewer">
      <div class="model-viewer-rotation-range-bar">
        <p class="range-bar-text">光の強さ(露出):{{exposure}}</p>
        <input v-model="exposure" type="range" min="0" max="1" step="0.01" value="0.7"/>
      </div>
    </model-viewer>
    <div class="introduction-detail">
      <h3 class="introduction-detail-title">光の強さ(露出)</h3>
      <ul class="introduction-detail-text">
        <li>
          家具に当たる光の強さを調整することができる
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'exposureDemo',
  data(){
    return {
      modelViewerObj: null,
      exposure: 0.7,
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