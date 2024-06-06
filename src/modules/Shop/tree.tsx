import { CategoryEntity } from "__generated__/graphql"
import { useRouterProductQuery } from "hooks"
import { isEmpty } from "lodash"
import { FC } from "react"
import { TCategoryTreeNode } from "types/category"
import { FaCheck } from "react-icons/fa";

export const Label: FC<{ title: string, value: string }> = ({ title, value }) => {
    const [_router, query] = useRouterProductQuery()

    return (
        <div>
            {
                query?.categoryIds?.includes(value) ||
                    query?.authorIds?.includes(value) ||
                    query?.ratings?.includes(value) ?
                    <div className="flex gap-2 items-center">
                        <FaCheck className="min-w-4 min-h-4 text-green-600" /> {title}
                    </div> :
                    title
            }
        </div>
    )
}

export const createCategoryTree = (
    categories: CategoryEntity[]
): TCategoryTreeNode[] => {
    if (isEmpty(categories)) return []

    const map: Record<string, TCategoryTreeNode> = {}
    const result: TCategoryTreeNode[] = []

    for (const category of categories) {
        map[category.id] = {
            label: <Label
                title={category.name}
                value={category.id}
            />,
            key: category.id,
            children: []
        }
    }

    for (const category of categories) {
        if (category.parent_id != null) {
            const parent = map[category.parent_id]
            parent?.children?.push(map[category.id])
        } else {
            result.push(map[category.id])
        }
    }

    const removeEmptyChildren = (node: TCategoryTreeNode) => {
        if (node?.children?.length === 0) {
            delete node.children
        } else {
            node.children = node?.children?.map(removeEmptyChildren).filter(Boolean)
        }
        return node
    }

    return result.map(removeEmptyChildren).filter(Boolean)
}