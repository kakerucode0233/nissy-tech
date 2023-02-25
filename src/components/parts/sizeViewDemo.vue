<template>
  <div class="introduction-top-wrapper">
    <model-viewer
      id="size-view-demo" 
      :src="selectedModel" 
      camera-controls 
      enable-pan
      exposure = 0.7
      touch-action = none
      class="model-viewer">
      <button v-for="(endPoint, index) in endPoints" :key="`end-point${index}`" :slot="`hotspot-end-point${endPoint.slot}`" class="end-point" :data-normal="endPoint.dataNormal" :style="`display: ${annotationVisibility ? 'block':'none'}`"></button>
      <button v-for="(sizePanel, index) in sizePanels" :key="`size-panel${index}`" :slot="`hotspot-size-panel${sizePanel.slot}`" class="size-panel" :data-normal="sizePanel.dataNormal" :style="`display: ${annotationVisibility ? 'block':'none'}`"></button>
      <div class="toggle-button-wrapper">
        <div class="toggle-button">
          <input v-model="annotationVisibility" class="toggle-input" type='checkbox' />
          <label for="toggle" :class="annotationVisibility ? 'toggle-label-visible' : 'toggle-label-hidden'"/>
        </div>
      </div>
      <div class="pulldown-wrapper">
        <select v-model="selectedModel">
          <option disabled value="">3Dモデル</option>
          <option v-for="model in models" :key="model.id" :value="model.name">
            {{ model.name }}
          </option>
        </select>
      </div>
    </model-viewer>
    <div>
      <h3 class="introduction-detail-title">操作説明</h3>
      <ul class="introduction-detail-text">
        <li>
          3Dモデル上に縦・横・高さのサイズを追加でる
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadModelViewer } from '@/components/lib/modelViewer';

const modelCenter = {
  x: 0,
  y: 0.35,
  z: 0,
};

