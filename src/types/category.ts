export type TCategoryProps = 'treeData' | 'value' | 'placeholder' | 'onChange'

export type TCategoryTreeNode = {
    title: string
    value: string
    children?: TCategoryTreeNode[]
}