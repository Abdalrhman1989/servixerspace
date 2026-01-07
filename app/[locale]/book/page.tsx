'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronRight, Clock, Globe, Layout, Smartphone, Share2, PenTool, ArrowLeft, Send } from 'lucide-react';

// Icons mapping
// Icons mapping
const icons: Record<string, any> = {
    web: Layout,
    app: Smartphone,
    marketing: Share2,
    other: Globe
};

export default function BookingPage() {
    const t = useTranslations('Booking');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        company: ''
    });

    const services = ['web', 'app', 'marketing', 'other'];
    const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleServiceSelect = (service: string) => {
        setFormData({ ...formData, service });
        nextStep();
    };

    const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, date: e.target.value });
    }

    const handleTimeSelect = (time: string) => {
        setFormData({ ...formData, time });
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                nextStep();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col pt-24 pb-12 transition-colors duration-300">
            <div className="container mx-auto px-4 lg:px-6 flex-grow flex flex-col lg:flex-row gap-8 lg:gap-16">

                {/* Left Side: Context & Progress */}
                <div className="w-full lg:w-1/3 lg:pt-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">{t('title')}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{t('subtitle')}</p>
                    </motion.div>

                    {/* Progress Steps */}
                    <div className="space-y-6 relative">
                        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-800 -z-10" />
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className={`flex items-center gap-4 transition-colors duration-300 ${step >= s ? 'text-primary dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${step > s ? 'bg-primary border-primary text-white' :
                                    step === s ? 'bg-white dark:bg-slate-900 border-primary text-primary dark:text-blue-400 scale-110' :
                                        'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-600'
                                    }`}>
                                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                                </div>
                                <span className={`font-medium ${step === s ? 'text-gray-900 dark:text-white' : ''}`}>
                                    {s === 1 && t('steps.service')}
                                    {s === 2 && t('steps.date')}
                                    {s === 3 && t('steps.details')}
                                    {s === 4 && t('steps.done')}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card (Visible on later steps) */}
                    {step > 1 && step < 4 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm"
                        >
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Summary</h3>
                            {formData.service && (
                                <div className="flex items-center gap-3 mb-3 text-gray-700 dark:text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400">
                                        {icons[formData.service] && <Clock className="w-4 h-4" />}
                                    </div>
                                    <span className="font-medium">{t(`services.${formData.service}`)}</span>
                                </div>
                            )}
                            {formData.date && (
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">{formData.date} {formData.time && ` @ ${formData.time}`}</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Right Side: Interactive Form Area */}
                <div className="w-full lg:w-2/3 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col relative h-[600px] transition-colors duration-300">
                    <AnimatePresence mode="wait">

                        {/* Step 1: Service Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8 lg:p-12 flex flex-col h-full"
                            >
                                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">{t('services.title')}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map((serviceKey) => {
                                        const Icon = icons[serviceKey] || Globe;
                                        return (
                                            <button
                                                key={serviceKey}
                                                onClick={() => handleServiceSelect(serviceKey)}
                                                className="group p-6 rounded-2xl border-2 border-gray-100 dark:border-slate-800 hover:border-primary dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all text-left flex items-start gap-4"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 text-primary dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{t(`services.${serviceKey}`)}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select this if needed.</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Date & Time */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8 lg:p-12 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={prevStep} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                        <ArrowLeft className="w-6 h-6 text-gray-400" />
                                    </button>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('calendar.title')}</h2>
                                </div>

                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className='flex-1'>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:[color-scheme:dark]"
                                            onChange={handleDateSelect}
                                            value={formData.date}
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('calendar.timeTitle')}</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => handleTimeSelect(time)}
                                                    className={`p-3 rounded-lg text-sm font-medium transition-all ${formData.time === time
                                                        ? 'bg-primary text-white shadow-md transform scale-105'
                                                        : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex justify-end">
                                    <button
                                        onClick={nextStep}
                                        disabled={!formData.date || !formData.time}
                                        className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                                    >
                                        Continue <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Details Form */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8 lg:p-12 flex flex-col h-full overflow-y-auto"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={prevStep} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                        <ArrowLeft className="w-6 h-6 text-gray-400" />
                                    </button>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('form.title')}</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.name')}</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.email')}</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.company')}</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                            placeholder="Company Ltd."
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Sending...' : <>{t('form.submit')} <Send className="w-5 h-5" /></>}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* Step 4: Success */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 lg:p-12 flex flex-col h-full items-center justify-center text-center"
                            >
                                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('success.title')}</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">{t('success.subtitle')}</p>
                                <Link
                                    href="/"
                                    className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-200 transition-colors"
                                >
                                    {t('success.home')}
                                </Link>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
