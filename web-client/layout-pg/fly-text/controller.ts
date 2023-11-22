// @ts-ignore
import template from 'bundle-text:./template.html'
// @ts-ignore
import css from 'bundle-text:./styles.css'

(function () {
    const element = document.createElement('template')
    // BEWARE XSS! Due to CSP, directly set innerHTML must be avoided, or you have to define Trusted Types
    element.innerHTML = template
    const styles = document.createElement('style')
    styles.textContent = css

    customElements.define('fly-text',
        class extends HTMLElement {
            slotContent: any

            constructor() {
                super()
                this.attachShadow({ mode: 'open' })
                this.shadowRoot?.appendChild(styles)
                this.shadowRoot?.appendChild(element.content.cloneNode(true))
            }

            connectedCallback() {
                console.log('connected')
                const self = this
                const section = self.shadowRoot?.querySelector("section")
                // Query all child element which are not slot placeholder
                const childElements = Array.from(self.querySelectorAll(':not(:is([slot]))'))
                console.log(childElements)
                console.log(section)
                console.log(self)

                // BEWARE: This one actually moves elements into the shadow root.
                // Not sure any side effect like trigger re-render layout or any performance issues
                childElements.forEach(item => {
                    section?.appendChild(item)
                })
            }
        }
    )
})()

