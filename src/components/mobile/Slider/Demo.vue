<template>
    <div v-if="hasImage" class="slider-wrapper">
        <slider>
            <div :key="item.id" v-for="item in images">
                <a :href="item.linkUrl">
                    <img class="needsclick" :src="item.picUrl">
                </a>
            </div>
        </slider>
    </div>
</template>

<script type="text/ecmascript-6">
import Slider from './Slider.vue'
export default {
  components: {
    Slider
  },
  data () {
    return {
      hasImage: false,
      images: []
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    getImages () {
      fetch('http://localhost:3000/slider')
        .then(res => res.json())
        .then(res => {
          this.images = res
          this.hasImage = true
        })
    }
  }
}
</script>
<style scoped>
    .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
</style>
