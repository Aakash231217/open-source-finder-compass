
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        <Search size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No projects found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn't find any projects matching your filters. Try changing your search criteria or reset filters to see all projects.
      </p>
      <Button onClick={onReset}>Reset Filters</Button>
    </div>
  );
};

export default EmptyState;
