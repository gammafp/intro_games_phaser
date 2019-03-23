import Edificios from './GameObjects/Edificios.js';

class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image(['logo', 'background_text', 'selector']);
        this.load.atlas('objects', 'objects/objects.png', 'objects/objects_atlas.json');
    
        this.load.image('font', 'font/font.png');
        this.load.json('fontJSON', 'font/font.json');

        this.load.audio('megamanAudio', 'audio/megaman.mp3');

        this.load.atlas('megaman', 'megaman/megaman.png', 'megaman/megaman_atlas.json');
        this.load.animation('megamanANIM', 'megaman/megaman_anim.json');

        this.load.on('complete', () => {
            const configFont = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('font', Phaser.GameObjects.RetroFont.Parse(this, configFont));    
            this.scene.start('Intro');
        });
    }
}
export default Bootloader;