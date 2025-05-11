import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = 'listaTareas';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Retrieves tasks from localStorage if in a browser environment
   * Returns an empty array if in server environment or if no tasks exist
   */
  getTareas(): string[] {
    if (!this.isBrowser) {
      return [];
    }

    try {
      const storedTareas = localStorage.getItem(this.localStorageKey);
      return storedTareas ? JSON.parse(storedTareas) : [];
    } catch (error) {
      console.error('Error retrieving tasks from localStorage:', error);
      return [];
    }
  }

  /**
   * Adds a new task to the list if in a browser environment
   */
  agregarTarea(tarea: string): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const tareas = this.getTareas();
      tareas.push(tarea);
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    } catch (error) {
      console.error('Error adding task to localStorage:', error);
    }
  }

  /**
   * Removes a task from the list if in a browser environment
   */
  eliminarTarea(index: number): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const tareas = this.getTareas();
      tareas.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    } catch (error) {
      console.error('Error removing task from localStorage:', error);
    }
  }
}
