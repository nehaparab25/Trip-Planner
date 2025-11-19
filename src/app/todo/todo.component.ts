import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoText: string = '';
  nextId: number = 1;

  constructor() { }

  ngOnInit(): void {
    // Load todos from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
      if (this.todos.length > 0) {
        this.nextId = Math.max(...this.todos.map(t => t.id)) + 1;
      }
    }
  }

  addTodo(): void {
    if (this.newTodoText.trim() !== '') {
      const newTodo: Todo = {
        id: this.nextId++,
        text: this.newTodoText.trim(),
        completed: false
      };
      this.todos.push(newTodo);
      this.newTodoText = '';
      this.saveTodos();
    }
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
  }

  saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  get completedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  get totalCount(): number {
    return this.todos.length;
  }
}
