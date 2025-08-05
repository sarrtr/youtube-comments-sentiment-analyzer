import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const DynamicChart = ({data}) => {
//   const [hoveringDataKey, setHoveringDataKey] = React.useState(null);

//   let pvOpacity = 1;
//   let uvOpacity = 1;

//   if (hoveringDataKey === 'uv') {
//     pvOpacity = 0.5;
//   }

//   if (hoveringDataKey === 'pv') {
//     uvOpacity = 0.5;
//   }

//   const handleMouseEnter = (payload/*: LegendPayload */) => {
//     setHoveringDataKey(payload.dataKey);
//   }

//   const handleMouseLeave = () => {
//     setHoveringDataKey(null);
//   }

//   return (
//     <div style={{ width: '100%' }}>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="pv" strokeOpacity={pvOpacity} stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="uv" strokeOpacity={uvOpacity} stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
// export default DynamicChart;


const DynamicChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#59FF00" />
          <Line type="monotone" dataKey="negative" stroke="#FF0090" />
          <Line type="monotone" dataKey="neutral" stroke="#00BFFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;