export function formatMonetaryValue(value: number, separator: string) {
    if (typeof value !== 'number' || ![' ', ',', '.'].includes(separator)) {
        throw new Error('Invalid input');
    }

    // Convert the number to a string
    const strValue = value.toString();

    // Split the string into an array of characters
    const chars = strValue.split('').reverse();

    // Insert the separator every 3 characters
    for (let i = 3; i < chars.length; i += 4) {
        chars.splice(i, 0, separator);
    }

    // Reverse the array back and join to form the formatted string
    return chars.reverse().join('');
}