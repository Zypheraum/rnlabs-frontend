'use client'

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Github, Twitter, Linkedin , Menu } from 'lucide-react'
import Link from "next/link"
import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import Script from 'next/script';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} className="dark:bg-white">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6 text-[#1e3a8a]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl font-bold text-[#1e3a8a]">
              Menu
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8">
            <div className="flex flex-col space-y-4">
              <Link
                href="#services"
                onClick={() => setOpen(false)}
                className="text-lg text-center py-2 text-[#1e3a8a] hover:text-blue-600 transition-all duration-300"
              >
                Services
              </Link>
              <Link
                href="#team"
                onClick={() => setOpen(false)}
                className="text-lg text-center py-2 text-[#1e3a8a] hover:text-blue-600 transition-all duration-300"
              >
                Team
              </Link>
              <Link
                href="mailto:comms@raum.network"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-lg text-center py-2 text-[#1e3a8a] hover:text-blue-600 transition-all duration-300"
              >
                Contact
              </Link>
              {/* <Button
                size="lg"
                className="bg-gray-300 text-gray-600 hover:bg-gray-300 border-[2px] border-gray-400 opacity-50 cursor-not-allowed shadow-[0_0_0_2px_gray-400] disabled:border-gray-400 disabled:shadow-[0_0_0_2px_gray-400] group border w-full"
                disabled
              >
                <span className="relative">
                  <span className="text-lg group-hover:hidden">Demo</span>
                  <span className="text-lg hidden group-hover:inline">Currently Disabled</span>
                </span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button> */}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
const services = [
  {
    title: "Decentralized Exchange",
    description: "Trade tokens seamlessly with our advanced DEX",
    icon: "💱",
  },
  {
    title: "Cross-Chain Bridge",
    description: "Transfer assets across multiple blockchains effortlessly",
    icon: "🌉",
  },
  {
    title: "Secure Storage",
    description: "Store your digital assets with military-grade encryption",
    icon: "🔒",
  },
  {
    title: "Staking Platform",
    description: "Earn rewards by participating in network security",
    icon: "💰",
  },
]

const team = [
  { name: "Mridul Singh", role: "Co-Founder and CEO", image: "/mridul.jpg", url: "https://www.linkedin.com/in/mridul-singh9/" },
  { name: "Madhur Verma", role: "Co-Founder and CTO", image: "/madhur.jpg", url: "https://www.linkedin.com/in/madhurrverma/" },
]

function FloatingShapes({ mouse }) {
  const group = useRef()
  const { viewport } = useThree()

  const shapes = useMemo(() => {
    return new Array(15).fill().map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.5 + Math.random() * 0.5,
      speed: 0.01 + Math.random() * 0.02,
      direction: {
        x: Math.random() > 0.5 ? 1 : -1,
        y: Math.random() > 0.5 ? 1 : -1,
        z: Math.random() > 0.5 ? 1 : -1
      }
    }))
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const bounds = {
      x: 8,
      y: 5,
      z: 8
    }

    shapes.forEach((shape, i) => {
      if (group.current.children[i]) {
        const mesh = group.current.children[i]

        mesh.position.x += 0.01 * shape.direction.x
        mesh.position.y += 0.01 * shape.direction.y
        mesh.position.z += 0.01 * shape.direction.z

        if (Math.abs(mesh.position.x) > bounds.x) {
          shape.direction.x *= -1
        }
        if (Math.abs(mesh.position.y) > bounds.y) {
          shape.direction.y *= -1
        }
        if (Math.abs(mesh.position.z) > bounds.z) {
          shape.direction.z *= -1
        }

        mesh.rotation.x += 0.005
        mesh.rotation.y += 0.007
        mesh.rotation.z += 0.003

        group.current.rotation.x = mouse.current[1] * 0.2
        group.current.rotation.y = mouse.current[0] * 0.2
      }
    })
  })

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
        >
          {i % 3 === 0 ? (
            <octahedronGeometry args={[1]} />
          ) : i % 3 === 1 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <tetrahedronGeometry args={[1]} />
          )}
          <meshPhongMaterial
            color={new THREE.Color().setHSL(Math.random(), 0.7, 0.3)}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ mouse }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingShapes mouse={mouse} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </Canvas>
  )
}

const ServiceCard = ({ service }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-[2px] border-white/20"
  >
    <div className="text-5xl mb-6">{service.icon}</div>
    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#1e3a8a]">{service.title}</h3>
    <p className="text-gray-600 text-base md:text-lg">{service.description}</p>
  </motion.div>
)

const TeamMember = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-[2px] border-white/20"
  >
    <img src={member.image} alt={member.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover" />
    <h3 className="text-xl md:text-2xl font-semibold mb-2">{member.name}</h3>
    <p className="text-gray-600 text-base md:text-lg mb-4">{member.role}</p>
    <div className="flex justify-center space-x-4">
      <Link target="_blank"
        rel="noopener noreferrer" href={member.url} className="text-black hover:text-gray-600 transition-colors">
        <Linkedin className="h-6 w-6" />
      </Link>
    </div>
  </motion.div>
)

const AnimatedWords = () => {
  const words = ["Decentralized Finance", "Blockchain Innovation", "Financial Freedom", "Secure Transactions"]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  )
}

const FooterCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border-[2px] border-black hover:bg-white/10 transition-all duration-300 mx-auto"
  >
    <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
    {children}
  </motion.div>
)

