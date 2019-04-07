var game = function () {
    //Función a la que se llamará cuando se cargue el juego
    //Objeto Quinus con los modulos que necesitamos
    var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
        // Maximize this game to whatever the size of the browser is
        .setup({
            maximize: true,
            //width: 320, // Set the default width to 320 pixels
            //height: 480, // Set the default height to 480 pixels
            upsampleWidth: 420, // Double the pixel density of the
            upsampleHeight: 320, // game if the w or h is 420x320
            // or smaller (useful for retina phones)
            downsampleWidth: 1024, // Halve the pixel density if resolution
            downsampleHeight: 768 // is larger than or equal to 1024x768 
        })
        // And turn on default input controls and touch input (for UI)
        .controls(true)
    //Se cargan los recursos
    Q.load("yoshiJunto.png, yoshi.json, enemigos.png, enemy1.json, enemy2.json", function () {
        Q.compileSheets("yoshiJunto.png", "yoshi.json");
        Q.compileSheets("enemigos.png", "enemy1.json");
        Q.compileSheets("enemigos.png", "enemy2.json");

        //Animaciones de yoshi
        Q.animations('yoshi_animations', {
            run_right: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_left: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            jumps: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_down_right: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_down_left: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_up_right: { frames: [0, 1], rate: 1 / 10 },
            run_up_left: { frames: [0, 1], rate: 1 / 10 },
            stand_right: { frames: [0], rate: 1 / 10 },
            stand_left: { frames: [0], rate: 1 / 10 },
            attack_right: { frames: [0, 1, 2, 3, 4, 5, 6], loop: false, rate: 1 / 10, trigger: "stopAttack" },
            attack_left: { frames: [0, 1, 2, 3, 4, 5, 6], loop: false, rate: 1 / 10, flip: "x", trigger: "stopAttack_left" },
            stand_left_corrector: { frames: [0], flip: "", rate: 1 / 10 },
            impulso_right: { frames: [0, 1, 2, 3, 4, 5], flip: "", loop: false, rate: 1 / 10},
            volando_right: { frames: [0, 1, 2, 3], flip: "", rate: 1 / 10 },
            volando_left: { frames: [0, 1, 2, 3], flip: "x", rate: 1 / 10 }
        });
        //Animaciones de fantasma verde(enemy1)
        Q.animations('enemy1_animations', {
            run_right: { frames: [0, 1, 2, 3], flip: "", rate: 1 / 5 },
            run_left: { frames: [0, 1, 2, 3], flip: "x", rate: 1 / 5 }
        })
        // Animacion de fantasma rojo(enemy2)
        Q.animations('enemy2_animations', {
            run_right: { frames: [0, 1, 2, 3], flip: "", rate: 1 / 5 },
            run_left: { frames: [0, 1, 2, 3], flip: "x", rate: 1 / 5 }
        })


        Q.scene("level1", function (stage) {
            Q.stageTMX("yoshi.tmx", stage);
            var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player);
            stage.viewport.scale = 2;
            stage.insert(new Q.Enemy1({ x: 550, vy: 450, y: 300 }));
            stage.insert(new Q.Enemy2({ x: 450, vy: 450, y: 300}));
            /*var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player);
            stage.insert(new Q.Bloopa({x:2850}));
            stage.insert(new Q.Bloopa({x:3100, vy: 80, y: 300}));
            stage.insert(new Q.Bloopa({x:2600, vy: 100, y: 500, miny: 300, maxy: 450}));
            stage.insert(new Q.Bloopa({x:2400, vy: 200, y: 500, miny: 300, maxy: 500}));
            stage.insert(new Q.Bloopa({x:2190, vy: 300, y: 500, miny: 350, maxy: 550}));
            stage.insert(new Q.Bloopa({x:3300, vy: 150, y: 350}));
            stage.insert(new Q.Coin());
            stage.insert(new Q.Goomba());
            stage.insert(new Q.Princess());
            stage.insert(new Q.Goomba({ x: 800 }));*/
        });
        Q.loadTMX("yoshi.tmx", function () {
            Q.stageScene("level1");
        });

    });
    //Enemigo1(fantasma verde)
    Q.Sprite.extend("Enemy1", {
        init: function (p) {
            this._super(p, {
                sprite: "enemy1_animations",
                sheet: "enemy1",
                vx: 50
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left", function (collision) {
                if (collision.obj) {
                    console.log("tocado ");
                    console.log(collision.obj);
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
        }


    });
     //Enemy2(fantasma rojo)
     Q.Sprite.extend("Enemy2", {
        init: function (p) {
            this._super(p, {
                sprite: "enemy2_animations",
                sheet: "enemy2",
                vx: 70
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left", function (collision) {
                if (collision.obj) {
                    console.log("tocado ");
                    console.log(collision.obj);
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
        }
    });
    //Yoshi
    Q.Sprite.extend("Player", {
        init: function (p) {
            this._super(p, {
                sprite: "yoshi_animations",
                sheet: "yoshiR", // Sprite que esta dentro de mario_small.json
                x: 350, //x donde aparecerá
                jumpSpeed: -400,
                y: 450, //y donde aparecerá,
                atancando: false,
                boost: false
            });
            this.add('2d, platformerControls, tween, animation');
            Q.input.on("down", this, "attack");
            Q.input.on("up", this, "boost");
            this.on("stopAttack", function () {
                this.p.atancando = false;
            });
            this.on("stopAttack_left", function () {
                this.p.atancando = false;
                //this.p.flip = "x";
                this.play("stand_left_corrector");
            });
        },
        boost: function () {
            console.log("boost");
            if (!this.p.boost && this.p.vy == 0) {
                console.log("cargando");
                this.p.sheet = "yoshi_impulso";
                this.play("impulso_right");
                this.p.gravity = 1;
                this.p.boost = true;
            }
            else if (this.p.boost && this.p.vy != 0) {
                console.log(this.p.vy);
                this.p.sheet = "yoshi_volando";
                this.play("volando_" + this.p.direction);
                this.p.vy = -200;
                this.p.gravity = 0.3;
                this.p.boost = false;

            } else {
                console.log("boost desactivado");
                this.p.gravity = 1;
                this.p.boost = false;
            }
        },
        attack: function () {
            this.p.atancando = true;
            console.log("atacando");
            console.log(this.stage.items);
            var items = this.stage.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].isA("Enemy1") || items[i].isA("Enemy2")) {
                    let medidas = items[i]["p"];
                    let x_ = Number(medidas["x"]);
                    let y_ = Number(medidas["y"]);
                    console.log(x_ + " " + y_);
                    console.log(this.p.x + " " + this.p.y);
                    if (Math.abs(Number(this.p.x) - x_) < 75 && Math.abs(Number(this.p.y) - y_ < 3)) {
                        console.log("lo mato");
                        console.log(Number(this.p.x - x_) + " " + Number(this.p.y - y_));
                        items[i].destroy();
                    }
                }

            }
            this.p.sheet = "yoshiAttack_right";
            this.play("attack_" + this.p.direction);
        },
        step: function (dt) {
            if (this.p.y > 700) {
                Q.stageScene("endGame", 1, { label: "You Died" });
                console.log("cayendo");
                this.p.x = 350;
                this.p.y = 420;
            }
            else if (!this.p.atancando) {
                if (this.p.vx > 0 && this.p.vy == 0) {
                    this.p.sheet = "yoshiR";
                    this.play("run_right");
                } else if (this.p.vx < 0 && this.p.vy == 0) {
                    this.p.sheet = "yoshiL";
                    this.play("run_left");
                } else if (this.p.vy == 0) {
                    if (this.p.direction == "right") {
                        this.p.sheet = "yoshiR";
                    }
                    else {
                        this.p.sheet = "yoshiL";
                    }
                    //this.play("stand_" + this.p.direction);
                    this.play("stand_left_corrector");
                }

            }

        }


    });
}
