import { Component, computed, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  maxLength,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import type { FieldTree } from '@angular/forms/signals';
import { PROFILE, liveUrl } from '../data/portfolio.data';

const MAX_MENSAJE = 2000;
const EMPTY = { nombre: '', email: '', mensaje: '', website: '' };

@Component({
  selector: 'app-contact',
  imports: [FormRoot, FormField],
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
                <a
                  class="btn"
                  [attr.href]="live(l.url)"
                  [attr.aria-disabled]="live(l.url) ? null : 'true'"
                  [attr.rel]="l.ext ? 'noopener noreferrer' : null"
                  [attr.target]="l.ext ? '_blank' : null"
                >
                  {{ l.label }}
                </a>
              </li>
            }
          </ul>
        </div>

        <form class="well" [formRoot]="contactForm" aria-describedby="form-status">
          <div class="field">
            <label for="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              autocomplete="name"
              [formField]="contactForm.nombre"
              [attr.aria-invalid]="error(contactForm.nombre) ? 'true' : null"
              [attr.aria-describedby]="error(contactForm.nombre) ? 'nombre-error' : null"
            />
            @if (error(contactForm.nombre); as msg) {
              <p class="error" id="nombre-error">{{ msg }}</p>
            }
          </div>

          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autocomplete="email"
              [formField]="contactForm.email"
              [attr.aria-invalid]="error(contactForm.email) ? 'true' : null"
              [attr.aria-describedby]="error(contactForm.email) ? 'email-error' : null"
            />
            @if (error(contactForm.email); as msg) {
              <p class="error" id="email-error">{{ msg }}</p>
            }
          </div>

          <div class="field">
            <label for="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows="5"
              placeholder="Cuéntame qué tienes en mente"
              [formField]="contactForm.mensaje"
              [attr.aria-invalid]="error(contactForm.mensaje) ? 'true' : null"
              [attr.aria-describedby]="
                error(contactForm.mensaje) ? 'mensaje-error mensaje-count' : 'mensaje-count'
              "
            ></textarea>
            <div class="meta">
              @if (error(contactForm.mensaje); as msg) {
                <p class="error" id="mensaje-error">{{ msg }}</p>
              }
              <p class="count" id="mensaje-count">{{ mensajeLength() }} / {{ maxMensaje }}</p>
            </div>
          </div>

          <input
            class="trap"
            type="text"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            [formField]="contactForm.website"
          />

          <button
            class="btn btn-primary"
            type="submit"
            [attr.aria-busy]="contactForm().submitting() ? 'true' : null"
          >
            Enviar mensaje
          </button>
          <p class="status" id="form-status" role="status" aria-live="polite">{{ status() }}</p>
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
    input[aria-invalid='true'],
    textarea[aria-invalid='true'] {
      border-color: var(--color-accent);
    }
    .meta {
      display: flex;
      justify-content: space-between;
      gap: var(--space-md);
    }
    .error {
      margin: 0;
      font-size: var(--text-sm);
      color: var(--color-accent);
    }
    .count {
      margin: 0 0 0 auto;
      font-size: var(--text-xs);
      color: var(--color-muted);
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
  protected readonly maxMensaje = MAX_MENSAJE;
  protected readonly status = signal('');
  protected readonly channels = [
    { label: 'Email', url: PROFILE.email, ext: false },
    { label: 'LinkedIn', url: PROFILE.linkedin, ext: true },
    { label: 'GitHub', url: PROFILE.github, ext: true },
  ];

  private readonly model = signal({ ...EMPTY });
  protected readonly mensajeLength = computed(() => this.model().mensaje.length);

  protected readonly contactForm = form(
    this.model,
    (path) => {
      required(path.nombre, { message: 'Escribe tu nombre.' });
      minLength(path.nombre, 2, { message: 'El nombre es demasiado corto.' });
      maxLength(path.nombre, 100, { message: 'Máximo 100 caracteres.' });
      validate(path.nombre, ({ value }) =>
        value().length >= 2 && value().trim().length < 2
          ? { kind: 'blank', message: 'El nombre no puede ser solo espacios.' }
          : undefined,
      );

      required(path.email, { message: 'Escribe tu email.' });
      email(path.email, { message: 'Ese email no parece válido (nombre@dominio.com).' });
      maxLength(path.email, 200, { message: 'Máximo 200 caracteres.' });

      required(path.mensaje, { message: 'Escribe tu mensaje.' });
      minLength(path.mensaje, 10, { message: 'Cuéntame un poco más (mínimo 10 caracteres).' });
      maxLength(path.mensaje, MAX_MENSAJE, { message: `Máximo ${MAX_MENSAJE} caracteres.` });
      validate(path.mensaje, ({ value }) =>
        value().length >= 10 && value().trim().length < 10
          ? { kind: 'blank', message: 'El mensaje no puede ser solo espacios.' }
          : undefined,
      );
    },
    {
      submission: {
        action: async () => {
          this.status.set('Enviando…');
          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(this.model()),
            });
            if (res.ok) {
              this.model.set({ ...EMPTY });
              this.contactForm().reset();
              this.status.set('Mensaje enviado. Gracias, te respondo pronto.');
            } else {
              const body = (await res.json().catch(() => null)) as { error?: string } | null;
              this.status.set(body?.error ?? 'No se pudo enviar. Inténtalo de nuevo en un rato.');
            }
          } catch {
            this.status.set('No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.');
          }
          return undefined;
        },
        onInvalid: () => {
          this.status.set('Revisa los campos marcados.');
          this.contactForm().markAsTouched();
          this.contactForm().errorSummary()[0]?.fieldTree().focusBoundControl();
        },
      },
    },
  );

  /** Primer mensaje de error del campo, solo cuando ya se ha tocado. */
  protected error(field: FieldTree<string>): string | null {
    const state = field();
    return state.touched() && state.invalid() ? (state.errors()[0]?.message ?? null) : null;
  }
}
