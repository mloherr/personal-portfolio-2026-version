import { Component, signal } from '@angular/core';
import { PROFILE, liveUrl } from '../data/portfolio.data';

@Component({
  selector: 'app-contact',
  template: `
    <section id="contacto" class="section" aria-labelledby="contacto-title">
      <div class="section-head">
        <h2 id="contacto-title"><span class="idx">05 /</span>Contacto</h2>
      </div>
      <div class="wrap">
        <form (submit)="submit($event)">
          <div class="field">
            <label for="nombre">NOMBRE</label>
            <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" autocomplete="name" required />
          </div>
          <div class="field">
            <label for="email">EMAIL</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" autocomplete="email" required />
          </div>
          <div class="field">
            <label for="mensaje">MENSAJE</label>
            <textarea id="mensaje" name="mensaje" rows="5" placeholder="Cuéntame qué tienes en mente" required></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Enviar mensaje</button>
          <p class="status" role="status" aria-live="polite">{{ status() }}</p>
        </form>

        <div class="side">
          <p class="lead">
            ¿Un proyecto, una auditoría o una oferta? Escríbeme por aquí o donde prefieras.
          </p>
          <ul class="links">
            <li>
              <a class="btn btn-outline" [attr.href]="live(p.email)" [attr.aria-disabled]="live(p.email) ? null : 'true'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><polyline points="3,7 12,13 21,7"></polyline></svg>
                Email
              </a>
            </li>
            <li>
              <a class="btn btn-outline" [attr.href]="live(p.linkedin)" [attr.aria-disabled]="live(p.linkedin) ? null : 'true'" rel="noopener noreferrer" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a class="btn btn-outline" [attr.href]="live(p.github)" [attr.aria-disabled]="live(p.github) ? null : 'true'" rel="noopener noreferrer" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"></path></svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 56px;
      align-items: flex-start;
    }
    form {
      flex: 1 1 380px;
      min-width: 0;
      max-width: 560px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    label {
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.08em;
      color: var(--text-2);
    }
    input,
    textarea {
      width: 100%;
      min-height: 44px;
      padding: 0 14px;
      background: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: var(--radius-btn);
      color: var(--text);
      font-family: var(--font-text);
      font-size: 15px;
    }
    textarea {
      padding: 12px 14px;
      resize: vertical;
    }
    input:focus,
    textarea:focus {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    button {
      align-self: flex-start;
    }
    .status {
      margin: 0;
      min-height: 1.4em;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--accent);
    }
    .side {
      flex: 1 1 280px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .lead {
      margin: 0;
      max-width: 420px;
      font-size: 17px;
      line-height: 1.6;
      color: var(--text-2);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .links .btn {
      min-height: 44px;
      padding: 0 16px;
      font-size: 14px;
    }
  `,
})
export class ContactComponent {
  protected readonly p = PROFILE;
  protected readonly live = liveUrl;
  protected readonly status = signal('');

  protected submit(event: Event): void {
    event.preventDefault();
    // [SERVICIO DE ENVÍO PENDIENTE] (Formspree, EmailJS u otro): por ahora sin envío real.
    this.status.set('[PENDIENTE] El envío aún no está configurado: no se ha enviado nada.');
  }
}
