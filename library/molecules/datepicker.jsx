/**
 * DatePicker Component (Molecule)
 *
 * A calendar date picker with single date and range selection support.
 * Uses Tailwind CSS with design tokens.
 */

import React, { useState, useMemo } from "react";
import { cx } from "../utils/cx.js";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Day variants */
export const DAY_VARIANTS = {
  default: "default",
  outside: "outside",
  disabled: "disabled",
  today: "today",
  selected: "selected",
  inbetween: "inbetween",
  rangeStart: "range-start",
  rangeEnd: "range-end",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  day: [
    "w-[1.625rem] h-[1.625rem] p-1 rounded-full",
    "inline-flex flex-col justify-center items-center",
    "font-primary text-body-md font-normal",
    "cursor-pointer select-none border-none bg-transparent",
    "transition-all duration-fast box-border",
    "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-1",
  ].join(" "),

  dayVariants: {
    default: "text-content-secondary hover:not-disabled:bg-primary-50 hover:not-disabled:text-neutral-700",
    outside: "text-content-tertiary hover:not-disabled:bg-primary-50 hover:not-disabled:text-neutral-700",
    disabled: "text-content-tertiary cursor-not-allowed",
    today: [
      "bg-background-white text-content-secondary",
      "outline outline-1 -outline-offset-1 outline-outline-neutral",
      "hover:not-disabled:bg-neutral-50 hover:not-disabled:outline-neutral-400 hover:not-disabled:text-neutral-700",
    ].join(" "),
    selected: "bg-primary-500 text-content-inverted hover:not-disabled:bg-primary-600",
    inbetween: "bg-primary-50 text-neutral-900 rounded-none hover:not-disabled:bg-primary-100",
    "range-start": "bg-primary-500 text-content-inverted rounded-l-full rounded-r-none",
    "range-end": "bg-primary-500 text-content-inverted rounded-r-full rounded-l-none",
  },

  calendar: [
    "inline-flex flex-col gap-2 p-3",
    "bg-background-white rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "font-primary",
  ].join(" "),

  header: "flex items-center justify-between gap-4 h-[1.625rem]",
  nav: "flex items-center justify-between flex-1",

  navBtn: [
    "flex items-center justify-center size-6 p-1",
    "bg-transparent border-none rounded-sm text-content-secondary cursor-pointer",
    "transition-all duration-fast",
    "hover:not-disabled:bg-background-neutral-lighter hover:not-disabled:text-content-primary",
    "disabled:text-content-tertiary disabled:cursor-not-allowed",
  ].join(" "),

  monthLabel: "text-body-md font-normal text-content-primary text-center",

  year: "flex items-center gap-1",
  yearLabel: "text-body-md font-normal text-content-primary",

  weekdays: "flex justify-between",
  weekday: [
    "w-6 h-6 p-1 flex items-center justify-center",
    "text-body-caption font-normal text-content-secondary",
  ].join(" "),

  days: "flex flex-col gap-0.5",
  week: "flex justify-start",

  dual: "flex gap-4",
  divider: "w-px bg-outline-neutral self-stretch",
  month: "flex flex-col gap-2",
};

// ─────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false;
  const time = date.getTime();
  return time > startDate.getTime() && time < endDate.getTime();
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// ─────────────────────────────────────────────
// DAY COMPONENT
// ─────────────────────────────────────────────

