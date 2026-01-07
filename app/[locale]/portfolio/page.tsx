import Portfolio from "@/components/Portfolio";

export default function PortfolioPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="pt-4">
                {/* Header removed to avoid duplication */}
            </div>
            <Portfolio />
        </div>
    );
}
