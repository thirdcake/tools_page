export type ColorState = 0 | 1 | 2;
export type CharacterState = string;
export type LengthState = number;

export const COORDINATES_DATA = Object.freeze(
    ['null', 'nums', 'aiu', 'iroha'] as const
    );
export type CoordinatesState = (typeof COORDINATES_DATA)[number];

