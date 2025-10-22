import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const DateTimeSelection = ({ selectedDate, selectedTime, onDateSelect, onTimeSelect, onNext, onBack }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const timeSlots = [
    { id: '09:00', time: '9:00 AM', available: true },
    { id: '10:00', time: '10:00 AM', available: true },
    { id: '11:00', time: '11:00 AM', available: false },
    { id: '14:00', time: '2:00 PM', available: true },
    { id: '15:00', time: '3:00 PM', available: true },
    { id: '16:00', time: '4:00 PM', available: true },
    { id: '17:00', time: '5:00 PM', available: false },
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date()?.toDateString() === date?.toDateString();
      const isPast = date < new Date()?.setHours(0, 0, 0, 0);
      days?.push({
        day,
        date,
        isToday,
        isPast,
        isAvailable: !isPast && Math.random() > 0.3 // Mock availability
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatMonthYear = (date) => {
    return date?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Select Date & Time</h3>
        <p className="text-muted-foreground">Choose your preferred appointment slot</p>
      </div>
      {/* Calendar */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          <h4 className="font-semibold text-foreground">{formatMonthYear(currentMonth)}</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays?.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days?.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <button
                  onClick={() => day?.isAvailable && onDateSelect(day?.date)}
                  disabled={!day?.isAvailable}
                  className={`w-full h-full rounded-md text-sm font-medium transition-micro ${
                    selectedDate?.toDateString() === day?.date?.toDateString()
                      ? 'bg-primary text-primary-foreground'
                      : day?.isAvailable
                      ? 'hover:bg-muted text-foreground'
                      : 'text-muted-foreground cursor-not-allowed opacity-50'
                  } ${day?.isToday ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
                >
                  {day?.day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Available Time Slots</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {timeSlots?.map((slot) => (
              <button
                key={slot?.id}
                onClick={() => slot?.available && onTimeSelect(slot)}
                disabled={!slot?.available}
                className={`p-3 rounded-lg text-sm font-medium transition-micro ${
                  selectedTime?.id === slot?.id
                    ? 'bg-primary text-primary-foreground'
                    : slot?.available
                    ? 'bg-muted hover:bg-muted/80 text-foreground'
                    : 'bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                {slot?.time}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
          Back
        </Button>
        <Button
          variant="default"
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelection;