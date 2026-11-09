import { Component } from '@angular/core';
import { PROFILE, PROJECTS, isPending, liveUrl } from '../data/portfolio.data';

@Component({
  selector: 'app-projects',
  template: `
    <section id="proyectos" class="sec container" aria-labelledby="proyectos-title">
      <div class="sec-head">
        <h2 id="proyectos-title">Proyectos</h2>
        <a
          class="aside"
          [attr.href]="live(profile.github)"
          [attr.aria-disabled]="live(profile.github) ? null : 'true'"
          >más en GitHub</a
        >
      </div>
      <ol class="rows">
        @for (p of projects; track p.title; let i = $index) {
          <li>
            <a
              class="row"
              [attr.href]="live(p.url)"
              [attr.target]="live(p.url) ? '_blank' : null"
              [attr.rel]="live(p.url) ? 'noopener noreferrer' : null"
              [attr.aria-disabled]="live(p.url) ? null : 'true'"
            >
              <span class="num" aria-hidden="true">{{ '0' + (i + 1) }}</span>
              <h3>{{ p.title }}</h3>
              <div class="body">
                <p class="desc">{{ p.description }}</p>
                <ul class="args" aria-label="Tecnologías">
                  @for (t of p.tags; track t) {
                    <li [class.fill]="pending(t)">{{ pending(t) ? t : '--' + slug(t) }}</li>
                  }
                </ul>
                <span class="open">
                  Abrir proyecto<span class="visually-hidden">
                    {{ p.title }} (se abre en otra pestaña)</span
                  >
                  @if (!live(p.url)) {
                    <span class="fill">{{ p.url }}</span>
                  }
                </span>
              </div>
            </a>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .rows {
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: var(--rule-hair) solid var(--color-rule-2);
    }
    .rows li {
      border-bottom: var(--rule-hair) solid var(--color-rule);
    }
    .row {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--gap-columns);
      align-items: start;
      padding: var(--space-xl) var(--space-sm);
      color: var(--color-ink);
      text-decoration: none;
      transition: background-color var(--dur-micro) steps(1);
    }
    .row:hover {
      background: var(--color-paper-2);
      color: var(--color-ink);
    }
    .row:hover h3 {
      color: var(--color-accent);
    }
    .num {
      grid-column: 1 / span 1;
      color: var(--color-muted);
      font-size: var(--text-sm);
      padding-top: var(--space-xs);
    }
    h3 {
      grid-column: 2 / span 5;
      font-size: var(--text-xl);
      line-height: 1.2;
      max-width: none;
    }
    .body {
      grid-column: 8 / -1;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      min-width: 0;
    }
    .desc {
      color: var(--color-ink-2);
      font-size: var(--text-md);
    }
    .args {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2xs) var(--space-md);
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: var(--text-sm);
      color: var(--color-accent);
    }
    .args .fill {
      color: var(--color-muted);
    }
    .open {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--text-sm);
      text-decoration: underline dotted;
    }
    .open .fill {
      font-size: var(--text-xs);
      text-decoration: none;
    }
    @media (max-width: 60rem) {
      .num,
      h3,
      .body {
        grid-column: 1 / -1;
      }
      h3 {
        margin-block: var(--space-xs) var(--space-md);
      }
    }
  `,
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
  protected readonly profile = PROFILE;
  protected readonly live = liveUrl;
  protected readonly pending = isPending;
  protected slug(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-');
  }
}
