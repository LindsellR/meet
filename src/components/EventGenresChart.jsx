import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'Javascript', 'Node', 'JQuery', 'Angular'];

  const getData = () => {
    return genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
  };

  useEffect(() => {
    setData(getData());
  }, [events]); 

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={130}
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
