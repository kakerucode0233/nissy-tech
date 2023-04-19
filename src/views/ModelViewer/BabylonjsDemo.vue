<template>
  <div>
    <section class="introduction">
      <h1 class="page-title">3D家具グリグリ babylon.js</h1>
      <h2 class="introduction-title">家具の3Dモデルを表示してユーザーが操作可能！</h2>
      <defaultDemoBabylon></defaultDemoBabylon>
      <canvas id="canvas"></canvas>
    </section>
  </div>
</template>

<script>
import defaultDemoBabylon from '@/components/babylonParts/defaultDemoBabylon.vue';

export default {
  name: 'BabylonjsDemo',
  components:{
    defaultDemoBabylon,
  }
}
</script>

<style lang="scss">
.page-title{
  text-align: left;
  font-size: 2rem;
  white-space: pre-line;
}

.introduction-title{
  margin-bottom: 30px;
  white-space: pre-line;
}

canvas{
  width: 1000px;
  height: 1000px;
}
</style>