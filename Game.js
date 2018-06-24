Game = function(canvasId) {
    // Canvas et engine défini ici
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var _this = this;
    
    // On initie la scène avec une fonction associé à l'objet Game
    this.scene = this._initScene(engine);

    var music = new BABYLON.Sound("Music", "./audio/BrokeForFree-SummerSpliffs.mp3", _this.scene, null, { loop: true, autoplay: true });
    music.volume = 0.2

    window.addEventListener("keydown", function(e) {
        switch (e.keyCode) {
          case 77: // m
            if(music.isPaused){
                music.play()
            }else{
                music.pause()
            }
            break
        }
    });

    var _player = new Player(_this, canvas);
    var _arena = new Arena(_this);
    
    // Permet au jeu de tourner
    engine.runRenderLoop(function () {
        _this.scene.render();
    });

    // Ajuste la vue 3D si la fenetre est agrandi ou diminué
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);

};

Game.prototype = {
    // Prototype d'initialisation de la scène
    _initScene : function(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor=new BABYLON.Color3(0,0,0);
        return scene;
    }
};

// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
    new Game('renderCanvas');
}, false);