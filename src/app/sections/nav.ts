import { Component } from '@angular/core';
import { NAV_LINKS } from '../data/portfolio.data';

@Component({
  selector: 'app-nav',
  template: `
    <header>
      <nav class="container" aria-label="Principal">
        <a class="brand" href="#top">~/maria<span aria-hidden="true">_</span></a>
        <ul>
          @for (link of links; track link.href) {
            <li><a [href]="link.href">{{ link.label }}</a></li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: `
    header {
      border-bottom: 1px solid var(--divider);
    }
    nav {
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 500;
      color: var(--text);
    }
    .brand span {
      color: var(--accent);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 28px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-family: var(--font-mono);
      font-size: 14px;
    }
    li a {
      display: inline-block;
      padding: 8px 0;
    }
  `,
})
export class NavComponent {
  protected readonly links = NAV_LINKS;
}
