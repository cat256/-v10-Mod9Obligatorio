/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el personaje
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD

        super(game, width, height, x, y, speed, myImage, myImageDead);

        this.updatesPerShot = 10;
        this.updatesPerShotCount = 0;
        this.dragging = false;
        this.initDraggingAbility();
        this.x = x;
        this.lives = 3;                                             // ALUMNA
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update() {
        if (!this.dead && !this.dragging) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }
        }


        /**
         * In case game is touchable...
         */
        if (!this.dead) {
            this.updatesPerShotCount++;
            if (this.updatesPerShotCount % this.updatesPerShot == 0) {
                this.game.shoot(this);
            }
        }
    }


    /**
     * In case game is touchable...
     */
    initDraggingAbility() {
        let interactable = interact(this.myImageContainer);
                                            // ALUMNA (Propio)
        interactable.draggable({            // Modificación drag y drop para que guarde la posición tanto si se maneja por teclado o por drag
            listeners: {
                start: ev => {
                    console.log(ev)
                    ev.target.setAttribute('xpos', this.x);
                },
                move: ev => {
                    console.log(ev)
                    this.x = Number(ev.target.getAttribute('xpos')) + ev.delta.x;
                    ev.target.setAttribute('xpos', this.x);
                }, 
                end: ev => {
                    console.log(ev)
                }
            }
        })
    }



    /**
     * Mata al jugador
     */
    die() {
        if (!this.dead) {
            setTimeout(() => {
                //document.querySelector(".lifes.amount").innerHTML = `${this.lives}`; // ALUMNA
                this.game.endGame();
            }, 2000);
            super.die();
        }
    }
// document.getElementById("livesli").innerHTML = `Lives: ${this.lives}`;  // ALUMNA
}
