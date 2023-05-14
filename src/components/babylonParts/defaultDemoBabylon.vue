<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';
import 'babylonjs-loaders';
import * as CANNON from 'cannon';
import 'babylonjs-serializers';
import '@babylonjs/core/Physics/physicsEngineComponent';
// import { ShadowGenerator } from 'babylonjs';

// Cannon.jsを定義する
window.CANNON = CANNON;

export default {
  name: 'defaultDemoBabylon',
  data(){
    return {
      canvas: null,
      scene: null,
      engine: null,
      ground: null,
      groundImpostor: null,
      physicsPlugin: null,
      furnitureMesh: null,
      objects: [],
    }
  },
  mounted(){
    this.initScene();
  },
  methods: {
    initScene(){
      window.addEventListener('load', ()=>{

        // Create Babylon.js canvas
        this.canvas = document.getElementById('canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
        // Create a scene
        this.scene = new BABYLON.Scene(this.engine);

        // 背景色の変更
        this.scene.clearColor = new BABYLON.Color3(0.94, 0.95, 0.94);
        
        this.physicsPlugin = new BABYLON.CannonJSPlugin();
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));
  
        // Create a camera
        const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0.8, 0.1), this.scene);
        camera.attachControl(this.canvas, true);
        camera.target = new BABYLON.Vector3(0, 0, 0);
  
        // Create a light
        // const hemisphericLight = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-1, 1, 0), this.scene);
        const hemisphericLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), this.scene);

        // 地面の作成
        this.ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 1000, height: 1000 }, this.scene);
        this.ground.receiveShadows = true;
        
        // BABYLON.SceneLoader.ImportMeshAsync("", "assets/models/", "model3.glb",this.scene);

        BABYLON.SceneLoader.ImportMeshAsync("", "assets/models/", "model3.glb").then((models)=>{
          this.furnitureMesh = models.meshes[1];
        });

        // const shadowGen = new ShadowGenerator(1024, hemisphericLight);
        hemisphericLight.shadowEnabled = true;
        // shadowGen.addShadowCaster(this.ground);

        // furniture.map((mesh)=>{
        //   mesh.receiveShadows = true;
        //   shadowGen.addShadowCaster(mesh);
        // })

        // Start the engine
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });

        this.addClickListener();
      })
    },
    createModelCollision(modelSize){
      const boxSize = new BABYLON.Vector3(modelSize.x, modelSize.y, modelSize.z);
      console.log(boxSize)
      BABYLON.MeshBuilder.CreateBox('box', {size: 1})
    },
    addClickListener(){
      this.canvas.addEventListener('click', (event) => this.addProps(event));
    },
    checkOverlap(prop, mesh){
      // propを置きたいmeshについて、prop設置可能な範囲を取得
      const meshBoundingBox = mesh.getBoundingInfo().boundingBox;
      const meshSize = meshBoundingBox.maximum.subtract(meshBoundingBox.minimum);
      const meshPositionXZ = {
        x:mesh.position.x,
        z:mesh.position.z
      };
      const availablePutPropsArea = {
        xMax: meshPositionXZ.x + meshSize.x/2,
        xMin: meshPositionXZ.x - meshSize.x/2,
        zMax: meshPositionXZ.z + meshSize.z/2,
        zMin: meshPositionXZ.z - meshSize.z/2,
      }

      // propを設置した場合の占有範囲を計算
      const propBoundingBox = prop.getBoundingInfo().boundingBox;
      const propSize = propBoundingBox.maximum.subtract(propBoundingBox.minimum);
      const propPositionXZ = {
        x: prop.position.x,
        z: prop.position.z
      };
      const propPutAreaXZ = {
        xMax: propPositionXZ.x + propSize.x/2,
        xMin: propPositionXZ.x - propSize.x/2,
        zMax: propPositionXZ.z + propSize.z/2,
        zMin: propPositionXZ.z - propSize.z/2,
      }

      // meshのprop設置可能範囲内に、propの占有範囲が収まっているか否かを変えす
      const isAvailablePut = propPutAreaXZ.xMax <= availablePutPropsArea.xMax && propPutAreaXZ.xMin >= availablePutPropsArea.xMin && propPutAreaXZ.zMax <= availablePutPropsArea.zMax && propPutAreaXZ.zMin >= availablePutPropsArea.zMin 

      console.log(availablePutPropsArea,propPutAreaXZ)
      return isAvailablePut
    },
    addProps(event){
      const pickResult = this.scene.pick(event.offsetX, event.offsetY);
      if (pickResult.hit) {
        const normal = pickResult.getNormal();
        if(normal.y === 1){
          const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.1 }, this.scene);
          box.position = pickResult.pickedPoint;
          box.position.y += 0.05;
          if(!this.checkOverlap(box, this.furnitureMesh)){
            box.deletem
          }
          
          this.objects.push(box);
          }
        }
    },
  },
  beforeDestroy() {
    this.engine.dispose();
  },
}
</script>

<style scoped>
canvas{
  width: 90%;
  height: 90%;
}
</style>
