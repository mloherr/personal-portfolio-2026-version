import { Component, signal } from '@angular/core';
import { PROFILE, liveUrl } from '../data/portfolio.data';

@Component({
  selector: 'app-contact',
  template: `
    <section id="contacto" class="sec container" aria-labelledby="contacto-title">
      <div class="wrap">
        <div class="side">
          <h2 id="contacto-title">Contacto</h2>
          <p class="lead">
            ¿Un proyecto, una auditoría o una oferta? Escríbeme por aquí o donde prefieras.
          </p>
          <ul class="links">
            @for (l of channels; track l.label) {
              <li>
                <a class="btn" [attr.href]="live(l.url)" [attr.aria-disabled]="live(l.url) ? null : 'true'" [attr.rel]="l.ext ? 'noopener noreferrer' : null" [attr.target]="l.ext ? '_blank' : null">
                  {{ l.label }}
                </a>
              </li>
            }
          </ul>
        </div>

        <form class="well" (submit)="submit($event)">
          <div class="field">
            <label for="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" autocomplete="name" required />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" autocomplete="email" required />
          </div>
          <div class="field">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows="5" placeholder="Cuéntame qué tienes en mente" required></textarea>
          </div>
          <input class="trap" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <button class="btn btn-primary" type="submit" [attr.aria-busy]="sending() ? 'true' : null">Enviar mensaje</button>
          <p class="status" role="status" aria-live="polite">{{ status() }}</p>
        </form>

      </div>
    </section>
  `,
  styles: `
    .wrap {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--gap-columns);
      row-gap: var(--space-2xl);
      align-items: start;
    }
    .side {
      grid-column: 1 / span 5;
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      min-width: 0;
    }
    h2 {
      font-size: 2.5rem;
    }
    .lead {
      color: var(--color-ink-2);
      font-size: var(--text-md);
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    form {
      grid-column: 7 / -1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      padding: var(--space-xl);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }
    label {
      font-size: var(--text-sm);
      color: var(--color-muted);
    }
    input,
    textarea {
      width: 100%;
      min-height: 48px;
      padding: 0 var(--space-md);
      background: var(--color-paper);
      border: var(--rule-hair) solid var(--color-muted);
      border-radius: 0;
      color: var(--color-ink);
      font-size: var(--text-sm);
    }
    textarea {
      padding: var(--space-sm) var(--space-md);
      resize: vertical;
    }
    ::placeholder {
      color: var(--color-muted);
    }
    input:focus-visible,
    textarea:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 2px;
      border-color: var(--color-focus);
    }
    .trap {
      position: absolute;
      width: 1px;
      height: 1px;
      min-height: 0;
      padding: 0;
      border: 0;
      opacity: 0;
      pointer-events: none;
    }
    button {
      align-self: flex-start;
    }
    .status {
      margin: 0;
      min-height: 1.4em;
      font-size: var(--text-sm);
      color: var(--color-accent);
    }
    @media (max-width: 60rem) {
      .side,
      form {
        grid-column: 1 / -1;
      }
      form {
        padding: var(--space-md);
      }
    }
  `,
})
export class ContactComponent {
  protected readonly p = PROFILE;
  protected readonly live = liveUrl;
  protected readonly status = signal('');
  protected readonly sending = signal(false);
  protected readonly channels = [
    { label: 'Email', url: PROFILE.email, ext: false },
    { label: 'LinkedIn', url: PROFILE.linkedin, ext: true },
    { label: 'GitHub', url: PROFILE.github, ext: true },
  ];

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.sending()) return;
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.sending.set(true);
    this.status.set('Enviando…');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        this.status.set('Mensaje enviado. Gracias, te respondo pronto.');
      } else {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        this.status.set(body?.error ?? 'No se pudo enviar. Inténtalo de nuevo en un rato.');
      }
    } catch {
      this.status.set('No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      this.sending.set(false);
    }
  }
}
