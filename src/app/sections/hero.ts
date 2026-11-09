import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  template: `
    <section id="top" class="hero container" aria-labelledby="hero-title">
      <div class="copy">
        <p class="prompt">
          {{ p.promptHost }}:~$ whoami<span class="cur" aria-hidden="true"></span>
        </p>
        <h1 id="hero-title">{{ p.name }}</h1>
        <div class="role">
          <p>{{ p.role }}</p>
          <p class="focus">{{ p.focus }}</p>
        </div>
        <p class="intro">{{ p.intro }}</p>
        <div class="actions">
          <a class="btn btn-primary" href="#proyectos">Mi trabajo</a>
          <a class="btn btn-outline" href="#contacto">Contacto</a>
        </div>
      </div>

      <div class="character">
        <div class="bubble" aria-hidden="true">
          <span class="dim"><span class="ac">$</span> ./saludar.sh</span>
          <span
            ><span class="ac">&gt;</span> hola, ¿qué construimos?<span class="cur small"></span
          ></span>
        </div>
        <div class="sprite">
          <img
            src="chibi-maria.png"
            width="28"
            height="32"
            alt="María como personaje de pixel art: pelo oscuro rizado hasta los hombros con flequillo, chaqueta verde de pana y camiseta negra"
          />
          <div class="ground" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      padding-top: 96px;
      padding-bottom: 80px;
      display: flex;
      flex-wrap: wrap;
      gap: 56px;
      align-items: center;
    }
    .copy {
      flex: 1 1 480px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .prompt {
      margin: 0;
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--text-2);
    }
    h1 {
      margin: 0;
      font-family: var(--font-pixel);
      font-weight: 700;
      font-size: 104px;
      line-height: 1;
      letter-spacing: -0.01em;
    }
    .role {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .role p {
      margin: 0;
      font-size: 28px;
      line-height: 1.25;
      font-weight: 500;
    }
    .role .focus {
      color: var(--accent);
    }
    .intro {
      margin: 0;
      max-width: 520px;
      font-size: 17px;
      line-height: 1.6;
      color: var(--text-2);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 4px;
    }

    .cur {
      display: inline-block;
      width: 0.55em;
      height: 1em;
      margin-left: 6px;
      vertical-align: -0.12em;
      background: var(--accent);
      animation: blink 1.1s steps(1) infinite;
    }
    .cur.small {
      width: 0.5em;
      height: 0.9em;
      margin-left: 5px;
      vertical-align: -0.1em;
    }
    @keyframes blink {
      0%,
      49% {
        opacity: 1;
      }
      50%,
      100% {
        opacity: 0;
      }
    }

    .character {
      flex: 1 1 340px;
      min-width: 0;
      max-width: 440px;
      padding: 0 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
    }
    .bubble {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 14px 18px;
      background: var(--terminal);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: var(--radius-btn);
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.7;
      color: var(--text);
    }
    .bubble .dim {
      color: var(--text-2);
    }
    .bubble .ac {
      color: var(--accent);
    }
    .bubble::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -7px;
      width: 12px;
      height: 12px;
      margin-left: -6px;
      background: var(--terminal);
      border-right: 1px solid rgba(255, 255, 255, 0.16);
      border-bottom: 1px solid rgba(255, 255, 255, 0.16);
      transform: rotate(45deg);
    }
    .sprite {
      position: relative;
      width: 100%;
      max-width: 280px;
    }
    .sprite img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 7 / 8;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .ground {
      position: absolute;
      left: -30px;
      right: -30px;
      bottom: 14%;
      height: 2px;
      background: rgba(255, 255, 255, 0.18);
    }

    @media (max-width: 640px) {
      .hero {
        padding-top: 56px;
        padding-bottom: 56px;
        gap: 40px;
      }
      h1 {
        font-size: 72px;
      }
      .role p {
        font-size: 22px;
      }
    }
  `,
})
export class HeroComponent {
  protected readonly p = PROFILE;
}
