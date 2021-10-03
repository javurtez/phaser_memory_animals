import AnimalButton from "../UI/AnimalButton";
import EventManager from "./EventManager";

export default class AnswerManager {
    private static singleton: AnswerManager;

    answerKeys: AnimalButton[] = [];

    public static Init(p: Phaser.Scene): void {
        if (!AnswerManager.singleton) {
            this.singleton = new AnswerManager();
        } else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!AnswerManager.singleton) {
            throw new Error('initialize Instantiator First!');
        }

        return AnswerManager.singleton;
    }

    addAnswer(key: AnimalButton) {
        if (this.answerKeys.includes(key)) return false;

        this.answerKeys.push(key);
        if (this.answerKeys.length == 2) {
            EventManager.Instance.execute("answer", this.answerKeys[0].key == this.answerKeys[1].key);
            let answers = [];
            this.answerKeys.forEach(value => {
                answers.push(value);
            })
            if (this.answerKeys[0].key == this.answerKeys[1].key) {
                // this.answerKeys.forEach(value => {
                //     value.removeInteractiveButton();
                // })
            }
            else {
                key.scene.time.delayedCall(400, () => {
                    key.scene.tweens.add({
                        targets: answers,
                        scaleX: { from: 1, to: 0 },
                        duration: 100,
                        yoyo: true,
                        onYoyo: () => {
                            // this.image.setTexture(this.key);
                            answers.forEach(value => {
                                value.setInteractiveButton();
                                value.image.setTexture("back");
                            })
                            console.log("ASDAS");
                        }
                    })
                })
            }
            this.answerKeys.length = 0;
        }
        return this.answerKeys.length <= 2;
    }
}
