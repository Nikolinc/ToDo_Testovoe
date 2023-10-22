import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import "./calendar.css"
import cn from "util/cn";
import { generateDate, months } from "util/generateDate";
import { ReactComponent as CalendarIcon } from "assets/calendar.svg";
import useModal from "hooks/useModal";

function Calendar(props: { date: Date, setDate: (date: Date) => void, left: string }) {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setOpened(false);
  };

  return (<>
    <button className='flex-center' onClick={() => setOpened(true)} ref={buttonRef}>
      {props.date.toLocaleDateString('sv')} <CalendarIcon fill="var(--secondary)" width={"20px"} />
    </button>
    <Modal opened={opened} triggerRef={buttonRef} onClose={onClose} date={props.date} setDate={props.setDate} left={props.left} />
  </>)
}

function Modal(props: {
  opened: boolean,
  triggerRef?: React.RefObject<HTMLButtonElement>,
  left: string,
  date: Date,
  setDate: (date: Date) => void;
  onClose: () => void,
}) {

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs(props.date);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useModal({
    elementRef: tooltipRef,
    triggerRef: props.triggerRef,
    onOutsideClick: props.onClose,
    enabled: props.opened,
  });


  if (!props.opened) {
    return null;
  }


  return (
    <div className="calendar-area component" ref={tooltipRef} style={{ left: props.left }}>
      <div className="calendar">
        <div className="months">
          <h2>
            {months[today.month()]}, {today.year()}
          </h2>
          <div className="months-select">
            <button
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            >&#10094;</button>
            <h2
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h2>
            <button
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            >&#10095;</button>
          </div>
        </div>
        <div className="week">
          {days.map((day, index) => {
            return (
              <h2
                key={index}>
                {day}
              </h2>
            );
          })}
        </div>

        <div className="months-grid">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="day"
                >
                  <button
                    className={cn(
                      currentMonth ? "" : "currentMonth",
                      today
                        ? "today"
                        : "",
                      selectDate
                        .toDate()
                        .toDateString() ===
                        date.toDate().toDateString()
                        ? "selectDate"
                        : "",
                    )}
                    onClick={() => {
                      setSelectDate(date)
                      props.setDate(date.toDate());
                      props.onClose();
                    }}
                  >
                    {date.date()}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>

    </div>
  );
}

export default Calendar