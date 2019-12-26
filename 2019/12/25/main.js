/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-12-25 13:05:32
 * @LastEditTime : 2019-12-26 13:37:49
 * @LastEditors  : 靳肖健
 */
!function () {
  // 创建场景/摄像
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
  var sphereGeometry = new THREE.SphereGeometry(1, 55, 55);
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