/**
 * Day
 *
 * Individual day cell in the calendar.
 *
 * @param {number} day - Day number (1-31)
 * @param {string} variant - default | outside | disabled | today | selected | inbetween | range-start | range-end
 * @param {boolean} isDisabled - Disables the day
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
export const Day = ({
  day,
  variant = DAY_VARIANTS.default,
  isDisabled = false,
  disabled, // Support legacy prop
  onClick,
  className = "",
  ...props
}) => {
  const isDayDisabled = isDisabled || disabled;

  const handleClick = (e) => {
    if (isDayDisabled) return;
    onClick?.(e);
  };

  const classes = cx(
    styles.day,
    styles.dayVariants[variant],
    isDayDisabled && styles.dayVariants.disabled,
    className
  );

  return (
    <button
      type="button"
      className={classes}
      disabled={isDayDisabled}
      onClick={handleClick}
      tabIndex={isDayDisabled ? -1 : 0}
      {...props}
    >
      {day}
    </button>
  );
};

Day.displayName = "Day";
Day.variants = DAY_VARIANTS;

// ─────────────────────────────────────────────
// CALENDAR MONTH COMPONENT
// ─────────────────────────────────────────────

const CalendarMonth = ({
  year,
  month,
  selectedDate,
  rangeStart,
  rangeEnd,
  today,
  minDate,
  maxDate,
  onDayClick,
  onPrevMonth,
  onNextMonth,
  showNavigation = true,
  disablePrevNav = false,
  disableNextNav = false,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];
    let dayCounter = 1;
    let nextMonthDay = 1;

    // Previous month days
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = prevMonthDays - firstDayOfWeek + i + 1;
      currentWeek.push({ day, isOutside: true, isPrevMonth: true });
    }

    // Current month days
    while (dayCounter <= daysInMonth) {
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push({ day: dayCounter, isOutside: false });
      dayCounter++;
    }

    // Next month days
    while (currentWeek.length < 7) {
      currentWeek.push({ day: nextMonthDay, isOutside: true, isNextMonth: true });
      nextMonthDay++;
    }
    result.push(currentWeek);

    // Ensure 6 weeks for consistent height
    while (result.length < 6) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push({ day: nextMonthDay, isOutside: true, isNextMonth: true });
        nextMonthDay++;
      }
      result.push(week);
    }

    return result;
  }, [year, month, daysInMonth, firstDayOfWeek, prevMonthDays]);

  const getDayVariant = (dayInfo) => {
    const { day, isOutside, isPrevMonth, isNextMonth } = dayInfo;

    let dateYear = year;
    let dateMonth = month;

    if (isPrevMonth) {
      dateMonth = month - 1;
      if (dateMonth < 0) {
        dateMonth = 11;
        dateYear = year - 1;
      }
    } else if (isNextMonth) {
      dateMonth = month + 1;
      if (dateMonth > 11) {
        dateMonth = 0;
        dateYear = year + 1;
      }
    }

    const date = new Date(dateYear, dateMonth, day);

    // Check if disabled
    const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);

    if (isDisabled) return "disabled";
    if (isOutside) return "outside";

    // Check for range selection
    if (rangeStart && rangeEnd) {
      if (isSameDay(date, rangeStart)) return "range-start";
      if (isSameDay(date, rangeEnd)) return "range-end";
      if (isDateInRange(date, rangeStart, rangeEnd)) return "inbetween";
    }

    // Check for single selection
    if (selectedDate && isSameDay(date, selectedDate)) return "selected";
    if (rangeStart && isSameDay(date, rangeStart)) return "selected";

    // Check for today
    if (isSameDay(date, today)) return "today";

    return "default";
  };

  const handleDayClick = (dayInfo) => {
    const { day, isPrevMonth, isNextMonth } = dayInfo;

    let dateYear = year;
    let dateMonth = month;

    if (isPrevMonth) {
      dateMonth = month - 1;
      if (dateMonth < 0) {
        dateMonth = 11;
        dateYear = year - 1;
      }
    } else if (isNextMonth) {
      dateMonth = month + 1;
      if (dateMonth > 11) {
        dateMonth = 0;
        dateYear = year + 1;
      }
    }

    const date = new Date(dateYear, dateMonth, day);
    onDayClick?.(date);
  };

  return (
    <div className={styles.month}>
      {showNavigation && (
        <div className={styles.header}>
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={onPrevMonth}
              disabled={disablePrevNav}
              aria-label="Previous month"
            >
              <Icon name="ChevronLeft" size="sm" />
            </button>
            <span className={styles.monthLabel}>{MONTHS[month]}</span>
            <button
              type="button"
              className={styles.navBtn}
              onClick={onNextMonth}
              disabled={disableNextNav}
              aria-label="Next month"
            >
              <Icon name="ChevronRight" size="sm" />
            </button>
          </div>
          <div className={styles.year}>
            <span className={styles.yearLabel}>{year}</span>
            <button type="button" className={styles.navBtn} aria-label="Select year">
              <Icon name="ChevronDown" size="sm" />
            </button>
          </div>
        </div>
      )}

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={styles.week}>
            {week.map((dayInfo, dayIndex) => {
              const variant = getDayVariant(dayInfo);
              return (
                <Day
                  key={dayIndex}
                  day={dayInfo.day}
                  variant={variant}
                  isDisabled={variant === "disabled"}
                  onClick={() => handleDayClick(dayInfo)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// DATEPICKER COMPONENT
// ─────────────────────────────────────────────

/**
 * DatePicker
 *
 * A calendar component for selecting single dates or date ranges.
 *
 * @param {Date} value - Selected date (single mode)
 * @param {Date} defaultValue - Default selected date (uncontrolled)
 * @param {Date} rangeStart - Start date for range selection
 * @param {Date} rangeEnd - End date for range selection
 * @param {boolean} range - Enable range selection mode
 * @param {boolean} dual - Show two months side by side
 * @param {Date} minDate - Minimum selectable date
 * @param {Date} maxDate - Maximum selectable date
 * @param {function} onChange - Called when date is selected: (date) => void
 * @param {function} onRangeChange - Called when range changes: ({ start, end }) => void
 * @param {string} className - Additional CSS classes
 *
 * @example
 * // Single date selection
 * <DatePicker value={date} onChange={setDate} />
 *
 * // Range selection
 * <DatePicker
 *   range
 *   dual
 *   rangeStart={startDate}
 *   rangeEnd={endDate}
 *   onRangeChange={({ start, end }) => { setStartDate(start); setEndDate(end); }}
 * />
 */
