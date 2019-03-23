import Intro from './scenes/Intro.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "megaman intro",
    version: "v0.0.1",
    width: 512,
    height: 480,
    type: Phaser.AUTO,
    parent: "container",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [Bootloader, Intro]
};

new Phaser.Game(config);