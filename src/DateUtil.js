
const makeWidth = (value, size) => {
    const out = `${value}`;
    const result = out.padStart(size, "0");
    return result;
};

/**
 * Return ISO compatible string without separator
 *
 * Example:
 *    20220627235623
 *
 * @param {DateTime} now
 * @return {String}
 */
export const makeDate = (now) => {
    now = now ?? new Date();
    /* Create date part */
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    /* Create time part */
    const hour = now.getUTCHours();
    const minute = now.getUTCMinutes();
    const sec = now.getUTCSeconds();
    /* Construct parts with date & time */
    const parts = [];
    parts.push(makeWidth(year, 4));
    parts.push(makeWidth(month, 2));
    parts.push(makeWidth(day, 2));
    parts.push(makeWidth(hour, 2));
    parts.push(makeWidth(minute, 2));
    parts.push(makeWidth(sec, 2));
    /* Join parts */
    const result = parts.join('');
    return result;
};
