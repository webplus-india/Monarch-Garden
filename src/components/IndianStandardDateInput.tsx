import React, { useState, useEffect, useId } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface IndianStandardDateInputProps {
  id?: string;
  label: string;
  value: string; // Stored as YYYY-MM-DD
  onChange: (val: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>) => void;
  required?: boolean;
  isDesktop?: boolean;
  heightClass?: string;
}

const MONTHS = [
  { value: '01', label: '01 - Jan', name: 'January' },
  { value: '02', label: '02 - Feb', name: 'February' },
  { value: '03', label: '03 - Mar', name: 'March' },
  { value: '04', label: '04 - Apr', name: 'April' },
  { value: '05', label: '05 - May', name: 'May' },
  { value: '06', label: '06 - Jun', name: 'June' },
  { value: '07', label: '07 - Jul', name: 'July' },
  { value: '08', label: '08 - Aug', name: 'August' },
  { value: '09', label: '09 - Sep', name: 'September' },
  { value: '10', label: '10 - Oct', name: 'October' },
  { value: '11', label: '11 - Nov', name: 'November' },
  { value: '12', label: '12 - Dec', name: 'December' },
];

export default function IndianStandardDateInput({
  id = 'event-date',
  label,
  value,
  onChange,
  onFocus,
  required = true,
  isDesktop = false,
  heightClass = 'h-[48px]'
}: IndianStandardDateInputProps) {
  const autoId = useId();
  const inputId = id || autoId;

  // Generate Year options starting from current year (next 6 years)
  const currentYearNum = new Date().getFullYear();
  const YEARS = Array.from({ length: 6 }, (_, i) => String(currentYearNum + i));

  // Parse incoming value (supports YYYY-MM-DD or DD-MM-YYYY)
  const parseValue = (str: string) => {
    if (!str) return { day: '', month: '', year: '' };
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const [y, m, d] = str.split('-');
      return { day: d, month: m, year: y };
    }
    if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(str)) {
      const parts = str.split(/[-/]/);
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    return { day: '', month: '', year: '' };
  };

  const initialParsed = parseValue(value);
  const [day, setDay] = useState(initialParsed.day);
  const [month, setMonth] = useState(initialParsed.month);
  const [year, setYear] = useState(initialParsed.year);

  // Sync internal state when external value changes
  useEffect(() => {
    const parsed = parseValue(value);
    setDay(parsed.day);
    setMonth(parsed.month);
    setYear(parsed.year);
  }, [value]);

  // Calculate max days for the selected month/year
  const maxDays = React.useMemo(() => {
    const m = parseInt(month, 10);
    const y = parseInt(year, 10) || currentYearNum;
    if (!m) return 31;
    return new Date(y, m, 0).getDate();
  }, [month, year, currentYearNum]);

  // Generate Day options (01 to maxDays)
  const daysList = React.useMemo(() => {
    return Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0'));
  }, [maxDays]);

  // Update parent when mobile select changes
  const emitChange = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      onChange(`${newYear}-${newMonth}-${newDay}`);
    } else {
      onChange('');
    }
  };

  const handleDayChange = (val: string) => {
    setDay(val);
    emitChange(val, month, year);
  };

  const handleMonthChange = (val: string) => {
    let adjustedDay = day;
    if (day) {
      const m = parseInt(val, 10);
      const y = parseInt(year, 10) || currentYearNum;
      if (m) {
        const daysInNewMonth = new Date(y, m, 0).getDate();
        if (parseInt(day, 10) > daysInNewMonth) {
          adjustedDay = String(daysInNewMonth).padStart(2, '0');
          setDay(adjustedDay);
        }
      }
    }
    setMonth(val);
    emitChange(adjustedDay, val, year);
  };

  const handleYearChange = (val: string) => {
    let adjustedDay = day;
    if (day && month === '02') {
      const y = parseInt(val, 10);
      const daysInFeb = new Date(y, 2, 0).getDate();
      if (parseInt(day, 10) > daysInFeb) {
        adjustedDay = String(daysInFeb).padStart(2, '0');
        setDay(adjustedDay);
      }
    }
    setYear(val);
    emitChange(adjustedDay, month, val);
  };

  // Indian standard formatted display e.g. "15 Nov 2026"
  const formattedIndianDate = React.useMemo(() => {
    if (day && month && year) {
      const mObj = MONTHS.find((m) => m.value === month);
      const monthShort = mObj ? mObj.label.split(' - ')[1] : month;
      return `${day} ${monthShort} ${year}`;
    }
    return '';
  }, [day, month, year]);

  return (
    <div className="w-full">
      {/* Label with Indian Standard Day-Month-Year note */}
      <div className="flex items-center justify-between mb-1 font-sans-premium">
        <label
          htmlFor={isDesktop ? inputId : `${inputId}-day`}
          className="flex items-center gap-1.5 md:gap-2 text-[11px] uppercase tracking-[0.12em] md:tracking-[0.15em] font-bold text-[#241F20]"
        >
          <Calendar className="w-3.5 h-3.5 md:w-[16px] md:h-[16px] text-[#7A2027]" strokeWidth={1.8} />
          <span>{label}</span>
        </label>
        {/* Mobile-only indicator indicating Day-Month-Year format */}
        <span className="block md:hidden text-[10px] text-[#C9A227] font-bold uppercase tracking-[0.08em]">
          DAY / MONTH / YEAR
        </span>
      </div>

      {/* MOBILE VIEW: Indian Standard Day / Month / Year Dropdowns (Visible ONLY on Mobile) */}
      <div className="block md:hidden">
        <div className="grid grid-cols-3 gap-2">
          {/* 1. DAY (DD) */}
          <div className="relative">
            <select
              id={`${inputId}-day`}
              value={day}
              onChange={(e) => handleDayChange(e.target.value)}
              onFocus={onFocus}
              required={required && !isDesktop}
              className={`w-full ${heightClass} px-2.5 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-sm text-[#241F20] appearance-none rounded-[10px] font-sans-premium outline-none transition-colors duration-200 cursor-pointer`}
            >
              <option value="">Day (DD)</option>
              {daysList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#241F20]/40">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* 2. MONTH (MM) */}
          <div className="relative">
            <select
              id={`${inputId}-month`}
              value={month}
              onChange={(e) => handleMonthChange(e.target.value)}
              onFocus={onFocus}
              required={required && !isDesktop}
              className={`w-full ${heightClass} px-2 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-sm text-[#241F20] appearance-none rounded-[10px] font-sans-premium outline-none transition-colors duration-200 cursor-pointer`}
            >
              <option value="">Month (MM)</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#241F20]/40">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* 3. YEAR (YYYY) */}
          <div className="relative">
            <select
              id={`${inputId}-year`}
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              onFocus={onFocus}
              required={required && !isDesktop}
              className={`w-full ${heightClass} px-2 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-sm text-[#241F20] appearance-none rounded-[10px] font-sans-premium outline-none transition-colors duration-200 cursor-pointer`}
            >
              <option value="">Year (YYYY)</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#241F20]/40">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Mobile Indian standard verification pill */}
        <div className="flex items-center justify-between mt-1 px-1 text-[11px] text-[#8F8984] font-sans-premium">
          <span className="tracking-wide">Indian Standard: DD / MM / YYYY</span>
          {formattedIndianDate ? (
            <span className="text-[#7A2027] font-semibold flex items-center gap-1">
              ✓ {formattedIndianDate}
            </span>
          ) : (
            <span className="text-[#C9A227]/80 italic">Select Day, Month & Year</span>
          )}
        </div>
      </div>

      {/* DESKTOP VIEW: Native Date Input (Visible ONLY on Desktop md:block) */}
      <div className="hidden md:block">
        <input
          type="date"
          id={inputId}
          required={required && isDesktop}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${heightClass} px-4 bg-[#FCFBF8] border border-[#DED6C9] focus:outline-none focus:border-[#7A2027] focus:ring-1 focus:ring-[#7A2027]/20 text-sm text-[#241F20] transition-colors duration-200 rounded-[10px] font-sans-premium outline-none cursor-pointer`}
        />
      </div>
    </div>
  );
}
