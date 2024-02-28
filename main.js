import './style.css';
import './storeElement.js';
import gitHubLogo from '/github.svg';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://github.com/softwaredeliverymanagement329/actions-demo" target="_blank">
      <img src="${gitHubLogo}" class="logo" alt="GitHub logo" />
    </a>
    <h1>DevOps Demo</h1>
    <action-store></action-store>
    <p class="read-the-docs">
      <a href="https://docs.github.com/en/actions/quickstart" target="_blank">
        GitHub Actions Quickstart
      </a>
    </p>
  </div>
`;
