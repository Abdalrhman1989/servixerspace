'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/data/blogPosts'; // Adjust import based on where you put it
import { use } from "react";

export default function BlogPostPage(props: { params: Promise<{ slug: string; locale: string }> }) {
    const params = use(props.params);
    const post = getBlogPost(params.slug, params.locale);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white dark:bg-slate-950 pb-20 pt-24">
            {/* Hero Header */}
            <div className="relative h-[400px] md:h-[500px] w-full mb-12">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16">
                    <div className="container mx-auto max-w-4xl">
                        <Link
                            href="/#blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Insights
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-blue-300 font-semibold uppercase tracking-wider mb-4">
                            <span className="bg-blue-600/20 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/30">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-white/90 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                                    {post.author.charAt(0)}
                                </div>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 max-w-3xl">
                <div
                    className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA Box */}
                <div className="mt-16 bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Needs help with your {post.category}?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
                        Our team of experts is ready to help you implement these strategies for your business.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Get a Free Estimate
                    </Link>
                </div>
            </div>
        </article>
    );
}
