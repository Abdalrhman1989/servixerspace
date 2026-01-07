import { useTranslations } from 'next-intl';
import Services from "@/components/Services";
import Cta from "@/components/Cta";

export default function ServicesPage() {
    const t = useTranslations('Services');

    return (
        <div className="flex flex-col min-h-screen">
            <div className="pt-4">
                {/* Header removed to avoid duplication */}
            </div>
            <Services />
            <Cta />
        </div>
    );
}
