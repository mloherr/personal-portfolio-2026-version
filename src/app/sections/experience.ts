import { Component } from '@angular/core';
import { TIMELINE, isPending } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  template: `
    <section id="experiencia" class="sec container" aria-labelledby="experiencia-title">
      <div class="layout">
        <h2 id="experiencia-title">Experiencia y formación</h2>
        <ol class="log">
          @for (e of entries; track e.title) {
            <li>
              <div class="when">
                <p class="period">{{ e.period }}</p>
                <p class="kind">{{ e.kind }}</p>
              </div>
              <div class="what">
                <h3>{{ e.title }}</h3>
                <p class="detail">
                  {{ e.detail }}
                </p>
                @if (e.highlights) {
                  <ul class="added">
                    @for (h of e.highlights; track h) {
                      <li [class.fill]="pending(h)">{{ h }}</li>
                    }
                  </ul>
                }
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--gap-columns);
      row-gap: var(--space-xl);
    }
    h2 {
      grid-column: 1 / span 4;
      font-size: 2.5rem;
      align-self: start;
    }
    .log {
      grid-column: 5 / -1;
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: var(--rule-hair) solid var(--color-rule-2);
    }
    .log > li {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 5fr);
      column-gap: var(--gap-columns);
      padding-block: var(--space-xl);
      border-bottom: var(--rule-hair) solid var(--color-rule);
    }
    .when p {
      margin: 0;
      font-size: var(--text-sm);
    }
    .kind {
      color: var(--color-muted);
    }
    .period {
      color: var(--color-ink-2);
    }
    .what {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      min-width: 0;
    }
    h3 {
      font-size: var(--text-lg);
      max-width: none;
    }
    .detail {
      color: var(--color-ink-2);
      font-size: var(--text-md);
    }
    .added {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xs);
      margin: var(--space-xs) 0 0;
      padding: 0;
      list-style: none;
      font-size: var(--text-sm);
    }
    .added li {
      display: flex;
      gap: var(--space-sm);
      padding: var(--space-2xs) var(--space-sm);
      background: var(--color-accent-wash);
      color: var(--color-ink);
    }
    .added li::before {
      content: '+';
      color: var(--color-accent);
    }
    .added li.fill {
      background: transparent;
      border-color: var(--color-rule-2);
      color: var(--color-muted);
    }
    @media (max-width: 60rem) {
      h2,
      .log {
        grid-column: 1 / -1;
      }
      .log > li {
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--space-sm);
      }
    }
  `,
})
export class ExperienceComponent {
  protected readonly entries = TIMELINE;
  protected readonly pending = isPending;
}
