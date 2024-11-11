'use client'

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import Script from 'next/script';

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
  { name: "Mridul Singh", role: "Visionary Founder & CEO", image: "/mridul.jpg", url: "https://www.linkedin.com/in/mridul-singh9/" },
  { name: "Madhur Verma", role: "Chief Technology Officer", image: "/madhur.jpg", url: "https://www.linkedin.com/in/madhurrverma/" },
]

function ParticleField({ count = 2000, mouse }) {
  const points = useMemo(() => {
    const positions = new Array(count * 3).fill(0).map(() => (Math.random() - 0.5) * 20)
    return new Float32Array(positions)
  }, [count])

  const ref = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = mouse.current[1] / aspect / 1.5
      ref.current.rotation.y = mouse.current[0] / aspect / 1.5
    }
  })

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#fff"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

function Scene({ mouse }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <ParticleField mouse={mouse} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}

const ServiceCard = ({ service }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10"
  >
    <div className="text-5xl mb-6">{service.icon}</div>
    <h3 className="text-xl md:text-2xl font-semibold mb-4">{service.title}</h3>
    <p className="text-gray-300 text-base md:text-lg">{service.description}</p>
  </motion.div>
)

const TeamMember = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10"
  >
    <img src={member.image} alt={member.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 object-cover" />
    <h3 className="text-xl md:text-2xl font-semibold mb-2">{member.name}</h3>
    <p className="text-gray-400 text-base md:text-lg mb-4">{member.role}</p>
    <div className="flex justify-center space-x-4">
      <Link target="_blank"
        rel="noopener noreferrer" href={member.url} className="text-gray-400 hover:text-white transition-colors">
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

export default function Component() {
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

    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Scene mouse={mouse} />
      </div>

      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold">RN LABS</Link>
          <div className="hidden sm:flex items-center gap-4 md:gap-8">
            <Link href="#services" className="text-sm md:text-lg hover:text-gray-300 transition-colors">Services</Link>
            <Link href="#team" className="text-sm md:text-lg hover:text-gray-300 transition-colors">Team</Link>
            <Link href="https://t.me/mridulsingh9" target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg hover:text-gray-300 transition-colors">Contact</Link>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              <Link href="https://lst-stag.raum.network" target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg hover:text-gray-300 transition-colors">
                Demo
              </Link>
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
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
              <p className="text-gray-400 text-lg md:text-2xl mb-8">
                Building innovative solutions on the blockchain for a decentralized tomorrow
              </p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href="https://lst-stag.raum.network" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Explore Our Ecosystem
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <div className="absolute bottom-8 w-full text-center text-gray-400 animate-bounce">
            <ChevronDown className="h-6 w-6 mx-auto" />
          </div>
        </section>

        <section id="services" className="py-20 px-4 md:px-8">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-20 px-4 md:px-8">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-12">Meet Our Team</h2>
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
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Be part of the next generation of decentralized finance. Connect with us to explore limitless possibilities.
            </p>
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-200">
              <Link
                href="https://cal.com/mridulsingh/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-gray-300 transition-colors"
              >
                Schedule A Consultation
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white/5 backdrop-blur-md py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Raum Network</h3>
              <p className="text-gray-400 text-lg">Pioneering the future of decentralized finance through innovative blockchain solutions.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link href="#services" className="text-gray-400 hover:text-white text-lg">Services</Link></li>
                <li><Link href="#team" className="text-gray-400 hover:text-white text-lg">Team</Link></li>
                <li><Link target="_blank"
                  rel="noopener noreferrer" href="https://t.me/mridulsingh9" className="text-gray-400 hover:text-white text-lg">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Connect</h3>
              <div className="flex space-x-6">
                <Link target="_blank"
                rel="noopener noreferrer" href="https://x.com/RaumNetwork/" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-8 w-8" />
                </Link>
                <Link target="_blank"
                rel="noopener noreferrer"href="https://github.com/Raum-Network" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-8 w-8" />
                </Link>
                <Link target="_blank"
                rel="noopener noreferrer"href="https://www.linkedin.com/company/raum-network/about/?feedView=all" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2023 Raum Network. Revolutionizing DeFi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}