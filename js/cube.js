var camera, scene, renderer;
var cube, plane;
var rotation = 1;
			
init();
animate();

// Фунция инициализации визуализатора, сцены, плоскости, куба, света сцены, камеры.
function init() {
	
	// Создаем и настриваем визуализатор
	renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor(0xEEEEEE);
		renderer.shadowMapEnabled = true;
		document.body.appendChild( renderer.domElement );
	
	// Создаем сцену
	scene = new THREE.Scene();
	
	// Создаем и настраиваем освещения
	var spotLight = new THREE.SpotLight( 0xFFFFFF );
		spotLight.position.set( -400, 600, -100 );
		spotLight.castShadow = true;
		scene.add(spotLight);
	
	// Создаем и настраиваем плоскость для тени
	var planeGeometry = new THREE.PlaneBufferGeometry(800,800);
	var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xEEEEEE});
	plane = new THREE.Mesh(planeGeometry,planeMaterial);
		plane.receiveShadow = true;		   
		plane.rotation.x=-0.5*Math.PI;
		plane.position.x = 300;
		plane.position.y = 0;
		plane.position.z = 0;
		scene.add(plane);
	
	// Создаем и настраиваем куб
	var cubeGeometry = new THREE.BoxGeometry(200,200,200);
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x0ca745 });
	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.castShadow = true;
		cube.position.y = 200;
		scene.add(cube);
	
	// Создаем и настраиваем камеру
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight , 1, 1000);
		camera.position.x = -300;
		camera.position.y = 400;
		camera.position.z = 150;
		camera.lookAt(cube.position);
	
	// Следим за изменением размера окна просмотра
	window.addEventListener( 'resize', onWindowResize, false );

}

// Функция настройки камеры и визуализатора при изменении размера окна просмотра
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

// Функция анимации куба
function animate() {

	requestAnimationFrame( animate );

	cube.rotation.y += (0.02 * rotation);

	renderer.render( scene, camera );
}

// Функция установки направления вращения
function setRotation() {
	
	rotation = ( rotation == 1 ) ? -1 : 1;
	
}