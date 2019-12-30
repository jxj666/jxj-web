/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-12-25 13:05:32
 * @LastEditTime : 2019-12-26 20:50:23
 * @LastEditors  : 靳肖健
 */
!function () {
  // 创建场景/摄像
  var scene = new THREE.Scene();
  // (视角, 长宽比,近界,远界)
  var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
  // 创建画布
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  //建立模型
  var geometry = new THREE.BoxGeometry(2, 2, 2);
  var material = new THREE.MeshBasicMaterial({ color: "#fff", wireframe: true });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  //建立模型
  var sphereGeometry = new THREE.SphereGeometry(0, 100, 100);
  var material = new THREE.MeshBasicMaterial({ color: "#00f" });

  var sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);


  camera.position.z = 5;

  var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
}()