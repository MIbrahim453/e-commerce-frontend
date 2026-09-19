import { Input, Button } from 'antd'
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons'

function SearchBar() {
    return (
        <div className="relative flex items-center w-full bg-surface border border-border rounded-full shadow-level-1 transition-all outline-none duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 py-1 px-1.5 pl-3.5 sm:pl-5 h-11 sm:h-12">
            <SearchOutlined className="text-text-secondary text-base sm:text-lg shrink-0 mr-2 sm:mr-3" />

            <Input
                placeholder="Search products"
                variant="borderless"
                className="flex-1 bg-transparent! p-0! outline-none! rounded-none! text-text-primary! placeholder:text-text-secondary! text-xs sm:text-sm tracking-[-0.031em] font-normal"
            />

            <Button
                type="primary"
                shape="circle"
                icon={<ArrowRightOutlined className="text-xs sm:text-sm" />}
                aria-label="Search"
                className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-primary hover:bg-primary/90 text-on-primary rounded-full shadow-violet-glow flex items-center justify-center transition-transform active:scale-95 border-0"
            />
        </div>
    )
}

export default SearchBar