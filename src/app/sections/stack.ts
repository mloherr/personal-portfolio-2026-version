import { Component } from '@angular/core';
import { STACK } from '../data/portfolio.data';

@Component({
  selector: 'app-stack',
  template: `
    <section id="stack" class="section" aria-labelledby="stack-title">
      <div class="section-head">
        <h2 id="stack-title"><span class="idx">02 /</span>Stack</h2>
        <p class="aside">con lo que trabajo</p>
      </div>
      <div class="grid">
        @for (g of groups; track g.label) {
          <div class="card group">
            <h3 class="eyebrow">{{ g.label.toUpperCase() }}</h3>
            <ul class="pills">
              @for (item of g.items; track item) {
                <li class="pill">{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
      gap: 24px;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    h3 {
      font-weight: 400;
    }
    .pills {
      font-size: 13px;
    }
    .pill {
      color: var(--text);
    }
  `,
})
export class StackComponent {
  protected readonly groups = STACK;
}
