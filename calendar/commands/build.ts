import { getRawEvents } from '../lib/getRawEvents';
import { parseRawEvents } from '../lib/parseRawEvent';
import { processDates } from '../lib/processDates';
import { makeICalEvents } from '../lib/makeICalEvent';
import { makeICalBroadcasts } from '../lib/makeICalBroadcasts';
import { renderICal } from '../renderers/ical';
import { renderJson } from '../renderers/json';
import { checkDistFolder } from '../lib/checkDistFolder';
import { writeFile } from '../lib/writeFile';

import * as paths from '../paths';

(async function() {
    try {
        checkDistFolder(paths.dist);

        const rawEvents = await getRawEvents(paths.source);
        const parsedEvents = await parseRawEvents(rawEvents);

        const processedEvents = parsedEvents.map(processDates);

        await writeFile(paths.json, renderJson(processedEvents));

        await writeFile(paths.ical, renderICal(makeICalEvents(processedEvents)));
        await writeFile(paths.broadcastIcal, renderICal(makeICalBroadcasts(processedEvents)));

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
