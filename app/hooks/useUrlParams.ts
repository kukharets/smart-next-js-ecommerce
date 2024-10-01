import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UrlParams {
  minPrice?: number;
  maxPrice?: number;
}

export const useUrlParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getUrlParams = (): UrlParams => {
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');

    return {
      minPrice: minPriceParam !== null ? parseInt(minPriceParam) : 0,
      maxPrice: maxPriceParam !== null ? parseInt(maxPriceParam) : 100,
    };
  };

  const [urlParams, setUrlParams] = useState<UrlParams>(getUrlParams());

  const setUrlParam = (newParams: UrlParams) => {
    const updatedParams = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value.toString());
      }
    });

    router.push(`${window.location.pathname}?${updatedParams.toString()}`);
  };

  useEffect(() => {
    const handleParamsChange = () => {
      setUrlParams(getUrlParams());
    };

    handleParamsChange();

    window.addEventListener('popstate', handleParamsChange);
    return () => {
      window.removeEventListener('popstate', handleParamsChange);
    };
  }, [searchParams]);

  return { urlParams, setUrlParam };
};

