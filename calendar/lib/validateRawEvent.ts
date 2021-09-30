import Validator from 'fastest-validator';
import { IRawEvent } from '../../@types/types';
import schema from '../schema';
// import schema from '../../@types/schema.json';

const v = new Validator();

export const check = v.compile(schema);

export function getValidateErrors(content: any) {
    return check(content);
}

export function validateRawEvent(content: any): content is IRawEvent {
    return getValidateErrors(content) === true;
}
