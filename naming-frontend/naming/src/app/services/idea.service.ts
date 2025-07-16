import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdeaService {
  private idea: string = '';
  private email: string = '';
  private creatividad: number = 0.5;

  setIdea(idea: string) {
    this.idea = idea;
  }
  getIdea(): string {
    return this.idea;
  }

  setCreatividad(creatividad: number) {
    this.creatividad = creatividad;
  }
  getCreatividad(): number {
    return this.creatividad;
  }

  setEmail(email: string) {
    this.email = email;
  }
  getEmail(): string {
    return this.email;
  }
}
