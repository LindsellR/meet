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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  const genres = ['React', 'Node', 'JavaScript', 'jQuery', 'Angular']
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const colors = isDark
    ? ['#FF8A65', '#4DD0E1', '#BA68C8', '#81C784', '#FFD54F']
    : ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD']

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.matchMedia('(max-width: 600px)').matches)

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    return percent > 0? (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={isMobile ? 10 : 12}
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null
  }

  return (
    <div className="pie-chart-container">
      <ResponsiveContainer width="99%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={isMobile ? 90 : 130}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EventGenresChart
