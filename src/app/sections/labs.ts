import { Component } from '@angular/core';
import { LABS, liveUrl } from '../data/portfolio.data';

@Component({
  selector: 'app-labs',
  template: `
    <section id="labs" class="section" aria-labelledby="labs-title">
      <div class="section-head">
        <h2 id="labs-title"><span class="idx">03 /</span>Laboratorios</h2>
        <p class="aside">writeups, labs y CTFs</p>
      </div>
      <div class="card log" tabindex="0" role="region" aria-label="Tabla de laboratorios, desplazable">
        <table>
          <caption class="visually-hidden">
            Writeups de laboratorios y máquinas retiradas
          </caption>
          <thead>
            <tr>
              <th scope="col">FECHA</th>
              <th scope="col">PLATAFORMA</th>
              <th scope="col">LAB</th>
              <th scope="col">CATEGORÍA</th>
              <th scope="col">WRITEUP</th>
            </tr>
          </thead>
          <tbody>
            @for (l of labs; track $index) {
              <tr>
                <td class="muted">{{ l.date }}</td>
                <td>{{ l.platform }}</td>
                <td>{{ l.name }}</td>
                <td class="cat">{{ l.category }}</td>
                <td>
                  <a
                    [attr.href]="live(l.writeupUrl)"
                    [attr.aria-disabled]="live(l.writeupUrl) ? null : 'true'"
                    [attr.aria-label]="'Leer writeup: ' + l.name"
                    >→ leer</a
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
      padding: 8px 28px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      min-width: 640px;
      border-collapse: collapse;
      font-family: var(--font-mono);
      font-size: 14px;
      text-align: left;
    }
    th {
      padding: 16px 16px 16px 0;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.08em;
      color: var(--text-2);
      border-bottom: 1px solid var(--divider);
    }
    td {
      padding: 18px 16px 18px 0;
      color: var(--text);
      border-bottom: 1px solid var(--divider);
    }
    tbody tr:last-child td {
      border-bottom: 0;
    }
    td.muted {
      color: var(--text-2);
    }
    td.cat {
      color: var(--accent);
    }
    td a {
      color: var(--text);
    }
  `,
})
export class LabsComponent {
  protected readonly labs = LABS;
  protected readonly live = liveUrl;
}
