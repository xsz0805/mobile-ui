<template>
    <div class="shrink-view" :style="{maxHeight: (mIsOpen?contentHeight:0) + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            value: Boolean
        },
        updated () {
            this.init();
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                this.$nextTick(() => {
                    this.contentHeight = this.$el.scrollHeight;
                });
            }
        },
        watch: {
            value (newValue) {
                this.mIsOpen = newValue;
            },
            mIsOpen (newValue) {
                this.$emit('input', newValue);
            }
        },
        data () {
            return {
                contentHeight: 0,
                mIsOpen: this.value,
            }
        }
    }
</script>

<style scoped lang='less'>
    .shrink-view {
        -webkit-transition-duration: 600ms;
        -moz-transition-duration: 600ms;
        -ms-transition-duration: 600ms;
        -o-transition-duration: 600ms;
        transition-duration: 600ms;
        overflow: hidden;
    }
</style>