import * as fs from 'fs';
import { parse } from 'csv-parse';

export const parseCsv = (filepath: string) => {
    return new Promise((resolve, reject) => {
        const data: Array<Object> = [];

        fs.createReadStream(filepath)
            .pipe(parse({ columns: true }))
            .on('data', function(row) {
                data.push(row);
            })
            .on('end',function() {
                resolve(data);
            })
            .on('error', function(err) {
                reject(err);
            });
    });
};
