import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three'
import { OrbitControls } from 'three-stdlib'
import './style.css'

const scene = new Scene()
const screen = {
	width: window.innerWidth,
	height: window.innerHeight,
}

const fov = 60
const aspect = screen.width / screen.height
const camera = new PerspectiveCamera(fov, aspect)
scene.add(camera)
camera.position.set(0, 0, 10)

const renderer = new WebGLRenderer({ antialias: true, alpha: true })
const root = document.getElementById('app')
root?.appendChild(renderer.domElement)
renderer.pixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setSize(screen.width, screen.height)
renderer.setAnimationLoop(update)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableDamping = true

const geometry = new BoxGeometry(2, 2, 2)
const material = new MeshNormalMaterial()
const box = new Mesh(geometry, material)
scene.add(box)

function update() {
	orbit.update()
	renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
	screen.width = window.innerWidth
	screen.height = window.innerHeight

	camera.aspect = screen.width / screen.height
	camera.updateProjectionMatrix()

	renderer.setSize(screen.width, screen.height)
	renderer.pixelRatio = Math.min(window.devicePixelRatio, 2)
})

window.addEventListener('keydown', (e) => {
	if (e.ctrlKey && e.code === 'Space') {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			renderer.domElement.requestFullscreen()
		}
	}
})

const cursor = new Vector2()
window.addEventListener('mousemove', (e) => {
	cursor.x = e.clientX / window.innerWidth - 0.5
	cursor.y = 0.5 - e.clientY / window.innerHeight
})
