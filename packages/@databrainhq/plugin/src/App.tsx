import React from 'react';
import { Dashboard, Metric } from '@/containers';
import './index.css';

// const metricFilterOptions = {
//   String: {
//     options: ['hello', 'hi'], // should have unique elements
//     defaultOption: 'hello', // name of the option
//   },
//   Number: {
//     options: [9, 19, 23], // should have unique elements
//     defaultOption: 19, // name of the option
//   },
//   Date: {
//     options: [
//       {
//         range: 'Last|This|Custom', // one of the three option
//         time: 'Day|Week|Month|Quarter|Year', // one of the five option
//         name: 'Last 10 Years', // will be shown in the list
//         fromDate: new Date(), // for range = "Custom" when you don't want to select by date picker else ignored
//         toDate: new Date(), // for range = "Custom" when you don't want to select by date picker else ignored
//         count: 10, // required for range "Last" else optional
//         minDate: new Date(), // optional for custom range
//         maxDate: new Date(), // optional for custom range
//       },
//       {
//         range: 'Last|This|Custom', // one of the three option
//         time: 'Day|Week|Month|Quarter|Year', // one of the five option for range "Custom" nit required
//         name: 'This Year', // will be shown in the list
//         count: 0, // required for range "Last" else not required
//         minDate: new Date(), // optional for custom range
//         maxDate: new Date(), // optional for custom range
//       },
//     ],
//     defaultOption: 'Last 10 Years', // name of the option
//   },
// };

// const data = [
//   {
//     id: 1,
//     name: 'John Doe',
//     age: 25,
//     salary: 50000,
//     country: 'USA',
//     state: 'California',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     age: 32,
//     salary: 75000,
//     country: 'Canada',
//     state: 'Ontario',
//   },
//   {
//     id: 3,
//     name: 'Bob Johnson',
//     age: 45,
//     salary: 60000,
//     country: 'Australia',
//     state: 'Victoria',
//   },
//   {
//     id: 4,
//     name: 'Alice Brown',
//     age: 28,
//     salary: 55000,
//     country: 'USA',
//     state: 'Texas',
//   },
//   {
//     id: 5,
//     name: 'Michael Lee',
//     age: 38,
//     salary: 80000,
//     country: 'USA',
//     state: 'New York',
//   },
//   {
//     id: 6,
//     name: 'Emily Davis',
//     age: 29,
//     salary: 60000,
//     country: 'Canada',
//     state: 'British Columbia',
//   },
// ];

const App = () => {
  const urlParams = new URLSearchParams(location.search);
  const component = urlParams.get('component') || 'dashboard';
  const token = urlParams.get('token');
  const dashboardId = urlParams.get('dashboardId') || '';
  const metricId = urlParams.get('metricId') || '';
  return (
    <div className="dbn-w-screen dbn-h-screen dbn-flex dbn-justify-center dbn-items-center dbn-overflow-hidden">
      {component === 'metric' ? (
        <Metric
          token={token || import.meta.env.VITE_TOKEN}
          metricId={metricId}
          width={900}
          height={600}
          enableDownloadCsv
          enableEmailCsv
          appearanceOptions={{
            cumulativeBar: {
              isEnabled: true,
            },
            dynamicBehaviour: {
              isEnabled: true,
            },
          }}
        />
      ) : (
        <Dashboard
          token={token || import.meta.env.VITE_TOKEN}
          dashboardId={dashboardId}
          enableDownloadCsv
          enableEmailCsv
        />
      )}
    </div>
  );
};

export default App;
