<template>
  <div class="introduction-top-wrapper">
    <model-viewer 
      id="room-demo"
      src="assets/models/room.glb" 
      camera-controls 
      enable-pan
      exposure = 0.7
      touch-action = none
      camera-target="0.7m 1m -0.5m"
      camera-orbit="60deg 70deg 90%"
      class="model-viewer">
    </model-viewer>
    <div>
      <h3 class="introduction-detail-title">部屋を丸ごと表示することも可能！</h3>
      <ul class="introduction-detail-text">
        <li>
          コーディネートを丸ごと3Dにしてお部屋を覗くことも
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

export default {
  name: 'defaultRoomDemo',
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
      const modelViewer = document.querySelector('#room-demo');
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