import { Component } from '@angular/core';
import { NAV_LINKS } from '../data/portfolio.data';

@Component({
  selector: 'app-nav',
  template: `
    <header>
      <nav aria-label="Principal">
        <a class="brand" href="#top">maria</a>
        <ul>
          @for (link of links; track link.href; let i = $index; let last = $last) {
            <li>
              <a [href]="link.href" [class.action]="last">
                @if (!last) {
                  <span class="n" aria-hidden="true">{{ i + 1 }}</span>
                }
                {{ link.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: `
    header {
      position: sticky;
      top: 0;
      z-index: var(--z-sticky-nav);
      background: var(--color-paper);
      border-bottom: var(--rule-hair) solid var(--color-rule);
    }
    nav {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      min-height: 56px;
      padding-right: var(--gutter);
    }
    .brand {
      display: flex;
      align-items: center;
      padding: 0 var(--gutter);
      background: var(--color-accent);
      color: var(--color-accent-ink);
      font-weight: 700;
      font-size: var(--text-sm);
      text-decoration: none;
    }
    .brand:hover {
      color: var(--color-accent-ink);
      background: var(--color-ink);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      gap: 0 var(--space-lg);
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: var(--text-sm);
    }
    li {
      display: flex;
    }
    li a {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: 0 var(--space-xs);
      color: var(--color-ink-2);
      text-decoration: none;
    }
    li a:hover {
      color: var(--color-accent);
    }
    .n {
      color: var(--color-muted);
    }
    li a.action {
      margin-block: var(--space-xs);
      padding: 0 var(--space-md);
      border: var(--rule-hair) solid var(--color-ink-2);
      color: var(--color-ink);
    }
    li a.action:hover {
      background: var(--color-paper-3);
    }
    @media (max-width: 60rem) {
      nav {
        flex-direction: column;
        padding-right: 0;
      }
      ul {
        padding: var(--space-xs) var(--gutter);
        gap: 0 var(--space-md);
      }
      li a {
        min-height: 44px;
      }
    }
  `,
})
export class NavComponent {
  protected readonly links = NAV_LINKS;
}
