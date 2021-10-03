import EventManager from "../Managers/EventManager";
import BasePanel from "./BasePanel";

export default class TimerPanel extends BasePanel {

    timer_text: Phaser.GameObjects.BitmapText;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.timer_text = scene.add.bitmapText(0, 0, "lato-bold", "00:00", 42, 1).setOrigin(0.5).setTint(0x000000)
        this.timer_text.setLetterSpacing(2);

        this.add(this.timer_text);

        EventManager.Instance.addEmitter("timer", (value) => {
            this.timer_text.setText(Math.floor(value / 60).toString().padStart(2, "0") + ":" + (value % 60 ? value % 60 : '00').toString().padStart(2, "0"));
        })

        scene.add.existing(this);
    }

    public resetTimer() {
        this.timer_text.setText("00:00");
    }
}
