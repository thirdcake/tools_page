export interface ButtonInitData {
    text: string,
    value: string,
}

export type ColorState = 0 | 1 | 2;
export type CharacterState = string;
export type LengthState = number;

export const COORDINATES_DATA = Object.freeze(
    ['null', 'nums', 'aiu', 'iroha'] as const
    );
export type CoordinatesState = (typeof COORDINATES_DATA)[number];

export const TYPE_DATA:string[] = [
    'color', 'character', 'width', 'height', 'vertical', 'horizontal',
];
const TYPE_DATA_CONST = [...TYPE_DATA] as const;
export type StateType = typeof TYPE_DATA_CONST[number];
export const BUTTON_TYPE_DATA = TYPE_DATA.filter((_, i) => i < 4) as readonly StateType[];
export type StateBtnType = typeof BUTTON_TYPE_DATA[number];
export const RANGE_TYPE_DATA = TYPE_DATA.filter((_, i) => 4<= i) as readonly StateType[];
export type StateRangeType = typeof TYPE_DATA[4|5];
