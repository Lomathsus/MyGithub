<template>
    <div>
        <input v-model="inputValue" />
        <button @click="clickEvent">提交</button>
        <ul>
            <listitem v-for="(item, index) in list" :key="index" :content="item" :index="index" @delete="deleteEvent"></listitem>
        </ul>
    </div>
</template>

<script>
import listitem from './listitem.vue'

export default ({
    name: 'ToDoList',
    components: {
        listitem
    },
    data() {
        return {
            inputValue: '',
            list: []
        }
    },
    methods: {
        clickEvent: function() {
            this.list.push(this.inputValue);
            this.inputValue = '';
        },

        deleteEvent: function(x) {
            this.list.splice(x,1);
        }
    }
})
</script>

<style>

</style>
