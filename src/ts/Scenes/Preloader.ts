import MainMenu from "./MainMenu";
import Utilities from "../Utilities";
import Constants from "../Constants";
import JSONManager from "../Managers/JSONManager";
import AudioManager from "../Managers/AudioManager";
import EventManager from "../Managers/EventManager";
import AnswerManager from "../Managers/AnswerManager";

export default class Preloader extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "Preloader";

	public preload(): void {
		this.load.path = "assets/";

		this.load.json("icon_data", "Strings/icon_data.json");

		this.load.image("background", "Images/backgroundColorGrass.png");		
		
		this.load.bitmapFont('lato-bold', 'Fonts/lato-bold_0.png', 'Fonts/lato-bold.fnt');
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("Preloader", "create");

		EventManager.Init(this);
		AudioManager.Init(this);
		JSONManager.Init(this);
		AnswerManager.Init(this);

		var centerX = this.cameras.main.centerX;
		var centerY = this.cameras.main.centerY;
		
		this.add.sprite(centerX, centerY, "background").setOrigin(.5).setScale(.8).setDepth(-2);

		this.addProgressBar();

		this.load.audio("bgm", "Audio/bgm.mp3");
		this.load.audio("click", "Audio/click.wav");
		this.load.audio("complete", "Audio/complete.mp3");

		this.load.image("blank_white", "UI/Blank_White.png");
		this.load.image("button", "UI/Button.png");
		this.load.image("panel", "UI/Panel.png");
		this.load.image("slider", "UI/slider_empty.png");

		this.load.image("back", "Images/Animals/back.png");
		this.load.image("bear", "Images/Animals/bear.png");
		this.load.image("buffalo", "Images/Animals/buffalo.png");
		this.load.image("chick", "Images/Animals/chick.png");
		this.load.image("chicken", "Images/Animals/chicken.png");
		this.load.image("cow", "Images/Animals/cow.png");
		this.load.image("crocodile", "Images/Animals/crocodile.png");
		this.load.image("dog", "Images/Animals/dog.png");
		this.load.image("duck", "Images/Animals/duck.png");
		this.load.image("elephant", "Images/Animals/elephant.png");
		this.load.image("frog", "Images/Animals/frog.png");
		this.load.image("giraffe", "Images/Animals/giraffe.png");
		this.load.image("goat", "Images/Animals/goat.png");
		this.load.image("gorilla", "Images/Animals/gorilla.png");
		this.load.image("hippo", "Images/Animals/hippo.png");
		this.load.image("horse", "Images/Animals/horse.png");
		this.load.image("monkey", "Images/Animals/monkey.png");
		this.load.image("moose", "Images/Animals/moose.png");
		this.load.image("narwhal", "Images/Animals/narwhal.png");
		this.load.image("owl", "Images/Animals/owl.png");
		this.load.image("panda", "Images/Animals/panda.png");

		this.load.start();

		this.load.on("complete", () => {
			this.scene.start(MainMenu.Name);
		});
	}

	/**
	 * Adds a progress bar to the display, showing the percentage of assets loaded and their name.
	 */
	private addProgressBar(): void {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;
		/** Customizable. This text color will be used around the progress bar. */
		const outerTextColor = 0x000000;

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x93c47d, 0.5);
		progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

		const loadingText = this.add.bitmapText(width / 2, height / 2 - 60, "lato-bold", "Loading...", 38, 1).setTint(outerTextColor).setOrigin(0.5);

		const percentText = this.add.bitmapText(width / 2, height / 2 - 5, "lato-bold", "0%", 24, 1).setTint(outerTextColor).setOrigin(0.5);

		this.load.on("progress", (value: number) => {
			percentText.setText(parseInt(value * 100 + "", 10) + "%");
			progressBar.clear();
			progressBar.fillStyle(0x38761d, .8);
			progressBar.fillRect((width / 4) + 10, (height / 2) - 30 + 10, (width / 2 - 10 - 10) * value, 30);
		});

		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
	}
}
