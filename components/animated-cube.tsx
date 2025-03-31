"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function AnimatedCube() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cubesRef = useRef<THREE.Mesh[]>([])
  const mainCubeRef = useRef<THREE.Group>()
  const animationStateRef = useRef({
    state: "assembled", // 'assembled', 'disassembling', 'rotating', 'assembling'
    timer: 0,
    rotationSpeed: 0.01,
  })

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x121212)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = false

    // Create main cube group
    const mainCube = new THREE.Group()
    mainCubeRef.current = mainCube
    scene.add(mainCube)

    // Create small cubes
    const size = 0.5
    const gap = 0.1
    const totalSize = 3 * size + 2 * gap
    const cubes: THREE.Mesh[] = []

    // Create a texture with Minecraft-like appearance
    const createMinecraftTexture = (color: number) => {
      const canvas = document.createElement("canvas")
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext("2d")
      if (!ctx) return new THREE.MeshBasicMaterial({ color })

      // Fill with base color
      ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`
      ctx.fillRect(0, 0, 64, 64)

      // Add pixelated noise for texture
      ctx.fillStyle = `rgba(0, 0, 0, 0.2)`
      const pixelSize = 16
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          if (Math.random() > 0.7) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
          }
        }
      }

      // Add border
      ctx.strokeStyle = `rgba(0, 0, 0, 0.3)`
      ctx.lineWidth = 2
      ctx.strokeRect(0, 0, 64, 64)

      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter

      return new THREE.MeshBasicMaterial({ map: texture })
    }

    // Colors for the cubes
    const colors = [
      0x8c43ff, // Purple (primary)
      0xb4ff3a, // Green (accent)
      0x1a1a1a, // Dark gray
      0x333333, // Medium gray
      0x8c43ff, // Purple
      0xb4ff3a, // Green
    ]

    // Create 27 small cubes (3x3x3)
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          // Skip the very center cube to make it hollow
          if (x === 1 && y === 1 && z === 1) continue

          const geometry = new THREE.BoxGeometry(size, size, size)

          // Determine which color to use based on position
          let colorIndex = 0
          if (x === 0 || x === 2) colorIndex = 0 // Purple sides
          if (y === 0 || y === 2) colorIndex = Math.max(colorIndex, 1) // Green top/bottom
          if (z === 0 || z === 2) colorIndex = Math.max(colorIndex, 2) // Dark gray front/back

          // Create materials for each face
          const materials = [
            createMinecraftTexture(colors[x === 0 ? 0 : x === 2 ? 1 : 2]), // Right/Left
            createMinecraftTexture(colors[x === 0 ? 0 : x === 2 ? 1 : 2]), // Right/Left
            createMinecraftTexture(colors[y === 0 ? 3 : y === 2 ? 4 : 2]), // Top/Bottom
            createMinecraftTexture(colors[y === 0 ? 3 : y === 2 ? 4 : 2]), // Top/Bottom
            createMinecraftTexture(colors[z === 0 ? 5 : z === 2 ? 0 : 2]), // Front/Back
            createMinecraftTexture(colors[z === 0 ? 5 : z === 2 ? 0 : 2]), // Front/Back
          ]

          const cube = new THREE.Mesh(geometry, materials)

          // Position the cube
          cube.position.set((x - 1) * (size + gap), (y - 1) * (size + gap), (z - 1) * (size + gap))

          // Store original position for animation
          cube.userData.originalPosition = cube.position.clone()

          mainCube.add(cube)
          cubes.push(cube)
        }
      }
    }

    cubesRef.current = cubes

    // Animation loop
    const animate = () => {
      const state = animationStateRef.current

      // Update state timer
      state.timer += 1

      // State machine for animation
      switch (state.state) {
        case "assembled":
          if (state.timer > 120) {
            // Wait 2 seconds before disassembling
            state.state = "disassembling"
            state.timer = 0
          }
          break

        case "disassembling":
          // Explode the cubes outward
          const disassembleProgress = Math.min(state.timer / 60, 1)
          cubes.forEach((cube) => {
            const originalPos = cube.userData.originalPosition
            const direction = originalPos.clone().normalize()
            cube.position.copy(originalPos.clone().add(direction.multiplyScalar(disassembleProgress * 3)))
          })

          if (state.timer > 60) {
            // 1 second for disassembly
            state.state = "rotating"
            state.timer = 0
          }
          break

        case "rotating":
          // Rotate the exploded cubes
          cubes.forEach((cube) => {
            cube.rotation.x += state.rotationSpeed
            cube.rotation.y += state.rotationSpeed
          })

          if (state.timer > 180) {
            // 3 seconds of rotation
            state.state = "assembling"
            state.timer = 0
          }
          break

        case "assembling":
          // Bring the cubes back together
          const assembleProgress = Math.min(state.timer / 60, 1)
          cubes.forEach((cube) => {
            const originalPos = cube.userData.originalPosition
            const currentExplodedPos = originalPos.clone().add(originalPos.clone().normalize().multiplyScalar(3))

            cube.position.lerpVectors(currentExplodedPos, originalPos, assembleProgress)

            // Gradually stop rotation
            cube.rotation.x += state.rotationSpeed * (1 - assembleProgress)
            cube.rotation.y += state.rotationSpeed * (1 - assembleProgress)
          })

          if (state.timer > 60) {
            // 1 second for assembly
            state.state = "assembled"
            state.timer = 0

            // Reset rotations
            cubes.forEach((cube) => {
              cube.rotation.set(0, 0, 0)
            })
          }
          break
      }

      // Rotate the entire cube slightly
      if (mainCubeRef.current) {
        mainCubeRef.current.rotation.y += 0.005
        mainCubeRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
      }

      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full min-h-[120px]" style={{ aspectRatio: "1/1" }} />
}

