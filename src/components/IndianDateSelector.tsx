import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

interface IndianDateSelectorProps {
  id?: string;
  value: string; // "YYYY-MM-DD" or "DD-MM-YYYY"
  onChange: (value: string) => void;
  required?: boolean;
  onFocus?: (e: React.FocusEvent<any>) => void;
  minDate?: string;
}

export default function IndianDateSelector({
  id = "indian-date-selector",
  value,
  onChange,
  required = false,
  onFocus,
  minDate
}: IndianDateSelectorProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const hiddenDateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Parse day, month, year from value
  const parseParts = (val: string) => {
    if (!val) return { day: "", month: "", year: "" };
    // Check YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split('-');
      return { day: d, month: m, year: y };
    }
    // Check DD-MM-YYYY or DD/MM/YYYY
    if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(val)) {
      const parts = val.split(/[-/]/);
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    return { day: "", month: "", year: "" };
  };

  const { day, month, year } = parseParts(value);

  // Current year setup
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => String(currentYear + i));

  // Months array
  const months = [
    { value: "01", label: "01 - Jan" },
    { value: "02", label: "02 - Feb" },
    { value: "03", label: "03 - Mar" },
    { value: "04", label: "04 - Apr" },
    { value: "05", label: "05 - May" },
    { value: "06", label: "06 - Jun" },
    { value: "07", label: "07 - Jul" },
    { value: "08", label: "08 - Aug" },
    { value: "09", label: "09 - Sep" },
    { value: "10", label: "10 - Oct" },
    { value: "11", label: "11 - Nov" },
    { value: "12", label: "12 - Dec" }
  ];

  // Dynamic days count in month
  const getDaysInMonth = (mStr: string, yStr: string) => {
    const mNum = parseInt(mStr, 10);
    const yNum = parseInt(yStr, 10) || currentYear;
    if (!mNum || mNum < 1 || mNum > 12) return 31;
    return new Date(yNum, mNum, 0).getDate();
  };

  const daysCount = getDaysInMonth(month, year);
  const days = Array.from({ length: daysCount }, (_, i) => String(i + 1).padStart(2, '0'));

  const handlePartChange = (newDay: string, newMonth: string, newYear: string) => {
    // If user changes month and day exceeds month length
    let finalDay = newDay;
    if (newDay && newMonth) {
      const maxDays = getDaysInMonth(newMonth, newYear);
      if (parseInt(newDay, 10) > maxDays) {
        finalDay = String(maxDays).padStart(2, '0');
      }
    }

    if (finalDay && newMonth && newYear) {
      onChange(`${newYear}-${newMonth}-${finalDay}`);
    } else if (!finalDay && !newMonth && !newYear) {
      onChange("");
    } else {
      // Partially set: store as YYYY-MM-DD or standard temporary string
      const y = newYear || String(currentYear);
      const m = newMonth || "01";
      const d = finalDay || "01";
      onChange(`${y}-${m}-${d}`);
    }
  };

  const handleDesktopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Convert to ISO "YYYY-MM-DD" for desktop date input
  const getIsoValue = () => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(value)) {
      const parts = value.split(/[-/]/);
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return "";
  };

  // Month name lookup for friendly display
  const getMonthName = (mStr: string) => {
    const m = months.find(item => item.value === mStr);
    return m ? m.label.split(' - ')[1] : "";
  };

  const hasFullDate = Boolean(day && month && year);

  return (
    <div className="w-full">
      {/* --- MOBILE VIEW: Strictly Indian Standard DAY, MONTH, YEAR dropdowns --- */}
      <div className="block md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {/* DAY (DD) */}
          <div className="relative">
            <select
              id={`${id}-day`}
              required={required && !isDesktop}
              value={day}
              onChange={(e) => handlePartChange(e.target.value, month, year)}
              onFocus={onFocus}
              className="w-full h-[48px] pl-3 pr-7 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-[13px] text-[#241F20] appearance-none rounded-[10px] font-sans-premium transition-colors"
            >
              <option value="" disabled={required}>Day (DD)</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#241F20]/40">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* MONTH (MM) */}
          <div className="relative">
            <select
              id={`${id}-month`}
              required={required && !isDesktop}
              value={month}
              onChange={(e) => handlePartChange(day, e.target.value, year)}
              onFocus={onFocus}
              className="w-full h-[48px] pl-2.5 pr-6 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-[13px] text-[#241F20] appearance-none rounded-[10px] font-sans-premium transition-colors"
            >
              <option value="" disabled={required}>Month (MM)</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#241F20]/40">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* YEAR (YYYY) */}
          <div className="relative">
            <select
              id={`${id}-year`}
              required={required && !isDesktop}
              value={year}
              onChange={(e) => handlePartChange(day, month, e.target.value)}
              onFocus={onFocus}
              className="w-full h-[48px] pl-2.5 pr-6 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-[13px] text-[#241F20] appearance-none rounded-[10px] font-sans-premium transition-colors"
            >
              <option value="" disabled={required}>Year (YYYY)</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#241F20]/40">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Selected Indian Standard Format Confirmation / Indicator */}
        <div className="flex items-center justify-between text-[11px] text-[#241F20]/60 mt-1.5 px-0.5">
          {hasFullDate ? (
            <div className="flex items-center gap-1.5 text-[#7A2027] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A2027] inline-block animate-pulse" />
              <span>Selected: <strong>{day} {getMonthName(month)} {year}</strong></span>
              <span className="text-[#C9A227] font-semibold">({day}-{month}-{year})</span>
            </div>
          ) : (
            <span className="text-[#8F8984]">Format: Day (DD) - Month (MM) - Year (YYYY)</span>
          )}

          {/* Native picker trigger button for quick calendar selection */}
          <button
            type="button"
            onClick={() => {
              if (hiddenDateInputRef.current) {
                if (typeof hiddenDateInputRef.current.showPicker === 'function') {
                  hiddenDateInputRef.current.showPicker();
                } else {
                  hiddenDateInputRef.current.focus();
                }
              }
            }}
            className="inline-flex items-center gap-1 text-[#7A2027] hover:text-[#55151B] font-semibold cursor-pointer underline text-[11px]"
          >
            <CalendarIcon className="w-3 h-3 text-[#7A2027]" />
            <span>Calendar</span>
          </button>
        </div>

        {/* Hidden date input for mobile native picker bridge */}
        <input
          ref={hiddenDateInputRef}
          type="date"
          tabIndex={-1}
          aria-hidden="true"
          min={minDate}
          value={getIsoValue()}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              const [y, m, d] = val.split('-');
              handlePartChange(d, m, y);
            }
          }}
          className="absolute opacity-0 pointer-events-none w-0 h-0 -z-10"
        />
      </div>

      {/* --- DESKTOP VIEW: Full native calendar input --- */}
      <div className="hidden md:block relative">
        <input
          type="date"
          id={id}
          required={required && isDesktop}
          min={minDate}
          value={getIsoValue()}
          onChange={handleDesktopChange}
          onFocus={onFocus}
          className="w-full h-[48px] px-4 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-sm text-[#241F20] transition-colors duration-200 rounded-[10px] font-sans-premium outline-none"
          placeholder="dd-mm-yyyy"
        />
        {hasFullDate && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none text-[11.5px] font-medium text-[#7A2027]">
            {day}-{month}-{year}
          </div>
        )}
      </div>
    </div>
  );
}
