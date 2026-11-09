import { Component } from '@angular/core';
import { TIMELINE } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  template: `
    <section id="experiencia" class="section" aria-labelledby="experiencia-title">
      <div class="section-head">
        <h2 id="experiencia-title"><span class="idx">04 /</span>Experiencia y formación</h2>
      </div>
      <ol class="timeline">
        @for (e of entries; track e.title) {
          <li>
            <span class="dot" aria-hidden="true"></span>
            <p class="eyebrow">{{ e.period }} · {{ e.kind }}</p>
            <h3>{{ e.title }}</h3>
            <p class="detail">{{ e.detail }}</p>
            @if (e.highlights) {
              <ul class="highlights">
                @for (h of e.highlights; track h) {
                  <li>{{ h }}</li>
                }
              </ul>
            }
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .timeline {
      margin: 0 0 0 6px;
      padding: 0 0 0 32px;
      list-style: none;
      border-left: 1px solid rgba(255, 255, 255, 0.14);
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .timeline > li {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .dot {
      position: absolute;
      left: -39px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent);
    }
    h3 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .detail {
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
      color: var(--text-2);
    }
    .highlights {
      margin: 6px 0 0;
      padding-left: 20px;
      font-size: 15px;
      line-height: 1.7;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  `,
})
export class ExperienceComponent {
  protected readonly entries = TIMELINE;
}
