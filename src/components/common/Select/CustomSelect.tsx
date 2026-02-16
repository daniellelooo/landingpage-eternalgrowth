import { useEffect, useId, useRef, useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  name: string;
  label: string;
  options: SelectOption[];
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
  hideLabel?: boolean;
};

const CustomSelect = ({
  name,
  label,
  options,
  value,
  placeholder = "Selecciona una opcion",
  required = false,
  onChange,
  className,
  hideLabel = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setHighlightedIndex((prev) => prev ?? 0);
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => {
        const nextIndex =
          prev === null ? 0 : Math.min(prev + 1, options.length - 1);
        return nextIndex;
      });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => {
        const nextIndex =
          prev === null ? options.length - 1 : Math.max(prev - 1, 0);
        return nextIndex;
      });
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex((prev) => prev ?? 0);
        return;
      }

      if (highlightedIndex !== null) {
        handleSelect(options[highlightedIndex]);
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(null);
    }
  };

  return (
    <div
      className={`custom-select${className ? ` ${className}` : ""}`}
      ref={containerRef}
    >
      <input type="hidden" name={name} value={value} required={required} />
      {!hideLabel && <span className="custom-select-label">{label}</span>}
      <button
        type="button"
        className={`custom-select-trigger ${isOpen ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? "" : "custom-select-placeholder"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="custom-select-arrow" aria-hidden="true" />
      </button>
      {isOpen && (
        <ul className="custom-select-menu" role="listbox" id={listboxId}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`custom-select-option ${
                option.value === value ? "is-selected" : ""
              } ${highlightedIndex === index ? "is-highlighted" : ""}`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
