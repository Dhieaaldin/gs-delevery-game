const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let cars;
let deliveries;
let score = 0;
let scoreText;

function preload() {
    this.load.image('background', 'assets/road.png');
    this.load.image('player', 'assets/bike.png');
    this.load.image('car', 'assets/car.png');
    this.load.image('delivery', 'assets/delivery.png');
}

function create() {
    this.add.image(400, 300, 'background');

    player = this.physics.add.sprite(100, 300, 'player');
    player.setCollideWorldBounds(true);

    cars = this.physics.add.group({
        key: 'car',
        repeat: 5,
        setXY: { x: 400, y: 100, stepY: 100 }
    });

    deliveries = this.physics.add.group({
        key: 'delivery',
        repeat: 2,
        setXY: { x: 700, y: 200, stepY: 200 }
    });

    this.physics.add.collider(player, cars, hitCar, null, this);
    this.physics.add.overlap(player, deliveries, collectDelivery, null, this);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}

function hitCar(player, car) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

function collectDelivery(player, delivery) {
    delivery.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
