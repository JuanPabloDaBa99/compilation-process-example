import { Enumerator } from "./../../src/Enums/Enumerator";

class AnimalEnum extends Enumerator {
	static _dog_ = 0;
	static _cat_ = 1;
	static _fish_ = 2;

	static _values_ = {
		DOG: 0,
		CAT: 1,
		FISH: 2,
	}

	static get DOG() {
		return this._dog_;
	}
	static get CAT() {
		return this._cat_;
	}
	static get FISH() {
		return this._fish_;
	}
}

class LanguageEnum extends Enumerator {
	static _spanish_ = 0;
	static _english_ = 1;
	static _german_ = 2;
	static _italian_ = 3;
	static _french_ = 4;

	static _values_ = {
		SPANISH: 0,
		ENGLISH: 1,
		GERMAN: 2,
		ITALIAN: 3,
		FRENCH: 4,
	}

	static get SPANISH() {
		return this._spanish_;
	}
	static get ENGLISH() {
		return this._english_;
	}
	static get GERMAN() {
		return this._german_;
	}
	static get ITALIAN() {
		return this._italian_;
	}
	static get FRENCH() {
		return this._french_;
	}
}

class WeirdGroup extends Enumerator {
	static _animalenum_ = AnimalEnum;
	static _languageenum_ = LanguageEnum;

	static _values_ = {
		AnimalEnum: 0,
		LanguageEnum: 1,
	}

	static get AnimalEnum() {
		return this._animalenum_;
	}
	static get LanguageEnum() {
		return this._languageenum_;
	}
}

export { AnimalEnum, LanguageEnum, WeirdGroup }