export default function Component() {
  const [hoverText, setHoverText] = useState("Demo");

  const targetRef = useRef(null)
  const mouse = useRef([0, 0])
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      ]
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <NextSeo
        title="RN Labs"
        description="RN Labs Services"
        openGraph={{
          title: 'RN Labs',
          description: 'RN Labs Services',
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-FGF1WB7LKB`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FGF1WB7LKB');
          `,
        }}
      />

      <div className="min-h-screen bg-white text-black overflow-hidden">
        <div className="fixed inset-0 z-0 opacity-20">
          <Scene mouse={mouse} />
        </div>

        <nav className="fixed w-full z-50 bg-white border-b border-blue-100">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="#" rel="noopener noreferrer">
              <img src="https://raw.githubusercontent.com/Zypheraum/rnlabs-frontend/refs/heads/main/public/rnlabs.svg" height={"300"} width={"220"} />
            </Link>
            <div className="hidden sm:flex items-center gap-4 md:gap-8">
              <Link href="#services" className="text-sm md:text-lg text-black hover:text-blue-600 transition-colors">Services</Link>
              <Link href="#team" className="text-sm md:text-lg text-black hover:text-blue-600 transition-colors">Team</Link>
              <Link href="mailto:comms@raum.network" target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg text-black hover:text-blue-600 transition-colors">Contact</Link>
              {/* <Button
                size="lg"
                className="bg-gray-300 text-gray-600 hover:bg-gray-300 border-[2px] border-gray-400 opacity-50 cursor-not-allowed shadow-[0_0_0_2px_gray-400] disabled:border-gray-400 disabled:shadow-[0_0_0_2px_gray-400] group border"
                disabled
              >
                <span className="relative">
                  <span className="text-sm md:text-lg group-hover:hidden">Demo</span>
                  <span className="text-sm md:text-lg hidden group-hover:inline">Currently Disabled</span>
                </span>
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button> */}
            </div>
            <MobileNav />
          </div>
        </nav>

        <main>
          <section ref={targetRef} className="h-screen relative overflow-hidden">
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
              <motion.div
                style={{ opacity, scale, y }}
                className="max-w-4xl mx-auto"
              >
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
                  Unlock the Future of <AnimatedWords />
                </h1>
                <p className="text-black text-lg md:text-2xl mb-8">
                  Building innovative solutions on the blockchain for a decentralized tomorrow
                </p>
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 border">
                  <Link href="https://dex.raum.network" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Explore Our Ecosystem
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className="absolute bottom-8 w-full text-center text-black animate-bounce">
              <ChevronDown className="h-6 w-6 mx-auto" />
            </div>
          </section>

          <section id="services" className="py-20 px-4 md:px-8 relative z-10">
            <div className="container mx-auto max-w-5xl text-center bg-white/5 backdrop-blur-sm p-6 rounded-lg border-[2px] border-black hover:bg-white/10 transition-all duration-300">
              <h2 className="text-3xl md:text-5xl font-semibold mb-12 text-[#1e3a8a]">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <ServiceCard key={index} service={service} />
                ))}
              </div>
            </div>
          </section>

          <section id="team" className="py-20 px-4 md:px-8 relative z-10">
            <div className="container mx-auto max-w-5xl text-center bg-white/5 backdrop-blur-sm p-6 rounded-lg border-[2px] border-black hover:bg-white/10 transition-all duration-300">
              <h2 className="text-3xl md:text-5xl font-semibold mb-12 text-[#1e3a8a]">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {team.map((member, index) => (
                  <TeamMember key={index} member={member} />
                ))}
              </div>
            </div>
          </section>



          <section id="contact" className="py-20 relative z-10">
            <div className="container mx-auto px-6 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-8"
              >
                Join the Financial Revolution
              </motion.h2>
              <p className="text-2xl text-black mb-12 max-w-3xl mx-auto">
                Be part of the next generation of decentralized finance. Connect with us to explore limitless possibilities.
              </p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 border">
                <Link
                  href="https://cal.com/mridulsingh/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-black-300 transition-colors"
                >
                  Schedule A Consultation
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-white/5 backdrop-blur-lg py-16 relative z-10 border-t-[2px] border-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <FooterCard title="RN Labs">
                <p className="text-black text-lg text-center">
                  Pioneering the future of decentralized finance through innovative blockchain solutions.
                </p>
              </FooterCard>

              <FooterCard title="Quick Links">
                <ul className="space-y-4 text-center">
                  <li><Link href="#services" className="text-black hover:text-gray-600 hover:text-blue-600 text-lg">Services</Link></li>
                  <li><Link href="#team" className="text-black hover:text-gray-600 text-lg hover:text-blue-600">Team</Link></li>
                  <li>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:comms@raum.network"
                      className="text-black hover:text-gray-600 text-lg hover:text-blue-600"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </FooterCard>

              <FooterCard title="Connect">
                <div className="flex space-x-6 justify-center">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://x.com/RaumNetwork/"
                    className="text-black hover:text-gray-600 transition-colors hover:text-blue-600"
                  >
                    <Twitter className="h-8 w-8" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Raum-Network"
                    className="text-black hover:text-gray-600 transition-colors hover:text-blue-600"
                  >
                    <Github className="h-8 w-8" />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/raum-network/"
                    className="text-black hover:text-gray-600 transition-colors hover:text-blue-600"
                  >
                    <Linkedin className="h-8 w-8" />
                  </Link>
                </div>
              </FooterCard>
            </div>
            <div className="mt-12 pt-8 border-t border-black/10 text-center text-black">
              <p>&copy; 2021-2025 Raum Network. Revolutionizing DeFi. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

