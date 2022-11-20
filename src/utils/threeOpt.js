import {
  Scene,
  Mesh,
  Vector3,
  Color,
  BufferGeometry,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  AdditiveBlending,
  Float32BufferAttribute,
  ParticleBasicMaterial,
  MeshBasicMaterial
} from 'three'

import { GUI } from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'

class ThreeApp {
  modelList = []

  stats = new Stats()
  hasStats = null

  gui = null

  constructor ({ canvas, opt = {} }) {
    // 渲染器
    this.renderer = new WebGLRenderer({ canvas })

    // 场景
    this.scene = new Scene()

    // 相机
    this.camera = new PerspectiveCamera(
      50, // fov 透视角度
      window.innerWidth / window.innerHeight, // aspect ratio 透视比例
      1, // near 最近可视距离
      1000 // far 最远可视距离
    )

    // 初始化
    this.renderInit()
  }

  renderInit = () => {
    // 设置渲染像素
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 设置渲染大小
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // 更新+渲染到页面
    this.animate()

    // 设置相机位置
    this.camera.position.z = 5

    // 状态
    if (!this.hasStats) {
      document.body.appendChild(this.stats.domElement)
      this.hasStats = true
    }

    window.addEventListener('resize', () => {
      this.resize()
    })
  }

  resize = () => {
    // 设置渲染大小
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // 比例重置
    this.camera.aspect = window.innerWidth / window.innerHeight
    // 更新 Matrix
    this.camera.updateProjectionMatrix()

    // 更新帧数
    this.stats.update()
  }

  addModel = (element) => {
    this.scene.add(element.model)
    this.modelList.push(element)
    if (!this.gui) this.gui = element.guiInstanceActive(this.gui)
  }

  animateModelList () {
    this.modelList.forEach(element => {
      element.animate && element.animate()
    })
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.render()
  }

  render = () => {
    this.stats.begin()
    this.animateModelList()
    this.stats.end()
    this.renderer.render(this.scene, this.camera)

    this.stats.update()
  }
}

class SkyApp {

}

class ThreeCube {
  direction = {
    x: true,
    y: true,
    z: true
  }

  constructor () {
    // 几何体
    this.geometry = new BoxGeometry(1, 1, 1)
    // 材质
    this.material = new MeshBasicMaterial({
      color: '#1677ff',
      wireframe: true
    })
    // 模型
    this.model = new Mesh(this.geometry, this.material)
  }

  animate = () => {
    this.rotateAnimate(this.model, 'x', 0.01, this.direction, 0, Math.PI * 2)
    this.rotateAnimate(this.model, 'y', 0.02, this.direction, 0, Math.PI * 2)
    this.rotateAnimate(this.model, 'z', 0.01, this.direction, 0, Math.PI * 2)
  }

  rotateAnimate = (model, para, change, direction, min, max) => {
    direction[para] ? model.rotation[para] += change : model.rotation[para] -= change
    if (model.rotation[para] <= min) direction[para] = true
    if (model.rotation[para] >= max) direction[para] = false
  }

  guiInstanceActive = (gui) => {
    const g = gui || new GUI({})
    const cubeGui = g.addFolder('cube')
    cubeGui.open()
    // 面板设置缩放
    this.setScale(cubeGui)
    // 面板设置旋转
    this.setSRotation(cubeGui)

    return g
  }

  setScale = (gui) => {
    gui.add(this.model.scale, 'x', 1, 2).name('scale:x').listen()
    gui.add(this.model.scale, 'y', 1, 2).name('scale:y').listen()
    gui.add(this.model.scale, 'z', 1, 2).name('scale:z').listen()
  }

  setSRotation = (gui) => {
    gui.add(this.model.rotation, 'x', 0, Math.PI * 2).name('rotation:x').listen()
    gui.add(this.model.rotation, 'y', 0, Math.PI * 2).name('rotation:y').listen()
    gui.add(this.model.rotation, 'z', 0, Math.PI * 2).name('rotation:z').listen()
  }
}

export default { ThreeApp, SkyApp, ThreeCube }