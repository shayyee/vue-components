<template>
    <div>
        <v-switch v-model="switchValue" @change="change"></v-switch>
        <v-switch v-model="switchValue" :disabled="disabled"></v-switch>
        <v-switch v-model="switchValue" size="small"></v-switch>
        <v-switch v-model="switchValue" size="large">
            <span slot="open">ON</span>
            <span slot="close">OFF</span>
        </v-switch>
    </div>
</template>

<script type="text/ecmascript-6">
import Switch from '@/components/mobile/Switch/Switch'
export default {
  components: {
    'v-switch': Switch
  },
  data () {
    return {
      switchValue: true,
      disabled: true
    }
  },
  methods: {
    change () {
      console.log(this.switchValue)
    }
  }
}
</script>
