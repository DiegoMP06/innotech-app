
type BlogImageProps = {
    url: string;
    alt?: string;
}

export default function BlogImage({ url, alt }: BlogImageProps) {
    return (
        <div className="mx-auto my-6">
            <div className="flex justify-center">
                <img src={url} alt={alt} className="w-full rounded block max-w-xl h-auto" />
            </div>
            {alt && (
                <span className="text-xs text-muted-foreground text-center block mt-2">
                    {alt}
                </span>
            )}
        </div>
    )
}
