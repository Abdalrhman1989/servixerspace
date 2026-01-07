import { useTranslations } from 'next-intl';
import About from "@/components/About";
import Team from "@/components/Team";
import Stats from "@/components/Stats";

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-transparent pt-4">
                <About />
                <Stats />
                <Team />
            </div>
        </div>
    );
}
