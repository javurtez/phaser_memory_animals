export default class EventManager {
    private static instance: EventManager;
    event: Phaser.Events.EventEmitter;

    public static Init(p: Phaser.Scene): void {
        if (!EventManager.instance) {
            this.instance = new EventManager();
            this.instance.event = p.events;
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!EventManager.instance) {
            throw new Error('initialize Instantiator First!');
        }

        return EventManager.instance;
    }

    public addEmitter(key: string, func: Function) {
        this.event.addListener(key, func);
    }
    public removeEmitter(key: string, func: Function) {
        this.event.removeListener(key, func);
    }
    public execute(key: string, args = null) {
        this.event.emit(key, args);
    }
}