export default {
  name: 'sizeViewDemo',
  data(){
    return {
      models:[
        {
          id: 0,
          name: 'assets/models/model.glb',
        },
        {
          id: 1,
          name: 'assets/models/model2.glb',
        },
        {
          id: 2,
          name: 'assets/models/model3.glb',
        },
      ],
      selectedModel: 'assets/models/model.glb',
      modelViewerObj: null,
      annotationVisibility: false,
      endPoints: [
        {
          slot: '+X-Y+Z',
          dataNormal: '1 0 1',
        },
        {
          slot: '+X-Y-Z',
          dataNormal: '1 0 0',
        },
        {
          slot: '+X+Y-Z',
          dataNormal: '0 1 0',
        },
        {
          slot: '-X+Y-Z',
          dataNormal: '0 1 0',
        },
        {
          slot: '-X-Y-Z',
          dataNormal: '-1 0 0',
        },
        {
          slot: "-X-Y+Z",
          dataNormal: '-1 0 0',
        },
      ],
      sizePanels: [
        {
          slot: "+X-Y",
          dataNormal: '1 0 0',
        },
        {
          slot: "+X-Z",
          dataNormal: '1 0 0',
        },
        {
          slot: "+Y-Z",
          dataNormal: '0 1 0',
        },
        {
          slot: "-X-Z",
          dataNormal: '-1 0 0',
        },
        {
          slot: "-X-Y",
          dataNormal: '-1 0 0',
        },
      ],
    }
  },

  watch:{
    selectedModel(){
      this.updateModelViewer();
    }
  },
  async mounted() {
    await loadModelViewer();
    this.initModelViewer();
  },
  methods: {
    initModelViewer(){
      const modelViewer = document.querySelector('#size-view-demo');
      modelViewer.addEventListener('load', () => {
        this.modelViewerObj = modelViewer;
      })
      modelViewer.addEventListener('progress', (elem) => {
        if(elem.detail.totalProgress === 1){
          this.updateSizeHotspot(this.modelViewerObj);
          this.annotationVisibility = true;
        }
      })
    },
    updateModelViewer(){
      this.updateSizeHotspot(this.modelViewerObj);
    },
    updateSizeHotspot(modelViewer){
      const modelSize = modelViewer.getDimensions();
      const halfSizeX = modelSize.x / 2;
      const halfSizeY = modelSize.y / 2;
      const halfSizeZ = modelSize.z / 2;

      modelViewer.querySelector('button[slot="hotspot-size-panel+X-Y"]').textContent = `${(modelSize.z * 100).toFixed(0)} cm`;
      modelViewer.querySelector('button[slot="hotspot-size-panel+X-Z"]').textContent = `${(modelSize.y * 100).toFixed(0)} cm`;
      modelViewer.querySelector('button[slot="hotspot-size-panel+Y-Z"]').textContent = `${(modelSize.x * 100).toFixed(0)} cm`;
      modelViewer.querySelector('button[slot="hotspot-size-panel-X-Z"]').textContent = `${(modelSize.y * 100).toFixed(0)} cm`;
      modelViewer.querySelector('button[slot="hotspot-size-panel-X-Y"]').textContent = `${(modelSize.z * 100).toFixed(0)} cm`;
      
      modelViewer.updateHotspot({
        name: 'hotspot-end-point+X-Y+Z',
        position: `${modelCenter.x + halfSizeX} ${modelCenter.y - halfSizeY} ${modelCenter.z + halfSizeZ}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-size-panel+X-Y',
        position: `${modelCenter.x + halfSizeX * 1.2} ${modelCenter.y - halfSizeY * 1.1} ${modelCenter.z}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-end-point+X-Y-Z',
        position: `${modelCenter.x + halfSizeX} ${modelCenter.y - halfSizeY} ${modelCenter.z - halfSizeZ}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-size-panel+X-Z',
        position: `${modelCenter.x + halfSizeX * 1.2} ${modelCenter.y} ${modelCenter.z - halfSizeZ * 1.2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-end-point+X+Y-Z',
        position: `${modelCenter.x + halfSizeX} ${modelCenter.y + halfSizeY} ${modelCenter.z - halfSizeZ}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-size-panel+Y-Z',
        position: `${modelCenter.x} ${modelCenter.y + halfSizeY * 1.1} ${modelCenter.z - halfSizeZ * 1.1}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-end-point-X+Y-Z',
        position: `${modelCenter.x - halfSizeX} ${modelCenter.y + halfSizeY} ${modelCenter.z - halfSizeZ}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-size-panel-X-Z',
        position: `${modelCenter.x - halfSizeX * 1.2} ${modelCenter.y} ${modelCenter.z - halfSizeZ * 1.2}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-end-point-X-Y-Z',
        position: `${modelCenter.x - halfSizeX} ${modelCenter.y - halfSizeY} ${modelCenter.z - halfSizeZ}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-size-panel-X-Y',
        position: `${modelCenter.x - halfSizeX * 1.2} ${modelCenter.y - halfSizeY * 1.1} ${modelCenter.z}`
      });

      modelViewer.updateHotspot({
        name: 'hotspot-end-point-X-Y+Z',
        position: `${modelCenter.x - halfSizeX} ${modelCenter.y - halfSizeY} ${modelCenter.z + halfSizeZ}`
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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

.end-point{
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background-color: #ccc;
  box-sizing: border-box;
  --min-hotspot-opacity: 0;
}

.size-panel{
  background: #fff;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.8);
  display: block;
  font-family: Futura, Helvetica Neue, sans-serif;
  font-size: 1em;
  font-weight: 700;
  max-width: 128px;
  overflow-wrap: break-word;
  padding: 0.5em 1em;
  position: absolute;
  width: max-content;
  height: max-content;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
  --min-hotspot-opacity: 0;
}

@media only screen and (max-width: 800px) {
  .size-panel{
    font-size: 3vw;
  }
}

.toggle-button-wrapper{
  position: absolute;
  top: 12px;
  right: 20px;
}

.toggle-button {
  position: relative;
  width: 50px;
  height: 20px;
  margin: auto;
}

.toggle-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

@mixin toggle-label($BackGroundColor: #ccc, $ButtonLeftPosition: 0px) {
  width: 50px;
  height: 20px;
  background: $BackGroundColor;
  position: relative;
  display: inline-block;
  border-radius: 40px;
  transition: 0.4s;
  box-sizing: border-box;

  &::after{
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    left: $ButtonLeftPosition;
    top: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.4s;
  }
}

.toggle-label-hidden{
  @include toggle-label(#ccc, 0px);
}

.toggle-label-visible{
  @include toggle-label(#4BD865, 40px);
}

.pulldown-wrapper{
  position: absolute;
  bottom: 12px;
  right: 20px;
}
</style>