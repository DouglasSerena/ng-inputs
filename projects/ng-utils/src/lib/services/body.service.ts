import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BodyService {
  appRoot = document.body.querySelector<HTMLElement>('app-root');
  appRootDisplay: string;
  body = document.body;
  head = document.head;

  constructor() {}

  showApp() {
    if (this.appRoot.style.display === 'none') {
      if (this.appRootDisplay) {
        this.appRoot.style.display = this.appRootDisplay;
      } else {
        this.appRoot.style.display = 'block';
      }
    }
  }

  hideApp() {
    if (this.appRoot.style.display !== 'none') {
      this.appRootDisplay = this.appRoot.style.display;
      this.appRoot.style.display = 'none';
    }
  }

  insertNode(node: Node) {
    this.body.appendChild(node);
  }

  removeNode(node: Node) {
    this.body.removeChild(node);
  }

  insertNodeBefore(node: Node, nodeRef: Node) {
    this.body.insertBefore(node, nodeRef);
  }
}
