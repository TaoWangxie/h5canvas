export class EventBus {
    constructor() {
      this.eventsBus = {};
    }
    on(eventName, cb) {
      let task = this.eventsBus[eventName];
      if (task) {
        this.eventsBus[eventName].push(cb);
      } else {
        this.eventsBus[eventName] = [cb];
      }
    }
    emit(eventName, data) {
      let task = this.eventsBus[eventName];
      if (task) {
        this.eventsBus[eventName].map((cb) => {
          cb && cb(data);
        });
      }
    }
    off(eventName, cb) {
      let task = this.eventsBus[eventName];
      if (task && task.indexOf(cb) !== -1) {
        this.eventsBus[eventName].splice(this.eventsBus[eventName].indexOf(cb), 1);
      }
    }
  }