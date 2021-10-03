export default class BasePanel extends Phaser.GameObjects.Container {
    public openFunc: Function;
    public closeFunc: Function;
    public open(): void {
        this.setActive(true);
        this.setVisible(true);
    }
    public close(): void {
        this.setActive(false);
        this.setVisible(false);
    }
}
