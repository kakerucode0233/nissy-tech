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
      camera: null,
      ground: null,
      groundImpostor: null,
      physicsPlugin: null,
      furnitureModels: null,
      furnitureMesh: null,
      furnitureMeshes: [],
      furnitureShadowMesh: null,
      props: null,
      objects: [],
      shadowGen: null,
      isActiveCanvas: false,
    }
  },
  mounted(){
    this.initScrollHandle();
    this.initScene();
  },
  watch: {
    isActiveCanvas(val){
      if(val){
        document.addEventListener('touchmove', this.handle, { passive: false });
        document.addEventListener('mousewheel', this.handle, { passive: false });
        this.camera.attachControl(this.canvas, true);
        this.camera.inputs.attached.mousewheel.detachControl();
        this.cameraZoomSettings();
      }else{
        document.removeEventListener('touchmove', this.handle, { passive: false });
        document.removeEventListener('mousewheel', this.handle, { passive: false });
        this.camera.detachControl(this.canvas);
        this.cameraZoomSettings();
      }
    }
  },
  methods: {
    handle(event){
      event.preventDefault();
    },
    initScrollHandle(){
      window.onload = function() {
        document.addEventListener('touchmove', this.handle, { passive: false });
        document.addEventListener('mousewheel', this.handle, { passive: false });
      }
    },
    initScene(){
      // キャンバスのフォーカス状態を監視
      document.addEventListener('click', (el)=> {
        this.isActiveCanvas = el.target.id === 'canvas';
      });

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
        this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0.8, 0.1), this.scene);
        
        this.camera.target = new BABYLON.Vector3(0, 0, 0);
        this.camera.speed = 0.2;
        this.camera.inputs.attached.mousewheel.detachControl();

        // カメラのY座標が変わった時の処理
        let isUpperPositionCamera = true;
        this.camera.onAfterCheckInputsObservable.add(()=>{
          if(this.camera.position.y < 0 && isUpperPositionCamera){
            isUpperPositionCamera = false;
            this.setIsVisibleFurnitureShadow(false);
          }
          else if(this.camera.position.y >= 0 && !isUpperPositionCamera){
            isUpperPositionCamera = true;
            this.setIsVisibleFurnitureShadow(true);
          }
        })

        // Create a light
        const hemisphericLight = new BABYLON.HemisphericLight('hemisphericLight', new BABYLON.Vector3(-1, 2, 0), this.scene);
        hemisphericLight.intensity = 0.8;
        // ライトを自由に動かせるようにギズモを付与
        this.CreateGizmos(hemisphericLight);
  
        // Create a ground
        this.ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 1000, height: 1000 }, this.scene);
        this.ground.receiveShadows = true;
        const groundMat = new BABYLON.PBRMaterial('pbr', this.scene);
        groundMat.roughness = 0.6;
        groundMat.metallic = 0;

        this.ground.material = groundMat;

        // Create a custom mesh
        BABYLON.SceneLoader.ImportMeshAsync("", "assets/models/", "model3.glb").then((models)=>{
          const meshes = models.meshes;
          this.furnitureMesh = meshes[1];
          this.createFurnitureShadow();
        });

        // Start the engine
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });

        this.addClickListener();
      })
    },
    cameraZoomSettings(){
      const observer = this.scene.onPointerObservable.add((pointerEvt) => this.hoge(pointerEvt), BABYLON.PointerEventTypes.POINTERWHEEL);
      // if(isAbleControl){
      //   observer
      // }else{
      //   this.scene.onPointerObservable.remove((pointerEvt) => this.hoge(pointerEvt), BABYLON.PointerEventTypes.POINTERWHEEL);
      // }
      observer
    },
    hoge(pointerEvt){
      this.camera.fov -= pointerEvt.event.wheelDelta * 0.0008;
      this.camera.fov = Math.max(0.5, this.camera.fov);
      this.camera.fov = Math.min(2, this.camera.fov)
    },
    createFurnitureShadow(){
      // 家具のダミーの影をメッシュとして作成
      const furnitureBoundingBox = this.furnitureMesh.getBoundingInfo().boundingBox;
      const furnitureSize = furnitureBoundingBox.maximum.subtract(furnitureBoundingBox.minimum);
      const meshPosition = {
        x: this.furnitureMesh.position.x,
        y: 0,
        z: this.furnitureMesh.position.z
      };
      this.furnitureShadowMesh = BABYLON.MeshBuilder.CreateBox('box', {width: furnitureSize.x, depth: furnitureSize.z, height: 0.001}, this.scene)
      this.furnitureShadowMesh.position.x = meshPosition.x;
      this.furnitureShadowMesh.position.y = meshPosition.y;
      this.furnitureShadowMesh.position.z = meshPosition.z;

      const shadowMat = new BABYLON.PBRMaterial('pbr', this.scene);
      shadowMat.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      shadowMat.alpha = 0.5;
      this.furnitureShadowMesh.material = shadowMat;
    },
    setIsVisibleFurnitureShadow(isVisible){
      if(this.furnitureShadowMesh){
        this.furnitureShadowMesh.isVisible = isVisible;
      }
    },
    createModelCollision(modelSize){
      const boxSize = new BABYLON.Vector3(modelSize.x, modelSize.y, modelSize.z);
      console.log(boxSize)
      BABYLON.MeshBuilder.CreateBox('box', {size: 1}, this.scene)
    },
    addClickListener(){
      this.canvas.addEventListener('click', (event) => this.tryAddProps(event));
    },
    tryAddProps(event){
      const pickResult = this.scene.pick(event.offsetX, event.offsetY);
      if (pickResult.hit) {
        const normal = pickResult.getNormal();
        if(normal.y === 1){
          this.addProps(pickResult.pickedPoint)
        }
      }
    },
    addProps(position){
      this.props = new BABYLON.MeshBuilder.CreateBox('box', { size: 0.1 }, this.scene);
      this.props.position = position;
      this.props.position.y += 0.05;

      // 家具モデルと干渉した場合は小物を削除する
      if(!this.checkOverlap(this.props, this.furnitureMesh)){
        this.props.dispose();
      }
      else{
        this.objects.push(this.props);
      }
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

      // meshのprop設置可能範囲内に、propの占有範囲が収まっているか否かを返す
      const isAvailablePut = propPutAreaXZ.xMax <= availablePutPropsArea.xMax && propPutAreaXZ.xMin >= availablePutPropsArea.xMin && propPutAreaXZ.zMax <= availablePutPropsArea.zMax && propPutAreaXZ.zMin >= availablePutPropsArea.zMin 

      return isAvailablePut
    },
    CreateGizmos(customLight) {
      const lightGizmo = new BABYLON.LightGizmo();
      lightGizmo.scaleRatio = 2;
      lightGizmo.light = customLight;

      const gizmoManager = new BABYLON.GizmoManager(this.scene);
      gizmoManager.positionGizmoEnabled = true;
      gizmoManager.rotationGizmoEnabled = true;
      gizmoManager.usePointerToAttachGizmos = false;
      gizmoManager.attachToMesh(lightGizmo.attachedMesh);
    }
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
