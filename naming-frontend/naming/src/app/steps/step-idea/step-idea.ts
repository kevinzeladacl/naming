import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';

import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-paso-idea',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './step-idea.html',
  styleUrl: './step-idea.scss'
})

export class PasoIdeaComponent {
  idea: string = '';
  creatividad: number = 0.5;

  constructor(private router: Router, private ideaService: IdeaService) {}

  irAlPasoDos() {
    this.ideaService.setIdea(this.idea);
    this.ideaService.setCreatividad(this.creatividad);
    this.router.navigate(['resultados']);
  }
}

