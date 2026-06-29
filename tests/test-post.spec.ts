import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 20,
    duration: '1m',
};

export default function () {

    const payload = JSON.stringify({
        username: "admin",
        password: "password123"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(
        'https://reqres.in/api/login',
        payload,
        params
    );

    check(response, {
        'Login Successful': (r) => r.status === 200,
    });
}
