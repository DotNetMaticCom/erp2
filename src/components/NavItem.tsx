import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  className?: string;
}

export default function NavItem({
  icon,
  text,
  active,
  badge,
  onClick,
  className
}: NavItemProps) {
  return (
    <button
      className={cn(
        "flex items-center px-4 py-2 w-full rounded-md text-sm font-medium transition-colors duration-200",
        active 
        ? "bg-navitem-active text-purple-accent font-medium"
        : "text-gray text-muted-foreground hover:bg-navitem-hover hover:text-purple-accent",
        className
      )}
      onClick={onClick}
    >
      <span className="inline-flex mr-3">
        {active 
        ? React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4 text-purple-accent" })
        : React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
      </span>
      {text}
      
      {/* Badge varsa göster */}
      {badge && (
        <div className={cn(
          "ml-auto text-xs rounded-full px-2 py-0.5 text-center min-w-[20px]",
          active 
          ? "bg-purple-accent/10 text-purple-accent"
          : "bg-muted text-muted-foreground"
        )}>
          {badge}
        </div>
      )}
    </button>
  );
  }
