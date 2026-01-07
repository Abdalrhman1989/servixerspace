'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/data/blogPosts';

export default function Blog() {
    const t = useTranslations('Blog');
    const locale = useLocale();

    // Mapping over the real data now
    const posts = getBlogPosts(locale);

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark dark:text-white mb-4">{t('title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
                            >
                                {/* Blog Image */}
                                <div className="h-56 w-full relative overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-gray-700">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                        <Calendar className="w-3 h-3" />
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400 group-hover:gap-3 transition-all">
                                        Read Article <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
