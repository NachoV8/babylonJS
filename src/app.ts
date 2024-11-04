import {Engine, Scene, FreeCamera, Vector3, Color3, HemisphericLight, MeshBuilder, ArcRotateCamera, PointLight, DirectionalLight, SpotLight, SceneLoader, StandardMaterial, WebXRCamera, WebXRSessionManager, AxesViewer} from "@babylonjs/core";
import "@babylonjs/loaders";
 
 
class App {
    constructor() {
    let canvas = document.createElement("canvas");
    
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id="renderCanvas";
    document.body.appendChild(canvas);
 
    let engine = new Engine(canvas, true);
    let scene = this.CreateScene(engine, canvas);
 
    engine.runRenderLoop(() => {
        scene.render();
    });
 
    window.addEventListener("resize", () => {
        engine.resize;
    })
 
    }
 
    CreateScene(engine: Engine, canvas : HTMLCanvasElement): Scene {
        let scene = new Scene(engine);
        // let camera = new FreeCamera("camara1", new Vector3(0, 0, 0), scene);
        let camera = new ArcRotateCamera("camara1", 0, Math.PI/2, 1, new Vector3(0, 15, -20), scene);

        camera.attachControl(canvas, true);
        // camera.position = new Vector3(0, 25, -15);
        camera.setTarget(new Vector3(0, 15, 30));

        let ground = MeshBuilder.CreateGround("gd", {width:200, height:200, subdivisions:2}, scene);
        ground.position = new Vector3(0,0,0);
 
        const xr =  scene.createDefaultXRExperienceAsync({
            floorMeshes: [ground],
            optionalFeatures: true,
        })

        // const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        // scene.ambientColor = new Color3(0.2, 0.2, 1.0);


    // Figuras

        // let box = MeshBuilder.CreateBox("box", {height:0.5, width: 0.5, depth: 0.5}, scene);
        let box = MeshBuilder.CreateBox("box", {size: 0.75}, scene);
        box.position = new Vector3(1, 4, 3);

        // let sphere = MeshBuilder.CreateSphere("sphere", {diameter:0.5, diameterX:0.5}, scene);
        // sphere.position = new Vector3(-1, 3, 0);

        // let cone = MeshBuilder.CreateCylinder("cone", {diameterTop:0.5, diameterBottom: 0.5, tessellation: 100, height: 0.5}, scene);
        // cone.position = new Vector3(0, 3, 0);

        // let plano = MeshBuilder.CreatePlane("plano", {height:0.5, width: 0.5}, scene);
        // plano.position = new Vector3(1, 3, 0);

        // let ground = MeshBuilder.CreateGround("gd", {height:100, width: 100, subdivisions: 4}, scene);
        // ground.position = new Vector3(0, 0, 0);

        // let capsula = MeshBuilder.CreateCapsule("cap", {orientation:Vector3.Up(), radius: 0.25, height: 0.75}, scene);
        // capsula.position = new Vector3(2, 3, 0);

        // let disc = MeshBuilder.CreateDisc("disc", {radius:0.25, arc:0.85}, scene);
        // disc.position = new Vector3( -1, 5, 0);

        // let donut = MeshBuilder.CreateTorus("donut", {diameter:0.5, thickness: 0.15, tessellation: 20}, scene);
        // donut.position = new Vector3(1, 5, 0);

        // let abst = MeshBuilder.CreateTorusKnot("abst", {radius:0.25, tube: 0.025, radialSegments: 100, tubularSegments: 32, p: 1, q: 4}, scene);
        // abst.position = new Vector3(0, 7, 0);

        // let groundHm = MeshBuilder.CreateGroundFromHeightMap("ft", "./images.jpg", {height:1, width: 5 , subdivisions: 100, minHeight: 0, maxHeight: 1}, scene);
        // groundHm.position = new Vector3( 6, 3, 0);


    // Añadir líneas de los ejes
        const axesViewer = new AxesViewer(scene);
        axesViewer.scaleLines = 5; // Ajusta el tamaño de los ejes según lo necesites




    // Materiales

        let redMat = new StandardMaterial("redMat", scene);
        let trasnparentMat = new StandardMaterial("trasnsparentMat", scene); 

        trasnparentMat.diffuseColor = new Color3(0, 0, 4);
        trasnparentMat.alpha = 0.2;

        // box.material = redMat;



    //Movimienteo de objetos

        // scene.onBeforeRenderObservable.add( () => {
        //     box.position.x += 0.001 * scene.deltaTime;
        //     box.rotation.y += 0.001 * scene.deltaTime; // Sirve para rotar el objeto sobre un eje
        //     box.scaling.z += 0.001 * scene.deltaTime; //Sirve para deformar la figura
        // });

        

        //Iluminación

        // let light = new PointLight("pointLight", new Vector3(0, 10, -5), scene);
        let light = new DirectionalLight("direccionalLight", new Vector3(-5, -5, 25), scene);    
        // let light = new SpotLight("spotLight", new Vector3(-50, 40, 32), new Vector3(2, -2, 0), Math.PI / 2, 50,  scene);
        // let light = new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);

        // light.diffuse = new Color3(0, 0.8, 0);
        //light.specular = new Color3(0.9, 0, 0);


        // Importacion de modelos 3D

        SceneLoader.Append("../modelos/", "DIC3d.obj", scene, (importedScene) => { 
            importedScene.meshes.forEach(mesh => {


                // Escala solo los meshes asociados a "DIC3d.obj"
                if (mesh.name.includes("mm1")) {  // Asegúrate de que el nombre del mesh contiene "DIC3d"
                    mesh.scaling = new Vector3(0.1, 0.1, 0.1); // Ajusta el tamaño
                    mesh.position = new Vector3(0, -2.2, 60); // Ajusta la posición si es necesario
                    mesh.rotation = new Vector3(Math.PI / -2, 2.5, 5); // Rotación en el eje X (ajusta según el ángulo necesario)

                }
                console.log(mesh.name); // Verifica los nombres de los meshes cargados para asegurarte de que estás afectando solo los que deseas
            });
        
            console.log("Modelo cargado correctamente");
        }, null, (scene, message) => { 
            console.error("Error al cargar el modelo:", message);
        });

            // SceneLoader.ImportMesh("", "../modelos/aws_logo.glb", "",  scene, function (meshes) {
            //     // Supongamos que el primer mesh es el que quieres escalar
            //     const mesh = meshes[0];
            
            //     // Ajustar la escala del modelo (ejemplo: aumentar 2x)
            //     mesh.scaling = new Vector3(-1000, 1000, 1000); // Escala uniforme
            //     // O puedes escalar individualmente en cada eje
            //     // mesh.scaling = new BABYLON.Vector3(2, 1, 1); // Escala en X, Y y Z
            // });
            

        return scene;
    }
}
 
new App()