export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <div className="relative w-20 h-20">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 dark:border-blue-400/20 animate-ping"></div>

                {/* Inner spinning ring */}
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary dark:border-t-blue-400 animate-spin"></div>

                {/* Center logo dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary dark:bg-blue-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
