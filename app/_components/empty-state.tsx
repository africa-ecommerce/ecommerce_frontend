import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  showBorder?: boolean;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  showBorder = true,
}: EmptyStateProps) => (
  <div className={`w-full ${showBorder ? 'border-t' : ''}`}>
    <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground mt-2 mb-6 max-w-md">
        {description}
      </p>
      {onAction && actionText && (
        <Button onClick={onAction} className="bg-orange-500 hover:bg-orange-600">
          {actionText}
        </Button>
      )}
    </div>
  </div>
);

export default EmptyState;