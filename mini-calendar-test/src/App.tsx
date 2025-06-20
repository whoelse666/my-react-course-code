import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./index.css";
import { useControllableValue } from "ahooks";

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
  const { value, defaultValue, onChange } = props;

  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date()
  });

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      }
    };
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay() - 1;
  };

  const renderDates = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        console.log("curDate.getDate() :>> ", curDate.getDate());
        setDate(curDate);
        // onChange?.(curDate);
      };
      console.log("date.getDate() :>> ", date.getDate());
      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button  onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="days">
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        <div className="day">日</div>
        {renderDates()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());
    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);

  return (
    <Calendar
      value={date}
      ref={calendarRef}
      onChange={newDate => {
        setDate(newDate);
        console.log(newDate.toLocaleDateString());
      }}
    ></Calendar>
  );

  return (
    <>
      <Calendar
        value={date}
        onChange={newDate => {
          setDate(newDate);
          console.log(newDate.toLocaleDateString());
        }}
      ></Calendar>
      {/* <Calendar
        onChange={newDate => {
          console.log("onChange1 :>> ", newDate.toLocaleDateString());
        }}
      ></Calendar>
      <Calendar
        defaultValue={new Date("2025-3-1")}
        onChange={newDate => {
          console.log("onChange2 :>> ", newDate.toLocaleDateString());
        }}
      ></Calendar>
      <Calendar
        defaultValue={new Date("2025-4-1")}
        onChange={newDate => {
          console.log("onChange3 :>> ", newDate.toLocaleDateString());
        }}
      ></Calendar>
    */}
    </>
  );
}

export default Test;
