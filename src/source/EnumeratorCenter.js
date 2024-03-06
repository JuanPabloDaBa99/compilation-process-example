const { Enumerator, Group } = require('./BlankEnumClasses');

class AnimalEnum extends Enumerator {
    DOG;
    CAT;
    FISH;
}

class LanguageEnum extends Enumerator {
    SPANISH;
    ENGLISH;
    GERMAN;
    ITALIAN;
    FRENCH;
}

class WeirdGroup extends Group {
    AnimalEnum;
    LanguageEnum;
}