import {
  TreeSelect,
  TreeSelectProps,
  ConfigProvider as AntdConfigProvider
} from 'antd'
import { type FC } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { TCategoryProps } from 'types/category'
import { COLOR } from 'utils/constant'

interface CategoryProps extends
  Pick<Required<TreeSelectProps>, TCategoryProps>, Omit<TreeSelectProps, TCategoryProps> {}

const Category: FC<CategoryProps> = ({
  className,
  style,
  treeData,
  value,
  onChange,
  placeholder,
  showSearch = true,
  allowClear = true,
  treeDefaultExpandAll = true,
  popupMatchSelectWidth = false,
  placement = 'bottomLeft',
  suffixIcon = <FaCaretDown />,
  ...props
}) => {
  return (
    <AntdConfigProvider theme={{
      token: {
        colorPrimary: COLOR.PRIMARY_BUTTON
      }
    }}>
      <TreeSelect
        {...{
          className,
          style,
          treeData,
          value,
          onChange,
          placeholder,
          showSearch,
          allowClear,
          treeDefaultExpandAll,
          popupMatchSelectWidth,
          placement,
          ...props
        }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      />
    </AntdConfigProvider>
  )
}

export default Category
