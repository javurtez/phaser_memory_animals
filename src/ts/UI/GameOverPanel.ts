import EventManager from "../Managers/EventManager";
import BasePanel from "./BasePanel";
import Button from "./Button";

export default class GameOverPanel extends BasePanel {

    timer_text: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        var panel = scene.add.image(0, 0, "panel").setOrigin(0.5).setScale(2);

        var congrats_text = scene.add.bitmapText(0, -130, "lato-bold", "Congratulations!", 38, 1).setOrigin(0.5).setTint(0x000000)

        this.timer_text = scene.add.bitmapText(0, -30, "lato-bold", "00:00", 54, 1).setOrigin(0.5).setTint(0x000000)
        this.timer_text.setLetterSpacing(2);

        var retry_button = new Button(scene, 0, (panel.displayHeight / 2) - 70, "button", "Next");
        retry_button.setScale(1.25);
        retry_button.pointerUp = () => {
            this.onRetry();
        }

        this.add([panel, retry_button, this.timer_text, congrats_text]);

        scene.add.existing(this);

        this.close();
    }

    openPanel(timer: number) {
        super.open();
        this.timer_text.setText(Math.floor(timer / 60).toString().padStart(2, "0") + ":" + (timer % 60 ? timer % 60 : '00').toString().padStart(2, "0"));
    }

    onRetry() {
        EventManager.Instance.execute("retry");
    }
}
