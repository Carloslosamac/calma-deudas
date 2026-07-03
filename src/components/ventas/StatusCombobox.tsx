import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
  includeAll?: boolean;
  allLabel?: string;
};

// Selector de estado con buscador escrito (combobox filtrable).
export const StatusCombobox = ({
  value,
  options,
  onChange,
  className,
  triggerClassName,
  placeholder = "Buscar estado…",
  includeAll = false,
  allLabel = "Todos los estados",
}: Props) => {
  const [open, setOpen] = useState(false);
  const label = includeAll && value === "todos" ? allLabel : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between font-normal", triggerClassName)}
        >
          <span className="truncate">{label || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[240px] p-0", className)} align="end">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList className="pointer-events-auto max-h-[320px]">
            <CommandEmpty>Sin resultados</CommandEmpty>
            <CommandGroup>
              {includeAll && (
                <CommandItem
                  value={allLabel}
                  onSelect={() => {
                    onChange("todos");
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === "todos" ? "opacity-100" : "opacity-0")} />
                  {allLabel}
                </CommandItem>
              )}
              {options.map((s) => (
                <CommandItem
                  key={s}
                  value={s}
                  onSelect={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === s ? "opacity-100" : "opacity-0")} />
                  {s}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
