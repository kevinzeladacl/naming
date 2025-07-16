import { Routes } from '@angular/router';

import { PasoIdeaComponent } from './steps/step-idea/step-idea';
import { PasoResultadosComponent } from './steps/step-results/step-results';

export const routes: Routes = [
  { path: '', component: PasoIdeaComponent },
  { path: 'resultados', component: PasoResultadosComponent },
];
