import yaml from 'js-yaml';
import { IRawFile, IRawEventData } from "../types";
import { getValidateErrors, validateRawEvent } from "./validateRawEvent";

export async function parseRawEvent({ filename, content }: IRawFile): Promise<IRawEventData> {
    const parsedData = await yaml.load(content);

    if (!validateRawEvent(parsedData)) {
        console.error('Errors:', getValidateErrors(parsedData));
        throw new Error(`Validation error (${filename})`);
    }

    return {
        uid: filename,
        ...parsedData,
    };
}

export function parseRawEvents(rawEvents: IRawFile[]): Promise<IRawEventData[]> {
    return Promise.all(rawEvents.map(parseRawEvent));
}
