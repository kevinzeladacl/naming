import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { IdeaService } from '../../services/idea.service';
import { NamingApiService } from '../../services/naming-api.service';

@Component({
  selector: 'app-paso-resultados',
  templateUrl: './step-results.html',
  styleUrls: ['./step-results.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('600ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('cardFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.97)' }),
        animate('400ms 100ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})

export class PasoResultadosComponent implements OnInit {
  resultados: any[] = [];
  loading = true;
  error = '';
  email: string = '';
  progress: number = 0;
  private progressInterval: any;

  constructor(private ideaService: IdeaService, private api: NamingApiService) {}

  ngOnInit() {
    this.progress = 0;
    this.startProgress();
    const idea = this.ideaService.getIdea();
    const creatividad = this.ideaService.getCreatividad();
    if (!idea) {
      this.error = 'No se ingresó ninguna idea.';
      this.loading = false;
      this.stopProgress();
      return;
    }
    this.api.getNamingSuggestions(idea, creatividad).subscribe({
      next: (resp) => {
        this.resultados = resp.resultados || [];
        this.loading = false;
        this.progress = 100;
        this.stopProgress();
      },
      error: (err) => {
        this.error = 'Error al obtener resultados.';
        this.loading = false;
        this.stopProgress();
      }
    });
  }

  startProgress() {
    this.progress = 0;
    this.progressInterval = setInterval(() => {
      if (this.progress < 95) {
        this.progress += Math.random() * 3 + 1; // Avanza de 1 a 4%
      } else if (this.progress < 99) {
        this.progress += 0.2; // Lento al final
      }
      if (this.progress > 99) this.progress = 99;
    }, 60);
  }

  stopProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.progress = 100;
  }

  getColoresDestacados(): string[] {
    const all = this.resultados.flatMap(r => r.colores);
    return Array.from(new Set(all));
  }
}


