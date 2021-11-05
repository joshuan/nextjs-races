import { getRawEvents } from '../lib/getRawEvents';
import { parseRawEvents } from '../lib/parseRawEvent';
import { processDates } from '../lib/processDates';
import { makeICalEvents } from '../lib/makeICalEvent';
import { makeICalBroadcasts } from '../lib/makeICalBroadcasts';
import { renderICal } from '../renderers/ical';
import { renderJson } from '../renderers/json';
import { writeFile } from '../lib/writeFile';
import { getBroadcastEvents } from '../lib/getBroadcastEvents';
import { getBroadcastChannels } from '../lib/getBroadcastChannels';
import { filterBroadcastByChannel } from '../lib/filterBroadcastByChannel';

import * as paths from '../paths';

(async function() {
    try {
        const rawEvents = await getRawEvents(paths.getSourcePath());
        const processedEvents = (await parseRawEvents(rawEvents))
            .map(processDates);

        await writeFile(
            paths.getDatabasePath(paths.DataFile.CALENDAR, paths.Format.JSON),
            renderJson(processedEvents),
        );
        await writeFile(
            paths.getPublicPath(paths.PublicFile.CALENDAR, paths.Format.ICAL),
            renderICal(makeICalEvents(processedEvents)),
        );

        const broadcastEvents = getBroadcastEvents(processedEvents);
        const broadcastChannels = getBroadcastChannels(broadcastEvents);

        await writeFile(
            paths.getDatabasePath(paths.DataFile.CHANNELS, paths.Format.JSON),
            renderJson(Object.values(broadcastChannels)),
        );
        await writeFile(
            paths.getBroadcastPath(),
            renderICal(makeICalBroadcasts(processedEvents)),
        );

        for (let index in broadcastChannels) {
            const channel = broadcastChannels[index];
            const channelBroadcasts = filterBroadcastByChannel(broadcastEvents, channel);

            await writeFile(paths.getBroadcastPath(channel), renderICal(makeICalBroadcasts(channelBroadcasts)));
        }

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
