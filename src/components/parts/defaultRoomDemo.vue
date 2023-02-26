<template>
  <div class="introduction-top-wrapper">
    <model-viewer 
      id="room-demo"
      src="assets/models/room.glb" 
      camera-controls 
      enable-pan
      exposure = "0.7"
      shadow-intensity="1"
      shadow-softness = "0.5"
      touch-action = none
      camera-target="0.7m 1m -0.5m"
      camera-orbit="60deg 70deg 90%"
      class="model-viewer">
    </model-viewer>
    <div class="introduction-detail">
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