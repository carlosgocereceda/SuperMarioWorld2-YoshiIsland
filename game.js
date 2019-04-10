var game = function () {
    var nivel = 1;
    var huevos;
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
    Q.load("yoshiJunto.png, yoshi.json, enemigos.png, enemyTerrestres.json, Shy_Guy_morado.png," +
    "level_end.png, level_end.json, huevos.png, egg.json, koopaVolador.json," +
    "piedraCae.png, piedraCae.json, fantasmasVoladores.png, fantasmasVoladores.json", function () {
        Q.compileSheets("yoshiJunto.png", "yoshi.json");
        
        // Enemigos nivel 1 terrestres
        Q.compileSheets("enemigos.png", "enemyTerrestres.json");
        
        // Fin del nivel (flor del final)
        Q.compileSheets("level_end.png", "level_end.json");
       
        // Huevo de Yoshi
        Q.compileSheets("huevos.png", "egg.json");

        // Enemigos voladores (nivel 1)
        Q.compileSheets("enemigos.png", "koopaVolador.json");
        Q.compileSheets("fantasmasVoladores.png", "fantasmasVoladores.json");

        //Piedra que cae (nivel 2)
        Q.compileSheets("piedraCae.png", "piedraCae.json");

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

        // Animacion Koopa Volador(enemy4)
        Q.animations('enemy4_animations', {
            run_right: { frames: [0, 1, 2, 3, 4, 5], flip: "", rate: 1 / 5 },
            run_left: { frames: [0, 1, 2, 3, 4, 5], flip: "x", rate: 1 / 5 }
        })



        Q.scene("level1", function (stage) {
        	console.log("entro a nivel 1");
            Q.stageTMX("yoshi.tmx", stage);
            var player = stage.insert(new Q.Player());
            stage.add("viewport").follow(player);
            stage.viewport.scale = 2;
            huevos = 0;
            nivel = 1;
            stage.insert(new Q.EnemyTerrestre({sheet: "enemy2", x: 1000,vx: 50, vy: 450, y: 660, x_reaparicion: 1000, y_reaparicion: 660, y_caida: 800,}));
            //stage.insert(new Q.EnemyTerrestre({sheet: "enemy1", x: 400, vx: 50,vy: 450, y: 660,  x_reaparicion: 400, y_reaparicion: 660, y_caida: 800,}));
            //stage.insert(new Q.EnemyTerrestre({ sheet: "enemy1",x: 600, vy: 450, vx: -50, y: 660,  x_reaparicion: 600, y_reaparicion: 660, y_caida: 800,}));
            stage.insert(new Q.EnemyTerrestre({sheet: "enemy3", x: 1100, vx: 50, velocidad: 50, y: 600, x_vueltaMin: 1099, x_vueltaMax: 1185, darVuelta: true,  x_reaparicion: 1100, y_reaparicion: 600, y_caida: 800,}));
            stage.insert(new Q.EnemyTerrestre({sheet: "enemy1", reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 2635, vy: 450, vx: 50, y: 600 }));
            stage.insert(new Q.EnemyTerrestre({sheet: "enemy2", reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 3000, vy: 450, vx: 50, y: 600 }));
            stage.insert(new Q.EnemyTerrestre({sheet: "enemy3", reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 2820, vy: 450, vx: 50, y: 600 }));
            stage.insert(new Q.EnemyVolador({sheet: "enemy10", x: 1100, y: 500, velocidad: 50, vx: 50, minX: 1070, maxX: 1400}));
            stage.insert(new Q.EnemyVolador({sheet: "enemy10", horizontal: false, x: 1490, y: 500, velocidad: 70, vy: 70, minY: 350, maxY: 550}));
            stage.insert(new Q.Flower({ x: 4362, y:550 }));
            // Nuevo
            stage.insert(new Q.EnemyVolador({sheet: "enemy4", horizontal: false, x: 450, y: 660, velocidad: 70, vy: 70, minY: 300, maxY: 600}));
            stage.insert(new Q.EnemyVolador({sheet: "enemy5", horizontal: false, x: 500, y: 660, velocidad: 70, vy: 70, minY: 300, maxY: 600}));
            stage.insert(new Q.EnemyVolador({sheet: "enemy6", horizontal: false, x: 550, y: 660, velocidad: 70, vy: 70, minY: 300, maxY: 600}));
            stage.insert(new Q.EnemyVolador({sheet: "enemy7", horizontal: false, x: 600, y: 660, velocidad: 70, vy: 70, minY: 300, maxY: 600}));
            stage.insert(new Q.EnemyVolador({sheet: "enemy8", horizontal: false, x: 650, y: 660, velocidad: 70, vy: 70, minY: 300, maxY: 600}));
            
        });

         Q.scene("level2", function (stage) {
         	nivel = 2;
            Q.stageTMX("yoshi2.tmx", stage);
            var player = stage.insert(new Q.Player({y: 650}));
            stage.add("viewport").follow(player);
            stage.viewport.scale = 2;
            huevos = 0;
            stage.insert(new Q.PiedraCae({ x: 1090, y:435, y_origen: 435, maxY: 550, tCaida: 3}));  
            stage.insert(new Q.Flower({ x: 3175, y:450 }));           
        });

        Q.loadTMX("yoshi.tmx, yoshi2.tmx", function () {
        	console.log("pinto yoshi 1");
            if(nivel == 1)Q.stageScene("level1");
            else if(nivel == 2) Q.stageScene("level2");
        });

         Q.scene('winGame', function (stage) {
            var box = stage.insert(new Q.UI.Container({
                x: Q.width / 2, y: Q.height / 2, fill: "rgba(255,255,255,0.5)"
            }));

            var button = box.insert(new Q.UI.Button({
                x: 0, y: 0, fill: "#CCCCCC",
                label: "Play Next Level"
            }))
            var label = box.insert(new Q.UI.Text({
                x: 10, y: -10 - button.p.h,
                label: "You win Level " + nivel
            }));
            nivel += 1;
            button.on("click", function () {
                Q.clearStages();
                if(nivel == 1) Q.stageScene("level1");
            	else if(nivel == 2) Q.stageScene("level2");
            });
            box.fit(20);
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
                if(nivel == 1) Q.stageScene("level1");
            	else if(nivel == 2) Q.stageScene("level2");
            });
            box.fit(20);
        });

    });
	//Enemy(fantasmas de colores terrestres)
     Q.Sprite.extend("EnemyTerrestre", {
        init: function (p) {
            this._super(p, {
                sprite: "enemy1_animations",
                sheet: "", //Obligatorio
                vx: 0, //Obligatorio
                reaparecer: true, //Obligatorio
                x_reaparicion: 0, //Obligatorio si reaparicion = true
                y_reaparicion: 0, //Obligatorio si reaparicion = true
                y_caida: 0, //Obligatorio si reaparicion = true
                darVuelta: false,
                x_vueltaMax: 0, //Obligatorio si darVuelta = true
                x_vueltaMin: 0,	//Obligatorio si darVuelta = true
                velocidad: 0 //Obligatorio si darVuelta = true
                //x e y también son obligatorias
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                	console.log("You died!");
                    Q.stageScene("endGame", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if(collision.obj.isA("Egg")){
                	console.log("LE HE DADOOOOOOOOOOOO");
                	huevos = 0;
                	if(this.p.reaparecer){
                		var nuevo = new Q.EnemyTerrestre({sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                		 y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion, vy: this.p.vy, 
                		 vx: this.p.vx, y: this.p.y_reaparicion , darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                		 x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin});
                		var stag = this.stage;
                		this.destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
                	}
                    else this.destroy();

                    collision.obj.destroy();
                }
            });           
            //Si le salta encima el player lo mata
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    console.log("die");
                    collision.obj.p.vy = -500;
                    if(this.p.reaparecer){
                		var nuevo = new Q.EnemyTerrestre({sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                		 y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion, vy: this.p.vy, 
                		 vx: this.p.vx, y: this.p.y_reaparicion , darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                		 x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin});
                		var stag = this.stage;
                		this.destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
                	}
                    else this.destroy();
                }
                else if(collision.obj.isA("Egg")){
                	console.log("LE HE DADOOOOOOOOOOOO")
                	huevos = 0;
                    if(this.p.reaparecer){
                		var nuevo = new Q.EnemyTerrestre({sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                		 y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion, vy: this.p.vy, 
                		 vx: this.p.vx, y: this.p.y_reaparicion , darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                		 x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin});
                		var stag = this.stage;
                		this.destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
                	}
                    else this.destroy();
                    collision.obj.destroy();
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
            if(this.p.reaparecer) { //Reaparición si el enmigo se cae
            	if(this.p.y >= this.p.y_caida) {
            		this.p.x = this.p.x_reaparicion;
            		this.p.y = this.p.y_reaparicion;
            	}
            }
            if(this.p.darVuelta && !this.p.dandoVuelta) { //Movimiento cuando no hay obstaculos
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
                	Q.stageScene("winGame", 1);
                }
            });           
        }
    });

     //(Koopa Volador, Fantasmas de colores Voladores)
    Q.Sprite.extend("EnemyVolador", {
        init: function (p) {
            this._super(p, {
            	sprite: "enemy1_animations",
                sheet: "", ////Obligatorio
                x: 600, //Obligatorio
                y: 400, //Obligatorio
                vx: 0, //Obligatorio si quieres que se mueva horizontalmente
                vy: 0, //Obligatorio si quieres que se mueva verticalmente
                maxY: 0, //Obligatorio si horizontal = false
                minY: 0, //Obligatorio si horizontal = false
                minX: 0, //Obligatorio si horizontal = true
                maxX: 0, //Obligatorio si horizontal = true
                velocidad: 0, 
                horizontal: true, //Obligatorio, indica si se mueve en horizontal (true) o vertical (false)
                reaparecer: true, //Obligatorio
                x_reaparicion: 0, ///Obligatorio si reaparecer = true
                y_reaparicion: 0 //Obligatorio si reaparecer = true
            });
            this.p.gravityY = 0;
            this.add('2d, aiBounce, animation'); //Para la IA que lo mueve de derecha a izquierda
            //Si le tocan por la izquierda, derecha o por debajo y es el player, pierde
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                    Q.stageScene("endGame", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if(collision.obj.isA("Egg")){
                	console.log("LE HE DADOOOOOOOOOOOO")
                	huevos = 0;
                    if(this.p.reaparecer){
                		var nuevo = new Q.EnemyVolador({sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                		 y_reaparicion: this.p.y_reaparicion, x: this.p.x_reaparicion, vy: this.p.vy, 
                		 vx: this.p.vx, y: this.p.y_reaparicion , velocidad: this.p.velocidad, horizontal: this.p.horizontal,
                		 maxX: this.p.maxX, maxY: this.p.maxY, minX: this.p.minX, minY: this.p.minY});
                		var stag = this.stage;
                		this.destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
                	}
                    else this.destroy();
                    collision.obj.destroy();
                }
            });
            //Si le salta encima el player lo mata
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    console.log("die");
                    collision.obj.p.vy = -500;
                    if(this.p.reaparecer){
                		var nuevo = new Q.EnemyVolador({sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                		 y_reaparicion: this.p.y_reaparicion, x: this.p.x_reaparicion, vy: this.p.vy, 
                		 vx: this.p.vx, y: this.p.y_reaparicion , velocidad: this.p.velocidad, horizontal: this.p.horizontal,
                		 maxX: this.p.maxX, maxY: this.p.maxY, minX: this.p.minX, minY: this.p.minY});
                		var stag = this.stage;
                		this.destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
                	}
                    else this.destroy();
                }
                else if(collision.obj.isA("Egg")){
                	console.log("LE HE DADOOOOOOOOOOOO")
                	huevos = 0;
                    if(this.p.reaparecer){
                		var nuevo = new Q.EnemyVolador({sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                		 y_reaparicion: this.p.y_reaparicion, x: this.p.x_reaparicion, vy: this.p.vy, 
                		 vx: this.p.vx, y: this.p.y_reaparicion , velocidad: this.p.velocidad, horizontal: this.p.horizontal,
                		 maxX: this.p.maxX, maxY: this.p.maxY, minX: this.p.minX, minY: this.p.minY});
                		var stag = this.stage;
                		this.destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
                	}
                    else this.destroy();
                    collision.obj.destroy();
                }
            });
        },
        step: function (dt) {
        	if(!this.p.horizontal){ //Movimiento vertical
	            if (this.p.y >= this.p.maxY) {
	                this.p.vy = - this.p.velocidad;
	            }
	            else if (this.p.y <= this.p.minY) {
	                this.p.vy = this.p.velocidad;
	            }
        	}
        	else { //Movimiento horizontal
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
            this.on("bump.left,bump.right", function (collision) {
                if (!collision.obj.isA("Player") && !collision.obj.isA("EnemyTerrestre") && !collision.obj.isA("EnemyVolador") && this.p.disparado) {
                    this.destroy();
                   huevos = 0;
                }
            }); 

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
                boost: false
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
            //if(this.p.huevos > 0){
            if(huevos > 0){
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
           huevos = 0;
        },
        attack: function () {
            this.p.atancando = true;
            console.log("atacando");
            console.log(this.stage.items);
            var items = this.stage.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].isA("EnemyTerrestre") || items[i].isA("EnemyVolador")) {
                    let medidas = items[i]["p"];
                    let x_ = Number(medidas["x"]);
                    let y_ = Number(medidas["y"]);
                    console.log(x_ + " " + y_);
                    console.log(this.p.x + " " + this.p.y);
                    if (Math.abs(Number(this.p.x) - x_) < 75 && Math.abs(Number(this.p.y) - y_ < 3)) {
                        console.log("lo mato");
                        //console.log(Number(this.p.x - x_) + " " + Number(this.p.y - y_));
                        if(items[i].isA("EnemyTerrestre") && items[i]["p"]["reaparecer"]){
                        	console.log("HOLIIIIIIIIII")
							var nuevo = new Q.EnemyTerrestre({sprite: items[i]["p"]["sprite"], sheet: items[i]["p"]["sheet"],
							 reaparecer: items[i]["p"]["reaparecer"], x_reaparicion: items[i]["p"]["x_reaparicion"],
	                		 y_reaparicion: items[i]["p"]["y_reaparicion"], y_caida: items[i]["p"]["y_caida"], 
	                		 x: items[i]["p"]["x_reaparicion"], vy: items[i]["p"]["vy"], vx: items[i]["p"]["vx"],
	                		 y: items[i]["p"]["y_reaparicion"] , darVuelta: items[i]["p"]["darVuelta"], velocidad: items[i]["p"]["velocidad"],
	                		 x_vueltaMax: items[i]["p"]["x_vueltaMax"], x_vueltaMin: items[i]["p"]["x_vueltaMin"]});
	                		var stag = this.stage;
	                		items[i].destroy();
	                		window.setTimeout(function(){
								stag.insert(nuevo);
							}, 10000);
                	}
                	else if(items[i].isA("EnemyVolador") && items[i].reaparecer){
                		var nuevo = new Q.EnemyVolador({sprite: items[i]["p"]["sprite"], sheet: items[i]["p"]["sheet"],
						reaparecer: items[i]["p"]["reaparecer"], x_reaparicion: items[i]["p"]["x_reaparicion"],
	                	y_reaparicion: items[i]["p"]["y_reaparicion"], x: items[i]["p"]["x_reaparicion"], vy: items[i]["p"]["vy"], vx: items[i]["p"]["vx"],
	                	y: items[i]["p"]["y_reaparicion"] , velocidad: items[i]["p"]["velocidad"], horizontal: items[i]["p"]["horizontal"],
                		maxX: items[i]["p"]["maxX"], maxY: iitems[i]["p"]["maxY"], minX: items[i]["p"]["minX"], minY: items[i]["p"]["minY"]});
                		var stag = this.stage;
                		items[i].destroy();
                		window.setTimeout(function(){
							stag.insert(nuevo);
						}, 10000);
					}
                    else items[i].destroy();
                       
                       // if(this.p.huevos == 0){ //de momento solo un huevo
                       if(huevos == 0){
                            this.stage.insert(new Q.Egg({x:this.p.x-20, y:this.p.y}));
                            //this.p.huevos += 1;
                            huevos = 1;
                        }
                    }
                }

            }
            this.p.sheet = "yoshiAttack_right";
            this.play("attack_" + this.p.direction);
        },
        step: function (dt) {
            //if(this.p.huevos > 0){
            if(huevos > 0){
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
                Q.stageScene("endGame", 1, { label: "You Died" });
                console.log("cayendo");
                if(nivel == 1){
	                this.p.x = 350;
	                this.p.y = 700;
            	}
            	else if (nivel == 2) {
            		this.p.x = 350;
            		this.p.y = 650;
            	}
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

	//Objetos
	//Piedra que cae
     Q.Sprite.extend("PiedraCae", {
        init: function (p) {
            this._super(p, {
                sheet: "piedra",
                x: 0,
                y: 0,
                vy: 0,
                y_origen: 0,
                tiempo: 0,
                max_Y: 0,
                tCaida: 0
            });
            this.p.gravityY = 0;
            this.add('2d, tween');
            this.on("bump.left,bump.right,bump.bottom, bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                }
            });           
        },
        step: function (dt) {
        	this.p.tiempo += dt;
        	if(this.p.tiempo >= this.p.tCaida) {
        		this.p.vy = 50;
        	}
            if (this.p.y >= this.p.maxY) {
            	this.p.tiempo = 0;
            	this.p.vy = 0;
                this.p.y = this.p.y_origen;
            }
        }
    });
}
