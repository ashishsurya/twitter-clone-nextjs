/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';

export default function Profile() {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const unsubscribe = async () => {
      await fetch('/api/user')
        .then((res) => res.json())
        .then((v) => {
          console.log(v);
          setSrc(v.data.imageUrl)
        });
    };

    unsubscribe();
  }, []);

  return (
    <div>
      <img className='w-14 h-14 rounded-full' src={src} alt='Profile Pic' />
    </div>
  );
}
