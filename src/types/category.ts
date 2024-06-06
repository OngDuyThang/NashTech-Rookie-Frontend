import { ReactNode } from "react"

export type TCategoryProps = 'treeData' | 'value' | 'placeholder' | 'onChange'

export type TCategoryTreeNode = {
    key: string,
    label: ReactNode,
    children?: TCategoryTreeNode[]
}