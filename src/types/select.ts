import { ReactNode } from "react";

export type TOption = {
    value: string;
    text: string;
    icon?: ReactNode
}

export type TSelectProps = 'children' | 'onChange' | 'defaultValue' | 'suffixIcon'
export type TOptionProps = 'children' | 'value'