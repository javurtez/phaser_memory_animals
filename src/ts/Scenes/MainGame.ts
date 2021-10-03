import Constants from "../Constants";
import AudioManager from "../Managers/AudioManager";
import EventManager from "../Managers/EventManager";
import JSONManager from "../Managers/JSONManager";
import AnimalButton from "../UI/AnimalButton";
import GameOverPanel from "../UI/GameOverPanel";
import TimerPanel from "../UI/TimerPanel";
import Utilities from "../Utilities";

// const maxIconLength = 13;
export default class MainGame extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "MainGame";

	centerY: number;
	centerX: number;

	score: number = 0;
	timer: number = 0;
	checkAddTimer: number = 0.02;

	max_icons: number = 2;

	icon_data: any;

	animal_buttons: AnimalButton[] = [];
	timerEvent: Phaser.Time.TimerEvent;

	timerImage: Phaser.GameObjects.Sprite;
	timerPercentImage: Phaser.GameObjects.Sprite;

	public create(): void {
		Utilities.LogSceneMethodEntry("MainGame", "create");

		this.centerX = this.cameras.main.centerX;
		this.centerY = this.cameras.main.centerY;

		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

		this.add.sprite(this.centerX, this.centerY, "background").setOrigin(.5).setScale(.8).setDepth(-2);

		this.timerImage = this.add.sprite(this.centerX, 140, "slider").setOrigin(.5).setScale(.5);
		this.timerPercentImage = this.add.sprite(this.centerX, this.timerImage.y, "slider").setOrigin(.5).setScale(.5).setTint(0x38761d);
		this.timerPercentImage.setCrop(this.timerPercentImage.width, 0, this.timerPercentImage.width, this.timerPercentImage.height);
		this.timerPercentImage.angle = 180;

		this.icon_data = JSONManager.Instance.GetJSON("icon_data");
		var shuffle_icon = Object.keys(this.icon_data);
		this.shuffle(shuffle_icon);

		var shuffle_animals = [];
		for (var i = 0; i < 2; i++) {
			for (var j = 1; j <= this.max_icons; j++) {
				shuffle_animals.push(this.icon_data[shuffle_icon[j - 1]].img_key);
			}
		}

		this.shuffle(shuffle_animals);
		this.shuffleDeck(shuffle_animals);

		var timerPanel = new TimerPanel(this, this.centerX, 60).setDepth(2);
		var gameOverPanel = new GameOverPanel(this, this.centerX, this.centerY).setDepth(2);

		EventManager.Instance.addEmitter("answer", (value) => {
			if (value == true) {
				this.score++;
				if (this.score == this.max_icons) {
					console.log("FINISH");

					AudioManager.Instance.PlaySFXOneShot("complete", .5);
					this.timerEvent.paused = true;
					//Add Game Over Panel
					gameOverPanel.openPanel(this.timer);
					timerPanel.close();
				}
			}
		})
		EventManager.Instance.addEmitter("retry", () => {
			this.shuffle(shuffle_icon);

			this.max_icons += 2;
			if (this.max_icons > 14) {
				this.max_icons = 2;
				this.checkAddTimer = Phaser.Math.Clamp(this.checkAddTimer + 0.02, 0.02, 0.1);
			}
			shuffle_animals.length = 0;

			for (var i = 0; i < 2; i++) {
				for (var j = 1; j <= this.max_icons; j++) {
					shuffle_animals.push(this.icon_data[shuffle_icon[j - 1]].img_key);
				}
			}

			this.timerImage.setVisible(true);
			this.timerPercentImage.setVisible(true);
			this.timerPercentImage.setCrop(this.timerPercentImage.width, 0, this.timerPercentImage.width, this.timerPercentImage.height);

			gameOverPanel.close();
			timerPanel.open();
			timerPanel.resetTimer();

			this.timer = 0;
			this.score = 0;

			this.animal_buttons.forEach(value => {
				value.destroy();
			});
			this.animal_buttons.length = 0;

			this.shuffle(shuffle_animals);
			this.shuffleDeck(shuffle_animals);
		})
	}
	update() {
	}

	private shuffleDeck(shuffle_animals) {
		var startX = this.centerX - (70 * ((this.max_icons / 2) / 2) - 35);
		var startY = this.centerY - 150;
		var index = 0;
		var end = Math.floor(this.max_icons / 2);
		for (var i = 1; i <= 4; i++) {
			for (var j = 1; j <= end; j++) {
				var btn = new AnimalButton(this, startX + ((j - 1) * 70), startY + (i * 65), shuffle_animals[index]);
				btn.setDepth(0);
				this.animal_buttons.push(btn);
				index++;
			}
		}
		var timer = 0;
		var check_timer = this.time.addEvent({
			delay: 100,
			repeat: -1,
			callback: () => {
				timer += this.checkAddTimer;
				var width = this.timerPercentImage.width * (1 - timer) + 1;
				this.timerPercentImage.setCrop(width, 0, this.timerPercentImage.width, this.timerPercentImage.height);

				if (width <= 0) {
					check_timer.destroy();
					this.timerPercentImage.setVisible(false);
					this.timerImage.setVisible(false);

					this.tweens.add({
						targets: this.animal_buttons,
						scaleX: { from: 1, to: 0 },
						duration: 100,
						yoyo: true,
						onYoyo: () => {
							this.animal_buttons.forEach(value => {
								value.setInteractiveButton();
								value.image.setTexture("back");
							})

							if (this.timerEvent == null) {
								this.timerEvent = this.time.addEvent({
									delay: 1000,
									repeat: -1,
									callback: () => {
										this.timer++;
										console.log("TIMER: " + this.timer);
										EventManager.Instance.execute("timer", this.timer);
									}
								})
							}
							else {
								this.timerEvent.paused = false;
							}
						},
					})
				}
			}
		})
	}

	private shuffle(array) {
		let currentIndex = array.length, randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}

		return array;
	}
}
