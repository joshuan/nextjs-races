const schema = {
    $$strict: true,
    category: {
        type: 'enum',
        values: ['f1', 'f2', 'f3'],
    },
    name: {
        type: 'string',
        min: 3,
        max: 255,
    },
    date: 'string',
    startTime: 'string',
    endTime: 'string',
    city: 'string',
    broadcasts: {
        type: 'array',
        items: {
            strict: true,
            type: 'object',
            props: {
                link: 'string',
                commentator: { type: 'string', optional: true },
                channel: 'string',
                type: {
                    type: 'enum',
                    values: ['online', 'offline', 'record'],
                },
                date: { type: 'string', optional: true },
                startTime: { type: 'string', optional: true },
                endTime: { type: 'string', optional: true },
            }
        },
    },
};

export default schema;
