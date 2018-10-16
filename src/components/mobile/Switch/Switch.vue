<template>
    <span
        tabindex="0"
        :class="wrapClasses"
        @click="toggle">
        <input type="hidden" :name="name" :value="currentValue">
        <span :class="innerClasses">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>

<script type="text/ecmascript-6">
import { isInList } from 'utils'
const prefixCls = 'vue-switch'
export default {
  name: 'vue-switch',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    size: {
      validator (value) {
        return isInList(value, ['large', 'small', 'default'])
      },
      default () {
        return 'default'
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    },
    wrapClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ]
    },
    innerClasses () {
      return `${prefixCls}-inner`
    }
  },
  methods: {
    toggle (event) {
      event.preventDefault()
      if (this.disabled) {
        return false
      }
      const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue
      this.currentValue = checked
    }
  }
}
</script>
<style scoped>
    .vue-switch {
        display: inline-block;
        width: 48px;
        height: 24px;
        line-height: 22px;
        border-radius: 24px;
        vertical-align: middle;
        border: 1px solid #ccc;
        background-color: #ccc;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all .2s ease-in-out;
    }
    .vue-switch:focus {
        box-shadow: none;
        /*box-shadow: 0 0 0 2px rgba(45,140,240,.2);*/
        outline: 0;
    }
    .vue-switch:focus:hover {
        box-shadow: none;
    }
    .vue-switch:after {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: #fff;
        position: absolute;
        left: 1px;
        top: 1px;
        cursor: pointer;
        transition: left .2s ease-in-out,width .2s ease-in-out;
    }
    .vue-switch-checked {
        border-color: #2d8cf0;
        background-color: #2d8cf0;
    }
    .vue-switch-checked:after {
        left: 25px;
    }
    .vue-switch-inner {
        color: #fff;
        font-size: 12px;
        position: absolute;
        left: 25px;
    }
    .vue-switch-checked .vue-switch-inner {
        left: 8px;
    }
    .vue-switch-large {
        width: 60px;
    }
    .vue-switch-large.vue-switch-checked:after {
        left: 37px;
    }
    .vue-switch-small {
        width: 24px;
        height: 12px;
        line-height: 10px;
    }
    .vue-switch-small:after {
        width: 10px;
        height: 10px;
        top: 0;
        left: 0;
    }
    .vue-switch-small.vue-switch-checked:after {
        left: 12px;
    }
    .vue-switch-disabled {
        cursor: not-allowed;
        opacity: .6;
    }
</style>
