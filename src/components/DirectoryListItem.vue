<template v-if="view === 'list'">
  <li :class="view === 'list' ? 'list' : 'card'">
    <router-link v-if="view === 'list'" :to="'/directory/' + item.scid">
      <div class="row row-item">
        <span class="col-4">{{ item.family_name }}, {{ item.given_name }}</span>
        <span class="col-4 title">{{ item.position }}</span>
        <span class="col-4">{{ item.display_email }}</span>
      </div>
    </router-link>
    <router-link v-else :to="'/directory/' + item.scid">
      <div class="item">
        <div class="img-box">
          <img v-if="item.image_url" :src="item.image_url" alt="No Image">
          <div class="no-image" v-else><p>No</p><p>Image</p></div>
        </div>
        <div class="member-info">
          <p class="name">{{ item.family_name }}, {{ item.given_name }}</p>
          <p class="title">{{ item.position }}</p>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['item', 'view']
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/circle.scss';

.card {
  display: flex;
  flex-direction: row;
  padding: 0;
  max-width: 320px;
  width: 320px;

  a {
    display: block;
    padding: 1rem;
  }

  .item {
    display: flex;
  }

  .img-box {
    width: 80px;
    height: 120px;
    background: $primary-grey;
    display: flex;
    align-items: center;
    margin-right: 1rem;

    img {
      width: 100%;
    }
  }

  .member-info {
    flex: 2;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .name {
    font-size: 1.3rem;
    color: $red;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .no-image {
    width: 100%;
    text-align: center;
  }
}

.title {
  text-transform: capitalize;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

.list {
  box-shadow: $box-shadow-inert;
  transition: .2s box-shadow, .2s top, .2s left;

  &:hover{
    box-shadow: $box-shadow-hover;
    top: -.1em;
    left: -.1em;
    transition: .2s box-shadow, .2s top, .2s left;
  }

  span {
    font-size: 1rem;
  }

  .row {
    margin-right: 0;
    margin-left: 0;
  }

  .row-item {
    background: #fff;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
  }

  .col-4 {
    @include breakpoint-max(phablet) {
      display: block;
      width: 100%;
      max-width: 100%;
      flex: none;
    }
  }
}

</style>
