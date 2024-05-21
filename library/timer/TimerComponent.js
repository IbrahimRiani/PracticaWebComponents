import { LitElement, css, html } from 'lit';

class TimerComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .timer-component {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--timer-component-part-color, var(--neutral-color));
      padding: var(--timer-component-part-padding, 10px);
    }

    .timer-digit {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--timer-component-part-color, var(--neutral-color));
      padding: var(--timer-component-part-padding, 10px);
      box-shadow: var(--timer-component-part-box-shadow, 0 2px 3px 0 rgba(0, 0, 0, 0.2));
      border-radius: var(--timer-component-part-border-radius, 5px);
    }
    
    .timer-separator {
      margin: 0 var(--timer-component-join-padding, 10px);
    }
    
    .timer-finish-message {
      font-size: var(--timer-player-component-status-font-size, 1.5rem);
      color: var(--timer-player-component-status-color, var(--info-color));
      margin: var(--timer-player-component-status-margin, 0 0 20px 0);
      text-align: center;
    }
  `;

  static properties = {
    reverse: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    autoReset: { type: Boolean },
    separator: { type: String },
    autostart: { type: Boolean }
  };

  constructor() {
    super();
    this.reverse = false;
    this.start = 0;
    this.limit = 0;
    this.autostart = false;
    this.autoReset = false;
    this.separator = '-';
    this.finishMessage = 'Ready!';
    this.paused = true;
    this.remainingTime = this.start;
    this.interval = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.autostart) this.startTimer();
    this.remainingTime = this.start;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.interval);
  }

  render() {
    const timeParts = this.formatTime(this.remainingTime);
    const separators = Array(timeParts.length - 1).fill(this.separator);
    const timerFinished = (this.remainingTime === 0 || this.remainingTime === this.limit) && !this.autoreset;

    return html`
    ${timerFinished ? html`<p class="timer-finish-message">${this.finishMessage}</p>` : ''}
      <div class="timer-component">
        ${timeParts.map((part, index) => html`
          <div class="timer-digit">${part}</div>
          ${index < separators.length ? html`<div class="timer-separator">${this.separator}</div>` : ''}
        `)}
      </div>
    `;
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    
    return [hours, minutes, secs];
  }

  startTimer() {
    if (this.start === 0) return;
    this.paused = false;
    this.interval = setInterval(() => {
      if (!this.paused) {
        if (this.remainingTime === 0 || this.remainingTime === this.limit) {
          if (this.autoReset) {
            this.remainingTime = this.start;
          } else {
            this.paused = true;
          }
        } else {
          this.remainingTime = this.reverse ? this.remainingTime - 1 : this.remainingTime + 1;
        }
        this.requestUpdate();
      }
    }, 1000);
  }

  pauseTimer() {
    this.paused = true;
    clearInterval(this.interval);
  }

  resetTimer() {
    clearInterval(this.interval);
    this.remainingTime = this.start;
    this.paused = true;
    this.requestUpdate();
    if (this.autostart) this.startTimer();
  }
}

customElements.define('timer-component', TimerComponent);
export { TimerComponent };
