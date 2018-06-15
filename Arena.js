Arena = function(game) {
    // Appel des variables nécéssaires
    this.game = game;
    var scene = game.scene;

    // Création de notre lumière principale
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Ajoutons un sol pour situer la sphere dans l'espace
    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // The first parameter can be set to null to load all meshes and skeletons
    // BABYLON.SceneLoader.Append("./obj/", "Plan.obj", scene, function (scene) {
    //     // do something with the scene

    // });

    // The first parameter can be set to null to load all meshes and skeletons
    BABYLON.SceneLoader.ImportMesh(null, "./obj/", "Plan.obj", scene, function (meshes, particleSystems, skeletons) {
        // do something with the meshes and skeletons
        // particleSystems are always null for glTF assets
        for(mesh of meshes){
            console.log(mesh);
            mesh.checkCollisions = true;
        }

    });
};