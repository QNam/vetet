<template>
    <div>
        <input type="text" ref="input" @input="handleInput" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: String,
        }
    },

    methods: {
        handleInput (e) {
            this.$emit('input', e.target.value)
        }
    },
    watch: {
        value: function(value) {
            this.$refs.input.value = value
        }
    }
}
</script>

<style>

</style>