import Constants from "../Constants";
import AudioManager from "../Managers/AudioManager";
import Button from "../UI/Button";
import Utilities from "../Utilities";
import MainGame from "./MainGame";

export default class MainMenu extends Phaser.Scene {
	/**
	 * Unique name of the scene.
	 */
	public static Name = "MainMenu";

	public preload(): void {
		// Preload as needed.
	}

	public create(): void {
		Utilities.LogSceneMethodEntry("MainMenu", "create");
		
		this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(Constants.BackgroundHex);

		AudioManager.Instance.SetVolume(.34);
		AudioManager.Instance.PlayBGM("bgm");

		var centerX = this.cameras.main.centerX;
		var centerY = this.cameras.main.centerY;

		this.add.sprite(centerX, centerY, "background").setOrigin(.5).setScale(.8).setDepth(-2);

		var startBtn = new Button(this, centerX, centerY - 40, "button", "Start").setScale(2);
		startBtn.pointerUp = this.startGame.bind(this);

		// var instructBtn = new Button(this, centerX, startBtn.y + startBtn.displayHeight + 130, "button", "Instruction").setScale(2);
		// instructBtn.pointerUp = this.instruction.bind(this);
	}

	public startGame() {
		this.scene.start(MainGame.Name);
	}
	public instruction() {
	}
}
