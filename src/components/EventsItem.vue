<template>
  <div class="card">
    <div :class="data.type" class="type">{{data.type}}</div>
    <router-link :to="'/events/' + data.uid">
      <div>
        <h2>{{data.startDate | dateTranslate}}</h2>
        <h3>{{data.title}}</h3>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'EventsItem',
  props: ['data'],
}

</script>

<style lang="scss" scoped>

.card {
  flex: 1 50%;
  margin: 1em;
  position: relative;
  z-index: 1;
  border: 1px solid #eee;
  width: 50%;
  background: white;
  a{
    width: 100%;
    z-index: 9;
    text-decoration: none;
    display: flex;
    align-items: center;
    > div {
      width: 100%;
    }
  }
  h2{
    font-size: .85em;
    margin: .2rem 1rem;
    padding-bottom: .6em;
    padding-top: .6em;
    font-weight: 300;
    position: relative;
  }
  h3{
    font-size: 1.35em;
    padding-bottom: 1em;
    margin: .2rem 1rem;
    border-top: 1px solid #eee;
    padding-top: .8em;
    font-weight: 300;
  }
  p{
    font-size: .85em;
    margin-top: 1em;
  }
}
// card colors
.card .type{
  text-transform: uppercase;
  color: white;
  background: black;
  padding: .3rem 1rem;
  &.thesis{
    background: #1289c4;
  }
  &.seminars, &.Seminars{
    background: #30c412;
  }
  &.talks {
    background: #12c4a6;
  }
}

</style>
