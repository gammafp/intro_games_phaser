import Intro from './scenes/Intro.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "megaman intro",
    version: "v0.0.1",
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        parent: "container",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.DOM.CENTER_BOTH,
        width: 512,
        height: 480, 
        max: {
            width: 512,
            height: 480,
        }
    },
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