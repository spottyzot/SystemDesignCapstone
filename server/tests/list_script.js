import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
      constant_request_rate: {
        executor: 'constant-arrival-rate',
        rate: 100,
        timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
        duration: '30s',
        preAllocatedVUs: 10 // how large the initial pool of VUs would be
      },
    },
  };

export default function () {

    http.get(`http://localhost:8000/products/`);
    sleep(1);



}
