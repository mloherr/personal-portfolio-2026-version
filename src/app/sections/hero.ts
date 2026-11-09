import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

/** Palabras de María: el retrato se imprime con su propio texto. */
const WORDS =
  'maria desarrolladora full-stack angular react node application security pentesting accesibilidad ';
const COLS = 44;
const CELL_RATIO = 1.85;

@Component({
  selector: 'app-hero',
  template: `
    <section id="top" class="hero container" aria-labelledby="hero-title">
      <div class="copy">
        <p class="prompt" aria-hidden="true" [attr.data-text]="p.promptHost + ':~$ whoami'">
          <span class="cur"></span>
        </p>
        <h1 id="hero-title">
          <span class="name">{{ p.name }}</span>
          <span class="role">{{ p.role }} {{ p.focus }}</span>
        </h1>
        <p class="lead">{{ p.intro }}</p>
        <div class="actions">
          <a class="btn btn-primary" href="#proyectos">Mi trabajo</a>
          <a class="btn" href="#contacto">Contacto</a>
        </div>
      </div>

      <figure class="art" #art>
        <img
          #sprite
          src="chibi-maria.png"
          width="28"
          height="32"
          alt="María como personaje de pixel art: pelo oscuro rizado hasta los hombros con flequillo, chaqueta verde de pana y camiseta negra"
        />
        <canvas #canvas aria-hidden="true"></canvas>
      </figure>
    </section>
  `,
  styles: `
    .hero {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--gap-columns);
      align-items: center;
      min-height: calc(100dvh - 57px);
      padding-block: var(--space-2xl);
    }
    .copy {
      grid-column: 1 / span 6;
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      min-width: 0;
    }
    .prompt {
      font-size: var(--text-sm);
      color: var(--color-muted);
    }
    .prompt::before {
      content: attr(data-text);
    }
    .cur {
      display: inline-block;
      width: 0.55em;
      height: 1em;
      margin-left: var(--space-xs);
      vertical-align: -0.15em;
      background: var(--color-accent);
      animation: blink 1.1s steps(1) 5;
    }
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
    h1 {
      max-width: none;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
    .name {
      font-size: var(--text-display);
      line-height: 1;
    }
    .role {
      font-size: var(--text-lg);
      font-weight: 400;
      line-height: 1.35;
      color: var(--color-ink-2);
      max-width: 26ch;
    }
    .lead {
      color: var(--color-ink-2);
      max-width: 46ch;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-top: var(--space-xs);
    }

    .art {
      grid-column: 7 / -1;
      position: relative;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      align-items: center;
      min-width: 0;
    }
    .art img {
      width: 100%;
      max-width: 360px;
      max-height: calc(100dvh - 16rem);
      object-fit: contain;
      image-rendering: pixelated;
      aspect-ratio: 7 / 8;
    }
    .art canvas {
      display: none;
      width: auto;
      max-width: 100%;
      height: min(640px, calc(100dvh - 16rem));
    }
    .art.on canvas {
      display: block;
    }
    .art.on img {
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
    }
    @media (max-width: 60rem) {
      .hero {
        min-height: 0;
        row-gap: var(--space-xl);
        padding-block: var(--space-xl);
      }
      .copy,
      .art {
        grid-column: 1 / -1;
      }
      .art canvas {
        height: auto;
        width: 100%;
        max-width: 420px;
      }
    }
  `,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  protected readonly p = PROFILE;

  private readonly artEl = viewChild.required<ElementRef<HTMLElement>>('art');
  private readonly sprite = viewChild.required<ElementRef<HTMLImageElement>>('sprite');
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private raf = 0;
  private cleanup: Array<() => void> = [];

  ngAfterViewInit(): void {
    if (typeof document === 'undefined') return;
    const img = this.sprite().nativeElement;
    if (img.complete && img.naturalWidth) void this.start(img);
    else img.addEventListener('load', () => void this.start(img), { once: true });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach((fn) => fn());
  }

  private async start(img: HTMLImageElement): Promise<void> {
    try {
      await document.fonts.load('500 16px "Martian Mono"');
    } catch {
      /* se usa la tipografía de reserva */
    }

    // 1) Se mide dónde está el personaje dentro del PNG y se recorta a ese rectángulo.
    const nat = document.createElement('canvas');
    nat.width = img.naturalWidth;
    nat.height = img.naturalHeight;
    const nctx = nat.getContext('2d', { willReadFrequently: true });
    if (!nctx) return;
    nctx.drawImage(img, 0, 0);
    const npx = nctx.getImageData(0, 0, nat.width, nat.height).data;
    const nbg = [npx[0], npx[1], npx[2]];
    const nOpaque = npx[3] > 200;
    const isEmpty = (r: number, g: number, b: number, a: number) =>
      a < 40 || (nOpaque && Math.abs(r - nbg[0]) + Math.abs(g - nbg[1]) + Math.abs(b - nbg[2]) < 24);
    let x0 = nat.width;
    let y0 = nat.height;
    let x1 = 0;
    let y1 = 0;
    for (let y = 0; y < nat.height; y++) {
      for (let x = 0; x < nat.width; x++) {
        const i = (y * nat.width + x) * 4;
        if (!isEmpty(npx[i], npx[i + 1], npx[i + 2], npx[i + 3])) {
          x0 = Math.min(x0, x);
          x1 = Math.max(x1, x);
          y0 = Math.min(y0, y);
          y1 = Math.max(y1, y);
        }
      }
    }
    const sw = x1 - x0 + 1;
    const sh = y1 - y0 + 1;
    if (sw <= 0 || sh <= 0) return;

    // 2) El recorte se reparte en celdas de letra (más alta que ancha).
    const rows = Math.round((COLS * sh) / sw / CELL_RATIO);
    const probe = document.createElement('canvas');
    probe.width = COLS;
    probe.height = rows;
    const pctx = probe.getContext('2d', { willReadFrequently: true });
    if (!pctx) return;
    pctx.imageSmoothingEnabled = false;
    pctx.drawImage(img, x0, y0, sw, sh, 0, 0, COLS, rows);
    const px = pctx.getImageData(0, 0, COLS, rows).data;

    const bg = nbg;
    const bgOpaque = nOpaque;
    const lum: number[] = [];
    let lo = 255;
    let hi = 0;
    for (let i = 0; i < COLS * rows; i++) {
      const [r, g, b, a] = [px[i * 4], px[i * 4 + 1], px[i * 4 + 2], px[i * 4 + 3]];
      const empty =
        a < 40 || (bgOpaque && Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]) < 24);
      if (empty) {
        lum.push(-1);
        continue;
      }
      const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      lum.push(l);
      lo = Math.min(lo, l);
      hi = Math.max(hi, l);
    }
    // El nivel más bajo sigue siendo legible sobre el fondo (empieza en glyph-2).
    const level = lum.map((l) => (l < 0 ? -1 : Math.min(7, 2 + Math.floor(((l - lo) / (hi - lo + 1e-6)) * 6))));

    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const css = getComputedStyle(document.documentElement);
    const ramp = Array.from({ length: 8 }, (_, i) => css.getPropertyValue(`--glyph-${i}`).trim());
    const accent = css.getPropertyValue('--color-accent').trim();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cada celda encendida lleva una letra del texto, en orden de lectura.
    const chars: string[] = [];
    let k = 0;
    for (let i = 0; i < level.length; i++) {
      if (level[i] < 0) chars.push('');
      else {
        chars.push(WORDS[k % WORDS.length] === ' ' ? '.' : WORDS[k % WORDS.length]);
        k++;
      }
    }

    const flare = new Float32Array(COLS * rows);
    let progress = reduce ? 1 : 0;
    let start = 0;
    let cw = 10;
    let ch = cw * CELL_RATIO;
    const noise = 'abcdefghijklmnopqrstuvwxyz0123456789+-|';

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = this.artEl().nativeElement.clientWidth;
      cw = Math.min(width, 560) / COLS;
      ch = cw * CELL_RATIO;
      canvas.width = Math.round(COLS * cw * dpr);
      canvas.height = Math.round(rows * ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, COLS * cw, rows * ch);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = y * COLS + x;
          const lv = level[i];
          if (lv < 0) continue;
          const settled = (y / rows) * 0.7 + ((x * 7 + y * 3) % 10) / 40 < progress;
          const f = flare[i];
          const small = lv < 3 && !f;
          ctx.font = `${lv < 3 ? 500 : 700} ${(cw / 0.62) * (small ? 0.62 : 1)}px "Martian Mono", ui-monospace, monospace`;
          ctx.fillStyle = f > 0.05 ? accent : settled ? ramp[lv] : ramp[0];
          const glyph = settled ? chars[i] : noise[(x * 31 + y * 17 + Math.floor(progress * 40)) % noise.length];
          ctx.fillText(glyph, x * cw + cw / 2, y * ch + ch / 2);
        }
      }
    };

    const frame = (t: number) => {
      if (!start) start = t;
      if (progress < 1) progress = Math.min(1, (t - start) / 1500);
      let active = progress < 1;
      for (let i = 0; i < flare.length; i++) {
        if (flare[i] > 0) {
          flare[i] = Math.max(0, flare[i] - 0.04);
          active = true;
        }
      }
      draw();
      this.raf = active ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!this.raf) this.raf = requestAnimationFrame(frame);
    };

    size();
    this.artEl().nativeElement.classList.add('on');
    draw();
    if (!reduce) kick();

    const onResize = () => {
      size();
      draw();
    };
    window.addEventListener('resize', onResize);
    this.cleanup.push(() => window.removeEventListener('resize', onResize));

    if (!reduce) {
      const move = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        const cx = ((e.clientX - r.left) / r.width) * COLS;
        const cy = ((e.clientY - r.top) / r.height) * rows;
        for (let y = Math.max(0, Math.floor(cy - 3)); y < Math.min(rows, cy + 3); y++) {
          for (let x = Math.max(0, Math.floor(cx - 4)); x < Math.min(COLS, cx + 4); x++) {
            if (Math.hypot((x - cx) / 1.5, y - cy) < 3) flare[y * COLS + x] = 1;
          }
        }
        kick();
      };
      canvas.addEventListener('pointermove', move);
      this.cleanup.push(() => canvas.removeEventListener('pointermove', move));
    }
  }
}
