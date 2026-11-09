import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="container">© {{ p.year }} {{ p.name }}</div>
    </footer>
  `,
  styles: `
    footer {
      border-top: 1px solid var(--divider);
    }
    .container {
      padding-top: 28px;
      padding-bottom: 28px;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-2);
    }
  `,
})
export class FooterComponent {
  protected readonly p = PROFILE;
}
