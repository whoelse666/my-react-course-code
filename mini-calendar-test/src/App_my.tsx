import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./index.css";
import { useControllableValue } from "ahooks";

/* function Calendar(props: any) {
  const { defaultValue, onChange } = props;
  const [date, setDate] = useState(defaultValue);
  const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

  // 获取某个月的天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // 获取某个月的第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay() - 1;
  };

  const renderDates = () => {
    const days: any[] = [];
    for (let i = 0; i < firstDayOfMonth(date.getFullYear(), date.getMonth()); i++) {
      // 当前天是周几，前面空几格子
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysOfMonth(date.getFullYear(), date.getMonth()); i++) {
      days.push(
        <div
          key={i}
          className={i === date.getDate() ? "day selected" : "day"}
          onClick={() => {
            setDate(new Date(date.getFullYear(), date.getMonth(), i));
            onChange?.(new Date(date.getFullYear(), date.getMonth(), i));
          }}
        >
          {i}
        </div>
      );
    }
    return days;
  };
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
} */

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}
const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const { defaultValue, onChange } = props;
  // const [date, setDate] = useState(defaultValue || new Date());
    const [date, setDate] = useControllableValue<Date>(props, {
      defaultValue: new Date()
    });

  const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (newDate: Date) => {
      setDate(newDate);
      // onChange?.(newDate);
    }
  }));
  // 获取某个月的天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // 获取某个月的第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay() - 1;
  };

  const renderDates = () => {
    const days: any[] = [];
    for (let i = 0; i < firstDayOfMonth(date.getFullYear(), date.getMonth()); i++) {
      // 当前天是周几，前面空几格子
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysOfMonth(date.getFullYear(), date.getMonth()); i++) {
      days.push(
        <div
          key={i}
          className={i === date.getDate() ? "day selected" : "day"}
          onClick={() => {
            setDate(new Date(date.getFullYear(), date.getMonth(), i));
            onChange?.(new Date(date.getFullYear(), date.getMonth(), i));
          }}
        >
          {i}
        </div>
      );
    }
    return days;
  };
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef(InternalCalendar);
function Test() {
  const calendarRef = useRef<CalendarRef>(null);
  useEffect(() => {
    console.log(calendarRef.current);
    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2026, 3-1, 1));
    }, 3000);
  }, []);
  return (
    <div className="">
      <Calendar ref={calendarRef} defaultValue={new Date("2025-3-10")} onChange={(date: Date) => console.log(date.toLocaleDateString())} />
    </div>
  );
}

export default Test;
