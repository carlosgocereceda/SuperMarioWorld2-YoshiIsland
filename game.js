var game = function () {
    //Función a la que se llamará cuando se cargue el juego
    //Objeto Quinus con los modulos que necesitamos
    var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX")
        // Maximize this game to whatever the size of the browser is
        .setup({
            maximize: true,
            upsampleWidth: 420, // Double the pixel density of the
            upsampleHeight: 320, // game if the w or h is 420x320
            // or smaller (useful for retina phones)
            downsampleWidth: 1024, // Halve the pixel density if resolution
            downsampleHeight: 768 // is larger than or equal to 1024x768 
        })
        // And turn on default input controls and touch input (for UI)
        .controls().touch()
    //Se cargan los recursos
    Q.load("yoshiJunto.png, yoshi.json, enemigos.png, enemy1.json, enemy2.json, Shy_Guy_morado.png," +
    " Shy_Guy_morado.json, level_end.png, level_end.json, huevos.png, egg.json, koopaVolador.json", function () {
        Q.compileSheets("yoshiJunto.png", "yoshi.json");
        Q.compileSheets("enemigos.png", "enemy1.json");
        Q.compileSheets("enemigos.png", "enemy2.json");
        Q.compileSheets("Shy_Guy_morado.png", "Shy_Guy_morado.json");
        Q.compileSheets("level_end.png", "level_end.json");
        Q.compileSheets("enemigos.png", "koopaVolador.json");
        Q.compileSheets("huevos.png", "egg.json");

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
            impulso_right: { frames: [0, 1, 2, 3, 4, 5], flip: "", loop: false, rate: 1 / 10 },
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

        // Animacion de Shy Guy morado(enemy3)
        Q.animations('enemy3_animations', {
            run_right: { frames: [0, 1, 2, 3], flip: "", rate: 1 / 5 },
            run_left: { frames: [0, 1, 2, 3], flip: "x", rate: 1 / 5 }
        })

        // Animacion Koopa Volador(enemy4)
        Q.animations('enemy4_animations', {
            run_right: { frames: [0, 1, 2, 3, 4, 5], flip: "", rate: 1 / 5 },
            run_left: { frames: [0, 1, 2, 3, 4, 5], flip: "x", rate: 1 / 5 }
        })


        Q.scene("level1", function (stage) {
            Q.stageTMX("yoshi.tmx", stage);
            var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player);
            stage.viewport.scale = 2;

            stage.insert(new Q.Enemy2({ x: 1000, vy: 450, y: 660}));
            stage.insert(new Q.Enemy1({ x: 400, vy: 450, y: 660 }));
            stage.insert(new Q.Enemy1({ x: 600, vy: 450, vx: -50, y: 660 }));
            stage.insert(new Q.Enemy3({ x: 1100, vx: 50, velocidad: 50, y: 600, x_vueltaMin: 1099, x_vueltaMax: 1185, darVuelta: true }));
            stage.insert(new Q.Enemy1({ reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 2635, vy: 450, vx: 50, y: 600 }));
            stage.insert(new Q.Enemy2({ reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 3000, vy: 450, vx: 50, y: 600 }));
            stage.insert(new Q.Enemy3({ reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 2820, vy: 450, vx: 50, y: 600 }));
            stage.insert(new Q.Enemy4({x: 1100, y: 500, velocidad: 50, vx: 50, minX: 1070, maxX: 1400}));
            stage.insert(new Q.Enemy4({horizontal: false, x: 1490, y: 500, velocidad: 70, vy: 70, minY: 350, maxY: 550}));
            stage.insert(new Q.Flower({ x: 4362, y:550 }));
            
        });
        Q.loadTMX("yoshi.tmx", function () {
            Q.stageScene("level1");
        });
        //Ventana de fin del juego
        Q.scene('endGame', function (stage) {
            var box = stage.insert(new Q.UI.Container({
                x: Q.width / 2, y: Q.height / 2, fill: "rgba(255,255,255,0.5)"
            }));

            var button = box.insert(new Q.UI.Button({
                x: 0, y: 0, fill: "#CCCCCC",
                label: "Play Again"
            }))
            var label = box.insert(new Q.UI.Text({
                x: 10, y: -10 - button.p.h,
                label: stage.options.label
            }));
            button.on("click", function () {
                Q.clearStages();
                Q.stageScene("level1");
            });
            box.fit(20);
        });

    });
    //Enemigo1(fantasma verde)
    Q.Sprite.extend("Enemy1", {
        init: function (p) {
            this._super(p, {
                sprite: "enemy1_animations",
                sheet: "enemy1",
                vx: 50,
                reaparecer: false,
                x_reaparicion: 0,
                y_reaparicion: 0,
                y_caida: 0
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                    Q.stageScene("endGame", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if(collision.obj.isA("Egg")){
                    collision.obj.p.vy = -500;
                    this.destroy();
                    collision.obj.destroy();
                }
            });
            
            //Si le salta encima el player lo mata y salta más
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    console.log("die");
                    collision.obj.p.vy = -500;
                    this.destroy();
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
            if(this.p.reaparecer) {
            	if(this.p.y >= this.p.y_caida) {
            		this.p.x = this.p.x_reaparicion;
            		this.p.y = this.p.y_reaparicion;
            	}
            }
        }


    });
    //Enemy2(fantasma rojo)
    Q.Sprite.extend("Enemy2", {
        init: function (p) {
            this._super(p, {
                sprite: "enemy2_animations",
                sheet: "enemy2",
                vx: 70,
                reaparecer: false,
                x_reaparicion: 0,
                y_reaparicion: 0,
                y_caida: 0
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                    Q.stageScene("endGame", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if(collision.obj.isA("Egg")){
                    collision.obj.p.vy = -500;
                    this.destroy();
                    collision.obj.destroy();
                }
            });
            
            //Si le salta encima el player lo mata y salta más
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    console.log("die");
                    collision.obj.p.vy = -500;
                    this.destroy();
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
            if(this.p.reaparecer) {
            	if(this.p.y >= this.p.y_caida) {
            		this.p.x = this.p.x_reaparicion;
            		this.p.y = this.p.y_reaparicion;
            	}
            }
        }
    });
	//Enemy3(fantasma morado)
     Q.Sprite.extend("Enemy3", {
        init: function (p) {
            this._super(p, {
                sprite: "enemy3_animations",
                sheet: "enemy3",
                vx: 0,
                reaparecer: false,
                x_reaparicion: 0,
                y_reaparicion: 0,
                y_caida: 0,
                darVuelta: false,
                x_vueltaMax: 0,
                x_vueltaMin: 0,
                velocidad: 0,
                dandoVuelta: false
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                	console.log("You died!");
                    Q.stageScene("endGame", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
            });           
            //Si le salta encima el player lo mata y salta más
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    console.log("die");
                    collision.obj.p.vy = -500;
                    this.destroy();
                }
                else if(collision.obj.isA("Egg")){
                    collision.obj.p.vy = -500;
                    this.destroy();
                    collision.obj.destroy();
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
            if(this.p.reaparecer) {
            	if(this.p.y >= this.p.y_caida) {
            		this.p.x = this.p.x_reaparicion;
            		this.p.y = this.p.y_reaparicion;
            	}
            }
            if(this.p.darVuelta && !this.p.dandoVuelta) {
            	if(this.p.x >= this.p.x_vueltaMax) {
            		this.p.vx = - this.p.velocidad;
            	}
            	else if(this.p.x <= this.p.x_vueltaMin) {
            		this.p.vx = this.p.velocidad;
            	}
            }
        }
    });

     //Flor (Final del nivel)
     Q.Sprite.extend("Flower", {
        init: function (p) {
            this._super(p, {
                sheet: "end",
                x: 0,
                y: 0,
                vy: 0
            });
            this.p.gravityY = 0;
            this.add('2d, tween');
            this.on("bump.left,bump.right,bump.bottom, bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                	this.destroy();
                	//Pasar al nivel 2
                }
            });           
        }
    });

     //Koopa Volador
    Q.Sprite.extend("Enemy4", {
        init: function (p) {
            this._super(p, {
            	sprite: "enemy4_animations",
                sheet: "enemy4",
                x: 600,
                y: 400,
                vx: 0,
                vy: 0,
                maxY: 0,
                minY: 0,
                minX: 0,
                maxX: 0,
                velocidad: 0,
                horizontal: true
            });
            this.p.gravityY = 0;
            this.add('2d, aiBounce, animation'); //Para la IA que lo mueve de derecha a izquierda
            //Si le tocan por la izquierda, derecha o por debajo y es el player, pierde
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                    Q.stageScene("endGame", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
            });
            //Si le salta encima el player lo mata y salta más
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    console.log("die");
                    collision.obj.p.vy = -500;
                    this.destroy();
                }
                 else if(collision.obj.isA("Egg")){
                    collision.obj.p.vy = -500;
                    this.destroy();
                    collision.obj.destroy();
                }
            });
        },
        step: function (dt) {
        	if(!this.p.horizontal){
	            if (this.p.y >= this.p.maxY) {
	                this.p.vy = - this.p.velocidad;
	            }
	            else if (this.p.y <= this.p.minY) {
	                this.p.vy = this.p.velocidad;
	            }
        	}
        	else {
        		if (this.p.x >= this.p.maxX) {
	                this.p.vx = - this.p.velocidad;
	            }
	            else if (this.p.x <= this.p.minX) {
	                this.p.vx = this.p.velocidad;
	            }
        	}
        	if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
        }

    });

    //Huevo
    Q.Sprite.extend("Egg", {
        init: function (p) {
            this._super(p, {
                sheet: "egg",
                x: 0,
                y: 0,
                disparado: false
            });
            this.p.gravityY = 0;
            this.add('2d, tween');      
        }
    });

    //Yoshi
    Q.Sprite.extend("Player", {
        init: function (p) {
            this._super(p, {
                sprite: "yoshi_animations",
                sheet: "yoshiR", // Sprite que esta dentro de mario_small.json
                x: 330, //x donde aparecerá
                jumpSpeed: -400,
                y: 700, //y donde aparecerá,
                atancando: false,
                boost: false,
                huevos: 0
            });
            this.add('2d, platformerControls, tween, animation');
            Q.input.on("down", this, "attack");
            Q.input.on("up", this, "boost");
            Q.input.on("fire", this, "disparo");
            this.on("stopAttack", function () {
                this.p.atancando = false;
            });
            this.on("stopAttack_left", function () {
                this.p.atancando = false;
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

            }
        },
        disparo: function(){
            console.log("disparo");
            if(this.p.huevos > 0){
                var items = this.stage.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].isA("Egg")) {
                        items[i]["p"]["disparado"] = true;
                        console.log(items[i]["p"]["vy"]);
                        if(this.p.direction == "right"){
                            items[i]["p"]["x"] = this.p.x + 20;
                            items[i]["p"]["vx"] = 300; 
                        }
                        else{
                            items[i]["p"]["x"] = this.p.x - 20;
                            items[i]["p"]["vx"] = -300; 
                        }
                                              
                    }
                }
            }
            this.p.huevos = 0;
        },
        attack: function () {
            this.p.atancando = true;
            console.log("atacando");
            console.log(this.stage.items);
            var items = this.stage.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].isA("Enemy1") || items[i].isA("Enemy2") || items[i].isA("Enemy3") || items[i].isA("Enemy4")) {
                    let medidas = items[i]["p"];
                    let x_ = Number(medidas["x"]);
                    let y_ = Number(medidas["y"]);
                    console.log(x_ + " " + y_);
                    console.log(this.p.x + " " + this.p.y);
                    if (Math.abs(Number(this.p.x) - x_) < 75 && Math.abs(Number(this.p.y) - y_ < 3)) {
                        console.log("lo mato");
                        console.log(Number(this.p.x - x_) + " " + Number(this.p.y - y_));
                        items[i].destroy();
                        if(this.p.huevos == 0){ //de momento solo un huevo
                            this.stage.insert(new Q.Egg({x:this.p.x-20, y:this.p.y}));
                            this.p.huevos += 1;
                        }
                    }
                }

            }
            this.p.sheet = "yoshiAttack_right";
            this.play("attack_" + this.p.direction);
        },
        step: function (dt) {
            if(this.p.huevos > 0){
                var items = this.stage.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].isA("Egg") && !items[i]["p"]["disparado"]) {
                        if(this.p.direction == "right"){
                            items[i]["p"]["x"] = this.p.x -15;
                            items[i]["p"]["y"] = this.p.y;
                        }
                        else{
                            items[i]["p"]["x"] = this.p.x + 15;
                            items[i]["p"]["y"] = this.p.y;
                        }
                    }
                }
            }
            if (this.p.y > 900) {
                //Q.stageScene("endGame", 1, { label: "You Died" });
                console.log("cayendo");
                this.p.x = 350;
                this.p.y = 700;
            }
            else if (!this.p.atancando) {
                if (this.p.vy == 0) {
                    if (this.p.vx > 0) {
                        this.p.sheet = "yoshiR";
                        this.play("run_right");
                    } else if (this.p.vx < 0) {
                        this.p.sheet = "yoshiL";
                        this.play("run_left");
                    } else {
                        if (this.p.direction == "right") {
                            this.p.sheet = "yoshiR";
                        }
                        else {
                            this.p.sheet = "yoshiL";
                        }
                        this.play("stand_left_corrector");
                    }
                }
            }

        }
    });
}
