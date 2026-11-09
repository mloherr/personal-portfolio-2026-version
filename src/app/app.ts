import { Component } from '@angular/core';
import { NavComponent } from './sections/nav';
import { HeroComponent } from './sections/hero';
import { ProjectsComponent } from './sections/projects';
import { StackComponent } from './sections/stack';
import { LabsComponent } from './sections/labs';
import { ExperienceComponent } from './sections/experience';
import { ContactComponent } from './sections/contact';
import { FooterComponent } from './sections/footer';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HeroComponent,
    ProjectsComponent,
    StackComponent,
    LabsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <app-nav />
    <main id="main" tabindex="-1">
      <app-hero />
      <app-projects />
      <app-stack />
      <app-labs />
      <app-experience />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
})
export class App {}
