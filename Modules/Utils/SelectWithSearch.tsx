"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PaginationProps = {
  page?: number;
  label?: string;

  onNext?: () => void;
  onPrev?: () => void;

  canNext?: boolean;
  canPrev?: boolean;
};

interface SearchSelectProps<T> {
  items: T[];
  value?: string | string[];
  onSelect: (value: string | string[]) => void;

  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  getSearchValue: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;

  searchValue?: string;
  onSearchChange?: (val: string) => void;

  pagination?: PaginationProps;
}

export function SelectWithSearch<T>({
  items,
  value,
  onSelect,
  multiple = false,
  placeholder = "Select item...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  getValue,
  getLabel,
  getSearchValue,
  renderItem,

  searchValue,
  onSearchChange,
  pagination,
}: SearchSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  const isSelected = React.useCallback(
    (itemValue: string) => {
      if (multiple && Array.isArray(value)) return value.includes(itemValue);
      return value === itemValue;
    },
    [multiple, value],
  );

  const handleSelect = (itemValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      const index = currentValues.indexOf(itemValue);

      if (index > -1) currentValues.splice(index, 1);
      else currentValues.push(itemValue);

      onSelect(currentValues);
    } else {
      onSelect(itemValue);
      setOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (!multiple) return;
    const allIds = items.map((item) => getValue(item));
    if (Array.isArray(value) && value.length === items.length) onSelect([]);
    else onSelect(allIds);
  };

  const selectedDisplay = React.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      return `${value.length} selected`;
    }
    const selected = items.find((item) => getValue(item) === value);
    return selected ? getLabel(selected) : placeholder;
  }, [items, value, getValue, getLabel, placeholder, multiple]);

  const showPager =
    !!pagination &&
    (typeof pagination.onNext === "function" ||
      typeof pagination.onPrev === "function");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal min-h-11 h-auto py-2 px-3",
          )}
        >
          <div className="flex flex-wrap gap-1.5 overflow-hidden">
            {multiple && Array.isArray(value) && value.length > 0 ? (
              items
                .filter((item) => value.includes(getValue(item)))
                .slice(0, 3)
                .map((item) => (
                  <Badge
                    key={getValue(item)}
                    variant="secondary"
                    className="font-medium"
                  >
                    {getLabel(item)}
                  </Badge>
                ))
            ) : (
              <span className="truncate">{selectedDisplay}</span>
            )}

            {multiple && Array.isArray(value) && value.length > 3 && (
              <Badge variant="outline" className="border-dashed">
                +{value.length - 3} more
              </Badge>
            )}
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command className="rounded-lg">
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-11"
            value={searchValue}
            onValueChange={onSearchChange}
          />

          {showPager && (
            <>
              <div className="flex items-center justify-between gap-2 px-2 py-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={pagination?.onPrev}
                  disabled={pagination?.canPrev === false}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Prev
                </Button>

                <div className="text-xs text-muted-foreground truncate px-2">
                  {pagination?.label ??
                    (pagination?.page ? `Page ${pagination.page}` : "")}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={pagination?.onNext}
                  disabled={pagination?.canNext === false}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <CommandSeparator />
            </>
          )}

          <CommandList className="max-h-75 overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm">
              {emptyMessage}
            </CommandEmpty>

            {multiple && items.length > 0 && (
              <>
                <CommandGroup>
                  <CommandItem
                    onSelect={handleSelectAll}
                    className="cursor-pointer font-medium"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        Array.isArray(value) && value.length === items.length
                          ? "opacity-100"
                          : "opacity-50",
                      )}
                    >
                      {Array.isArray(value) &&
                        value.length === items.length && (
                          <Check className="h-3 w-3" />
                        )}
                    </div>
                    <Users className="mr-2 h-4 w-4 opacity-60" />
                    {Array.isArray(value) && value.length === items.length
                      ? "Deselect All"
                      : "Select All"}
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            <CommandGroup>
              {items.map((item) => {
                const itemValue = getValue(item);
                const active = isSelected(itemValue);

                return (
                  <CommandItem
                    key={itemValue}
                    value={getSearchValue(item)}
                    onSelect={() => handleSelect(itemValue)}
                    className="cursor-pointer py-2 px-3"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        active ? "opacity-100" : "opacity-50",
                      )}
                    >
                      {active && <Check className="h-3 w-3" />}
                    </div>

                    <div className="flex-1 truncate">
                      {renderItem ? renderItem(item) : getLabel(item)}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
