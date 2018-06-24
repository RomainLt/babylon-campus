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

  var door = BABYLON.MeshBuilder.CreateBox("box", { height: 2, width: 1, size: 0.1 }, scene)
  door.position = new BABYLON.Vector3(-30, 1, -20)
  //   var hinge = BABYLON.MeshBuilder.CreateBox("hinge", {}, scene)
  var hinge = new BABYLON.TransformNode("root")
  hinge.parent = scene
  hinge.position = new BABYLON.Vector3(-29.5, 1, -15)
  door.position = new BABYLON.Vector3(-30, 1, -20)
  var matDoor = new BABYLON.StandardMaterial("matdoor", scene)
  matDoor.diffuseColor = new BABYLON.Color3(0.1, 0.1, 1)
  door.material = matDoor
  door.checkCollisions = true
  door.actionManager = new BABYLON.ActionManager(scene)
  door.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      {
        trigger: BABYLON.ActionManager.OnPickTrigger,
        parameter: "r"
      },
      function() {
        var pickResult = scene.pick(scene.pointerX, scene.pointerY)
        // console.log(pickResult.hit)
        if (pickResult.hit) {
          var frameRate = 20
          var sweep = new BABYLON.Animation(
            "sweep",
            "rotation.y",
            frameRate,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
          )

          var sweep_keys = []

          sweep_keys.push({
            frame: 0,
            value: 0
          })

          sweep_keys.push({
            frame: 3 * frameRate,
            value: 0
          })

          sweep_keys.push({
            frame: 5 * frameRate,
            value: Math.PI / 3
          })

          sweep_keys.push({
            frame: 13 * frameRate,
            value: Math.PI / 3
          })

          sweep_keys.push({
            frame: 15 * frameRate,
            value: 0
          })

          sweep.setKeys(sweep_keys)
          scene.beginDirectAnimation(hinge, [sweep], 0, 25 * frameRate, false)
        }
      }
    )
  )
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0)

  var cafet = BABYLON.MeshBuilder.CreateBox("box", { height: 0.1, width: 0.1, size: 0.1 }, scene)
  cafet.position = new BABYLON.Vector3(-15, -1, -28)
  var soundCafet = new BABYLON.Sound("cafet", "audio/bar.wav", scene, null, { loop: true, autoplay: true });
  soundCafet.volume = 1
  soundCafet.attachToMesh(cafet)


  // The first parameter can be set to null to load all meshes and skeletons
  BABYLON.SceneLoader.ImportMesh(null, "./obj/", "Plan2.obj", scene, function(meshes, particleSystems, skeletons) {
    // do something with the meshes and skeletons
    // particleSystems are always null for glTF assets
    for (mesh of meshes) {
        // console.log(mesh)
      if(mesh.name.includes("collision") || mesh.name.includes("sol") || mesh.name.includes("Plane")){
        mesh.checkCollisions = true
      }
      mesh.scaling.x = -1
      mesh.scaling.z = -1
    //   mesh.actionManager = new BABYLON.ActionManager(scene)
    //   mesh.actionManager.registerAction(new BABYLON.PlaySoundAction(BABYLON.ActionManager.OnPickTrigger, audio))
    }
  })
}
