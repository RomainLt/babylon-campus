Player = function(game, canvas) {
    // La scène du jeu
    this.scene = game.scene;

    // Initialisation de la caméra
    this._initCamera(this.scene, canvas);
    
};

Player.prototype = {
    _initCamera : function(scene, canvas) {
        // On crée la caméra
        this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(-30, 1, -20), scene);

        // On demande à la caméra de regarder au point zéro de la scène
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // On affecte le mouvement de la caméra au canvas
        this.camera.attachControl(canvas, true);

        this.camera.applyGravity = true;
        this.camera.ellipsoid = new BABYLON.Vector3(0.5, 0.5, 0.5);
        this.scene.collisionsEnabled = true;
        this.camera.checkCollisions = true;
    }
};