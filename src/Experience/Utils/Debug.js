import { Pane } from 'tweakpane';

export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.pane = new Pane();
      this.ui = this.pane.addTab({
        pages: [{ title: 'Tweaks' }, { title: 'Misc' }],
      });
    }
  }
}
