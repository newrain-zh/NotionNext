import SmartLink from '@/components/SmartLink'

export default function CategoryItem ({ selected, category, categoryCount }) {
  return (
    <SmartLink
      href={`/category/${category}`}
      passHref
      className={(selected
        ? 'hover:text-white dark:hover:text-white bg-gitbook-primary text-white shadow-md '
        : 'dark:text-gitbook-primary text-gray-500 hover:text-white dark:hover:text-white hover:bg-gitbook-primary hover:shadow-md') +
      ' flex text-sm items-center transition-all duration-300 cursor-pointer py-1.5 font-medium px-4 rounded-full shadow-sm my-1 whitespace-nowrap'}>

      <div><i className={`mr-2 fas ${selected ? 'fa-folder-open' : 'fa-folder'}`} />{category} {categoryCount && `(${categoryCount})`}
      </div>

    </SmartLink>
  );
}
