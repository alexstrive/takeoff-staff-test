import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = null;

    if (!user) {
      navigate('/sign-in');
    }
  });

  return <div>Wait for redirection</div>;
}
