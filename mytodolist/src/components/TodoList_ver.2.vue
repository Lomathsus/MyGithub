<template>
<div>
  <!-- function1 增 -->
  <input type="text" class="new-todo" placeholder="你接下来要做什么" v-model="newTodo" @keyup.enter="addTodo">
  
  <!-- function2 同步修改、删 -->
  <ul>
    <li v-for="todo in todos"
      class="new-todo"
      :key="todo.id"
      :class="{completed: todo.completed, editing: todo.id == editedTodo.id}"
    >
      <div class="view">
        <!-- 完成/取消完成备忘录 -->
        <input type="checkbox" class="toggle" v-model="todo.completed" />
        <!-- 双击操作备忘录 -->
        <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
        <!-- 删除备忘录 -->
        <button class="destory" @click="removeTodo(todo)"></button>
      </div>
      <!-- 修改、失焦、回车更新数据，esc取消更新 -->
      <input
        type="text"
        class="edit"
        v-model="editedTodo.title"
        @blur="doneEdit(editedTodo)"
        @keyup.enter="doneEdit(editedTodo)"
        @keyup.esc="cancelEdit()"
        />
    </li>
  </ul>
  <!-- function3 统计、整体删除 -->
  <footer class="footer" v-show="todos.length">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize}}  left
    </span> 
    <button
      class="clear-completed"
      @click="removeCompleted"
      v-show="todos.length > remaining"
    >
    Clear completed
    </button>
  </footer>

</div>
</template>

<script>
export default {
  data(){
    return {
      id: 1,
      todos: [],
      newTodo: "",
      editedTodo: {}
    }
  },

  methods: {
    // function1 新增备忘录
    addTodo() {
      if (!this.newTodo) {
        return;
      }
      this.todos.unshift({
        id: id++,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
    },

    // function2 备忘录管理
    // 编辑
    editTodo(todo) {
      this.editedTodo = { ...todo };
    },
    // 确认修改
    doneEdit(todo) {
      this.todos = this.todos.map(x => {
        return todo.id == x.id ? { ...todo } : { ...x }
      });
      this.editedTodo = {};
    },
    // 取消修改
    cancelEdite() {
      this.editedTodo = {};
    },
    // 删除备忘
    removeTodo(todo) {
      const index = this.todos.findIndex(x => x.id === todo.id);
      this.todos.splice(index,1);
    },

    // function3 一键删除备忘
    computed: {
      // 计算剩余未完成任务
      remaining() {
        return this.todos.filter(x => !x.competed).length;
      }
    },

    filters: {
      pluralize(num) {
        return num > 1 ? "items" : "item";
      }
    }
  }
}
</script>

<style>

</style>