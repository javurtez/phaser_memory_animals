import 'phaser';
import Boot from "./Scenes/Boot";
import Preloader from "./Scenes/Preloader";
import MainMenu from "./Scenes/MainMenu";
import Utilities from "./Utilities";
import MainGame from "./Scenes/MainGame";

const gameConfig: Phaser.Types.Core.GameConfig = {
	width: 600,
	height: 720,
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	render: {
		antialias: true
	},
	parent: "content",
	title: "Memory Animals"
};

export default class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		Utilities.LogSceneMethodEntry("Game", "constructor");

		super(config);

		this.scene.add(Boot.Name, Boot);
		this.scene.add(Preloader.Name, Preloader);
		this.scene.add(MainMenu.Name, MainMenu);
		this.scene.add(MainGame.Name, MainGame);
		this.scene.start(Boot.Name);
	}
}

window.onload = (): void => {
	const game = new Game(gameConfig);
};
