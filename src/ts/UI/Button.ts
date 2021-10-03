import BaseSlot from "./BaseSlot";

export default class Button extends BaseSlot {

    text: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, text: string) {
        super(scene, x, y, texture);

        // this.image.setScale(1.35);
        this.text = scene.add.bitmapText(0, 0, "lato-bold", text, 22, 1).setOrigin(0.5).setTint(0x000000)
        this.text.setLetterSpacing(2);

        this.add(this.text);
    }
}
