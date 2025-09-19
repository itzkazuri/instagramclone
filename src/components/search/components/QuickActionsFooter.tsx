import { Badge } from "@/components/ui/badge";

interface QuickActionsFooterProps {
  searchQuery: string;
  resultsLength: number;
}

export const QuickActionsFooter = ({ searchQuery, resultsLength }: QuickActionsFooterProps) => {
  if (searchQuery || resultsLength > 0) return null;

  return (
    <div className="border-t bg-gray-50/50 p-4">
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-3">Discover new accounts</p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
            #cosplay
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
            #anime
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
            #art
          </Badge>
        </div>
      </div>
    </div>
  );
};