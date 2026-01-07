'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Zap } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const projects = [
    {
        "title": "uBreak WeFix",
        "category": "eCommerce",
        "image": "/portfolio/portfolio-2.jpg",
        "description": "Modern repair service booking system with real-time tracking.",
        "tech": ["React", "Node.js", "MongoDB"],
        "github": "#",
        "demo": "#",
        "featured": true
    },
    {
        "title": "Neon Survivors",
        "category": "Game",
        "image": "/portfolio/neon-survivors.png",
        "description": "A high-octane roguelite shooter with cyberpunk aesthetics.",
        "tech": ["Unity", "C#"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "CityForge",
        "category": "3D Tools",
        "image": "/portfolio/city-forge.png",
        "description": "Blender add-on for procedural city generation.",
        "tech": ["Python", "Blender API"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "Memory Sculptor",
        "category": "3D Tools",
        "image": "/portfolio/memory-sculptor.png",
        "description": "AI-driven tool for generating 3D sculptures from text memories.",
        "tech": ["Python", "OpenAI", "Blender"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "StoryTrip AI",
        "category": "SaaS",
        "image": "/portfolio/storytrip-ai.png",
        "description": "Personalized travel story generator using AI.",
        "tech": ["Next.js", "OpenAI", "Stripe"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "Buddyhood",
        "category": "Web App",
        "image": "/portfolio/buddyhood.jpg",
        "description": "Comprehensive business management platform.",
        "tech": ["Vue.js", "Laravel"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "Creative Stations",
        "category": "Web App",
        "image": "/portfolio/portfolio-5.jpg",
        "description": "Modern corporate website and digital presence.",
        "tech": ["Wordpress", "PHP"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "Den Italienske Isbutik",
        "category": "Web App",
        "image": "/portfolio/den-italinsk-ice.jpg",
        "description": "Authentic Italian ice cream shop experience online.",
        "tech": ["Gatsby", "Contentful"],
        "github": "#",
        "demo": "#"
    },
    {
        "title": "ExploreEase",
        "category": "SaaS",
        "image": "/portfolio/explore-ease-logo.png",
        "description": "All-in-One Travel Planning & B2B Marketplace Platform.",
        "tech": ["Next.js", "Node.js", "PostgreSQL"],
        "github": "#",
        "demo": "https://letsexploreease.com/"
    },
    {
        "title": "Triply",
        "category": "Web App",
        "image": "/portfolio/triply-logo-white.png",
        "description": "Smart travel companion and itinerary planner.",
        "tech": ["React", "AI Integration"],
        "github": "#",
        "demo": "https://triply-one-nu.vercel.app/"
    }
];

const categories = ["All", "Web App", "App", "eCommerce", "SaaS", "Game", "3D Tools"];

export default function Portfolio() {
    const t = useTranslations('Portfolio');
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(project => project.category === filter || (filter === 'App' && (project.category === 'App' || project.category === 'Mobile')));

    return (
        <section id="portfolio" className="py-24">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary-dark mb-4 uppercase">{t('title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 transform -translate-y-1'
                                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary shadow-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                key={`${project.title}-${index}`}
                                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-800 flex flex-col h-full"
                            >
                                {/* Image Container with Overlay */}
                                <div className="relative h-64 overflow-hidden w-full">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                                            <div className="flex gap-3 justify-end">
                                                <a href={project.github} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-gray-900 transition-colors">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                                <a href={project.demo} className="p-2 bg-primary/90 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors">
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                            {project.category}
                                        </span>
                                        {/* {project.featured && <Zap className="w-4 h-4 text-yellow-500" />} */}
                                    </div>

                                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-2 flex-wrap border-t border-gray-100 pt-4 mt-auto">
                                        <Layers className="w-4 h-4 text-gray-400" />
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
