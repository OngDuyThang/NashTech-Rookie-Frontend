import type { CSSProperties, FC, ReactNode } from "react";
import { AntdContent } from "layout";

interface ContentProps {
    children: ReactNode;
    className?: string,
    style?: CSSProperties
}

const Content: FC<ContentProps> = ({
    children,
    className,
    style
}) => {
    return (
        <AntdContent 
            {...{className, style}}
        >
            {children}
        </AntdContent>
    )
}

export default Content