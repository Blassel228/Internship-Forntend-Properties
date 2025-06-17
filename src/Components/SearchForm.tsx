import React, { useState, useEffect } from 'react';
import DatePickerInput from './DatePickerInput';
import CapacityInput from './CapacityInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSearchRooms } from '../Api/apiRoom';
import { useLocation, useNavigate } from 'react-router-dom';
import AppButton from "./AppButton.tsx";

const SearchForm = () => {
  const queryClient = useQueryClient();

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const urlStartDate = params.get('start_date');
  const urlEndDate = params.get('end_date');
  const urlCapacity = params.get('capacity');

  const tomorrow = new Date();
  const nextDayAfterTomorrow = new Date();

  nextDayAfterTomorrow.setDate(nextDayAfterTomorrow.getDate() + 2);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState<Date>(
    urlStartDate ? new Date(urlStartDate) : tomorrow
  );

  const [endDate, setEndDate] = useState<Date>(
    urlEndDate ? new Date(urlEndDate) : nextDayAfterTomorrow
  );

  const [capacity, setCapacity] = useState<number>(
    urlCapacity ? parseInt(urlCapacity, 10) : 1
  );
  const [error, setError] = useState<string>('');

  const isFormEmpty = !startDate || !endDate || !capacity || capacity < 1;

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (isFormEmpty) {
        return ;
      } else {
        return await getSearchRooms(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
          capacity
        );
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['searchRooms'], data);
      setError('');
    },
    onError: (err: Error) => {
      setError(err.message || 'Failed to search rooms');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();

    navigate({
      pathname: '/rooms',
      search: `?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&capacity=${capacity}`
    });
  };

  useEffect(() => {
    if (urlStartDate) setStartDate(new Date(urlStartDate));
    if (urlEndDate) setEndDate(new Date(urlEndDate));
    if (urlCapacity) setCapacity(parseInt(urlCapacity, 10));
  }, [location.search]);

  return (
    <div className="w-full mt-20 max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-orange-200 mb-20">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-end gap-4">
        <DatePickerInput
          label="Start Date"
          min={startDate.toISOString().split('T')[0]}
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const dateStr = e.target.value;
            setStartDate(dateStr ? new Date(dateStr) : null);
          }}
          placeholder="Select start date"
        />
        <DatePickerInput
          label="End Date"
          min={nextDayAfterTomorrow.toISOString().split('T')[0]}
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const dateStr = e.target.value;
            setEndDate(dateStr ? new Date(dateStr) : null);
          }}
          placeholder="Select end date"
        />
        <CapacityInput
          label="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          placeholder="Number of people"
        />
        <AppButton
          type="submit"
        >
          SEARCH
        </AppButton>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SearchForm;