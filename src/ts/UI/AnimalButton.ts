import AnswerManager from "../Managers/AnswerManager";
import BaseSlot from "./BaseSlot";

export default class AnimalButton extends BaseSlot {

    key: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        this.removeInteractiveButton();
        this.image.setScale(.4);
        this.key = texture;

        this.pointerUp = () => {
            this.onClick();
        }
    }

    private onClick() {
        var isContinue = AnswerManager.Instance.addAnswer(this);

        if (!isContinue) return;
        this.removeInteractiveButton();
        this.scene.tweens.add({
            targets: this,
            scaleX: { from: 1, to: 0 },
            duration: 100,
            yoyo: true,
            onYoyo: () => {
                this.image.setTexture(this.key);
            }
        })
    }
}
