<template>
  <div class="introduction-top-wrapper">
    <model-viewer
      id="default-demo" 
      src="assets/models/model.glb" 
      camera-controls 
      camera-orbit="-30deg 60deg"
      enable-pan
      touch-action = none
      exposure = "0.7"
      shadow-intensity="1"
      shadow-softness = "0.5"
      class="model-viewer">
    </model-viewer>
    <div class="introduction-detail">
      <h3 class="introduction-detail-title">操作説明</h3>
      <h4>-PCの場合-</h4>
      <ul class="introduction-detail-text">
        <li>
          マウスの左クリックをホールドしながら、上下左右に動かすことで家具を回転
        </li>
        <li>
          マウスの右クリックをホールドしながら、上下左右に動かすことで家具を平行移動
        </li>
        <li>
          マウスのホイールで拡大縮小が可能
        </li>
      </ul>
      <h4>-スマホの場合-</h4>
      <ul class="introduction-detail-text">
        <li>
          スワイプ操作で家具を回転させることができる
        </li>
        <li>
          2本指で拡大縮小が可能
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'defaultDemo',
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
      const modelViewer = document.querySelector('#default-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
      })
    }
  }
}
</script>