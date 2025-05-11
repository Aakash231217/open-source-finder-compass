
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = 'No projects found',
  description = 'We couldn\'t find any projects matching your filters. Try changing your search criteria or reset filters to see all projects.',
  action,
  icon = <Search size={32} className="text-muted-foreground" />,
  onReset
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      {action || (onReset && <Button onClick={onReset}>Reset Filters</Button>)}
    </div>
  );
};

export default EmptyState;
