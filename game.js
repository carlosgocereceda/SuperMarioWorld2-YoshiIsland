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
        .controls().touch()
    //Se cargan los recursos
    Q.load("yoshiJunto.png, yoshi.json", function () {
        Q.compileSheets("yoshiJunto.png", "yoshi.json");

        //Animaciones
        Q.animations('yoshi_animations', {
            run_right: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_left: { frames: [29, 30, 31, 32], rate: 1 / 10 },
            jumps: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_down_right: { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_down_left : { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_up_right:  { frames: [0, 1, 2, 3], rate: 1 / 10 },
            run_up_left: { frames: [0, 1, 2, 3], rate: 1 / 10 }
        });

        Q.scene("level1", function (stage) {
            Q.stageTMX("yoshi.tmx", stage);
            var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player);
            stage.viewport.scale = 2;
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
    //Mario
    Q.Sprite.extend("Player", {
        init: function (p) {
            this._super(p, {
                sprite: "yoshi_animations",
                sheet: "yoshiR", // Sprite que esta dentro de mario_small.json
                x: 350, //x donde aparecerá
                jumpSpeed: -400,
                y: 450 //y donde aparecerá
            });
            this.add('2d, platformerControls, tween, animation');
        },
        step: function (dt) {
            if (this.p.y > 700) {
                Q.stageScene("endGame", 1, { label: "You Died" });
                console.log("cayendo");
                this.p.x = 300;
                this.p.y = 500;
            }
            else {
                if (this.p.vx > 0) {
                    this.p.sheet = "yoshiR";
                    this.play("run_right");
                } else if (this.p.vx < 0) {
                    this.p.sheet = "yoshiR";
                    this.play("run_left");
                }
                if (this.p.vy > 0) {
                    if (this.p.vx > 0)
                        this.play("run_down_right");
                    else
                        this.play("run_down_left");
                }
                else if (this.p.vy < 0) {
                    if (this.p.vx > 0)
                        this.play("run_up_right");
                    else
                        this.play("run_up_left");

                }
            }

        }


    });
}
