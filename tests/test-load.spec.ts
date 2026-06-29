import http from 'k6/http';

export const options = {

    stages: [

        { duration: '30s', target: 20 },

        { duration: '1m', target: 50 },

        { duration: '2m', target: 100 },

        { duration: '30s', target: 0 },

    ],
};

export default function () {

    http.get('https://test.k6.io');

}
