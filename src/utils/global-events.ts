type Handler = (a: number) => void;

class GlobalEvents {
  private setted: boolean;
  private scrollHandlers: Handler[];
  private resizeHandlers: Handler[];
  private resizeTimer?: NodeJS.Timeout;

  constructor() {
    this.setted = false;
    this.scrollHandlers = [];
    this.resizeHandlers = [];
  }

  private handleRezise = () => {
    const screenWidth = window.innerWidth || 1327;

    this.resizeHandlers.forEach((fn) => fn(screenWidth));
  };

  public init() {
    if (window && !this.setted) {
      window.onscroll = () => {
        const scrolled = window.scrollY || 0;

        this.scrollHandlers.forEach((fn) => fn(scrolled));
      };

      window.onresize = () => {
        if (this.resizeTimer) clearInterval(this.resizeTimer);

        this.resizeTimer = setTimeout(this.handleRezise, 100);
      };
    }
  }

  public addResizeHandle(fn: Handler) {
    this.resizeHandlers.push(fn);
  }

  public addScrollHandle(fn: Handler) {
    this.scrollHandlers.push(fn);
  }
}

const globalEvents = new GlobalEvents();

export default globalEvents;
