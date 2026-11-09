import { Component } from '@angular/core';
import { STACK, isPending } from '../data/portfolio.data';

@Component({
  selector: 'app-stack',
  template: `
    <section id="stack" class="sec container" aria-labelledby="stack-title">
      <div class="sec-head">
        <h2 id="stack-title">Stack</h2>
        <p class="aside">con lo que trabajo</p>
      </div>
      <div class="well session" role="group" aria-label="Stack por grupos">
        @for (g of groups; track g.label) {
          <div class="entry">
            <p class="cmd"><span aria-hidden="true">$</span> ls {{ slug(g.label) }}/</p>
            <ul class="out">
              @for (item of g.items; track item) {
                <li [class.fill]="pending(item)">{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .session {
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
    }
    .entry {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--gap-columns);
      align-items: baseline;
      padding-block: var(--space-lg);
    }
    .entry + .entry {
      border-top: var(--rule-hair) solid var(--color-rule);
    }
    .cmd {
      grid-column: 1 / span 4;
      margin: 0;
      font-size: var(--text-sm);
      color: var(--color-muted);
    }
    .cmd span {
      margin-right: var(--space-xs);
    }
    .out {
      grid-column: 5 / -1;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs) var(--space-xl);
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: var(--text-lg);
      font-weight: 500;
      font-stretch: var(--stretch-display);
    }
    .out .fill {
      font-size: var(--text-md);
      font-weight: 400;
    }
    @media (max-width: 60rem) {
      .session {
        padding: var(--space-md);
      }
      .cmd,
      .out {
        grid-column: 1 / -1;
      }
      .cmd {
        margin-bottom: var(--space-sm);
      }
      .out {
        font-size: var(--text-md);
        gap: var(--space-xs) var(--space-lg);
      }
    }
  `,
})
export class StackComponent {
  protected readonly groups = STACK;
  protected readonly pending = isPending;
  protected slug(label: string): string {
    return label.toLowerCase().replace(/\s+/g, '-');
  }
}
