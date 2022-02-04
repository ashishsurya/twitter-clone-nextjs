import React from 'react';

const useUser = () => {
  const [user, setuser] = React.useState(null);
  React.useEffect(() => {
    const getUser = async () => {
      await fetch('/api/user')
        .then((res) => res.json())
        .then((d) => setuser(d.data));
    };

    getUser();
  }, []);
  return user;
};

export default useUser;
