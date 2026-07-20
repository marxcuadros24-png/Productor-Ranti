'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/style.css';

export default function CalendarCard() {
  const [selectedDays, setSelectedDays] = useState([]);

  const currentMonth = new Date(2024, 4, 1); // Mayo 2024

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={setSelectedDays}
        locale={es}
        defaultMonth={currentMonth}
        showOutsideDays={false}
        fixedWeeks
        classNames={{
          root: 'rdp-root m-0 w-full',
          months: 'rdp-months',
          month: 'rdp-month w-full',
          month_caption: 'rdp-month_caption flex items-center justify-center px-2 py-1',
          caption_label: 'rdp-caption_label text-base font-semibold text-stone-800',
          nav: 'rdp-nav flex items-center justify-between w-full mb-4',
          button_previous:
            'rdp-button_previous flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-800',
          button_next:
            'rdp-button_next flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-800',
          chevron: 'rdp-chevron h-4 w-4',
          month_grid: 'rdp-month_grid w-full border-collapse',
          weekdays: 'rdp-weekdays',
          weekday: 'rdp-weekday py-3 text-center text-xs font-semibold uppercase tracking-wide text-stone-500',
          week: 'rdp-week',
          day: 'rdp-day p-0',
          day_button:
            'rdp-day_button relative flex h-10 w-full items-center justify-center rounded-full text-sm font-medium text-stone-700 transition-colors hover:bg-green-100 hover:text-green-800',
          selected: 'rdp-selected',
          today: 'rdp-today',
          outside: 'rdp-outside text-stone-300',
          disabled: 'rdp-disabled opacity-30',
        }}
        modifiersClassNames={{
          selected: '!bg-[#184E22] !text-white hover:!bg-[#184E22] hover:!text-white',
          today: 'font-bold text-stone-900',
        }}
        formatters={{
          formatCaption: (date) => {
            const months = [
              'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
            ];
            return `${months[date.getMonth()]} ${date.getFullYear()}`;
          },
          formatWeekdayName: (date) => {
            const days = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
            return days[date.getDay()];
          },
        }}
      />

      {/* Selected days summary */}
      {selectedDays.length > 0 && (
        <div className="mt-4 rounded-xl bg-green-50 px-4 py-3">
          <p className="text-sm font-medium text-green-800">
            {selectedDays.length} día{selectedDays.length !== 1 ? 's' : ''} seleccionado{selectedDays.length !== 1 ? 's' : ''}
          </p>
          <p className="mt-0.5 text-xs text-green-600">
            {selectedDays
              .sort((a, b) => a - b)
              .map((d) =>
                d.toLocaleDateString('es-PE', {
                  day: 'numeric',
                  month: 'short',
                }),
              )
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
