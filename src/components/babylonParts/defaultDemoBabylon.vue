<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';
import 'babylonjs-loaders';

export default {
  name: 'defaultDemoBabylon',
  data(){
    return {
      canvas: null,
      scene: null,
      engine: null,
      camera: null,
      isUpperPositionCamera: true,
      furnitureModels: null,
      furnitureMesh: null,
      furnitureMeshes: [],
      furnitureShadowMesh: null,
      props: null,
      objects: [],
    }
  },
  mounted(){
    this.createScene();
  },
  methods: {
    createScene(){
      window.addEventListener('load', ()=>{

        // Create Babylon.js canvas
        this.canvas = document.getElementById('canvas');
        this.engine = new BABYLON.Engine(this.canvas, true);
        // Create a scene
        this.scene = new BABYLON.Scene(this.engine);

        // Change background color
        this.scene.clearColor = new BABYLON.Color3(0.96, 0.95, 0.94);
  
        // Create a camera
        this.camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0.8, 0.1), this.scene);
        this.cameraSettings(this.camera);
        this.camera.attachControl(this.canvas, true);
        
        // Create a light
        const hemisphericLight = new BABYLON.HemisphericLight('hemisphericLight', new BABYLON.Vector3(-1, 2, 0), this.scene);
        hemisphericLight.intensity = 0.8;

        // Create a furniture and dummy furniture shadow
        BABYLON.SceneLoader.ImportMeshAsync("", "assets/models/", "model3.glb").then((models)=>{
          const meshes = models.meshes;
          this.furnitureMesh = meshes[1];
          this.createDummyFurnitureShadow();
        });

        // Start the rendering
        this.engine.runRenderLoop(() => {
          this.scene.render();
        });

        this.canvas.addEventListener('click', (event) => this.tryAddProps(event));
      })
    },

    cameraSettings(camera){
      camera.target = new BABYLON.Vector3(0, 0, 0);
      camera.wheelPrecision = 50;
      camera.pinchPrecision = 700;
      camera.panningSensibility = 1000;
      camera.allowUpsideDown = false;
      camera.lowerRadiusLimit = 0.01;
      camera.minZ = 0.030;
      camera.useNaturalPinchZoom = true;
      camera.panningInertia = 0.5
      camera.inputs.attached.mousewheel.detachControl();

      // TODO:PCの場合はスクロール干渉のコード追加が必要
      // this.scene.onPointerObservable.add((pointerEvt) => {
      //   camera.fov -= pointerEvt.event.wheelDelta * 0.0008;
      //   camera.fov = Math.max(0.5, camera.fov);
      //   camera.fov = Math.min(2, camera.fov)
      // }, BABYLON.PointerEventTypes.POINTERWHEEL);
    },

    createDummyFurnitureShadow(){
      //家具の大きさを取得
      const furnitureBoundingBox = this.furnitureMesh.getBoundingInfo().boundingBox;
      const furnitureSize = furnitureBoundingBox.maximum.subtract(furnitureBoundingBox.minimum);
      //家具の位置を取得
      const furniturePosition = {
        x: this.furnitureMesh.position.x,
        y: 0,
        z: this.furnitureMesh.position.z
      };
      // 家具のダミー影をメッシュとして作成し、家具の真下に配置
      this.furnitureShadowMesh = BABYLON.MeshBuilder.CreateBox('furnitureShadow', {width: furnitureSize.x, depth: furnitureSize.z, height: 0.001}, this.scene)
      this.furnitureShadowMesh.position.x = furniturePosition.x;
      this.furnitureShadowMesh.position.y = furniturePosition.y;
      this.furnitureShadowMesh.position.z = furniturePosition.z;

      // ダミー影のマテリアルを設定
      const shadowMat = new BABYLON.PBRMaterial('pbr', this.scene);
      shadowMat.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      shadowMat.alpha = 0.5;
      this.furnitureShadowMesh.material = shadowMat;

      // カメラのY座標によって、ダミー影の表示/非表示を切り替える (カメラが家具の下に回り込んだ時に影が見えなくなるようにするため)
      this.camera.onAfterCheckInputsObservable.add(()=>{
        if(this.camera.position.y < 0 && this.isUpperPositionCamera){
          this.isUpperPositionCamera = false;
          this.furnitureShadowMesh.isVisible = false;
        }
        else if(this.camera.position.y >= 0 && !this.isUpperPositionCamera){
          this.isUpperPositionCamera = true;
          this.furnitureShadowMesh.isVisible = true;
        }
      })
    },

    tryAddProps(event){
      const pickResult = this.scene.pick(event.offsetX, event.offsetY);
      const isHit = pickResult.hit;

      if(isHit){
        const isNotFurnitureShadow = pickResult.pickedMesh.name !== 'furnitureShadow';
        const isUpperNormal = pickResult.getNormal().y === 1;
        const installable = this.installableProp(pickResult.pickedPoint);
  
        // ヒットしたメッシュが家具のダミー影ではない & Y法線が1 & 家具から小物がはみ出さない 場合に小物を設置
        if (isNotFurnitureShadow && isUpperNormal && installable) this.addProps(pickResult.pickedPoint);
      }

    },
    installableProp(position){
      // 小物を家具の上に置けるかどうかを判定するためのダミーのメッシュを生成
      const dummyProps = new BABYLON.MeshBuilder.CreateBox('dummyProp', { size: 0.1 }, this.scene);
      dummyProps.position = position;
      dummyProps.position.y += 0.05;
      
      const installable = this.checkInstallable(dummyProps, this.furnitureMesh)

      dummyProps.dispose();
      return installable;
    },
    checkInstallable(prop, furniture){
      const furnitureBoundingBox = furniture.getBoundingInfo().boundingBox;
      const furnitureSize = furnitureBoundingBox.maximum.subtract(furnitureBoundingBox.minimum);
      const furniturePositionXZ = {
        x:furniture.position.x,
        z:furniture.position.z
      };
      // 家具の大きさから小物の設置可能な範囲を取得
      const installablePropsArea = {
        xMax: furniturePositionXZ.x + furnitureSize.x/2,
        xMin: furniturePositionXZ.x - furnitureSize.x/2,
        zMax: furniturePositionXZ.z + furnitureSize.z/2,
        zMin: furniturePositionXZ.z - furnitureSize.z/2,
      }

      // クリック地点に小物を設置した場合の範囲を計算
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

      // 小物の設置可能な範囲内に、小物の範囲が収まっているか否かを判定
      return propPutAreaXZ.xMax <= installablePropsArea.xMax && propPutAreaXZ.xMin >= installablePropsArea.xMin && propPutAreaXZ.zMax <= installablePropsArea.zMax && propPutAreaXZ.zMin >= installablePropsArea.zMin 
    },
    addProps(position){
      // 元の小物を削除
      this.props?.meshes.forEach((mesh) => mesh.dispose());

      BABYLON.SceneLoader.ImportMeshAsync("", "assets/models/", "plant.glb").then((models)=>{
        this.props = models;
        this.props.meshes[0].position = position;
        this.props.meshes[0].position.y -= 0.05
      });
    },
  },
  beforeDestroy() {
    this.engine.dispose();
  },
}
</script>
