import { ReactNode } from "react";

export type TOption = {
    value: string;
    text: string;
    icon?: ReactNode
}

export type TSelectProps = 'children' | 'onChange' | 'defaultValue'
export type TOptionProps = 'children' | 'value'