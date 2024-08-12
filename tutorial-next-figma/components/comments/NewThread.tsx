import { Button } from "../ui/button";

interface NewThreadProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function NewThread({ children, ...props }: NewThreadProps) {
  return <Button {...props}>{children}</Button>;
}

export default NewThread;
