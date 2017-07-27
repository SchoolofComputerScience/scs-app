<template>
  <div class="card">
    <router-link :to="'/departments/' + departmentData.uid">
      <div>
        <div class="circle image" :style="{ 'background-image': 'url(' + departmentData.logo + ')' }"></div>
        <h2>{{departmentData.name}}</h2>
        <p>{{departmentData.short_description}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'department-card',
  props: ['departmentData']
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/circle.scss';

</style>
