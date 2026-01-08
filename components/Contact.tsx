'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('Contact');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        taskDescription: ''
    });
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const [errorMessage, setErrorMessage] = useState('');

    // Handle Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('taskDescription', formData.taskDescription);

            files.forEach(file => {
                data.append('files', file);
            });

            const res = await fetch('/api/quote', {
                method: 'POST',
                body: data,
            });

            if (res.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', taskDescription: '' });
                setFiles([]);
            } else {
                // Try to get error details
                const errorData = await res.json().catch(() => ({}));
                console.error('Submission failed:', errorData);

                const msg = errorData.message || 'Failed to send message. Please try again.';
                setErrorMessage(msg);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('An unexpected error occurred.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark dark:text-white mb-4 uppercase">{t('title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm flex items-start gap-4 border border-transparent dark:border-slate-800">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t('locationTitle')}</h4>
                                <p className="text-gray-600 dark:text-gray-400">{t.rich('locationText', { br: () => <br /> })}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm flex items-start gap-4 border border-transparent dark:border-slate-800">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t('emailTitle')}</h4>
                                <p className="text-gray-600 dark:text-gray-400">{t('emailText')}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm flex items-start gap-4 border border-transparent dark:border-slate-800">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t('phoneTitle')}</h4>
                                <p className="text-gray-600 dark:text-gray-400">{t('phoneText')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Map & Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map */}
                        <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-sm h-64 overflow-hidden border border-transparent dark:border-slate-800">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2265.4089262819!2d10.38948751557244!3d55.40321788046131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464cdfff91b14625%3A0xac46ea956a0ca70d!2sSkibhusvej%209%2C%205000%20Odense!5e0!3m2!1sen!2sdk!4v1602961617819!5m2!1sen!2sdk"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="dark:grayscale dark:invert dark:contrast-75 dark:opacity-90 transition-[filter,opacity] duration-300"
                            ></iframe>
                        </div>

                        {/* Form */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-transparent dark:border-slate-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('offerTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                                {t('offerDesc')}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Personal Info */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('formName')}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('formEmail')}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Task Description */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('taskDescLabel')} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.taskDescription}
                                        onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                                        placeholder={t('taskDescPlaceholder')}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    ></textarea>
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('fileUploadLabel')}</label>
                                    <div
                                        className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-8 w-full flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group relative"
                                    >
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            <span className="font-semibold text-primary">{t('chooseFileText')}</span> {t('dropFileText')}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {files.length > 0
                                                ? `${files.length} file(s) selected`
                                                : t('noFileChosen')}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{t('fileLimits')}</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-3 bg-primary text-white dark:text-slate-900 font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : t('offerTitle')}
                                </button>
                                {submitStatus === 'success' && (
                                    <p className="text-green-600 text-center mt-2 font-medium">Message sent successfully!</p>
                                )}
                                {submitStatus === 'error' && (
                                    <p className="text-red-500 text-center mt-2 font-medium">
                                        {errorMessage || 'Failed to send message. Please try again.'}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
