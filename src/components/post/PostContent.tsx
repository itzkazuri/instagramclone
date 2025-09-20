const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${Math.floor(diff / (1000 * 60))}m`;
};

interface PostContentProps {
    content: string;
    character?: string;
    series?: string;
    costume?: string;
    createdAt: string;
}

export function PostContent({ content, character, series, costume, createdAt }: PostContentProps) {
    return (
        <div className="p-3 md:p-4 border-b">
            <p className="text-xs md:text-sm mb-2 md:mb-3">{content}</p>

            {(character || series || costume) && (
                <div className="bg-gray-50 rounded-lg p-2 md:p-3 space-y-1 text-[10px] md:text-xs">
                    {character && <div><span className="font-semibold">Character:</span> {character}</div>}
                    {series && <div><span className="font-semibold">Series:</span> {series}</div>}
                    {costume && <div><span className="font-semibold">Costume:</span> {costume}</div>}
                </div>
            )}

            <div className="text-[10px] md:text-xs text-gray-500 mt-2 uppercase">{formatTime(createdAt)} ago</div>
        </div>
    );
}
