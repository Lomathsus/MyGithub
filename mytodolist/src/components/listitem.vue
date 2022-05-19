<template>
    <li @click="clickEvent">{{content}}</li>
</template>

<script>
export default ({
    name: 'listitem',
    props: [
        'content',
        'index'
    ],
    methods: {
        clickEvent: function() {
            this.$emit('delete',this.index);
        }
    },
})
</script>
