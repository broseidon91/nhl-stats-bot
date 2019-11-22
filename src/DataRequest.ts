import * as https from 'https';
const fetch = require("node-fetch");

let options = {
    hostname: 'statsapi.web.nhl.com',
    port: 443,
    path: '',
    method: 'GET'
}

export class DataRequest {

    private url: string = "https://statsapi.web.nhl.com";

    public async Request<T>(path: string) {
        this.url += path;
        console.log("fetching " + this.url);

        try {

            const res = await fetch(this.url);
            const json = await res.json();
            console.log('done');
            // console.log(json);
            return json as T;
        }
        catch (error) {
            console.log(error);
        }

        // var output = '';
        // const req =  https.get(options, (res) => {
        //     console.log(`statusCode: ${res.statusCode}`)

        //     res.on('data', (d) => {
        //         output += d;
        //     })
        //     res.on('end', () => {
        //         var obj = JSON.parse(output);
        //         return obj as T;

        //     });

        //     req.on('error', (err) => {

        //     });

        //     req.end();
        // })
    }
}