
type ImageSkeletonProps = {
    width?: number;
    height?: number;
}

export default function ImageSkeleton({ width = 1200, height = 620 }: ImageSkeletonProps) {
    return (
        <div className="relative w-full overflow-hidden rounded-md bg-gray-200" style={{ aspectRatio: `${width}/${height}` }}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex h-full flex-col items-center justify-center space-y-3">
                <svg className="h-10 w-10 animate-bounce text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-gray-500 animate-pulse">Optimizando Imagen</p>
            </div>
        </div>
    )
}
