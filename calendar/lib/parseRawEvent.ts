import yaml from 'js-yaml';
import { IRawEventWithUid } from '../../@types/database';
import { ISrc } from './getRawEvents';
import { getValidateErrors, validateRawEvent } from './validateRawEvent';

export async function parseRawEvent(source: ISrc): Promise<IRawEventWithUid> {
    const parsedData = await yaml.load(source.content);

    if (!validateRawEvent(parsedData)) {
        console.error('Event:', source);
        console.error('Errors:', getValidateErrors(parsedData));
        throw new Error(`Validation error (${source.filename})`);
    }

    return {
        uid: source.filename,
        ...parsedData,
    };
}

export function parseRawEvents(rawEvents: ISrc[]): Promise<IRawEventWithUid[]> {
    return Promise.all(rawEvents.map(parseRawEvent));
}