export const DatePicker = ({
  value,
  defaultValue,
  rangeStart: controlledRangeStart,
  rangeEnd: controlledRangeEnd,
  range = false,
  dual = false,
  minDate,
  maxDate,
  onChange,
  onRangeChange,
  className = "",
  ...props
}) => {
  const today = useMemo(() => new Date(), []);

  // State for displayed month/year
  const [viewDate, setViewDate] = useState(() => {
    const initialDate = value || defaultValue || controlledRangeStart || today;
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  // State for uncontrolled single selection
  const [internalValue, setInternalValue] = useState(defaultValue || null);
  const selectedDate = value !== undefined ? value : internalValue;

  // State for range selection
  const [internalRangeStart, setInternalRangeStart] = useState(null);
  const [internalRangeEnd, setInternalRangeEnd] = useState(null);
  const rangeStart = controlledRangeStart !== undefined ? controlledRangeStart : internalRangeStart;
  const rangeEnd = controlledRangeEnd !== undefined ? controlledRangeEnd : internalRangeEnd;

  const handlePrevMonth = () => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDayClick = (date) => {
    if (range) {
      // Range selection logic
      if (!rangeStart || (rangeStart && rangeEnd)) {
        // Start new range
        setInternalRangeStart(date);
        setInternalRangeEnd(null);
        onRangeChange?.({ start: date, end: null });
      } else {
        // Complete range
        if (date < rangeStart) {
          setInternalRangeStart(date);
          setInternalRangeEnd(rangeStart);
          onRangeChange?.({ start: date, end: rangeStart });
        } else {
          setInternalRangeEnd(date);
          onRangeChange?.({ start: rangeStart, end: date });
        }
      }
    } else {
      // Single date selection
      if (value === undefined) {
        setInternalValue(date);
      }
      onChange?.(date);
    }
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;

  const classes = cx(styles.calendar, className);

  if (dual) {
    return (
      <div className={classes} {...props}>
        <div className={styles.dual}>
          <CalendarMonth
            year={year}
            month={month}
            selectedDate={selectedDate}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            today={today}
            minDate={minDate}
            maxDate={maxDate}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            disableNextNav={true}
          />
          <div className={styles.divider} />
          <CalendarMonth
            year={nextMonthYear}
            month={nextMonth}
            selectedDate={selectedDate}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            today={today}
            minDate={minDate}
            maxDate={maxDate}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            disablePrevNav={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      <CalendarMonth
        year={year}
        month={month}
        selectedDate={selectedDate}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        today={today}
        minDate={minDate}
        maxDate={maxDate}
        onDayClick={handleDayClick}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
