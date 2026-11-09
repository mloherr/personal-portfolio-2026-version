import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="container">
        <p class="mark" aria-hidden="true">maria</p>
        <p class="legal">© {{ p.year }} {{ p.name }}</p>
      </div>
    </footer>
  `,
  styles: `
    footer {
      border-top: var(--rule-hair) solid var(--color-rule);
      background: var(--color-paper-2);
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--space-md);
      padding-block: var(--space-2xl);
    }
    .mark {
      font-size: 2.5rem;
      font-weight: 500;
      font-stretch: var(--stretch-display);
      letter-spacing: var(--tracking-display);
      line-height: 1;
      color: var(--color-ink);
    }
    .legal {
      font-size: var(--text-sm);
      color: var(--color-muted);
    }
  `,
})
export class FooterComponent {
  protected readonly p = PROFILE;
}
