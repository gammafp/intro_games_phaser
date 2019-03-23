import Edificios from "../GameObjects/Edificios.js";



class Intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'Intro'
        });
    }

    init() {
        this.cameras.main.fadeIn(1500);
        this.audioMEGA = this.sound.add('megamanAudio', {
            loop: false
        });
    }

    create() {
        this.camara = this.cameras.main;
        this.megaman = this.add.sprite(423, -968, 'megaman')
            .setScale(2)
            .setDepth(2)
            .setScrollFactor(.9);
        this.megaman.anims.play('idle');

        this.selectorPos = [0, 30];
        this.selector = this.add.image(100, -1063 + this.selectorPos[0], 'selector').setScale(2);
        this.tweens.add({
            targets: this.selector,
            ease: (e) => Math.round(e),
            repeat: -1,
            alpha: 0,
        });

        this.cursor = this.input.keyboard.createCursorKeys();
        this.cursor.down.on('down', () => {
            this.selector.y = -1063 + this.selectorPos[1]
        })
        this.cursor.up.on('down', () => {
            this.selector.y = -1063 + this.selectorPos[0]
        })

        this.background = this.add.image(0, -124, 'objects', 'background')
            .setScale(2)
            .setOrigin(0)
            .setAlpha(0);
        this.background.setScrollFactor(0, 0.7);

        this.load.destroy('objects');
        this.edificios = new Edificios(this, 'objects', 12);
        this.background_text = this.add.image(0, this.sys.game.config.height, 'background_text')
            .setOrigin(0, 1)
            .setScrollFactor(0.7);
        this.logo = this.add.image(this.sys.game.config.width/2, -1195, 'logo').setScale(2);

        const menuTextArray = [
            '  NORMAL\n',
            '  DIFFICULT\n\n',
            'PRESS START'
        ];

        const creditsTextArray = [
            '1998 CAPCOM CO. LTD\n',
            'TM AND 1998 CAPCOM U.S.A, INC.\n',
            'LICENSED BY\n',
            'NINTENDO OF AMERICA. INC.\n',
            'AND CREATED WITH PHASER 3'
        ];
        const textArray = {
            text: [
                'IN THE YEAR OF 200X,\n\nA SUPER ROBOT NAMED MEGAMAN',
                'WAS CREATED.\n\nDR.LIGHT CREATED MEGAMAN',
                'TO STOP THE EVIL DESIRES\n\nOF DR.WILY.',
                'HOWEVER, AFTER HIS DEFEAT,\n\nDR.WILY CREATED EIGHT',
                'OF HIS OWN ROBOTS\n\nTO COUNTER MEGAMAN.'
            ],
            count: 0
        };
        
        const creditsText = this.add.bitmapText(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2,
                'font',
                creditsTextArray, 16, 1)
            .setOrigin(0.5);

        const historyText = this.add.bitmapText(0, 0, 'font', textArray.text[0]).setCenterAlign().setAlpha(0);
        Phaser.Display.Align.In.BottomCenter(historyText, this.add.zone(0, -60, 512, 480).setOrigin(0));

        const menuText = this.add.bitmapText(90, -1070, 'font', menuTextArray);

        const timeline = this.tweens.createTimeline();

        this.menuContainer = this.add.container(0, 0);
        this.menuContainer.add([
            this.selector,
            this.logo,
            menuText
        ]);
        this.menuContainer.setAlpha(0);

        // Inicia las letras y se va a la siguiente animación
        timeline.add({
            targets: creditsText,
            alpha: 0,
            delay: 3000,
            duration: 500,
            onComplete: () => {
                this.audioMEGA.play();
            }
        });
        timeline.add({
            targets: [this.background, ...this.edificios.getChildren()],
            alpha: 1,
            onComplete: () => {
                console.log('Entra')
            },
            duration: 1000,
        });

        // Texto
        timeline.add({
            targets: [historyText],
            alpha: 1,
            repeat: textArray.text.length - 1,
            hold: 2900,
            // hold: 0,
            repeatDelay: 100,
            yoyo: true,
            onRepeat: () => {
                textArray.count++
            
                historyText.setText(textArray.text[textArray.count]);
                Phaser.Display.Align.In.BottomCenter(historyText, this.add.zone(0, -60, 512, 480).setOrigin(0));
            },
            onComplete: () => {
                this.camara.pan(this.sys.game.config.width / 2, -1150, 10000, 'Quad.easeIn');
            }
        });
        timeline.add({
            targets: [this.menuContainer],
            delay: 11000,
            duration: 1,
            alpha: 1
        });
        timeline.play();
    }



}

export default Intro;