<template>
  <footer>
    <div class="footer-container">
      <figure>
        <a href="http://www.cmu.edu">
          <img src="../assets/img/cmu.svg" alt="Carnegie Mellon University">
        </a>
        <p><a href="http://www.qatar.cmu.edu" target="new">Qatar Campus</a></p>
      </figure>
      <p><b>Carnegie Mellon School of Computer Science</b><br>5000 Forbes Avenue<br>Pittsburgh, PA 15213</p>
    </div>
    <div class="project-status"><b>ALPHA</b> | to contribute an issue, visit our <a href="https://github.com/SchoolofComputerScience/scs-issues/issues">github issues</a> page.</div>
  </footer>
</template>

<script>
export default {
  name: 'main-footer'
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/mixins.scss';

.project-status {
  border-top: 1px solid $primary-grey;
  padding-top: $base-line-height;
  @include type-setting(-1);
}

.footer-container{
  display: flex;
  justify-content: space-between;
  @include breakpoint-max(tablet) {
    display: block;
  }
  p {
    @include type-setting(-1)
  }
  > p {
    text-align: right;
    @include breakpoint-max(tablet) {
      text-align: left;
    }
    b{
      color: $black;
      letter-spacing: -.02rem;
    }
  }
}

.main-footer {
  box-shadow: $box-shadow-inert;
  color: $black;
  figure {
    margin: 0;
  }
  b{
    color: $red;
  }
  img {
    margin: 0;
    margin-top: $base-line-height / 2;
    padding-bottom: 0;
    width: 12em;
    left: -2px;
    position: relative;
  }
}
</style>
