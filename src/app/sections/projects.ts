import { Component } from '@angular/core';
import { PROFILE, PROJECTS, liveUrl } from '../data/portfolio.data';

@Component({
  selector: 'app-projects',
  template: `
    <section id="proyectos" class="section" aria-labelledby="proyectos-title">
      <div class="section-head">
        <h2 id="proyectos-title"><span class="idx">01 /</span>Proyectos</h2>
        <a class="aside" [attr.href]="live(profile.github)" [attr.aria-disabled]="live(profile.github) ? null : 'true'"
          >más en GitHub ↗</a
        >
      </div>
      <ul class="grid">
        @for (p of projects; track p.title; let i = $index) {
          <li>
            <a
              class="card project"
              [attr.href]="live(p.url)"
              [attr.target]="live(p.url) ? '_blank' : null"
              [attr.rel]="live(p.url) ? 'noopener noreferrer' : null"
              [attr.aria-disabled]="live(p.url) ? null : 'true'"
            >
              <span class="top eyebrow" aria-hidden="true">
                <span>PROJECT {{ '0' + (i + 1) }}</span><span>↗</span>
              </span>
              <h3>{{ p.title }}</h3>
              <p class="desc">{{ p.description }}</p>
              <ul class="pills" aria-label="Tecnologías">
                @for (t of p.tags; track t) {
                  <li class="pill">{{ t }}</li>
                }
              </ul>
              <span class="open">
                → abrir proyecto<span class="visually-hidden">
                  {{ p.title }} (se abre en otra pestaña)</span
                >
                @if (!live(p.url)) {
                  <span class="pending"> {{ p.url }}</span>
                }
              </span>
            </a>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .aside {
      font-family: var(--font-mono);
      font-size: 13px;
      padding: 8px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
      gap: 24px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .project {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      color: var(--text);
      transition: border-color 0.15s;
    }
    .project:hover {
      border-color: rgba(167, 139, 250, 0.6);
      color: var(--text);
    }
    .top {
      display: flex;
      justify-content: space-between;
    }
    h3 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .desc {
      margin: 0;
      flex: 1;
      font-size: 15px;
      line-height: 1.6;
      color: var(--text-2);
    }
    .open {
      font-family: var(--font-mono);
      font-size: 14px;
    }
    .pending {
      color: var(--accent);
      font-size: 12px;
    }
  `,
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
  protected readonly profile = PROFILE;
  protected readonly live = liveUrl;
}
