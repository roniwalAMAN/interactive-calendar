"use client";

import { useEffect, useRef, useState } from "react";

const NOTES_STORAGE_KEY = "calendar-notes";
type NotesByDate = Record<string, string>;
const MONTH_NOTE_SUFFIX = "-month";

const HOLIDAY_MARKERS: Record<string, string> = {
  "01-01": "New Year",
  "02-14": "Valentine's Day",
  "03-08": "Women's Day",
  "04-22": "Earth Day",
  "06-21": "Yoga Day",
  "08-15": "Independence Day",
  "10-02": "Gandhi Jayanti",
  "12-25": "Christmas",
};
type MonthTheme = {
  pageBg: string;
  cardBg: string;
  sectionBg: string;
  headerBg: string;
  buttonHover: string;
  cellHover: string;
  selected: string;
  range: string;
  todayRing: string;
  noteBg: string;
  noteFocus: string;
};

const MONTH_THEMES: MonthTheme[] = [
  {
    pageBg: "bg-rose-50",
    cardBg: "bg-rose-50/40",
    sectionBg: "bg-rose-50/30",
    headerBg: "bg-rose-100/70",
    buttonHover: "hover:bg-rose-100 hover:text-rose-700",
    cellHover: "hover:bg-rose-50",
    selected: "bg-rose-600 text-white border-rose-600",
    range: "bg-rose-100 border-rose-200",
    todayRing: "ring-rose-300 border-rose-400",
    noteBg: "bg-rose-50/40",
    noteFocus: "focus:border-rose-500 focus:ring-rose-100",
  },
  {
    pageBg: "bg-amber-50",
    cardBg: "bg-amber-50/35",
    sectionBg: "bg-amber-50/30",
    headerBg: "bg-amber-100/70",
    buttonHover: "hover:bg-amber-100 hover:text-amber-700",
    cellHover: "hover:bg-amber-50",
    selected: "bg-amber-600 text-white border-amber-600",
    range: "bg-amber-100 border-amber-200",
    todayRing: "ring-amber-300 border-amber-400",
    noteBg: "bg-amber-50/40",
    noteFocus: "focus:border-amber-500 focus:ring-amber-100",
  },
  {
    pageBg: "bg-lime-50",
    cardBg: "bg-lime-50/35",
    sectionBg: "bg-lime-50/25",
    headerBg: "bg-lime-100/70",
    buttonHover: "hover:bg-lime-100 hover:text-lime-700",
    cellHover: "hover:bg-lime-50",
    selected: "bg-lime-600 text-white border-lime-600",
    range: "bg-lime-100 border-lime-200",
    todayRing: "ring-lime-300 border-lime-400",
    noteBg: "bg-lime-50/35",
    noteFocus: "focus:border-lime-500 focus:ring-lime-100",
  },
  {
    pageBg: "bg-emerald-50",
    cardBg: "bg-emerald-50/30",
    sectionBg: "bg-emerald-50/25",
    headerBg: "bg-emerald-100/70",
    buttonHover: "hover:bg-emerald-100 hover:text-emerald-700",
    cellHover: "hover:bg-emerald-50",
    selected: "bg-emerald-600 text-white border-emerald-600",
    range: "bg-emerald-100 border-emerald-200",
    todayRing: "ring-emerald-300 border-emerald-400",
    noteBg: "bg-emerald-50/35",
    noteFocus: "focus:border-emerald-500 focus:ring-emerald-100",
  },
  {
    pageBg: "bg-teal-50",
    cardBg: "bg-teal-50/30",
    sectionBg: "bg-teal-50/25",
    headerBg: "bg-teal-100/70",
    buttonHover: "hover:bg-teal-100 hover:text-teal-700",
    cellHover: "hover:bg-teal-50",
    selected: "bg-teal-600 text-white border-teal-600",
    range: "bg-teal-100 border-teal-200",
    todayRing: "ring-teal-300 border-teal-400",
    noteBg: "bg-teal-50/35",
    noteFocus: "focus:border-teal-500 focus:ring-teal-100",
  },
  {
    pageBg: "bg-cyan-50",
    cardBg: "bg-cyan-50/30",
    sectionBg: "bg-cyan-50/25",
    headerBg: "bg-cyan-100/70",
    buttonHover: "hover:bg-cyan-100 hover:text-cyan-700",
    cellHover: "hover:bg-cyan-50",
    selected: "bg-cyan-700 text-white border-cyan-700",
    range: "bg-cyan-100 border-cyan-200",
    todayRing: "ring-cyan-300 border-cyan-400",
    noteBg: "bg-cyan-50/35",
    noteFocus: "focus:border-cyan-500 focus:ring-cyan-100",
  },
  {
    pageBg: "bg-sky-50",
    cardBg: "bg-sky-50/30",
    sectionBg: "bg-sky-50/25",
    headerBg: "bg-sky-100/70",
    buttonHover: "hover:bg-sky-100 hover:text-sky-700",
    cellHover: "hover:bg-sky-50",
    selected: "bg-sky-600 text-white border-sky-600",
    range: "bg-sky-100 border-sky-200",
    todayRing: "ring-sky-300 border-sky-400",
    noteBg: "bg-sky-50/35",
    noteFocus: "focus:border-sky-500 focus:ring-sky-100",
  },
  {
    pageBg: "bg-blue-50",
    cardBg: "bg-blue-50/30",
    sectionBg: "bg-blue-50/25",
    headerBg: "bg-blue-100/70",
    buttonHover: "hover:bg-blue-100 hover:text-blue-700",
    cellHover: "hover:bg-blue-50",
    selected: "bg-blue-600 text-white border-blue-600",
    range: "bg-blue-100 border-blue-200",
    todayRing: "ring-blue-300 border-blue-400",
    noteBg: "bg-blue-50/35",
    noteFocus: "focus:border-blue-500 focus:ring-blue-100",
  },
  {
    pageBg: "bg-indigo-50",
    cardBg: "bg-indigo-50/30",
    sectionBg: "bg-indigo-50/25",
    headerBg: "bg-indigo-100/70",
    buttonHover: "hover:bg-indigo-100 hover:text-indigo-700",
    cellHover: "hover:bg-indigo-50",
    selected: "bg-indigo-600 text-white border-indigo-600",
    range: "bg-indigo-100 border-indigo-200",
    todayRing: "ring-indigo-300 border-indigo-400",
    noteBg: "bg-indigo-50/35",
    noteFocus: "focus:border-indigo-500 focus:ring-indigo-100",
  },
  {
    pageBg: "bg-violet-50",
    cardBg: "bg-violet-50/30",
    sectionBg: "bg-violet-50/25",
    headerBg: "bg-violet-100/70",
    buttonHover: "hover:bg-violet-100 hover:text-violet-700",
    cellHover: "hover:bg-violet-50",
    selected: "bg-violet-600 text-white border-violet-600",
    range: "bg-violet-100 border-violet-200",
    todayRing: "ring-violet-300 border-violet-400",
    noteBg: "bg-violet-50/35",
    noteFocus: "focus:border-violet-500 focus:ring-violet-100",
  },
  {
    pageBg: "bg-fuchsia-50",
    cardBg: "bg-fuchsia-50/30",
    sectionBg: "bg-fuchsia-50/25",
    headerBg: "bg-fuchsia-100/70",
    buttonHover: "hover:bg-fuchsia-100 hover:text-fuchsia-700",
    cellHover: "hover:bg-fuchsia-50",
    selected: "bg-fuchsia-600 text-white border-fuchsia-600",
    range: "bg-fuchsia-100 border-fuchsia-200",
    todayRing: "ring-fuchsia-300 border-fuchsia-400",
    noteBg: "bg-fuchsia-50/35",
    noteFocus: "focus:border-fuchsia-500 focus:ring-fuchsia-100",
  },
  {
    pageBg: "bg-pink-50",
    cardBg: "bg-pink-50/35",
    sectionBg: "bg-pink-50/30",
    headerBg: "bg-pink-100/70",
    buttonHover: "hover:bg-pink-100 hover:text-pink-700",
    cellHover: "hover:bg-pink-50",
    selected: "bg-pink-600 text-white border-pink-600",
    range: "bg-pink-100 border-pink-200",
    todayRing: "ring-pink-300 border-pink-400",
    noteBg: "bg-pink-50/40",
    noteFocus: "focus:border-pink-500 focus:ring-pink-100",
  },
];

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1600&q=80",
];

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function getDateKey(date: Date, day: number): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayValue = String(day).padStart(2, "0");

  return `${year}-${month}-${dayValue}`;
}

function getMonthKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}${MONTH_NOTE_SUFFIX}`;
}

function getWeekNumber(date: Date, dayOfMonth: number): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.floor((firstDay + dayOfMonth - 1) / 7);
}

function countNotesInMonth(notesByDate: NotesByDate, year: number, month: number): number {
  let count = 0;
  for (const key in notesByDate) {
    if (notesByDate[key]?.trim() && key.startsWith(`${year}-${String(month + 1).padStart(2, "0")}-`)) {
      count++;
    }
  }
  return count;
}

export default function Home() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [selectedNoteDay, setSelectedNoteDay] = useState<number | null>(null);
  const [notesByDate, setNotesByDate] = useState<NotesByDate>({});
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const prevMonthRef = useRef<string>("");
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const firstDayLabel = weekDays[firstDay];
  const calendarDays: Array<number | null> = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const monthTheme = MONTH_THEMES[currentMonth.getMonth()];
  const currentMonthImage = MONTH_IMAGES[currentMonth.getMonth()];
  const today = new Date();
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isCurrentMonthAndYear =
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear();
  const rangeStart =
    startDate !== null && endDate !== null ? Math.min(startDate, endDate) : null;
  const rangeEnd =
    startDate !== null && endDate !== null ? Math.max(startDate, endDate) : null;
  const selectedDateKey =
    selectedNoteDay !== null ? getDateKey(currentMonth, selectedNoteDay) : null;
  const activeNoteKey = selectedDateKey ?? getMonthKey(currentMonth);
  const activeNoteText = notesByDate[activeNoteKey] ?? "";

  const clearDateSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedNoteDay(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedNoteDay(day);

    if (startDate === null || (startDate !== null && endDate !== null)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    setEndDate(day);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setStartDate(null);
    setEndDate(null);
    setSelectedNoteDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    clearDateSelection();
  };

  const jumpToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    clearDateSelection();
    setHoveredWeek(null);
  };

  const handlePresetRange = (preset: "week" | "month" | "year") => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = today.getDate();
    const dayOfWeek = today.getDay();
    let start: number, end: number;

    if (preset === "week") {
      start = day - dayOfWeek;
      end = start + 6;
    } else if (preset === "month") {
      start = 1;
      end = getDaysInMonth(currentMonth);
    } else {
      start = 1;
      end = getDaysInMonth(currentMonth);
    }

    setStartDate(Math.max(1, start));
    setEndDate(Math.min(getDaysInMonth(currentMonth), end));
    setSelectedNoteDay(null);
  };

  const handleDateCellClick = (day: number, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipplePos({ x, y });
    setTimeout(() => setRipplePos(null), 600);
    handleDateClick(day);
  };

  useEffect(() => {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);

    if (savedNotes !== null) {
      try {
        const parsed = JSON.parse(savedNotes) as NotesByDate;
        setNotesByDate(parsed ?? {});
      } catch {
        setNotesByDate({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesByDate));
  }, [notesByDate]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearDateSelection();
        setShowKeyboardHelp(false);
      } else if (event.key === "?") {
        event.preventDefault();
        setShowKeyboardHelp((prev) => !prev);
      } else if (event.key === "t" && !showKeyboardHelp) {
        jumpToToday();
      } else if (event.key === "w" && !showKeyboardHelp) {
        handlePresetRange("week");
      } else if (event.key === "m" && !showKeyboardHelp) {
        handlePresetRange("month");
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showKeyboardHelp]);

  useEffect(() => {
    const monthKey = currentMonth.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (prevMonthRef.current && prevMonthRef.current !== monthKey) {
      // Month changed - trigger animation
      setAnimationKey((prev) => prev + 1);
    }

    prevMonthRef.current = monthKey;
  }, [currentMonth]);

  return (
    <main
      onClick={clearDateSelection}
      className={`flex min-h-screen items-center justify-center px-4 py-6 md:px-8 md:py-10 ${monthTheme.pageBg}`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        key={animationKey}
        className={`mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-stone-300 shadow-[0_20px_52px_rgba(16,24,40,0.14)] md:min-h-[86vh] md:flex-row ${
          animationKey > 0 ? "calendar-card-flip" : ""
        } ${monthTheme.cardBg}`}
      >
        <section className={`h-auto w-full p-4 sm:p-5 md:w-1/2 md:p-6 ${monthTheme.sectionBg}`}>
          <header className={`flex items-center justify-between rounded-xl border border-slate-300 px-4 py-3 ${monthTheme.headerBg}`}>
            <button
              type="button"
              aria-label="Previous month"
              onClick={handlePreviousMonth}
              className={`rounded-md px-2 py-1 text-xl font-bold text-slate-700 transition-all duration-200 sm:px-3 sm:text-2xl ${monthTheme.buttonHover}`}
            >
              &larr;
            </button>
            <div className="flex flex-col items-center gap-1">
              <h2
                className="text-xl font-bold text-slate-800 sm:text-2xl"
                title={`${daysInMonth} days • starts on ${firstDayLabel}`}
              >
                {monthLabel}
              </h2>
              {countNotesInMonth(notesByDate, currentMonth.getFullYear(), currentMonth.getMonth()) > 0 && (
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  📝 {countNotesInMonth(notesByDate, currentMonth.getFullYear(), currentMonth.getMonth())} date(s) with notes
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Next month"
              onClick={handleNextMonth}
              className={`rounded-md px-2 py-1 text-xl font-bold text-slate-700 transition-all duration-200 sm:px-3 sm:text-2xl ${monthTheme.buttonHover}`}
            >
              &rarr;
            </button>
          </header>
          <div className="mt-3 flex flex-wrap gap-2 md:flex-nowrap">
            <button
              onClick={jumpToToday}
              type="button"
              title="Press 't'"
              className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              📅 Today
            </button>
            <button
              onClick={() => handlePresetRange("week")}
              type="button"
              title="Press 'w'"
              className="rounded-lg bg-sky-400 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              📆 This Week
            </button>
            <button
              onClick={() => handlePresetRange("month")}
              type="button"
              title="Press 'm'"
              className="rounded-lg bg-slate-400 hover:bg-slate-500 text-white text-xs font-semibold px-3 py-1.5 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              📅 This Month
            </button>
            <button
              onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
              type="button"
              title="Press '?'"
              className="ml-auto rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 transition-all duration-200"
            >
              ⌨️ Help
            </button>
          </div>
          {showKeyboardHelp && (
            <div className="mt-3 float-in rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-blue-700 mb-2">⌨️ Keyboard Shortcuts</p>
              <div>
                <span className="font-semibold">?</span> — Toggle this help
              </div>
              <div>
                <span className="font-semibold">Esc</span> — Clear selection
              </div>
              <div>
                <span className="font-semibold">t</span> — Jump to today
              </div>
              <div>
                <span className="font-semibold">w</span> — Select this week
              </div>
              <div>
                <span className="font-semibold">m</span> — Select this month
              </div>
              {/* <div>
                <span className="font-semibold">Click & drag</span> — Range selection
              </div> */}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-600">
            <p>
              {startDate === null
                ? "Pick start and end date"
                : endDate === null
                  ? `Start: ${monthLabel} ${startDate}`
                  : `Range: ${monthLabel} ${Math.min(startDate, endDate)} - ${Math.max(startDate, endDate)}`}
            </p>
            <button
              type="button"
              onClick={clearDateSelection}
              className="rounded-md border border-slate-300 px-2 py-1 text-[11px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100"
            >
              Clear
            </button>
          </div>
          <div className="mt-5">
            <div className="month-transition">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-600 sm:gap-3">
                {weekDays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="h-4" />
              <div className="grid grid-cols-7 gap-2.5 sm:gap-3">
                {calendarDays.map((day, index) => {
                  const isToday = day !== null && isCurrentMonthAndYear && day === today.getDate();
                  const cellDate =
                    day !== null
                      ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                      : null;
                  const isPastDate = cellDate !== null && cellDate < todayAtMidnight;
                  const dayOfWeek = day !== null ? (firstDay + day - 1) % 7 : null;
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                  const weekNum = day !== null ? getWeekNumber(currentMonth, day) : null;
                  const isInHoveredWeek = weekNum === hoveredWeek && hoveredWeek !== null;
                  const isStartDate = day !== null && day === startDate;
                  const isEndDate = day !== null && day === endDate;
                  const isMiddleDate =
                    day !== null &&
                    rangeStart !== null &&
                    rangeEnd !== null &&
                    day > rangeStart &&
                    day < rangeEnd;
                  const monthDayKey =
                    day !== null
                      ? `${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                      : null;
                  const holidayLabel = monthDayKey ? HOLIDAY_MARKERS[monthDayKey] : undefined;
                  const isHoliday = Boolean(holidayLabel);
                  const hasNote = day !== null && notesByDate[getDateKey(currentMonth, day)]?.trim();

                  return (
                    <div
                      key={index}
                      onClick={(event) => {
                        if (day !== null && !isPastDate) handleDateCellClick(day, event);
                      }}
                      onMouseEnter={() => {
                        if (day !== null && !isPastDate && weekNum !== null) {
                          setHoveredWeek(weekNum);
                        }
                      }}
                      onMouseLeave={() => setHoveredWeek(null)}
                      title={holidayLabel ?? (hasNote ? "📝 Has notes" : "")}
                      className={`relative aspect-square border border-slate-300 flex items-center justify-center text-sm text-slate-700 transition-all duration-200 ease-out sm:text-base md:text-sm ${
                        day === null
                          ? ""
                          : isPastDate
                            ? "opacity-45 cursor-not-allowed text-slate-400"
                            : `cursor-pointer ${isInHoveredWeek ? "ring-2 ring-offset-1 ring-blue-300" : ""} hover:scale-[1.03] ${monthTheme.cellHover}`
                      } ${
                        isStartDate && isEndDate
                          ? `${monthTheme.selected} font-bold rounded-full shadow-sm`
                          : isStartDate
                            ? `${monthTheme.selected} font-bold rounded-l-full shadow-sm`
                            : isEndDate
                              ? `${monthTheme.selected} font-bold rounded-r-full shadow-sm`
                              : isMiddleDate
                                ? `${monthTheme.range} rounded-none`
                                : "bg-[#fffefb]"
                      } ${isToday ? `ring-2 ${monthTheme.todayRing}` : ""} ${
                        isWeekend && !isStartDate && !isEndDate && !isMiddleDate ? "text-slate-500" : ""
                      }`}
                    >
                      {ripplePos && (isStartDate || isEndDate || isMiddleDate) && (
                        <div
                          className="ripple"
                          style={{
                            left: `${ripplePos.x}px`,
                            top: `${ripplePos.y}px`,
                            width: "20px",
                            height: "20px",
                            marginLeft: "-10px",
                            marginTop: "-10px",
                          }}
                        />
                      )}
                      {day !== null ? <span className="leading-none relative z-10">{day}</span> : ""}
                      {isHoliday ? (
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500 shadow-sm" />
                      ) : null}
                      {hasNote && !isHoliday ? (
                        <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-amber-400" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 border-t border-slate-300 pt-5">
              <h3 className="mb-3 text-base font-bold text-slate-800">Notes</h3>
              <textarea
                aria-label="Notes"
                placeholder={
                  selectedNoteDay === null
                    ? "Write notes for this month..."
                    : `Write notes for ${monthLabel} ${selectedNoteDay}...`
                }
                className={`min-h-40 w-full rounded-xl border border-slate-300 p-4 text-base text-slate-700 outline-none transition-all duration-200 focus:ring-2 md:text-sm ${monthTheme.noteBg} ${monthTheme.noteFocus}`}
                rows={6}
                value={activeNoteText}
                onChange={(event) => {
                  const value = event.target.value;
                  setNotesByDate((prev) => ({
                    ...prev,
                    [activeNoteKey]: value,
                  }));
                }}
              />
            </div>
          </div>
        </section>
        <section
          className="relative h-[38vh] w-full overflow-hidden border-t border-stone-300 bg-cover bg-center md:h-auto md:w-1/2 md:border-l md:border-t-0"
          style={{
            backgroundImage: `url('${currentMonthImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-slate-900/35" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div className="inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
              Monthly Visual
            </div>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">{monthLabel}</h1>
          </div>
        </section>
      </div>
    </main>
  );
}
