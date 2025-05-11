type Listener = () => void;

class ProjectEvents {
  private listeners: Set<Listener> = new Set();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit() {
    this.listeners.forEach(listener => listener());
  }
}

export const projectEvents = new ProjectEvents();
