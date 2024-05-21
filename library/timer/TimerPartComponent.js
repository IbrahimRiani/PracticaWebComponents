import { LitElement, html, css } from 'lit';

export class TimerPartComponent extends LitElement {
    static properties = {
        value: { type: Number, attribute: true },
        separator: { type: String, attribute: true }
    }

    constructor() {
        super();
    }

    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            color: var(--timer-component-part-color);
            font-size: 1.5rem;
            margin-right: 0.2rem;
        }
    `;

    render() {
        const formattedValue = this.value.toString().padStart(2, '0');
        const digits = formattedValue.split('');
    
        return html`
            ${digits.map((digit, index) => html`
                <div class="digit">${digit}</div>
                ${index !== digits.length - 1 ? html`<div class="separator">${this.separator}</div>` : ''}
            `)}
        `;
    }

}

customElements.define('timer-part-component', TimerPartComponent);
