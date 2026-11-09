import { Component } from '@angular/core';
import { LABS, isPending, liveUrl } from '../data/portfolio.data';

@Component({
  selector: 'app-labs',
  template: `
    <section id="labs" class="sec container" aria-labelledby="labs-title">
      <div class="sec-head">
        <h2 id="labs-title">Laboratorios</h2>
        <p class="aside">writeups, labs y CTFs</p>
      </div>
      <div class="well log" tabindex="0" role="region" aria-label="Tabla de laboratorios, desplazable">
        <table>
          <caption class="visually-hidden">
            Writeups de laboratorios y máquinas retiradas
          </caption>
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Plataforma</th>
              <th scope="col">Lab</th>
              <th scope="col">Categoría</th>
              <th scope="col">Writeup</th>
            </tr>
          </thead>
          <tbody>
            @for (l of labs; track $index) {
              <tr>
                <td data-label="Fecha"><span [class.fill]="pending(l.date)">{{ l.date }}</span></td>
                <td data-label="Plataforma"><span [class.fill]="pending(l.platform)">{{ l.platform }}</span></td>
                <td data-label="Lab"><span [class.fill]="pending(l.name)">{{ l.name }}</span></td>
                <td data-label="Categoría"><span [class.fill]="pending(l.category)">{{ l.category }}</span></td>
                <td data-label="Writeup">
                  <a
                    [attr.href]="live(l.writeupUrl)"
                    [attr.aria-disabled]="live(l.writeupUrl) ? null : 'true'"
                    [attr.aria-label]="'Leer writeup: ' + l.name"
                    >Leer</a
                  >
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: `
    .log {
      overflow-x: auto;
    }
    table {
      width: 100%;
      min-width: 720px;
      border-collapse: collapse;
      font-size: var(--text-sm);
      text-align: left;
    }
    th {
      padding: var(--space-md) var(--space-lg);
      font-weight: 400;
      color: var(--color-muted);
      border-bottom: var(--rule-hair) solid var(--color-rule-2);
    }
    td {
      padding: var(--space-lg);
      border-bottom: var(--rule-hair) solid var(--color-rule);
    }
    tbody tr:last-child td {
      border-bottom: 0;
    }
    tbody tr:hover {
      background: var(--color-paper-3);
    }
    @media (max-width: 40rem) {
      table {
        min-width: 0;
      }
      thead {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
      }
      tr,
      td {
        display: block;
      }
      tbody tr {
        padding: var(--space-sm) 0;
        border-bottom: var(--rule-hair) solid var(--color-rule);
      }
      tbody tr:last-child {
        border-bottom: 0;
      }
      td {
        display: flex;
        gap: var(--space-md);
        padding: var(--space-xs) var(--space-md);
        border-bottom: 0;
      }
      td::before {
        content: attr(data-label);
        flex: 0 0 7rem;
        color: var(--color-muted);
      }
    }
    td a {
      color: var(--color-ink-2);
      text-decoration: underline dotted;
    }
    td a:hover {
      color: var(--color-accent);
    }
  `,
})
export class LabsComponent {
  protected readonly labs = LABS;
  protected readonly live = liveUrl;
  protected readonly pending = isPending;
}
