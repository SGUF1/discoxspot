export default function DiscotecaLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center h-full w-full lg:w-[50%] lg:mx-auto">
            {children}
        </div>
    )
}