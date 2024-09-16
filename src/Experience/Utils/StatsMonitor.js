import Stats from 'stats.js';
import Experience from '../Experience';

export default class StatsMonitor {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;

    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    document.body.removeChild(this.stats.dom);

    // Debug
    if (this.debug.active) {
      this.tweaks = this.debug.ui.pages[1]
        .addButton({
          title: 'Show',
          label: 'performance',
        })
        .on('click', (ev) => {
          if (document.body.contains(this.stats.dom)) {
            document.body.removeChild(this.stats.dom);
            this.tweaks.title = 'Show';
          } else {
            document.body.appendChild(this.stats.dom);
            this.tweaks.title = 'Hide';
          }
        });
    }
  }
}
