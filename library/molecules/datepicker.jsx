/**
 * DatePicker Component (Molecule)
 *
 * A calendar date picker with single date and range selection support.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useState, useMemo } from "react";
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
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  day: {
    width: 26,
    height: 26,
    padding: 4,
    borderRadius: "var(--radius-full)",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    cursor: "pointer",
    userSelect: "none",
    border: "none",
    background: "transparent",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  dayVariants: {
    default: {
      color: "var(--color-content-secondary)",
    },
    defaultHover: {
      background: "var(--color-general-informative)",
      color: "var(--color-content-primary)",
    },
    outside: {
      color: "var(--color-content-tertiary)",
    },
    outsideHover: {
      background: "var(--color-general-informative)",
      color: "var(--color-content-primary)",
    },
    disabled: {
      color: "var(--color-content-tertiary)",
      cursor: "not-allowed",
    },
    today: {
      background: "var(--color-general-white)",
      color: "var(--color-content-secondary)",
      outline: "1px solid var(--color-action-outline-secondary-enabled)",
      outlineOffset: -1,
    },
    todayHover: {
      background: "var(--color-general-neutral-lighter)",
      outlineColor: "var(--color-general-neutral-dark)",
      color: "var(--color-content-primary)",
    },
    selected: {
      background: "var(--color-action-fill-primary-enabled)",
      color: "var(--color-general-white)",
    },
    selectedHover: {
      background: "var(--color-action-fill-primary-hover)",
    },
    inbetween: {
      background: "var(--color-general-informative)",
      color: "var(--color-content-primary)",
      borderRadius: 0,
    },
    inbetweenHover: {
      background: "var(--color-general-neutral-light)",
    },
    "range-start": {
      background: "var(--color-action-fill-primary-enabled)",
      color: "var(--color-general-white)",
      borderRadius: "var(--radius-full) 0 0 var(--radius-full)",
    },
    "range-end": {
      background: "var(--color-action-fill-primary-enabled)",
      color: "var(--color-general-white)",
      borderRadius: "0 var(--radius-full) var(--radius-full) 0",
    },
  },

  calendar: {
    display: "inline-flex",
    flexDirection: "column",
    gap: 8,
    padding: 12,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: -1,
    fontFamily: "var(--font-family-primary)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    height: 26,
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },

  navBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    padding: 4,
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-content-secondary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },

  navBtnHover: {
    background: "var(--color-general-neutral-lighter)",
    color: "var(--color-content-primary)",
  },

  navBtnDisabled: {
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },

  monthLabel: {
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    textAlign: "center",
  },

  year: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  yearLabel: {
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },

  weekdays: {
    display: "flex",
    justifyContent: "space-between",
  },

  weekday: {
    width: 24,
    height: 24,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "var(--text-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },

  days: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  week: {
    display: "flex",
    justifyContent: "flex-start",
  },

  dual: {
    display: "flex",
    gap: 16,
  },

  divider: {
    width: 1,
    background: "var(--color-action-outline-secondary-enabled)",
    alignSelf: "stretch",
  },

  month: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
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
 */
export const Day = ({
  day,
  variant = DAY_VARIANTS.default,
  isDisabled = false,
  disabled, // Support legacy prop
  onClick,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDayDisabled = isDisabled || disabled;

  const handleClick = (e) => {
    if (isDayDisabled) return;
    onClick?.(e);
  };

  // Get variant styles
  const variantStyle = styles.dayVariants[variant] || styles.dayVariants.default;
  const hoverVariantKey = `${variant}Hover`;
  const hoverStyle = styles.dayVariants[hoverVariantKey];

  const dayStyle = {
    ...styles.day,
    ...variantStyle,
    ...(isHovered && !isDayDisabled && hoverStyle),
    ...(isDayDisabled && styles.dayVariants.disabled),
    ...style,
  };

  return (
    <button
      type="button"
      style={dayStyle}
      disabled={isDayDisabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
// NAV BUTTON COMPONENT
// ─────────────────────────────────────────────

const NavButton = ({ onClick, disabled, ariaLabel, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    ...styles.navBtn,
    ...(isHovered && !disabled && styles.navBtnHover),
    ...(disabled && styles.navBtnDisabled),
  };

  return (
    <button
      type="button"
      style={btnStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

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
    <div style={styles.month}>
      {showNavigation && (
        <div style={styles.header}>
          <div style={styles.nav}>
            <NavButton
              onClick={onPrevMonth}
              disabled={disablePrevNav}
              ariaLabel="Previous month"
            >
              <Icon name="ChevronLeft" size="sm" />
            </NavButton>
            <span style={styles.monthLabel}>{MONTHS[month]}</span>
            <NavButton
              onClick={onNextMonth}
              disabled={disableNextNav}
              ariaLabel="Next month"
            >
              <Icon name="ChevronRight" size="sm" />
            </NavButton>
          </div>
          <div style={styles.year}>
            <span style={styles.yearLabel}>{year}</span>
            <NavButton ariaLabel="Select year">
              <Icon name="ChevronDown" size="sm" />
            </NavButton>
          </div>
        </div>
      )}

      <div style={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <div key={day} style={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div style={styles.days}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} style={styles.week}>
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
  style,
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

  const calendarStyle = {
    ...styles.calendar,
    ...style,
  };

  if (dual) {
    return (
      <div style={calendarStyle} {...props}>
        <div style={styles.dual}>
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
          <div style={styles.divider} />
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
    <div style={calendarStyle} {...props}>
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
