import AudioManager from "../Managers/AudioManager";

export default class BaseSlot extends Phaser.GameObjects.Container {

    pointerDown: Function;
    pointerUp: Function;
    pointerOver: Function;
    pointerOut: Function;

    image: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y);

        this.image = scene.add.image(0, 0, texture).setOrigin(0.5);

        this.image.setInteractive();
        this.image.on("pointerdown", () => {
            if (this.pointerDown) {
                this.pointerDown();
                this.image.setTint(0xFFFFFF);
            }
        }, this);
        this.image.on("pointerup", () => {
            if (this.pointerUp) {
                this.pointerUp();
                AudioManager.Instance.PlaySFX("click", .8);
            }
        }, this);
        this.image.on("pointerover", () => {
            if (this.pointerOver) {
                this.pointerOver();
            }
            // this.image.setTint(0xB1B4B8);
        }, this);
        this.image.on("pointerout", () => {
            if (this.pointerOut) {
                this.pointerOut();
            }
            this.image.setTint(0xFFFFFF);
        }, this);

        this.add(this.image);

        scene.add.existing(this);
    }

    public Open(): void {
        this.setActive(true);
        this.setVisible(true);
    }
    public Close(): void {
        this.setActive(false);
        this.setVisible(false);
    }

    public removeInteractiveButton() {
        this.image.removeInteractive();
    }
    public setInteractiveButton() {
        this.image.setInteractive();
    }
}
