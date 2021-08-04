import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

const reportWebVitals = (): void => {
  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);
  getFCP(console.log);
  getTTFB(console.log);
};

export default reportWebVitals;
