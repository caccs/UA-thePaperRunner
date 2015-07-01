  var scene, camera, renderer;
  // animaçãod o personagem
  var animation;
  var clock = new THREE.Clock();

  // variaveis do personagem
  var personagemPrincipalSprite;
  var esquerda, direita;


  var cenarioBackground;

  var monstros = [];
  var objetos = [];

  var velocity = {
    x: 0,
    y: 0
  }

  var isJump = true;

  // localização do ponteiro do mouse
  mouse = {
    x: 0,
    y: 0
  }

  // prebufferiza imagens e modelos
  function preBuffer(){
    
  }
  // inicializa os objetos
  init();

  // loop de animação
  animate();

  function addVTK(arquivo, x) {
    var material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    var loader = new THREE.VTKLoader();
    loader.load(arquivo, function(geometry) {

      geometry.computeVertexNormals();

      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, 1, 0);
      scene.add(mesh);
      objetos.push(mesh);
    });
  }

  function adicionarMonstro(arquivo, x) {
    var material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    var loader = new THREE.VTKLoader();
    loader.load(arquivo, function(geometry) {

      geometry.computeVertexNormals();

      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, 1, 0);
      mesh.scale.set(5, 5, 5);
      scene.add(mesh);
      monstros.push(mesh);
      objetos.push(mesh);
    });

    // adiciona no array do javascripts
    // os monstros
  }
  function addCubo(x, y, z) {
    var geometry = new THREE.CubeGeometry(5, 5, 1);
    var material = new THREE.MeshBasicMaterial({
      map: new THREE.ImageUtils.loadTexture('img/caixa.png')
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);
    objetos.push(cube);
  }

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);

    // cria o canvas para exibir a cena renderizada
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // define posição da camera (x,y,z) e aonde ela est apontando
    camera.position.set(1, 2, 20);
    // objetosjga o renderer (canvas) no html
    document.body.appendChild(renderer.domElement);

    addCubo(5, 2, 4);

    function addGrama(){
      grama = new THREE.ImageUtils.loadTexture('img/grama.png');
      animation = new TileTextureAnimator(grama,3,1,200);
      gramaSprite = new THREE.SpriteMaterial({
        map: grama, useScreenCoordinates: false,
        fog: true, color: 0xffffff
      });

      sprite = new THREE.Sprite(gramaSprite);
      sprite.position.set(0,1.6,4);
      sprite.scale.set(1,1,1);
      scene.add(sprite);

    }

    // adicionando o personagem
    function addPersonagem() {
      var personagemTextura, personagemSprite, sprite;
      // variaveis necessárias para quando for necessário
      // renderizar o personagem, ele terá estará na mesma
      // localização anterior.
      var posx, posy, posz;
      var flagR = true,
          flagL = true,
          flagSoco = true;

      personagemTextura = new THREE.ImageUtils.loadTexture('img/stand/stand.png');
      animation = new TileTextureAnimator(personagemTextura, 1, 3, 750);
      personagemSprite = new THREE.SpriteMaterial({
        map: personagemTextura,
        useScreenCoordinates: false,
        fog: true,
        color: 0xffffff
      });
      sprite = new THREE.Sprite(personagemSprite);
      sprite.position.set(0, 1.6, 4);
      posx = 0;
      posy = 1.6;
      posz = 4;
      sprite.scale.set(2, 4, 1);
      scene.add(sprite);
      personagemPrincipalSprite = sprite;

      // Listener para pegar as ações do teclado
      document.addEventListener('click', function(evt) {
        scene.remove(sprite);
        if (flagSoco === true) {
          personagemTextura = new THREE.ImageUtils.loadTexture('img/running/punch.png');
        } else if (flagSoco === false) {
          personagemTextura = new THREE.ImageUtils.loadTexture('img/running/punch1.png');
        }
        animation = new TileTextureAnimator(personagemTextura, 3, 1, 200);
        personagemSprite = new THREE.SpriteMaterial({
          map: personagemTextura,
          useScreenCoordinates: false,
          fog: true,
          color: 0xffffff
        });
        sprite = new THREE.Sprite(personagemSprite);
        sprite.position.set(posx, 1.6, 4);
        sprite.scale.set(2, 4, 1);
        scene.add(sprite);
        personagemPrincipalSprite = sprite;
      });
      document.addEventListener('keyup', function(evt) {
        if (evt.keyCode === 65 || evt.keyCode === 68) {
          auxx = sprite.position.x;
          auxy = sprite.position.y;
          scene.remove(sprite);
          personagemTextura = new THREE.ImageUtils.loadTexture('img/stand/stand.png');
          animation = new TileTextureAnimator(personagemTextura, 1, 3, 600);
          personagemSprite = new THREE.SpriteMaterial({
            map: personagemTextura,
            useScreenCoordinates: false,
            fog: true,
            color: 0xffffff
          });
          sprite = new THREE.Sprite(personagemSprite);
          sprite.position.set(auxx, auxy, 4);
          sprite.scale.set(2, 4, 1);
          scene.add(sprite);
          personagemPrincipalSprite = sprite;
          flagL = true;
          flagR = true;
        }
        if(evt.keyCode === 65){
          esquerda = false;
        }
        if(evt.keyCode === 68){
          direita = false;
        }
      });
      document.addEventListener('keydown', function(evt) {
        // pulo
        if(evt.keyCode === 87){
          if(isJump){
            velocity.y +=5;
            isJump = false;
          }
        }

        // d
        if (evt.keyCode === 65 || evt.keyCode === 37) {
          esquerda = true;

          //sprite.position.x -= 0.1;
          //posx -= 0.1;
          //camera.position.x -= 0.1;
          //sprite2.position.x -= 0.079;

          flagL = true;
          if (flagR === true) {
            auxx = sprite.position.x;
            auxy = sprite.position.y;
            scene.remove(sprite);
            personagemTextura = new THREE.ImageUtils.loadTexture('img/running/running.png');
            animation = new TileTextureAnimator(personagemTextura, 3, 1, 300);
            personagemSprite = new THREE.SpriteMaterial({
              map: personagemTextura,
              useScreenCoordinates: false,
              fog: true,
              color: 0xffffff
            });
            sprite = new THREE.Sprite(personagemSprite);
            sprite.position.set(auxx, auxy, 4);
            sprite.scale.set(2, 4, 1);
            scene.add(sprite);
            personagemPrincipalSprite = sprite;

            flagR = false;
          }
          flagSoco = false;
          // a
        } else if (evt.keyCode === 68 || evt.keyCode === 39) {
          direita = true;

          //sprite.position.x += 0.1;
          //camera.position.x += 0.1;
          //sprite2.position.x += 0.079;
          //posx += 0.1;
          
          flagR = true;

          if (flagL === true) {
            auxx = sprite.position.x;
            auxy = sprite.position.y;
            scene.remove(sprite);
            personagemTextura = new THREE.ImageUtils.loadTexture('img/running/running1.png');
            animation = new TileTextureAnimator(personagemTextura, 3, 1, 300);
            personagemSprite = new THREE.SpriteMaterial({
              map: personagemTextura,
              useScreenCoordinates: false,
              fog: true,
              color: 0xffffff
            });
            sprite = new THREE.Sprite(personagemSprite);
            sprite.position.set(auxx, auxy, 4);
            sprite.scale.set(2, 4, 1);
            scene.add(sprite);
            personagemPrincipalSprite= sprite;
            flagL = false;
          }
          flagSoco = true;
        }
      });
    }

    addPersonagem();

    // adicionando o chão
    var floorTexture = new THREE.ImageUtils.loadTexture('img/chao.png');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    var floorMaterial = new THREE.MeshBasicMaterial({
      map: floorTexture,
      side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(100,50, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // adicionando o fundo (de papel)
    var background = new THREE.ImageUtils.loadTexture('img/background/background.bmp');
    var crateMaterial = new THREE.SpriteMaterial({
      map: background,
      useScreenCoordinates: false,
      color: 0xffffff
    });
    var sprite2 = new THREE.Sprite(crateMaterial);
    sprite2.position.set(0, 3, 0);
    sprite2.scale.set(20, 10, 1); // imageWidth, imageHeight
    scene.add(sprite2);

    cenarioBackground = sprite2;

  }

  function animate() {
    requestAnimationFrame(animate);
    //autlaizar movimentos do monstros
    atualizarMonstros();
    render();
    update();
  }

  function atualizarMonstros() {
    if (monstros.length > 0) {
      monstros.forEach(function(monstro) {
        monstro.position.x -= 0.01;
      });
    }
  }

  function update() {
    var delta = clock.getDelta();
    animation.update(1000 * delta);
    velocity.y -= 5 * delta;

    if(esquerda){
      personagemPrincipalSprite.translateX(-0.1);
      cenarioBackground.translateX(-0.087);
      camera.translateX(-0.1);
    }
    if(direita){
      personagemPrincipalSprite.translateX(+0.1);
      cenarioBackground.translateX(+0.087);
      camera.translateX(+0.1);
    }

    if( personagemPrincipalSprite.position.y <= 1.6 ){
      velocity.y = Math.max(0,velocity.y);
      isJump = true;  
    }
    personagemPrincipalSprite.translateY(velocity.y * delta);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function TileTextureAnimator(texture, hTiles, vTiles, durationTile) {

    // current tile number
    this.currentTile = 0;

    // duration of every tile
    this.durationTile = durationTile;

    // internal time counter
    this.currentTime = 0;

    // amount of horizontal and vertical tiles, and total count of tiles
    this.hTiles = hTiles;
    this.vTiles = vTiles;
    this.cntTiles = this.hTiles * this.vTiles;

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.hTiles, 1 / this.vTiles);

    this.update = function(time) {
      this.currentTime += time;

      while (this.currentTime > this.durationTile) {
        this.currentTime -= this.durationTile;
        this.currentTile++;

        if (this.currentTile == this.cntTiles) {
          this.currentTile = 0;
        }

        var iColumn = this.currentTile % this.hTiles;
        texture.offset.x = iColumn / this.hTiles;
        var iRow = Math.floor(this.currentTile / this.hTiles);
        texture.offset.y = iRow / this.vTiles;
      }
    };
  }

  function onDocumentMouseMove(event) {
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();

    // update the mouse variable
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function deleteObject(position){
    for (var i = 0; i < objetos.length; i++) {
      if(position === objetos[i].position.y){
        scene.remove(objetos[i]);
      }
    };
  }