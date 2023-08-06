const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export function getRandomName() {
    let randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

    return randomName;
}
