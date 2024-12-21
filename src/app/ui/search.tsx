'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string}) {
  const handleSearch = useDebouncedCallback((term) => {    
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('materia', term);
    } else {
      params.delete('materia');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <div className="relative flex mt-3 w-[100%]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="rounded-full border-2 border-foreground text-sm md:py-[9px] py-[7px] px-7 md:pl-10 md:text-m focus:outline-none placeholder:text-gray-500 w-[100%] block md:inline-block"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('materia')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}