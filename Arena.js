Arena = function(game) {
  // Appel des variables nécéssaires
  this.game = game
  var scene = game.scene

  // Création de notre lumière principale
  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene)
  var light1 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-50, -100, -5), scene)
  light1.intensity = 5
  var light2 = new BABYLON.PointLight("pointLight2", new BABYLON.Vector3(50, 100, 5), scene)
  // Ajoutons un sol pour situer la sphere dans l'espace
  //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  // Ajoutons un sol pour situer la sphere dans l'espace
  //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

  var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene)
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene)
  skyboxMaterial.backFaceCulling = false
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene)
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
  skybox.material = skyboxMaterial
  var audio = new Audio("./audio/windows.wav")

  var porte = BABYLON.MeshBuilder.CreateBox("porte", { height: 3.5, width: 1, depth: 0.1 }, scene)

  // var porte = BABYLON.Mesh.CreateBox("porte", 8.0, scene);
  porte.position = new BABYLON.Vector3(26, 0.5, 15)
  porte.setPivotPoint(new BABYLON.Vector3(0.4, 0, 0))
  var matPorte = new BABYLON.StandardMaterial("matPorte", scene)
  matPorte.diffuseColor = new BABYLON.Color3(0.5, 0.1, 0)
  porte.material = matPorte

  //animation porte
  var animationPorte = new BABYLON.Animation(
    "ouverturePorte",
    "rotation.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
  )
  var keys = []

  //At the animation key 0, the value of scaling is "1"
  keys.push({
    frame: 0,
    value: 0
  })

  //At the animation key 20, the value of scaling is "0.2"
  keys.push({
    frame: 25,
    value: 1.6
  })

  //At the animation key 100, the value of scaling is "1"
  /* keys.push({
          frame: 50,
          value: 0
      });*/
  animationPorte.setKeys(keys)
  porte.animations = []
  porte.animations.push(animationPorte)
  porte.actionManager = new BABYLON.ActionManager(scene)
  porte.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      {
        trigger: BABYLON.ActionManager.OnPickTrigger,
        parameter: "r"
      },
      function() {
        animation = scene.beginAnimation(porte, 0, 25, false)
      }
    )
  )
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0)

  var cafet = BABYLON.MeshBuilder.CreateBox("box", { height: 0.1, width: 0.1, size: 0.1 }, scene)
  cafet.position = new BABYLON.Vector3(-15, -1, -28)
  var soundCafet = new BABYLON.Sound("cafet", "audio/bar.wav", scene, null, { loop: true, autoplay: true })
  soundCafet.volume = 1
  soundCafet.attachToMesh(cafet)

  // The first parameter can be set to null to load all meshes and skeletons
  BABYLON.SceneLoader.ImportMesh(null, "./obj/", "Plan2.obj", scene, function(meshes, particleSystems, skeletons) {
    // do something with the meshes and skeletons
    // particleSystems are always null for glTF assets
    for (mesh of meshes) {
      // console.log(mesh)
      if (mesh.name.includes("collision") || mesh.name.includes("sol") || mesh.name.includes("Plane")) {
        mesh.checkCollisions = true
      }
      mesh.scaling.x = -1
      mesh.scaling.z = -1
      //   mesh.actionManager = new BABYLON.ActionManager(scene)
      //   mesh.actionManager.registerAction(new BABYLON.PlaySoundAction(BABYLON.ActionManager.OnPickTrigger, audio))
    }
  })
}
