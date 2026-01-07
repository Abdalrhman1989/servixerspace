import Contact from "@/components/Contact";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="pt-4">
                {/* Header removed to avoid duplication */}
            </div>
            <div className="bg-white dark:bg-slate-950 min-h-screen z-10">
                <Contact />
            </div>
        </div>
    );
}
