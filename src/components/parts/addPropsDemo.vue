<template>
  <div class="introduction-top-wrapper">
    <!-- <model-viewer
      id="add-props-demo" 
      src="assets/models/model.glb"
      camera-controls 
      camera-orbit="-30deg 60deg"
      enable-pan
      touch-action = none
      exposure = "0.7"
      shadow-intensity="1"
      shadow-softness = "0.5"
      class="model-viewer"
    >
      <model
        src="assets/models/model2.glb"
        position="1 0 0"
      ></model>
      <model
        src="assets/models/model3.glb"
        position="2 0 0"
      ></model>
    </model-viewer> -->
    <model-viewer src="assets/models/model.glb" camera-controls class="model-viewer">
      <model src="assets/models/model2.glb" position="1 0 0"></model>
    </model-viewer>
    <div class="introduction-detail">
      <h3 class="introduction-detail-title">操作説明</h3>
      <ul class="introduction-detail-text">
        <li>
          test
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { loadModelViewer } from '@/components/lib/modelViewer';
import { ModelViewer } from '@google/model-viewer';


export default {
  name: 'addPropsDemo',
  components: {
    'model-viewer': ModelViewer
  },
  data(){
    return {
      modelViewerObj: null,
    }
  },
  async mounted() {
    // await loadModelViewer();
    // this.initModelViewer();
  },
  methods: {
    initModelViewer(){
      const modelViewer = document.querySelector('#add-props-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
      })
      modelViewer.addEventListener('click', (event)=>{
        const clickOffset = [event.offsetX, event.offsetY];
        const modelPosition = modelViewer.positionFromPoint(clickOffset);
        console.log(clickOffset,modelPosition)
      })
    },
    
  }
}
</script>