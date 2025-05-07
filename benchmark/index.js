import { check, sleep } from 'k6';

import { Rate } from 'k6/metrics';
import http from 'k6/http';

// Custom metric to track failure rate
const failRate = new Rate('failed_requests');
const port = 8000; // Port for the server
// Test configuration with ramping VUs
export const options = {
  scenarios: {
    ramping_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 100 }, // Start with 100 VUs for 10s
        { duration: '30s', target: 500 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 1000 },
        { duration: '10s', target: 0 }, // Ramp down to 0 VUs (graceful stop)
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1000ms
    'http_req_duration{stage:warm-up}': ['p(95)<500'], // Different threshold for first stage
    failed_requests: ['rate<0.1'], // Less than 10% failures
  },
};

// Default function that will be executed for each virtual user
export default function () {
  // create a random number between 1 and 1000
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const targetUrl = `http://localhost:${port}`;
  // const targetUrl = `http://localhost:8000/api/user-list?page=${randomNumber}`;
  // Make HTTP request to the homepage
  const res = http.get(targetUrl);

  // Check if the request was successful (status 200)
  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  // Add to the failed requests metric if unsuccessful
  failRate.add(!success);

  // Optional: add a small pause between iterations
  sleep(0.1);
}
