import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';

/**
 * Main component for the task management application
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  /** List of tasks to display */
  listaTareas: string[] = [];
  
  /** New task input field value */
  nuevaTarea: string = '';
  
  /** Error message to display if any */
  errorMessage: string = '';
  
  /** Task service for data operations */
  private _tareasService = inject(TareasService);

  /**
   * Initialize the component and load existing tasks
   */
  ngOnInit(): void {
    this.actualizarListaTareas();
  }

  /**
   * Update the task list from the service
   */
  private actualizarListaTareas(): void {
    try {
      this.listaTareas = this._tareasService.getTareas();
      this.errorMessage = ''; // Clear any previous errors
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.errorMessage = 'No se pudieron cargar las tareas. Inténtalo de nuevo.';
    }
  }

  /**
   * Add a new task to the list if input is valid
   */
  agregarTarea(): void {
    try {
      // Validate input
      if (!this.nuevaTarea || this.nuevaTarea.trim() === '') {
        this.errorMessage = 'Por favor ingresa una tarea válida.';
        return;
      }
      
      this._tareasService.agregarTarea(this.nuevaTarea.trim());
      this.nuevaTarea = ''; // Clear input field
      this.actualizarListaTareas();
      this.errorMessage = ''; // Clear any previous errors
    } catch (error) {
      console.error('Error adding task:', error);
      this.errorMessage = 'No se pudo agregar la tarea. Inténtalo de nuevo.';
    }
  }

  /**
   * Remove a task from the list by its index
   */
  eliminarTarea(index: number): void {
    try {
      if (index < 0 || index >= this.listaTareas.length) {
        console.error('Invalid task index:', index);
        return;
      }
      
      this._tareasService.eliminarTarea(index);
      this.actualizarListaTareas();
    } catch (error) {
      console.error('Error removing task:', error);
      this.errorMessage = 'No se pudo eliminar la tarea. Inténtalo de nuevo.';
    }
  }
}

