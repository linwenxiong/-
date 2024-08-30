import { defineMock } from 'vite-plugin-mock-dev-server'
export default defineMock([
    {
        url: '/api/getPfbMenuBy',
        method: ['POST'],
        // validator: { 
        //     body: { 
        //         orderId: 1 
        //     }
        // },
        body: {
            "code": 200,
            "data": [
                {
                    "item": "土猪白条猪肉",
                    "bmbm": "2001",
                    "orgname": "兴勤埔仔店",
                    "czy": "周英勇",
                    "rq": "2024-03-25 08:49:44",
                    "score": "100.00",
                    "gysmc": null
                },
                {
                    "item": "良种白条猪肉",
                    "bmbm": "2001",
                    "orgname": "兴勤埔仔店",
                    "czy": "周英勇",
                    "rq": "2024-03-25 08:49:01",
                    "score": "100.00",
                    "gysmc": null
                },
                {
                    "item": "分割猪肉及附件",
                    "bmbm": "2001",
                    "orgname": "兴勤埔仔店",
                    "czy": "周英勇",
                    "rq": "2024-03-25 08:47:49",
                    "score": "68.00",
                    "gysmc": null
                },
                {
                    "item": "土猪白条猪肉",
                    "bmbm": "2001",
                    "orgname": "兴勤埔仔店",
                    "czy": "周英勇",
                    "rq": "2024-03-23 07:40:57",
                    "score": "75.00",
                    "gysmc": null
                },
                {
                    "item": "良种白条猪肉",
                    "bmbm": "2001",
                    "orgname": "兴勤埔仔店",
                    "czy": "周英勇",
                    "rq": "2024-03-23 07:39:28",
                    "score": "69.00",
                    "gysmc": null
                },
                {
                    "item": "分割猪肉及附件",
                    "bmbm": "2001",
                    "orgname": "兴勤埔仔店",
                    "czy": "周英勇",
                    "rq": "2024-03-23 07:37:38",
                    "score": "24.00",
                    "gysmc": null
                }
            ],
            "message": "评分内容条件查询"
        }
    },
    
])