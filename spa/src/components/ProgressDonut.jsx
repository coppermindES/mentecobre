import { PieChart } from '@mui/x-charts/PieChart'
import { useThemeMode } from '../theme/useThemeMode'

export default function ProgressDonut({ value, caption = 'Completado', size = 220 }) {
  const { mode } = useThemeMode()
  const radiusOuter = size * 0.45
  const radiusInner = radiusOuter * 0.7
  const restColor = mode === 'light' ? '#e9dccd' : '#333535'
  const data = [
    { label: caption, value, color: '#ffb873' },
    { label: 'Restante', value: Math.max(100 - value, 0), color: restColor },
  ]

  return (
    <div
      className="donut-wrap"
      style={{
        width: '100%',
        maxWidth: size,
        aspectRatio: '1 / 1',
        marginInline: 'auto',
      }}
    >
      <PieChart
        width={size}
        height={size}
        series={[
          {
            data,
            innerRadius: radiusInner,
            outerRadius: radiusOuter,
            paddingAngle: 2,
            cornerRadius: 4,
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
      />
      <div className="donut-center">
        <span className="donut-pct">{value}%</span>
        <span className="donut-cap">{caption}</span>
      </div>
    </div>
  )
}