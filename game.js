var game = function () {
    var nivel = -1,
        huevos,
        numeroMonedas = [0, 0, 0],
        vidas = 5, maxVida = 10,
        enemigosMuertos = 0, enemigosParaVida = 5,
        musica = "",
        tiempo;
        var objetoTiempo;
    //Función a la que se llamará cuando se cargue el juego
    //Objeto Quinus con los modulos que necesitamos
    var Q = window.Q = Quintus({ audioSupported: ['mp3'] })
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
        // Maximize this game to whatever the size of the browser is
        .setup("myGame", {
            maximize: true,
            width: 1100, // Set the default width to 320 pixels
            height: 650, // Set the default height to 480 pixels
            upsampleWidth: 420, // Double the pixel density of the
            upsampleHeight: 320, // game if the w or h is 420x320
            // or smaller (useful for retina phones)
            downsampleWidth: 1024, // Halve the pixel density if resolution
            downsampleHeight: 768 // is larger than or equal to 1024x768 
        })
        // And turn on default input controls and touch input (for UI)
        .controls().touch()
        .enableSound();
    Q.load("yoshiJunto.png, yoshi.json, enemigos.png, enemyTerrestres.json, Shy_Guy_morado.png," +
        "level_end.png, level_end.json, huevos.png, egg.json, koopaVolador.json," +
        "piedraCae.png, piedraCae.json, fantasmasVoladores.png, fantasmasVoladores.json, " +
        "ascensor.png, ascensor.json, moneda.png, moneda.json, YoshiTransformations.png, placa_helicoptero.json," +
        " vida.png, vidas.json, plantaPirana.png, plantaPirana.json, chomp.png, chomp.json," +
        "cargando.png, cargando.json, carga.tmx, babyMario.png, bebe.json, titulo.json, titulo.png," +
        "proyectiles.png, proyectiles.json, barrera.png, barrera.json, logoEnemigosVencidos.png, enemigosVencidos.json, " +
        "GOAL.png, GOAL.json, yoshiGOAL.png, goalYoshi.json, MusicaCastillo.mp3, MusicaJardin.mp3, " +
        "MusicaMenu.mp3, MusicaMoneda.mp3, MusicaWin.mp3, MusicaNoVidas.mp3, MusicaNivel1.mp3, MusicaNivel2.mp3, "+
        "MusicaNivel3.mp3, yoshi-tongue.mp3, bebeMarioLlorando.png, bebeLlorando.json, timer.png, timer.json, " + 
        "YoshiFlotar.mp3, YoshiSalto.mp3, SonidoPonerHuevo.mp3, SonidoDispararHuevo.mp3, SonidoAlMatarEnemigosConHuevo.mp3, " +
        "MusicaCaidaOMuerte.mp3, GAMEOVER.json, bowserGAMEOVER.png"
        , function () {
            // Pantalla de tiempo
            Q.compileSheets("timer.png", "timer.json");

            // Pantalla de pasar de nivel las 2 lineas
            Q.compileSheets("yoshiGOAL.png", "goalYoshi.json");
            Q.compileSheets("GOAL.png", "GOAL.json");

            // Enemigos nivel 1 terrestres
            Q.compileSheets("enemigos.png", "enemyTerrestres.json");

            // Chomp
            Q.compileSheets("chomp.png", "chomp.json");

            // Fin del nivel (flor del final)
            Q.compileSheets("level_end.png", "level_end.json");

            // Huevo de Yoshi
            Q.compileSheets("huevos.png", "egg.json");

            // Moneda
            Q.compileSheets("moneda.png", "moneda.json");

            // Enemigos voladores (nivel 1)
            Q.compileSheets("enemigos.png", "koopaVolador.json");
            Q.compileSheets("fantasmasVoladores.png", "fantasmasVoladores.json");

            //Piedra que cae (nivel 3)
            Q.compileSheets("piedraCae.png", "piedraCae.json");
            //Ascensor nivel 3
            Q.compileSheets("ascensor.png", "ascensor.json");

            Q.compileSheets("plantaPirana.png", "plantaPirana.json");

            //Placa para que yoshi se transforme en helicoptero
            Q.compileSheets("YoshiTransformations.png", "placa_helicoptero.json");
            Q.compileSheets("yoshiJunto.png", "yoshi.json");

            // Cargo la vida
            Q.compileSheets("vida.png", "vidas.json");

            // Cargo el logo de los enemigosMuertos
            Q.compileSheets("logoEnemigosVencidos.png", "enemigosVencidos.json");

            // Cargo letras
            Q.compileSheets("cargando.png", "cargando.json");

            // Cargo bebe
            Q.compileSheets("babyMario.png", "bebe.json");

            // Cargo bebe
            Q.compileSheets("titulo.png", "titulo.json");

            // Cargo proyectiles
            Q.compileSheets("proyectiles.png", "proyectiles.json");

            // Cargo barrera
            Q.compileSheets("barrera.png", "barrera.json");

            Q.compileSheets("bebeMarioLlorando.png", "bebeLlorando.json");

            Q.compileSheets("bowserGAMEOVER.png", "GAMEOVER.json");

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
                volando_left: { frames: [0, 1, 2, 3], flip: "x", rate: 1 / 10 },
                yoshi_helicoptero_right: { frames: [0, 1], flip: "x", rate: 1 / 5 },
                yoshi_helicoptero_left: { frames: [0, 1], flip: "", rate: 1 / 5 }
            });

            //Animaciones de fantasmas
            Q.animations('enemy1_animations', {
                run_right: { frames: [0, 1, 2, 3], flip: "", rate: 1 / 5 },
                run_left: { frames: [0, 1, 2, 3], flip: "x", rate: 1 / 5 }
            })

            //Animaciones de planta
            Q.animations('planta_animations', {
                run_right: { frames: [0, 1], flip: "", rate: 1 / 5 },
                run_left: { frames: [0, 1], flip: "x", rate: 1 / 5 }
            })

            // Animacion Koopa Volador
            Q.animations('koopa_animations', {
                run_right: { frames: [0, 1, 2, 3, 4, 5], flip: "", rate: 1 / 5 },
                run_left: { frames: [0, 1, 2, 3, 4, 5], flip: "x", rate: 1 / 5 }
            })

            //Animaciones de chomp
            Q.animations('chomp_animations', {
                run_right: { frames: [0, 1, 2], flip: "", rate: 1 / 5 },
                run_left: { frames: [0, 1, 2], flip: "x", rate: 1 / 5 }
            })

            //Animacion carga
            Q.animations('carga_animations', {
                run_right: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], flip: "", rate: 1 / 10 }
            })

            //Animacion Bebe Mario
            Q.animations('mario_animations', {
                run_right: { frames: [0, 1, 2, 3], flip: "", rate: 1 / 10 }
            })

            //Animacion titulo
            Q.animations('titulo_animations', {
                run_right: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], flip: "", rate: 1 / 6 },
                stop: { frames: [0], flip: "", rate: 1 / 6 },

            })



            Q.scene("level1", function (stage) {
                console.log("entro a nivel 1");
                Q.stageTMX("yoshi.tmx", stage);
                var player = stage.insert(new Q.Player());
                stage.add("viewport").follow(player);
                stage.viewport.scale = 2;
                huevos = 0;
                nivel = 1;
                
                // Inicializacion del tiempo
                tiempo = 120;
                objetoTiempo = new Q.tiempo();
                stage.insert(objetoTiempo);

                //stage.insert(new Q.Placa_helicoptero({ x: 500, y: 650 }));
                //Enemigos terrestres
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy2", x: 1000, vx: 50, vy: 450, y: 660, x_reaparicion: 1000, y_reaparicion: 660, y_caida: 800, velocidad: 50 }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy1", x: 500, vx: 50, vy: 450, y: 660, x_reaparicion: 500, y_reaparicion: 660, y_caida: 800, velocidad: 50 }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy1", x: 600, vy: 450, vx: -50, y: 660, x_reaparicion: 600, y_reaparicion: 660, y_caida: 800, velocidad: -50 }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy3", x: 1100, vx: 50, velocidad: 50, y: 600, x_vueltaMin: 1099, x_vueltaMax: 1185, darVuelta: true, x_reaparicion: 1100, y_reaparicion: 600, y_caida: 800, }));
                //Enemigos de las tuberias
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy1", reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 2635, vy: 450, vx: 50, y: 600, velocidad: 50 }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy2", reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 3000, vy: 450, vx: 50, y: 600, velocidad: 50 }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy3", reaparecer: true, x_reaparicion: 2635, y_reaparicion: 600, y_caida: 800, x: 2820, vy: 450, vx: 50, y: 600, velocidad: 50 }));
                //Enemigos antes de las nubes
                stage.insert(new Q.EnemyVolador({ sheet: "enemy4", x: 1100, y: 470, velocidadX: 50, vx: 50, minX: 1070, maxX: 1400, x_reaparicion: 1100, y_reaparicion: 470 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy5", horizontal: false, x: 1490, y: 500, velocidadY: 70, vy: 70, minY: 350, maxY: 550, x_reaparicion: 1490, y_reaparicion: 500 }));
                //Eneigos de las nubes
                stage.insert(new Q.EnemyVolador({ sheet: "enemy6", horizontal: false, x: 1800, y: 500, velocidadY: 90, vy: 90, minY: 350, maxY: 600, x_reaparicion: 1800, y_reaparicion: 500 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy7", horizontal: false, x: 2100, y: 500, velocidadY: 90, vy: 90, minY: 450, maxY: 600, x_reaparicion: 2100, y_reaparicion: 500 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy8", horizontal: false, x: 2350, y: 400, velocidadY: 90, vy: 90, minY: 400, maxY: 600, x_reaparicion: 2350, y_reaparicion: 400 }));
                // Enemigos zona de piedras
                stage.insert(new Q.EnemyVolador({ sheet: "enemy4", horizontal: false, x: 3850, y: 660, velocidadY: 80, vy: 80, minY: 550, maxY: 700, x_reaparicion: 3850, y_reaparicion: 660 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy5", horizontal: false, x: 3500, y: 660, velocidadY: 60, vy: 60, minY: 600, maxY: 800, x_reaparicion: 3500, y_reaparicion: 660 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy6", horizontal: false, x: 4080, y: 660, velocidadY: 85, vy: 85, minY: 550, maxY: 700, x_reaparicion: 4080, y_reaparicion: 660 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy7", horizontal: false, x: 4300, y: 660, velocidadY: 70, vy: 70, minY: 500, maxY: 800, x_reaparicion: 4300, y_reaparicion: 660 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy8", horizontal: false, x: 3700, y: 660, velocidadY: 90, vy: 90, minY: 600, maxY: 800, x_reaparicion: 3700, y_reaparicion: 660 }));
                //Final
                stage.insert(new Q.Flower({ x: 4362, y: 550 }));
                // NO BORRAR ES PARA PROBAR QUE PASA ENTRE NIVELES
                //stage.insert(new Q.Flower({ x: 500, y: 660 }));

                // Monedas           
                stage.insert(new Q.Moneda({ x: 700, y: 600 }));
                stage.insert(new Q.Moneda({ x: 2630, y: 600 }));
                stage.insert(new Q.Moneda({ x: 3950, y: 610 }));
                Q.audio.stop(musica);
                Q.audio.play("MusicaNivel1.mp3");
                musica = "MusicaNivel1.mp3";
            });

            Q.scene("level2", function (stage) {
                console.log("entro a nivel 2");
                Q.stageTMX("yoshi2.tmx", stage);
                var player = stage.insert(new Q.Player({ x: 100, y: 1050 }));
                stage.add("viewport").follow(player);
                stage.viewport.scale = 2;
                huevos = 0;
                nivel = 2;

                // Inicializacion del tiempo
                tiempo = 120;
                objetoTiempo = new Q.tiempo();
                stage.insert(objetoTiempo);

                stage.insert(new Q.Placa_helicoptero({ x: 200, y: 1000 }));
                //Barrera
                stage.insert(new Q.EnemyVolador({ sheet: "enemy6", horizontal: false, x: 500, y: 910, velocidadY: 0, vy: 0, x_reaparicion: 500, y_reaparicion: 910 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy5", horizontal: false, x: 500, y: 975, velocidadY: 0, vy: 0, x_reaparicion: 500, y_reaparicion: 975 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy7", horizontal: false, x: 500, y: 1050, velocidadY: 0, vy: 0, x_reaparicion: 500, y_reaparicion: 1050 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy8", horizontal: false, x: 500, y: 1100, velocidadY: 0, vy: 0, x_reaparicion: 500, y_reaparicion: 1100 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy4", horizontal: false, x: 500, y: 1170, velocidadY: 0, vy: 0, x_reaparicion: 500, y_reaparicion: 1170 }));
                //Enemigos despues de barrera
                stage.insert(new Q.EnemyVolador({ sheet: "enemy5", horizontal: false, x: 700, y: 950, velocidadY: 50, vy: 50, minY: 910, maxY: 950, x_reaparicion: 700, y_reaparicion: 950 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy6", x: 750, y: 1160, velocidadX: 85, vx: 85, minX: 700, maxX: 800, x_reaparicion: 750, y_reaparicion: 1160 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy7", horizontal: false, x: 900, y: 1050, velocidadY: 20, vy: 20, minY: 1045, maxY: 1055, x_reaparicion: 900, y_reaparicion: 1050 }));
                //Lanzadores
                stage.insert(new Q.Lanzadores({ sheet: "lanzador1", sheetP: "proyectil1", spriteP: "planta_animations", x: 1000, y: 1000, horizontal: true, lanzar: 3 }))
                stage.insert(new Q.Lanzadores({ sheet: "lanzador1", sheetP: "proyectil1", spriteP: "planta_animations", x: 1200, y: 1100, horizontal: true, lanzar: 2.5 }))
                stage.insert(new Q.Lanzadores({ sheet: "lanzador1", sheetP: "proyectil1", spriteP: "planta_animations", x: 900, y: 1200, horizontal: true, lanzar: 4 }))
                stage.insert(new Q.Lanzadores({ sheet: "lanzador2", sheetP: "proyectil2", x: 1250, y: 910, horizontal: false, lanzar: 2 }))
                stage.insert(new Q.Lanzadores({ sheet: "lanzador2", sheetP: "proyectil2", x: 1450, y: 910, horizontal: false, lanzar: 1.5 }))
                //Enemigos despues de lanzadores
                stage.insert(new Q.EnemyVolador({ sheet: "enemy9", horizontal: false, x: 1550, y: 950, velocidadY: 70, vy: 70, minY: 929, maxY: 1080, x_reaparicion: 1550, y_reaparicion: 950 }));
                stage.insert(new Q.EnemyVolador({ sheet: "koopaV", sprite: "koopa_animations", x: 1650, y: 1050, velocidadX: 85, vx: 85, minX: 1500, maxX: 1700, x_reaparicion: 1650, y_reaparicion: 1050 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy12", sprite: "planta_animations", horizontal: false, x: 1800, y: 1140, velocidadY: 90, vy: 90, minY: 1000, maxY: 1140, x_reaparicion: 1800, y_reaparicion: 1140 }));
                stage.insert(new Q.Barrera({ x: 1900, y: 1100, vy: 100, velocidad: 100 }));
                stage.insert(new Q.Barrera({ x: 2100, y: 1100, vy: 200, velocidad: 200 }));
                stage.insert(new Q.Barrera({ x: 2250, y: 1100, vy: 150, velocidad: 150 }));
                stage.insert(new Q.Flower({ x: 2600, y: 1050 }));

                //Monedas
                stage.insert(new Q.Moneda({ x: 800, y: 920 }));
                stage.insert(new Q.Moneda({ x: 1200, y: 1150 }));
                stage.insert(new Q.Moneda({ x: 1300, y: 920 }));
                Q.audio.stop(musica);
                Q.audio.play("MusicaNivel2.mp3");
                musica = "MusicaNivel2.mp3";
            });

            Q.scene("level3", function (stage) {
                nivel = 3;
                Q.stageTMX("yoshi3.tmx", stage);
                var player = stage.insert(new Q.Player({ y: 650 }));
                stage.add("viewport").follow(player);
                stage.viewport.scale = 2;
                huevos = 0;

                // Inicializacion del tiempo
                tiempo = 120;
                objetoTiempo = new Q.tiempo();
                stage.insert(objetoTiempo);

                // Planta carnivora
                stage.insert(new Q.Planta({ x: 2140, y: 710 }));
                stage.insert(new Q.Planta({ x: 2380, y: 710 }));
                stage.insert(new Q.Planta({ x: 2510, y: 710 }));
                stage.insert(new Q.Planta({ sheet: "planta2", x: 2540, y: 660, movimiento: false }));
                //Enemigos terrestres
                stage.insert(new Q.Chomp({ x: 2600, vx: 50, velocidad: 50, y: 550, x_reaparicion: 2600, y_reaparicion: 550, y_caida: 800 }));


                //Enemigos terrestres
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy10", x: 650, vx: 50, velocidad: 50, y: 550, x_vueltaMin: 649, x_vueltaMax: 730, darVuelta: true, x_reaparicion: 650, y_reaparicion: 550, y_caida: 800 }));
                stage.insert(new Q.EnemyTerrestre({ sprite: "planta_animations", sheet: "enemy11", x: 1750, vx: 50, velocidad: 50, y: 420, x_vueltaMin: 1700, x_vueltaMax: 1795, darVuelta: true, x_reaparicion: 1750, y_reaparicion: 420, y_caida: 800 }));

                // Enemigos fantasmas blancos
                stage.insert(new Q.EnemyVolador({ sheet: "enemy9", x: 1100, y: 390, velocidadX: 50, vx: 50, minX: 1070, maxX: 1500, x_reaparicion: 1100, y_reaparicion: 390 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy9", horizontal: false, x: 800, y: 400, velocidadY: 70, vy: 70, minY: 390, maxY: 550, x_reaparicion: 800, y_reaparicion: 400 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy9", horizontal: false, x: 1600, y: 400, velocidadY: 90, vy: 90, minY: 390, maxY: 450, x_reaparicion: 1600, y_reaparicion: 400 }));
                stage.insert(new Q.EnemyVolador({ sheet: "enemy12", sprite: "planta_animations", horizontal: false, x: 3060, y: 420, velocidadY: 120, vy: 120, minY: 419, maxY: 550, x_reaparicion: 3060, y_reaparicion: 420 }));

                // Piedras que suben y bajan
                stage.insert(new Q.PiedraCae({ x: 1090, y: 435, y_origen: 435, maxY: 550, tCaida: 3 }));
                stage.insert(new Q.PiedraCae({ x: 1200, y: 435, y_origen: 435, maxY: 550, tCaida: 4 }));
                stage.insert(new Q.PiedraCae({ x: 1309, y: 435, y_origen: 435, maxY: 550, tCaida: 5 }));
                stage.insert(new Q.PiedraCae({ x: 1409, y: 435, y_origen: 435, maxY: 550, tCaida: 4 }));
                stage.insert(new Q.PiedraCae({ x: 1509, y: 435, y_origen: 435, maxY: 550, tCaida: 3 }));

                // Ascensor
                stage.insert(new Q.Ascensor({ x: 1940, y: 435, y_origen: 435, maxY: 800, minY: 434, velocidad: 50 }));

                // Meta
                stage.insert(new Q.Flower({ x: 3175, y: 450 }));

                // Monedas
                stage.insert(new Q.Moneda({ x: 700, y: 500 }));
                stage.insert(new Q.Moneda({ x: 1309, y: 340 }));
                stage.insert(new Q.Moneda({ x: 2985, y: 550 }));

                Q.audio.stop(musica);
                Q.audio.play("MusicaNivel3.mp3");
                musica = "MusicaNivel3.mp3";

            });

            Q.scene("levelTutorial", function (stage) {
                Q.stageTMX("tutorial.tmx", stage);
                var player = stage.insert(new Q.Player({ x: Q.width / 2 - 300, y: 500 }));
                stage.add("viewport").follow(player);
                stage.viewport.scale = 1.5;
                huevos = 0;
                stage.insert(new Q.UI.Text({
                    label: "← o → para moverte a izquierda o derecha",
                    color: "black",
                    outlineWidth: 1,
                    align: 'center',
                    x: Q.width / 2 - 200,
                    y: 400
                }));
                stage.insert(new Q.UI.Text({
                    label: "↓ para comerte a un emigo, ¡Prueba!",
                    color: "black",
                    outlineWidth: 1,
                    align: 'center',
                    x: 1100,
                    y: 400
                }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy2", x: 1250, vx: 0, vy: 0, y: 450, x_reaparicion: 0, y_reaparicion: 0, y_caida: 800, }));
                stage.insert(new Q.UI.Text({
                    label: "SPACE para lanzar el huevo, ¡Prueba!",
                    color: "black",
                    outlineWidth: 1,
                    align: 'center',
                    x: 1700,
                    y: 400
                }));
                stage.insert(new Q.EnemyTerrestre({ sheet: "enemy2", x: 1850, vx: 0, vy: 0, y: 450, x_reaparicion: 0, y_reaparicion: 0, y_caida: 800, }));
                stage.insert(new Q.UI.Text({
                    label: "↑ para saltar, ↑↑ para planear, ¡Prueba!",
                    color: "black",
                    outlineWidth: 1,
                    align: 'center',
                    x: 2500,
                    y: 400
                }));
                stage.insert(new Q.UI.Text({
                    label: "Toca la placa para convertirte en helicoptero, ¡Prueba!",
                    color: "black",
                    outlineWidth: 1,
                    align: 'center',
                    x: 3900,
                    y: 200
                }));
                stage.insert(new Q.Placa_helicoptero({ x: 4000, y: 240 }));
                Q.audio.stop(musica);
                Q.audio.play("MusicaMenu.mp3");
                musica = "MusicaMenu.mp3";
            });


            // No se que hace esto
            Q.loadTMX("yoshi.tmx, yoshi2.tmx, tutorial.tmx, menu.tmx, carga.tmx, yoshi3.tmx", function () {
                console.log("Se metio en el load con nivel: " + nivel);
                Q.stageScene("mainMenu");
            });

            // Cartel de pasar al siguiente nivel
            Q.scene('winLevel', function (stage) {
                /*
                Esto es lo k hay que hacer 
                */
                var container = stage.insert(new Q.UI.Container({
                    y: 50,
                    x: Q.width / 2
                }));
                // Hacer una clase especifica, para la imagen
                stage.insert(new Q.fotoSimple({ x: 500, y: 200, sheet: "goal" }));
                stage.insert(new Q.fotoSimple({ x: 900, y: 330, sheet: "goal_Yoshi" }));
                objetoTiempo.p.parar = true;

                // Button para continuar
                var boton = stage.insert(new Q.UI.Button({
                    label: "Continuar",
                    fill: "#90EC38",
                    shadowColor: "rgba(255,255,255,1.0)",
                    y: 300,
                    x: 0
                }), container);
                boton.on("click", function () {
                    nivel += 1;
                    Q.clearStages();
                    Q.stageScene("carga");
                });
            });
        });
    //Menu inicial
    Q.scene('mainMenu', function (stage) {
        Q.stageTMX("menu.tmx", stage);
        var container = stage.insert(new Q.UI.Container({
            //fill: "gray",
            y: 50,
            x: Q.width / 2
        }));
        stage.insert(new Q.Titulo({ x: 550, y: 200 }));
        var buttonTutorial = stage.insert(new Q.UI.Button({
            label: "TUTORIAL",
            fill: "#90EC38",
            shadowColor: "rgba(255,255,255,1.0)",
            y: 200,
            x: 0
        }), container);
        var buttonPlay = stage.insert(new Q.UI.Button({
            label: "PLAY",
            fill: "#90EC38",
            y: 300,
            x: 0
        }), container);
        //stage.insert(new Q.EnemyTerrestre({ sheet: "enemy2", x: 200, vx: 30, vy: 10, y: 450, x_reaparicion: 200, y_reaparicion: 200, y_caida: 800, }));
        stage.insert(new Q.EnemyVolador({ sheet: "enemy9", x: 200, y: 300, velocidadX: 50, vx: 50, minX: 0, maxX: 500, x_reaparicion: 1100, y_reaparicion: 390 }));
        stage.insert(new Q.EnemyVolador({ sheet: "enemy9", x: 700, y: 300, velocidadX: 50, vx: 50, minX: 700, maxX: 1200, x_reaparicion: 1100, y_reaparicion: 390 }));
        stage.insert(new Q.EnemyTerrestre({ sheet: "enemy1", reaparecer: true, x_reaparicion: 0, y_reaparicion: 450, y_caida: 800, x: 0, vy: 450, vx: 50, y: 450 }));
        stage.insert(new Q.EnemyTerrestre({ sheet: "enemy2", reaparecer: true, x_reaparicion: 200, y_reaparicion: 450, y_caida: 800, x: 200, vy: 450, vx: 50, y: 450 }));
        stage.insert(new Q.EnemyTerrestre({ sheet: "enemy3", reaparecer: true, x_reaparicion: 400, y_reaparicion: 450, y_caida: 800, x: 400, vy: 450, vx: 50, y: 450 }));

        buttonTutorial.on("click", function () {
            Q.clearStages();
            nivel = 0;
            Q.stageScene("levelTutorial");
        });
        buttonPlay.on("click", function () {
            Q.clearStages();
            nivel = 1;
            Q.stageScene("carga");
        });
        Q.audio.stop(musica);
        Q.audio.play("MusicaMenu.mp3");
        musica = "MusicaMenu.mp3";

    });

    //Menu inicial
    Q.scene('carga', function (stage) {
        Q.stageTMX("carga.tmx", stage);
        stage.insert(new Q.Carga({ x: 550, y: 200 }));
        stage.insert(new Q.BebeMario({ x: -50, y: 450 }));
    });

    //Ventana de caida o muerte
    Q.scene('endLevel', function (stage) {
    	if(vidas - 1 > 0) {
    		Q.audio.stop(musica);
            Q.audio.play("MusicaCaidaOMuerte.mp3");
            musica = "MusicaCaidaOMuerte.mp3";
	    	Q.stageTMX("carga.tmx", stage);
	    	var container = stage.insert(new Q.UI.Container({
	                    y: 50,
	                    x: Q.width / 2
	                }));
	    	stage.insert(new Q.UI.Text({ 
	                label: "Te quedan " + (vidas - 1) + " vidas",
	                color: "white",
	                scale: 3,
	                x: 0,
	                y: 80
	         }),container);
	        // Hacer una clase especifica, para la imagen
	        stage.insert(new Q.fotoSimple({ x: 350, y: 400, sheet: "marioLlorando", sprite: "chomp_animations", animacion: true}));

	        // Button para continuar
	        var boton = stage.insert(new Q.UI.Button({
	            label: "Jugar otra vez",
	            fill: "#90EC38",
	            shadowColor: "rgba(255,255,255,1.0)",
	            y: 300,
	            x: 20
	        }), container);

	        boton.on("click", function () {
	        	Q.clearStages();
	        	if(nivel == 0) {
            		Q.stageScene("levelTutorial");
	        	}            
                else if (nivel == 1) {
                    Q.stageScene("level1");
                    Q.state.reset({ totalMonedas: 0, totalVidas: 0, totalEnemigosMuertos: 0 });
                    // Resto una vida
                    Q.stageScene("sumaVidas", 5);


                    var i = 0, contador = vidas;
                    --contador;
                    while (i < contador) {
                        Q.state.inc("totalVidas", 1);
                        i++;
                    }
                    vidas = contador;


                    // Inicializo el label de monedas
                    numeroMonedas[nivel] = 0;
                    Q.stageScene("sumaMonedas", 2);

                    // Inicializo el label de enemigosMuertos
                    enemigosMuertos = 0;
                    Q.stageScene("sumaEnemigosMuertos", 3);

                    // Inicio de la contador de tiempo
                    Q.stageScene("pintaTiempo", 4);

                }
                else if (nivel == 2) {
                    // Si muere en el nivel 2, pierde las monedas del nivel 1
                    Q.stageScene("level2");
                    Q.state.reset({ totalMonedas: 0, totalVidas: 0, totalEnemigosMuertos: 0 });
                    // Resto una vida
                    Q.stageScene("sumaVidas", 5);
                    var i = 0, contador = vidas;
                    --contador;
                    while (i < contador) {
                        Q.state.inc("totalVidas", 1);
                        i++;
                    }
                    vidas = contador;
                    // Inicializo las monedas
                    Q.stageScene("sumaMonedas", 2);
                    var i = 1, monedas = 0;
                    // Miro las monedas de los anteriores niveles
                    while (i < nivel) {
                        monedas += numeroMonedas[i];
                        i++;
                    }
                    i = 0;
                    console.log("Numero de monedas:" + monedas);
                    while (i != monedas) {
                        Q.state.inc("totalMonedas", 1);
                        i++;
                    }
                    numeroMonedas[nivel] = monedas;
                    // Inicializo el label de enemigosMuertos
                    enemigosMuertos = 0;
                    Q.stageScene("sumaEnemigosMuertos", 3);

                    // Inicio de la contador de tiempo
                    Q.stageScene("pintaTiempo", 4);
                }
                else if (nivel == 3) {
                    Q.stageScene("level3");
                    // Inicializamos los labels de los contadores que se mostraran por pantalla
                    Q.state.reset({ totalVidas: 0, totalMonedas: 0, totalEnemigosMuertos: 0 });
                    console.log("Cambio de nivel 2");
                    // Inicializo las vidas
                    Q.stageScene("sumaVidas", 5);
                    var i = 0, contador = vidas;
                    --contador;
                    while (i < contador) {
                        Q.state.inc("totalVidas", 1);
                        i++;
                    }
                    vidas = contador;

                    // Inicializo las monedas
                    Q.stageScene("sumaMonedas", 2);
                    console.log("Numero de monedas: " + numeroMonedas[nivel]);

                    var i = nivel, monedas = 0;
                    --i;
                    // Miro las monedas de los anteriores niveles
                    while (i < nivel) {
                        monedas += numeroMonedas[i];
                        i++;
                    }
                    i = 0;
                    while (i != monedas) {
                        Q.state.inc("totalMonedas", 1);
                        console.log("Veces");
                        i++;
                    }
                    numeroMonedas[nivel] = monedas;
                    console.log("Numero de monedas: " + numeroMonedas[nivel]);

                    // Inicializo el label de enemigosMuertos
                    enemigosMuertos = 0;
                    Q.stageScene("sumaEnemigosMuertos", 3);

                    // Inicio de la contador de tiempo
                    Q.stageScene("pintaTiempo", 4);
                }
	        });

        }
        else {
            vidas = 5;
            Q.stageScene("endGame");
        }    
    });

//Ventana de fin del juego
    Q.scene('endGame', function (stage) {
    	Q.audio.stop(musica);
        Q.audio.play("MusicaNoVidas.mp3");
        musica = "MusicaNoVidas.mp3";
    	Q.stageTMX("carga.tmx", stage);
    	var container = stage.insert(new Q.UI.Container({
                    y: 50,
                    x: Q.width / 2
                }));
    	stage.insert(new Q.UI.Text({ 
                label: "GAME OVER!",
                color: "white",
                scale: 4,
                x: 0,
                y: 10
         }),container);
        // Hacer una clase especifica, para la imagen
        stage.insert(new Q.fotoSimple({ x: 330, y: 500, sheet: "bowser", sprite: "mario_animations", animacion: true}));

        // Button para continuar
        var boton = stage.insert(new Q.UI.Button({
            label: "Salir",
            fill: "#90EC38",
            shadowColor: "rgba(255,255,255,1.0)",
            scale: 2,
            y: 300,
            x: 200
        }), container);


        boton.on("click", function () {
            Q.stageScene("mainMenu");
        });
    });
    //});
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
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    sumaEnemigo();
                    huevos = 0;
                    if (this.p.reaparecer) {
                        var nuevo = new Q.EnemyTerrestre({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                            y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion, vy: this.p.vy,
                            vx: this.p.velocidad, y: this.p.y_reaparicion, darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                            x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
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
                    sumaEnemigo();
                    collision.obj.p.vy = -100;
                    if (this.p.reaparecer) {
                        var nuevo = new Q.EnemyTerrestre({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                            y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion, vy: this.p.vy,
                            vx: this.p.velocidad, y: this.p.y_reaparicion, darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                            x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
                            stag.insert(nuevo);
                        }, 10000);
                    }
                    else this.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    sumaEnemigo();
                    huevos = 0;
                    if (this.p.reaparecer) {
                        var nuevo = new Q.EnemyTerrestre({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                            y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion, vy: this.p.vy,
                            vx: this.p.velocidad, y: this.p.y_reaparicion, darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                            x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
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
            if (this.p.reaparecer) { //Reaparición si el enmigo se cae
                if (this.p.y >= this.p.y_caida) {
                    this.p.x = this.p.x_reaparicion;
                    this.p.y = this.p.y_reaparicion;
                }
            }
            if (this.p.darVuelta && !this.p.dandoVuelta) { //Movimiento cuando no hay obstaculos
                if (this.p.x >= this.p.x_vueltaMax) {
                    this.p.vx = - this.p.velocidad;
                }
                else if (this.p.x <= this.p.x_vueltaMin) {
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
                    Q.stageScene("winLevel", 1);
                    collision.obj.destroy();
                    Q.audio.stop(musica);
                    Q.audio.play("MusicaWin.mp3");
                    musica = "MusicaWin.mp3";
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
                velocidadX: 0,
                velocidadY: 0,
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
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    sumaEnemigo();
                    huevos = 0;
                    if (this.p.reaparecer) {
                        var nuevo = new Q.EnemyVolador({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                            y_reaparicion: this.p.y_reaparicion, x: this.p.x_reaparicion, vy: this.p.velocidadY,
                            vx: this.p.velocidadX, y: this.p.y_reaparicion, velocidadX: this.p.velocidadX, velocidadY: this.p.velocidadY, horizontal: this.p.horizontal,
                            maxX: this.p.maxX, maxY: this.p.maxY, minX: this.p.minX, minY: this.p.minY
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
                            stag.insert(nuevo);
                        }, 10000);
                    }
                    else this.destroy();
                    collision.obj.destroy();
                }
                else {
                    this.p.vx = this.p.velocidadX;
                    this.p.vy = this.p.velocidadY;
                }
            });
            //Si le salta encima el player lo mata
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player") && !collision.obj.p.helicoptero) {
                    console.log("die");
                    collision.obj.p.vy = -100;
                    sumaEnemigo();
                    if (this.p.reaparecer) {
                        var nuevo = new Q.EnemyVolador({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                            y_reaparicion: this.p.y_reaparicion, x: this.p.x_reaparicion, vy: this.p.velocidadY,
                            vx: this.p.velocidadX, y: this.p.y_reaparicion, velocidadX: this.p.velocidadX, velocidadY: this.p.velocidadY, horizontal: this.p.horizontal,
                            maxX: this.p.maxX, maxY: this.p.maxY, minX: this.p.minX, minY: this.p.minY
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
                            stag.insert(nuevo);
                        }, 10000);
                    }
                    else this.destroy();
                }
                // Esto de aqui no se si funciona
                else if (collision.obj.isA("Player") && collision.obj.p.helicoptero) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    sumaEnemigo();
                    huevos = 0;
                    if (this.p.reaparecer) {
                        var nuevo = new Q.EnemyVolador({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                            y_reaparicion: this.p.y_reaparicion, x: this.p.x_reaparicion, vy: this.p.velocidadY,
                            vx: this.p.velocidadX, y: this.p.y_reaparicion, velocidadX: this.p.velocidadX, velocidadY: this.p.velocidadY, horizontal: this.p.horizontal,
                            maxX: this.p.maxX, maxY: this.p.maxY, minX: this.p.minX, minY: this.p.minY
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
                            stag.insert(nuevo);
                        }, 10000);
                    }
                    else this.destroy();
                    collision.obj.destroy();
                }
                else {
                    this.p.vx = this.p.velocidadX;
                    this.p.vy = this.p.velocidadY;
                }
            });
        },
        step: function (dt) {
            if (!this.p.horizontal) { //Movimiento vertical
                if (this.p.y >= this.p.maxY) {
                    this.p.vy = - this.p.velocidadY;
                }
                else if (this.p.y <= this.p.minY) {
                    this.p.vy = this.p.velocidadY;
                }
            }
            else { //Movimiento horizontal
                if (this.p.x >= this.p.maxX) {
                    this.p.vx = - this.p.velocidadX;
                }
                else if (this.p.x <= this.p.minX) {
                    this.p.vx = this.p.velocidadX;
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
                disparado: false,
            });
            this.p.gravityY = 0;
            this.add('2d, tween');
            this.on("bump.left,bump.right", function (collision) {
                if (!collision.obj.isA("Player") && !collision.obj.isA("EnemyTerrestre")
                    && !collision.obj.isA("EnemyVolador") && this.p.disparado) {
                    this.destroy();
                    huevos = 0;
                }
            });

        }
    });

    //Placa de transformacion en helicoptero
    Q.Sprite.extend("Placa_helicoptero", {
        init: function (p) {
            this._super(p, {
                sheet: "placa_helicoptero",
                x: 0,
                y: 0,
            });
            this.p.gravityY = 0;
            this.add('2d, tween');
            this.on("bump.left,bump.right, bump.bottom, bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    collision.obj.p.helicoptero = true;
                    this.destroy();
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
                x: 410, //x donde aparecerá
                jumpSpeed: -400,
                y: 700, //y donde aparecerá,
                atancando: false,
                boost: false,
                helicoptero: false
            });
            this.add('2d, platformerControls, tween, animation');
            if (!this.p.helicoptero) {
                Q.input.on("down", this, "attack");
                Q.input.on("up", this, "boost");
                Q.input.on("fire", this, "disparo");
            }
            this.on("stopAttack", function () {
                this.p.atancando = false;
            });
            this.on("stopAttack_left", function () {
                this.p.atancando = false;
                this.play("stand_left_corrector");
            });
        },
        boost: function () {
            if (!this.p.helicoptero) {
                if (!this.p.boost && this.p.vy == 0) {
                    this.p.sheet = "yoshi_impulso";
                    this.play("impulso_right");
                    this.p.gravity = 1;
                    this.p.boost = true;
                    Q.audio.play("YoshiSalto.mp3");
                }
                else if (this.p.boost && this.p.vy != 0) {
                    Q.audio.play("YoshiFlotar.mp3");
                    this.p.sheet = "yoshi_volando";
                    this.play("volando_" + this.p.direction);
                    this.p.vy = -200;
                    this.p.gravity = 0.3;
                    this.p.boost = false;
                }
                else{
                    Q.audio.play("YoshiSalto.mp3");
                }
            }
            else {
                this.p.y -= 2;
            }
        },
        disparo: function () {
            console.log("disparo");
            if (this.p.helicoptero) {
                if (this.p.direction == "left")
                    var egg = new Q.Egg({ x: this.p.x - 20, y: this.p.y });
                else
                    var egg = new Q.Egg({ x: this.p.x + 20, y: this.p.y });
                this.stage.insert(egg);
                huevos += 1;
            }
            if (huevos > 0) {
                Q.audio.play("SonidoDispararHuevo.mp3");
                var items = this.stage.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].isA("Egg")) {
                        items[i]["p"]["disparado"] = true;
                        if (this.p.direction == "right") {
                            items[i]["p"]["x"] = this.p.x + 20;
                            items[i]["p"]["vx"] = 300;
                        }
                        else {
                            items[i]["p"]["x"] = this.p.x - 20;
                            items[i]["p"]["vx"] = -300;
                        }
                    }
                }
            }
            huevos = 0;
        },
        attack: function () {
            if (!this.p.helicoptero) {
                Q.audio.play("yoshi-tongue.mp3");
                this.p.atancando = true;
                var items = this.stage.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].isA("EnemyTerrestre") || items[i].isA("EnemyVolador")
                        || items[i].isA("Planta")) {

                        let medidas = items[i]["p"];
                        let x_ = Number(medidas["x"]);
                        let y_ = Number(medidas["y"]);
                        if (Math.abs(Number(this.p.x) -  Number(x_)) < 75 && Math.abs(Number(this.p.y) -  Number(y_)) < 20) {
                            if (items[i].isA("EnemyTerrestre") && items[i]["p"]["reaparecer"]) {
                                sumaEnemigo();
                                var nuevo = new Q.EnemyTerrestre({
                                    sprite: items[i]["p"]["sprite"], sheet: items[i]["p"]["sheet"],
                                    reaparecer: items[i]["p"]["reaparecer"], x_reaparicion: items[i]["p"]["x_reaparicion"],
                                    y_reaparicion: items[i]["p"]["y_reaparicion"], y_caida: items[i]["p"]["y_caida"],
                                    x: items[i]["p"]["x_reaparicion"], vx: items[i]["p"]["velocidad"], vy: items[i]["p"]["vy"],
                                    y: items[i]["p"]["y_reaparicion"], darVuelta: items[i]["p"]["darVuelta"], velocidad: items[i]["p"]["velocidad"],
                                    x_vueltaMax: items[i]["p"]["x_vueltaMax"], x_vueltaMin: items[i]["p"]["x_vueltaMin"]
                                });
                                var stag = this.stage;
                                items[i].destroy();
                                window.setTimeout(function () {
                                    stag.insert(nuevo);
                                }, 10000);
                            }
                            else if (items[i].isA("EnemyVolador") && items[i]["p"]["reaparecer"]) {
                                sumaEnemigo();
                                var nuevo = new Q.EnemyVolador({
                                    sprite: items[i]["p"]["sprite"], sheet: items[i]["p"]["sheet"],
                                    reaparecer: items[i]["p"]["reaparecer"], x_reaparicion: items[i]["p"]["x_reaparicion"],
                                    y_reaparicion: items[i]["p"]["y_reaparicion"], x: items[i]["p"]["x_reaparicion"], vy: items[i]["p"]["velocidadY"], vx: items[i]["p"]["velocidadX"],
                                    y: items[i]["p"]["y_reaparicion"], velocidadX: items[i]["p"]["velocidadX"], velocidadY: items[i]["p"]["velocidadY"], horizontal: items[i]["p"]["horizontal"],
                                    maxX: items[i]["p"]["maxX"], maxY: items[i]["p"]["maxY"], minX: items[i]["p"]["minX"], minY: items[i]["p"]["minY"]
                                });
                                var stag = this.stage;
                                items[i].destroy();
                                window.setTimeout(function () {
                                    stag.insert(nuevo);
                                }, 10000);
                            }
                            else if (items[i].isA("Planta") && items[i]["p"]["reaparecer"]) {
                                sumaEnemigo();
                                var nuevo = new Q.Planta({
                                    sprite: items[i]["p"]["sprite"], sheet: items[i]["p"]["sheet"],
                                    reaparecer: items[i]["p"]["reaparecer"], x: items[i]["p"]["x"],
                                    y: items[i]["p"]["y_reaparicion"]
                                });
                                var stag = this.stage;
                                items[i].destroy();
                                window.setTimeout(function () {
                                    stag.insert(nuevo);
                                }, 10000);
                            }
                            else items[i].destroy();
                            if (huevos == 0) {
                                Q.audio.play("SonidoPonerHuevo.mp3");
                                this.stage.insert(new Q.Egg({ x: this.p.x - 20, y: this.p.y }));
                                //this.p.huevos += 1;
                                huevos = 1;
                            }
                        }
                    }

                }
                this.p.sheet = "yoshiAttack_right";
                this.play("attack_" + this.p.direction);
            }
            else {
                this.p.y += 2;
            }
        },
        step: function (dt) {
            if (huevos > 0) {
                var items = this.stage.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].isA("Egg") && !items[i]["p"]["disparado"]) {
                        if (this.p.direction == "right") {
                            items[i]["p"]["x"] = this.p.x - 15;
                            items[i]["p"]["y"] = this.p.y;
                        }
                        else {
                            items[i]["p"]["x"] = this.p.x + 15;
                            items[i]["p"]["y"] = this.p.y;
                        }
                    }
                }
            }
            if (this.p.y > 900 && (nivel == 1 || nivel == 3)) {
            	Q.clearStages();
                Q.stageScene("endLevel", 1, { label: "You Died" });
                if (nivel == 1) {
                    this.p.x = 430;
                    this.p.y = 700;
                }
                else if (nivel == 3) {
                    this.p.x = 350;
                    this.p.y = 650;
                }
                this.destroy();
            }
            else if (this.p.x > 300 && nivel == 2 && !this.p.helicoptero) {
            	Q.clearStages();
                Q.stageScene("endLevel", 1, { label: "You Died" });
                this.destroy();
            }
            else if (!this.p.atancando && !this.p.helicoptero) {
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
            else if (this.p.helicoptero) {
                console.log("HELICOPTERO");
                this.p.gravityY = 0.5;
                this.p.vy = 0;
                this.p.sheet = "yoshi_helicoptero";
                this.play("yoshi_helicoptero_" + this.p.direction);
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
            if (this.p.tiempo >= this.p.tCaida) {
                this.p.vy = 70;
            }
            if (this.p.y >= this.p.maxY) {
                this.p.tiempo = 0;
                this.p.vy = 0;
                this.p.y = this.p.y_origen;
            }
        }
    });

    //Ascensor
    Q.Sprite.extend("Ascensor", {
        init: function (p) {
            this._super(p, {
                sheet: "ascensor",
                x: 0,
                y: 0,
                vy: 0,
                minY: 0,
                max_Y: 0,
                velocidad: 0,
            });
            this.p.gravityY = 0;
            this.add('2d, tween');
            this.on("bump.left,bump.right,bump.bottom, bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                    if (this.p.y >= this.p.maxY) {
                        this.p.vy = 0;
                    }
                    else this.p.vy = this.p.velocidad;
                }
            });
        },
        step: function (dt) {
            if (this.p.y <= this.p.minY) {
                this.p.vy = 0;
            }
            else if (this.p.y >= this.p.maxY) {
                this.p.vy = - this.p.velocidad;
            }
        }
    });

    // Sumador de vidas
    Q.scene("sumaVidas", function (stage) {
        console.log("Entro en sumaVidas");
        // Contador de numero de vidas
        var label1 = stage.insert(new Q.UI.Text({ x: Q.width / 2 - 440, y: 15, scale: 1.5, label: "0", color: "rgba(255,164,032,1)" }));
        Q.state.on("change.totalVidas", this, function (vida) {
            label1.p.label = "" + vida;
            vidas++;
        });
        // Imagen
        stage.insert(new Q.UI.Button({
            asset: 'vida.png',
            x: Q.width / 2 - 500,
            scale: 1.5,
            y: 35
        }, function () {
            this.p.angle += 90;
        }));
    });
    // Suma monedas al contador
    Q.scene("sumaMonedas", function (stage) {
        console.log("Entro en sumaMonedas");
        // Esto es el contador que ira cambiando
        var label2 = stage.insert(new Q.UI.Text({ x: 220, y: 15, scale: 1.5, label: "0", color: "rgba(255,164,032,1)" }));

        Q.state.on("change.totalMonedas", this, function (coin) {
            label2.p.label = "" + coin;
            numeroMonedas[nivel]++;
        });
        // La imagen 
        stage.insert(new Q.UI.Button({
            asset: 'moneda.png',
            x: 180,
            scale: 1.5,
            y: 35
        }, function () {
            this.p.angle += 90;
        }));
    });

    // Sumador de enemigosMuertos
    Q.scene("sumaEnemigosMuertos", function (stage) {
        console.log("Entro en sumaEnemigos");
        // Contador de numero de enemigosMuertos
        var label1 = stage.insert(new Q.UI.Text({ x: 360, y: 20, scale: 1.5, label: "0", color: "rgba(255,164,032,1)" }));
        Q.state.on("change.totalEnemigosMuertos", this, function (die) {
            label1.p.label = "" + die;
            enemigosMuertos++;
        });
        // Imagen
        stage.insert(new Q.UI.Button({
            asset: 'logoEnemigosVencidos.png',
            x: 300,
            scale: 1.5,
            y: 40
        }, function () {
            this.p.angle += 90;
        }));
    });

    // Pinta tiempo
    Q.scene("pintaTiempo", function (stage) {
        console.log("pintaTiempo");
        // Contador de numero de enemigosMuertos
        var label1 = stage.insert(new Q.UI.Text({ x: 480, y: 20, scale: 1.5, label: "0", color: "rgba(255,164,032,1)" }));
        Q.state.on("change.totalTiempo", this, function (die) {
            label1.p.label = "" + die;

        });
        // Imagen
        stage.insert(new Q.UI.Button({
            asset: 'timer.png',
            x: 420,
            scale: 1.5,
            y: 40
        }, function () {
            this.p.angle += 90;
        }));
    });

    // Moneda
    Q.Sprite.extend("Moneda", {
        init: function (p) {
            this._super(p, {
                sheet: "moneda",
                puntos: 2,
                sensor: true,
                tocada: false
            });
            this.p.gravityY = 0;
            this.add('2d, tween');
            this.on("bump.left,bump.right,bump.bottom, bump.top", function (collision) {
                if (collision.obj.isA("Player") && !this.p.tocada) {
                    Q.audio.play("MusicaMoneda.mp3");
                    Q.state.inc("totalMonedas", 1);
                    this.p.tocada = true;
                    this.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("MusicaMoneda.mp3");
                    collision.obj.destroy();
                }
            });

        }
    });

    //Planta
    Q.Sprite.extend("Planta", {
        init: function (p) {
            this._super(p, {
                sheet: "planta1",
                sprite: "planta_animations",
                vx: 0,
                vy: 0,
                tiempo: 5,
                reaparecer: true,
                izquierda: true,
                movimiento: true
            });
            this.add('2d, tween, animation');
            //Si le tocan por la izquierda, derecha o por debajo y es el player, pierde
            this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    sumaEnemigo();
                    huevos = 0;
                    if (this.p.reaparecer) {
                        var nuevo = new Q.Planta({
                            sprite: this.p.sprite, sheet: this.p.sheet, reaparecer: this.p.reaparecer, x: this.p.x, y: this.p.y
                        });
                        var stag = this.stage;
                        this.destroy();
                        window.setTimeout(function () {
                            stag.insert(nuevo);
                        }, 10000);
                    }
                    else this.destroy();
                    collision.obj.destroy();
                }
            });
        },
        step: function (dt) {
            this.p.tiempo += dt;
            if (this.p.movimiento) {
                if (this.p.tiempo >= 5) {
                    if (this.p.izquierda) {
                        this.play("run_right");
                        this.p.izquierda = false;
                    }
                    else {
                        this.play("run_left");
                        this.p.izquierda = true;
                    }
                    this.p.tiempo = 0;
                }
            }
            else {
                this.p.gravity = 0;
                if (!this.p.izquierda) this.play("run_left");
                else this.play("run_right");
            }
        }
    });

    //Enemy(Chomp)
    Q.Sprite.extend("Chomp", {
        init: function (p) {
            this._super(p, {
                sprite: "chomp_animations",
                sheet: "chomp1", //Obligatorio
                vx: 0, //Obligatorio
                vy: 0,
                reaparecer: true, //Obligatorio
                x_reaparicion: 0, //Obligatorio si reaparicion = true
                y_reaparicion: 0, //Obligatorio si reaparicion = true
                y_caida: 0, //Obligatorio si reaparicion = true
                darVuelta: false,
                x_vueltaMax: 0, //Obligatorio si darVuelta = true
                x_vueltaMin: 0,	//Obligatorio si darVuelta = true
                velocidad: 0, //Obligatorio si darVuelta = true
                golpes: 0
                //x e y también son obligatorias
            });
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right,bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    huevos = 0;
                    this.p.golpes++;
                    if (this.p.golpes == 1) {
                        this.p.sheet = "chomp2";
                    }
                    else if (this.p.golpes == 2) {
                        this.p.sheet = "chomp3";
                    }
                    else if (this.p.golpes == 3) {
                        sumaEnemigo();
                        if (this.p.reaparecer) {
                            var nuevo = new Q.Chomp({
                                sprite: this.p.sprite, sheet: "chomp1", reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                                y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion,
                                vx: this.p.velocidad, y: this.p.y_reaparicion, darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                                x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin
                            });
                            var stag = this.stage;
                            this.destroy();
                            window.setTimeout(function () {
                                stag.insert(nuevo);
                            }, 10000);
                        }
                        else this.destroy();
                    }
                    collision.obj.destroy();
                }
            });
            //Si le salta encima el player lo mata
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                	collision.obj.p.vy = -100;
                    this.p.golpes++;
                    if (this.p.golpes == 1) {
                        this.p.sheet = "chomp2";
                    }
                    else if (this.p.golpes == 2) {
                        this.p.sheet = "chomp3";
                    }
                    else if (this.p.golpes == 3) {
                        sumaEnemigo();
                        if (this.p.reaparecer) {
                            var nuevo = new Q.Chomp({
                                sprite: this.p.sprite, sheet: "chomp1", reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                                y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion,
                                vx: this.p.velocidad, y: this.p.y_reaparicion, darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                                x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin
                            });
                            var stag = this.stage;
                            this.destroy();
                            window.setTimeout(function () {
                                stag.insert(nuevo);
                            }, 10000);
                        }
                        else this.destroy();
                    }
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    huevos = 0;
                    this.p.golpes++;
                    if (this.p.golpes == 1) {
                        this.p.sheet = "chomp2";
                    }
                    else if (this.p.golpes == 2) {
                        this.p.sheet = "chomp3";
                    }
                    else if (this.p.golpes == 3) {
                        sumaEnemigo();
                        if (this.p.reaparecer) {
                            var nuevo = new Q.Chomp({
                                sprite: this.p.sprite, sheet: "chomp1", reaparecer: this.p.reaparecer, x_reaparicion: this.p.x_reaparicion,
                                y_reaparicion: this.p.y_reaparicion, y_caida: this.p.y_caida, x: this.p.x_reaparicion,
                                vx: this.p.velocidad, y: this.p.y_reaparicion, darVuelta: this.p.darVuelta, velocidad: this.p.velocidad,
                                x_vueltaMax: this.p.x_vueltaMax, x_vueltaMin: this.p.x_vueltaMin
                            });
                            var stag = this.stage;
                            this.destroy();
                            window.setTimeout(function () {
                                stag.insert(nuevo);
                            }, 10000);
                        }
                        else this.destroy();
                    }
                    collision.obj.destroy();
                }
            });
        },
        step: function (dt) {
            if (this.p.vx > 0)
                this.play("run_right");
            else
                this.play("run_left");
            if (this.p.reaparecer) { //Reaparición si el enmigo se cae
                if (this.p.y >= this.p.y_caida) {
                    this.p.x = this.p.x_reaparicion;
                    this.p.y = this.p.y_reaparicion;
                }
            }
            if (this.p.darVuelta && !this.p.dandoVuelta) { //Movimiento cuando no hay obstaculos
                if (this.p.x >= this.p.x_vueltaMax) {
                    this.p.vx = - this.p.velocidad;
                }
                else if (this.p.x <= this.p.x_vueltaMin) {
                    this.p.vx = this.p.velocidad;
                }
            }
        }
    });

    // Letras Cargando
    Q.Sprite.extend("Carga", {
        init: function (p) {
            this._super(p, {
                sheet: "cargando",
                sprite: "carga_animations"
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
        },
        step: function (dt) {
            this.play("run_right");
        }
    });

    // Titulo
    Q.Sprite.extend("Titulo", {
        init: function (p) {
            this._super(p, {
                sheet: "titulo",
                sprite: "titulo_animations",
                tiempo: 0,
                animacion: false
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
        },
        step: function (dt) {
            this.p.tiempo += dt;
            if (this.p.tiempo > 3 && !this.p.animacion) {
                this.p.animacion = true;
                this.play("run_right");
                this.p.tiempo = 0;
            }
            else if (this.p.tiempo > 2.5 && this.p.animacion) {
                this.play("stop");
                this.p.tiempo = 0;
                this.p.animacion = false;
            }
        }
    });

    // Legras Cargando
    Q.Sprite.extend("BebeMario", {
        init: function (p) {
            this._super(p, {
                sheet: "mario",
                sprite: "mario_animations",
                vy: 0,
                vx: 350
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
        },
        step: function (dt) {
            this.play("run_right");
            if (this.p.x > 1150) {

                if (nivel == 1) {
                    console.log("Paso por el nivel 1");
                    // Inicializamos los labels de los contadores que se mostraran por pantalla
                    Q.state.reset({ totalVidas: 0, totalMonedas: 0, totalEnemigosMuertos: 0, totalTiempo: 0 });

                    Q.stageScene("level1");


                    // Creacion del contador de vidas                  
                    Q.stageScene("sumaVidas", 5);
                    var i = 0, contador = vidas;
                    while (i < contador) {
                        Q.state.inc("totalVidas", 1);
                        i++;
                    }
                    vidas = contador;
                    // Creacion del contador de vidas 
                    Q.stageScene("sumaMonedas", 2);

                    // Creacion del contador de enemigosMuertos
                    Q.stageScene("sumaEnemigosMuertos", 3);


                    // Creacion del tiempo
                    Q.stageScene("pintaTiempo", 4);
                }
                else if (nivel == 2) {
                    Q.stageScene("level2");
                    // Inicializamos los labels de los contadores que se mostraran por pantalla
                    Q.state.reset({ totalVidas: 0, totalMonedas: 0, totalEnemigosMuertos: 0 });
                    console.log("Cambio de nivel 2");
                    // Inicializo las vidas
                    Q.stageScene("sumaVidas", 5);
                    var i = 0, contador = vidas;
                    while (i < contador) {
                        Q.state.inc("totalVidas", 1);
                        i++;
                    }
                    vidas = contador;

                    // Inicializo las monedas
                    Q.stageScene("sumaMonedas", 2);
                    console.log("Numero de monedas: " + numeroMonedas[nivel]);

                    var i = nivel, monedas = 0;
                    --i;
                    // Miro las monedas de los anteriores niveles
                    while (i < nivel) {
                        monedas += numeroMonedas[i];
                        i++;
                    }
                    i = 0;
                    while (i != monedas) {
                        Q.state.inc("totalMonedas", 1);
                        i++;
                    }
                    numeroMonedas[nivel] = monedas;
                    console.log("Numero de monedas: " + numeroMonedas[nivel]);
                    // Creacion del contador de enemigosMuertos
                    enemigosMuertos = 0;
                    Q.stageScene("sumaEnemigosMuertos", 3);
                     // Inicio de la contador de tiempo
                     Q.stageScene("pintaTiempo", 4);

                }
                else if (nivel == 3) {
                    Q.stageScene("level3");
                    // Inicializamos los labels de los contadores que se mostraran por pantalla
                    Q.state.reset({ totalVidas: 0, totalMonedas: 0, totalEnemigosMuertos: 0 });
                    console.log("Cambio de nivel 3");
                    // Inicializo las vidas
                    Q.stageScene("sumaVidas", 1);
                    var i = 0, contador = vidas;
                    while (i < contador) {
                        Q.state.inc("totalVidas", 1);
                        i++;
                    }
                    vidas = contador;

                    // Inicializo las monedas
                    Q.stageScene("sumaMonedas", 2);
                    console.log("Numero de monedas: " + numeroMonedas[nivel]);

                    var i = nivel, monedas = 0;
                    --i;
                    // Miro las monedas de los anteriores niveles
                    //while (i < nivel) {
                    monedas += numeroMonedas[i];
                    i++;
                    // }
                    i = 0;
                    while (i != monedas) {
                        Q.state.inc("totalMonedas", 1);
                        console.log("Veces");
                        i++;
                    }
                    numeroMonedas[nivel] = monedas;
                    console.log("Numero de monedas: " + numeroMonedas[nivel]);
                    // Creacion del contador de enemigosMuertos
                    enemigosMuertos = 0;
                    Q.stageScene("sumaEnemigosMuertos", 3);
                     // Inicio de la contador de tiempo
                     Q.stageScene("pintaTiempo", 4);
                }
            }
        }
    });

    //Lanzadores
    Q.Sprite.extend("Lanzadores", {
        init: function (p) {
            this._super(p, {
                sheet: "",
                sprite: "",
                tiempo: 0,
                lanzar: 0,
                vx: 0,
                vy: 0,
                horizontal: true,
                sheetP: "",
                spriteP: ""
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
        },
        step: function (dt) {
            this.p.tiempo += dt;
            if (this.p.tiempo > this.p.lanzar) {
                if (this.p.horizontal) {
                    this.stage.insert(new Q.Proyectiles({ sheet: this.p.sheetP, sprite: this.p.spriteP, y: this.p.y, x: this.p.x - 30, vx: -100, velocidadX: -100 }));
                    this.stage.insert(new Q.Proyectiles({ sheet: this.p.sheetP, sprite: this.p.spriteP, y: this.p.y, x: this.p.x + 30, vx: 100, velocidadX: 100 }));
                }
                else this.stage.insert(new Q.Proyectiles({ sheet: this.p.sheetP, sprite: this.p.spriteP, y: this.p.y + 50, x: this.p.x, vy: 100, velocidadY: 100 }));
                this.p.tiempo = 0;
            }
        }
    });

    // Proyectiles
    Q.Sprite.extend("Proyectiles", {
        init: function (p) {
            this._super(p, {
                sheet: "",
                sprite: "",
                vx: 0,
                vy: 0,
                velocidadX: 0,
                velocidadY: 0
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
            this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                    this.destroy();
                }
                else if (collision.obj.isA("Egg")) {
                    Q.audio.play("SonidoAlMatarEnemigosConHuevo.mp3");
                    this.p.vx = this.p.velocidadX;
                    this.p.vy = this.p.velocidadY;
                }
                else this.destroy();
            });
        },
        step: function (dt) {
            if (this.p.vx < 0) this.play("run_left");
            else if (this.p.vx > 0) this.play("run_right");
        }
    });

    // Barrera
    Q.Sprite.extend("Barrera", {
        init: function (p) {
            this._super(p, {
                sheet: "barrera",
                sprite: "",
                angle: 0,
                velocidad: 0
            });
            this.p.gravityY = 0;
            this.add('2d, aiBounce, animation');
            this.on("bump.left,bump.right", function (collision) {
                if (collision.obj.isA("Player")) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
            });
            this.on("bump.top", function (collision) {
                if (collision.obj.isA("Player")) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else this.p.vy = this.p.velocidad;
            });
            this.on("bump.bottom", function (collision) {
                if (collision.obj.isA("Player")) {
                	Q.clearStages();
                    Q.stageScene("endLevel", 1, { label: "You Died" });
                    collision.obj.destroy();
                }
                else this.p.vy = -this.p.velocidad;
            });
        },
        step: function (dt) {
            this.p.angle += 1;
        }
    });

    // Funcion que gestiona la suma de enemigosMuertos y las vidas
    function sumaEnemigo() {
        // No hemos llegado al maximo para sumar una vida
        if (enemigosMuertos != enemigosParaVida) {
            Q.state.inc("totalEnemigosMuertos", 1);
        }
        // Caso en el que hemos llegado al numero para sumar una vida
        else {
            // Reinicio los contadores
            Q.state.dec("totalEnemigosMuertos", enemigosMuertos);
            enemigosMuertos = 0;

            // Para que el jugador no se infle a vidas
            if (vidas < maxVida) {
                // Le sumo una vida
                Q.state.inc("totalVidas", 1);
            }


        }
    }

    // Clase que pinta una foto pasada por sheet
    Q.Sprite.extend("fotoSimple", {
        init: function (p) {
            this._super(p, {
                sheet: "",
                animacion: false
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
        },
        step: function (dt) {
            if (this.p.animacion) this.play("run_right");
        }
    });

    // Clase de tiempo
    Q.Sprite.extend("tiempo", {
        init: function (p) {
            this._super(p, {
                parar: false
            });
            this.p.gravityY = 0;
            this.add('2d, tween, animation');
        },
        step: function (dt) {
            if(!this.p.parar){
                tiempo -= dt;
                if (tiempo > 0) {
                    Q.state.set("totalTiempo", Math.round(tiempo));
                }
    
                else {
                    Q.clearStages();
                    Q.stageScene("endLevel");
                }
            }
        }
    });

}
