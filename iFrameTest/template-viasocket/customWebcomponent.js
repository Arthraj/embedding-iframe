// @ Author Idris Bohra and Updated by Arthraj Rathore
let TEMPLATE_NAME = 'viasocket-embed';
let IFRAME_ATTRIBUTE = 'iframe-template-type';
let IFRAME_PARENT_ATTRIBUTE = 'iframe-parent-template-type';

class ViaSocketTemplate extends HTMLElement {
    connectedCallback() {
        this.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        const URL = `http://localhost:3000/embed`;
        const parentDiv = document.createElement('div');
        const divElement = document.createElement('div');
        const imgElement = document.createElement("img");
        divElement.setAttribute(IFRAME_ATTRIBUTE, TEMPLATE_NAME);
        parentDiv.setAttribute(IFRAME_PARENT_ATTRIBUTE, TEMPLATE_NAME);
        
        const dataToSend = {
            jwt: this.dataset.jwt,
            flowId: this.dataset.flowId
        }
        imgElement.src = "./close-icon.svg";
        imgElement.style.width = '24px';
        imgElement.classList.add('wc-slider-close-btn');

        const iframe = document.createElement("iframe");
        iframe.setAttribute(IFRAME_ATTRIBUTE, TEMPLATE_NAME);
        iframe.src = URL;
        iframe.style.width = '100%';
        iframe.style.height = "100%";

        divElement.appendChild(iframe);
        divElement.appendChild(imgElement)
        parentDiv.appendChild(divElement)
        document.body.appendChild(parentDiv);
        document.body.style.overflow = "hidden";
        //Event Listeners
        iframe.addEventListener('load', () => {
            iframe.contentWindow.postMessage(dataToSend, URL);
        });
        iframe.addEventListener('error', (err) => {
            console.log("iframe error",err)
        });
        //close button functionality
        imgElement.addEventListener('click', () => {
            document.body.removeChild(parentDiv);
            document.body.style.overflow = "auto";
        })
    }
}

customElements.define('viasocket-embed', ViaSocketTemplate);

initViaSocketEmbed = function (options) {
    const template = document.querySelector('viasocket-embed');
    if (!template) throw new Error('viasocket-embed element not found');
    template.dataset.jwt = options.token;
    template.dataset.flowId = options.flowId;
}

