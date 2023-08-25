import { useSelector } from 'react-redux';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { RootState } from '../../store/storeConfiguration';

const renderPeriodTick = (tickProps: {
  x: number;
  y: number;
  payload: { value: string; offset: number; index: number };
}) => {
  const { x, y, payload } = tickProps;
  const { value, offset, index } = payload;

  if (index % 2 === 0) {
    return (
      <text x={x + offset} y={y - 4} textAnchor='middle' fill='white'>
        {value.split('-')[0]}
      </text>
    );
  }
};

const ClimateChart = () => {
  const data = useSelector((state: RootState) => state.chartData.data);
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey={(data) => {
            return `${data.period} - ${data.scenario}`;
          }}
          scale='band'
          tickLine={false}
          tick={false}
        />
        <XAxis
          dataKey={(data) => {
            return `${data.period} - ${data.scenario}`;
          }}
          scale='band'
          interval={0}
          tickLine={false}
          tick={renderPeriodTick}
          axisLine={false}
          xAxisId='period'
        />
        <YAxis />
        <Tooltip />
        {/* <Bar
          dataKey={(data) => {
            return [data.values[0], data.values[2]];
          }}
          fill='#fcba03'
          legendType='rect'
          name='Lower emissions'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.scenario === 'Lower emissions' ? '#ffdb78' : '#ffa27d'} />
          ))}
        </Bar> */}
        <Line
          type='monotone'
          connectNulls={true}
          dataKey={(data) => {
            if (data.scenario === 'Higher emissions') return data.values[0];
          }}
          stroke='#c93900'
          legendType='rect'
          name='Higher emissions'
          label={{
            fill: '#c93900',
            fontSize: 14,
            position: 'top',
            fontWeight: 'bold'
          }}
        />
        <Legend />
        <Line
          type='monotone'
          connectNulls={true}
          dataKey={(data) => {
            if (data.scenario === 'Lower emissions') return data.values[0];
          }}
          stroke='#cf9700'
          name='Average emissions'
          label={{
            fill: '#cf9700',
            fontSize: 14,
            position: 'top',
            fontWeight: 'bold'
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ClimateChart;
