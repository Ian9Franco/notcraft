"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { motion } from "framer-motion"

/**
 * Componente de cubo 3D animado usando Three.js
 */
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
    scene.background = null

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5

    // Renderer with antialiasing and better shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    // Configurar shadowMap después de crear el renderer
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    // Add point light for more dramatic lighting
    const pointLight = new THREE.PointLight(0xb4ff3a, 1, 10)
    pointLight.position.set(0, 0, 3)
    scene.add(pointLight)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
    controls.rotateSpeed = 0.5

    // Create main cube group
    const mainCube = new THREE.Group()
    mainCubeRef.current = mainCube
    scene.add(mainCube)

    // Create a texture with Minecraft-like appearance
    const createMinecraftTexture = (color: number) => {
      const canvas = document.createElement("canvas")
      canvas.width = 128
      canvas.height = 128
      const ctx = canvas.getContext("2d")
      if (!ctx) return new THREE.MeshStandardMaterial({ color })

      // Fill with base color
      ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`
      ctx.fillRect(0, 0, 128, 128)

      // Add pixelated noise for texture with more detail
      ctx.fillStyle = `rgba(0, 0, 0, 0.2)`
      const pixelSize = 16
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (Math.random() > 0.7) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
          }
        }
      }

      // Add highlights for more depth
      ctx.fillStyle = `rgba(255, 255, 255, 0.1)`
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (Math.random() > 0.8) {
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
          }
        }
      }

      // Add border with more depth
      ctx.strokeStyle = `rgba(0, 0, 0, 0.4)`
      ctx.lineWidth = 3
      ctx.strokeRect(0, 0, 128, 128)

      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter

      // Return a MeshStandardMaterial for better lighting
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.7,
        metalness: 0.2,
        emissive: new THREE.Color(color).multiplyScalar(0.1), // Añadir emisión para un efecto de brillo
      })
    }

    // Enhanced colors for the cubes with more vibrant tones
    const colors = [
      0x8c43ff, // Purple (primary)
      0xb4ff3a, // Green (accent)
      0x1a1a1a, // Dark gray
      0x333333, // Medium gray
      0x9955ff, // Lighter purple
      0xceff5a, // Lighter green
    ]

    // Create 26 small cubes (3x3x3 minus center)
    const size = 0.5
    const gap = 0.1
    const cubes: THREE.Mesh[] = []

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          // Skip the very center cube to make it hollow
          if (x === 1 && y === 1 && z === 1) continue

          // Use beveled geometry for more interesting look
          const geometry = new THREE.BoxGeometry(size, size, size, 2, 2, 2)

          // Determine which color to use based on position
          let colorIndex = 0
          if (x === 0 || x === 2) colorIndex = 0 // Purple sides
          if (y === 0 || y === 2) colorIndex = Math.max(colorIndex, 1) // Green top/bottom
          if (z === 0 || z === 2) colorIndex = Math.max(colorIndex, 2) // Dark gray front/back

          // Create materials for each face with enhanced textures
          const materials = [
            createMinecraftTexture(colors[x === 0 ? 0 : x === 2 ? 1 : 2]), // Right/Left
            createMinecraftTexture(colors[x === 0 ? 0 : x === 2 ? 1 : 2]), // Right/Left
            createMinecraftTexture(colors[y === 0 ? 3 : y === 2 ? 4 : 2]), // Top/Bottom
            createMinecraftTexture(colors[y === 0 ? 3 : y === 2 ? 4 : 2]), // Top/Bottom
            createMinecraftTexture(colors[z === 0 ? 5 : z === 2 ? 0 : 2]), // Front/Back
            createMinecraftTexture(colors[z === 0 ? 5 : z === 2 ? 0 : 2]), // Front/Back
          ]

          const cube = new THREE.Mesh(geometry, materials)
          cube.castShadow = true
          cube.receiveShadow = true

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

    // Add particle effects
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 50
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Crear un sprite para las partículas
    const particleTexture = new THREE.TextureLoader().load("/placeholder.svg?height=32&width=32")

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xb4ff3a,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      map: particleTexture,
      depthWrite: false,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Añadir un halo alrededor del cubo
    const haloGeometry = new THREE.SphereGeometry(2, 32, 32)
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xb4ff3a,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    })
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    scene.add(halo)

    // Easing functions for smoother animations
    function easeOutCubic(x: number): number {
      return 1 - Math.pow(1 - x, 3)
    }

    function easeInOutCubic(x: number): number {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    // Enhanced animation loop with more dynamic effects
    const animate = () => {
      const state = animationStateRef.current

      // Update state timer
      state.timer += 1

      // Animate particles
      particlesMesh.rotation.y += 0.002
      particlesMesh.rotation.x += 0.001

      // Animar el halo
      halo.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.1
      halo.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1
      halo.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.1

      // State machine for animation with enhanced transitions
      switch (state.state) {
        case "assembled":
          if (state.timer > 120) {
            // Wait 2 seconds before disassembling
            state.state = "disassembling"
            state.timer = 0
          }
          break

        case "disassembling":
          // Explode the cubes outward with easing
          const disassembleProgress = Math.min(state.timer / 60, 1)
          const easedProgress = easeOutCubic(disassembleProgress)

          cubes.forEach((cube) => {
            const originalPos = cube.userData.originalPosition
            const direction = originalPos.clone().normalize()
            cube.position.copy(originalPos.clone().add(direction.multiplyScalar(easedProgress * 3)))

            // Add rotation during explosion
            cube.rotation.x += 0.01 * easedProgress
            cube.rotation.y += 0.01 * easedProgress
          })

          if (state.timer > 60) {
            // 1 second for disassembly
            state.state = "rotating"
            state.timer = 0
          }
          break

        case "rotating":
          // Rotate the exploded cubes with varying speeds
          cubes.forEach((cube, index) => {
            const speedFactor = 1 + (index % 3) * 0.2
            cube.rotation.x += state.rotationSpeed * speedFactor
            cube.rotation.y += state.rotationSpeed * speedFactor

            // Pulsate size slightly
            const pulseFactor = 1 + Math.sin(state.timer * 0.05) * 0.05
            cube.scale.set(pulseFactor, pulseFactor, pulseFactor)

            // Añadir efecto de estela
            if (index % 3 === 0) {
              const trailGeometry = new THREE.SphereGeometry(0.05, 8, 8)
              const trailMaterial = new THREE.MeshBasicMaterial({
                color: 0xb4ff3a,
                transparent: true,
                opacity: 0.3,
              })
              const trail = new THREE.Mesh(trailGeometry, trailMaterial)
              trail.position.copy(cube.position)
              scene.add(trail)

              // Eliminar la estela después de un tiempo
              setTimeout(() => {
                scene.remove(trail)
                trail.geometry.dispose()
                trail.material.dispose()
              }, 1000)
            }
          })

          if (state.timer > 180) {
            // 3 seconds of rotation
            state.state = "assembling"
            state.timer = 0

            // Reset scales
            cubes.forEach((cube) => {
              cube.scale.set(1, 1, 1)
            })
          }
          break

        case "assembling":
          // Bring the cubes back together with easing
          const assembleProgress = Math.min(state.timer / 60, 1)
          const easedAssembleProgress = easeInOutCubic(assembleProgress)

          cubes.forEach((cube) => {
            const originalPos = cube.userData.originalPosition
            const currentExplodedPos = originalPos.clone().add(originalPos.clone().normalize().multiplyScalar(3))

            cube.position.lerpVectors(currentExplodedPos, originalPos, easedAssembleProgress)

            // Gradually stop rotation
            cube.rotation.x += state.rotationSpeed * (1 - easedAssembleProgress)
            cube.rotation.y += state.rotationSpeed * (1 - easedAssembleProgress)
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

      // Rotate the entire cube with subtle wobble
      if (mainCubeRef.current) {
        mainCubeRef.current.rotation.y += 0.005
        mainCubeRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15
        mainCubeRef.current.rotation.z = Math.cos(Date.now() * 0.0015) * 0.05
      }

      // Update controls
      controls.update()

      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()

        rendererRef.current.setSize(width, height)
      }, 100)
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

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full min-h-[120px]"
      style={{ aspectRatio: "1/1" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  )
}

