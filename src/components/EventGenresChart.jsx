import React, { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from 'recharts'

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([])

  const genres = ['React', 'Node', 'JavaScript', 'jQuery', 'Angular']
  const colors = ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD']

  useEffect(() => {
    console.log(getData())
    setData(getData())
  }, [`${events}`])

  const getData = () => {
    return genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary?.toLowerCase().includes(genre.toLowerCase())
      )
      return {
        name: genre,
        value: filteredEvents.length,
      }
    })
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.1
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.1
    return percent ? (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null
  }

  return (
    <ResponsiveContainer width="99%" height={450}>
      <PieChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" align="left" verticalAlign="center" wrapperStyle={{paddingRight: "50px", paddingTop: "50px", fontSize: 12}}/>
      </PieChart>
    </ResponsiveContainer>
    
  )
}

export default EventGenresChart
