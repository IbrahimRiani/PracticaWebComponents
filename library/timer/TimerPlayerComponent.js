import { LitElement, css, html } from 'lit';
import './TimerComponent.js';

class TimerPlayerComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .timer-player-component__status {
      color: var(--timer-player-component-status-color, var(--info-color));
      font-size: var(--timer-player-component-status-font-size, 1.5rem);
      margin: var(--timer-player-component-status-margin, 0 0 20px 0);
      text-align: center;
    }

    .timer-player-component__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: var(--timer-player-component-actions-margin, 0);
    }

    .timer-player-component__actions button {
      cursor: pointer;
      padding: var(--timer-player-component-button-padding, 10px 20px);
      margin: var(--timer-player-component-button-margin, 0 10px);
      border-radius: var(--timer-player-component-button-border-radius, 5px);
      transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .timer-player-component__actions button:active {
      transform: translateY(2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    button.timer-player-component__actions--pause {
      background-color: var(--timer-player-component-pause-background-color, var(--light-color));
      color: var(--timer-player-component-pause-color, var(--neutral-light-color));
      border: var(--timer-player-component-pause-border, none);
    }

    button.timer-player-component__actions--play {
      background-color: var(--timer-player-component-play-background-color, var(--primary-color));
      color: var(--timer-player-component-play-color, var(--primary-lightest-color));
      border: var(--timer-player-component-play-border, none);
    }

    button.timer-player-component__actions--reset {
      background-color: var(--timer-player-component-reset-background-color, var(--light-color));
      color: var(--timer-player-component-reset-color, var(--neutral-light-color));
      border: var(--timer-player-component-reset-border, none);
    }

    button.timer-player-component__actions--pause:hover {
      background-color: var(--timer-player-component-reset-hover-background-color, var(--neutral-color));
    }

    button.timer-player-component__actions--play:hover {
      background-color: var(--timer-player-component-play-hover-background-color, var(--primary-dark-color));
    }

    button.timer-player-component__actions--reset:hover {
      background-color: var(--timer-player-component-reset-hover-background-color, var(--neutral-color));
    }
  `;

  static properties = {
    color: { type: String },
    playColor: { type: String },
    playBackgroundColor: { type: String },
    statusColor: { type: String },
    statusFontSize: { type: String },
    statusMargin: { type: String }
  };

  constructor() {
    super();
    this.color = this.getAttribute('color') || 'var(--neutral-light-color)';
    this.playColor = this.getAttribute('play-color') || 'var(--primary-lightest-color)';
    this.playBackgroundColor = this.getAttribute('play-background-color') || 'var(--primary-color)';
    this.statusColor = this.getAttribute('status-color') || 'var(--info-color)';
    this.statusFontSize = this.getAttribute('status-font-size') || '1.5rem';
    this.statusMargin = this.getAttribute('status-margin') || '0 0 20px 0';
    this.timerComponent = this.querySelector('timer-component');
  }

  render() {
    return html`
      <slot></slot>
      <div class="timer-player-component__actions">
        <button class="timer-player-component__actions--pause" @click=${this.pause}>Pause</button>
        <button class="timer-player-component__actions--play" @click=${this.play}>Play</button>
        <button class="timer-player-component__actions--reset" @click=${this.reset}>Reset</button>
      </div>
      <div class="timer-player-component__status" style="
        color: ${this.statusColor};
        font-size: ${this.statusFontSize};
        margin: ${this.statusMargin};
      ">
        <slot name="status"></slot>
      </div>
    `;
  }

  play() {
    this.timerComponent.startTimer();
  }

  pause() {
    this.timerComponent.pauseTimer();
  }
  
  reset() {
    this.timerComponent.resetTimer();
  }
}

customElements.define('timer-player-component', TimerPlayerComponent);
export { TimerPlayerComponent };
