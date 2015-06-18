var scene, camera, renderer;

// inicializa os objetos
init();

// loop de animação
animate();

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 20000);

  // cria o canvas para exibir a cena renderizada
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight);

  // define posição da camera (x,y,z) e aonde ela est apontando
  camera.position.set(1,2,20);
  // ojga o renderer (canvas) no html
  document.body.appendChild(renderer.domElement);

  // adicionando o personagem
  var personagemTextura = new THREE.ImageUtils.loadTexture('img/stand/1.png');
  var personagemSprite = new THREE.SpriteMaterial ({map: personagemTextura, useScreenCoordinates: false, fog: true, color: 0xffffff});
  var sprite = new THREE.Sprite(personagemSprite);
  sprite.position.set(0,1.5,0);
  sprite.scale.set(1,4,1);
  scene.add(sprite);

  // adicionando o chão
  var floorTexture = new THREE.ImageUtils.loadTexture( 'img/background/checkerboard.jpg' );
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
  floorTexture.repeat.set( 10, 10 );
  var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
  var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  // adicionando o fundo (de papel)
  var background = new THREE.ImageUtils.loadTexture( 'img/background/background.bmp');
  var crateMaterial = new THREE.SpriteMaterial( { map: background, useScreenCoordinates: false, color: 0xffffff } );
  var sprite2 = new THREE.Sprite( crateMaterial);
  sprite2.position.set( 0,3, 0 );
  sprite2.scale.set( 20, 10, 1 ); // imageWidth, imageHeight
  scene.add( sprite2 );


  // Listener para pegar as ações do teclado
  document.addEventListener('keydown', function (evt) {
    //W
    if (evt.keyCode === 87 || evt.keyCode === 38) {
      sprite.position.z-=0.1;
      camera.position.z-=0.09;
    }
    //S
    if (evt.keyCode === 83 || evt.keyCode === 40) {
      sprite.position.z+=0.1;
      camera.position.z+=0.09;
    }
    //A
    if (evt.keyCode === 65 || evt.keyCode === 37) {
      sprite.position.x-=0.1;
      camera.position.x-=0.1;
      sprite2.position.x-=0.079;
    }
    //D
    if (evt.keyCode === 68 || evt.keyCode === 39) {
      sprite.position.x+=0.1;
      camera.position.x+=0.1;
      sprite2.position.x+=0.079;
    }
  });
}

function animate(){
  requestAnimationFrame(animate);
  render();
}

function render(){
  renderer.render(scene,camera);
}

