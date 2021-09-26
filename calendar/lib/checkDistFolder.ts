import fs from 'fs';

export function checkDistFolder(path: string) {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}
