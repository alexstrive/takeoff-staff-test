import CssBaseline from '@mui/material/CssBaseline';

type Props = {
  children: JSX.Element;
};

function App({ children }: Props) {
  return (
    <div>
      <CssBaseline />
      {children}
    </div>
  );
}

export default App;
