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
    Q.load("", function () {
        Q.scene("level1", function (stage) {
            Q.stageTMX("level.tmx", stage);
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
        Q.loadTMX("level.tmx", function () {
            Q.stageScene("mainMenu");
        });
        
    });
}
