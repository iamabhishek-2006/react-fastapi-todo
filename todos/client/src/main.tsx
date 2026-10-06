import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {UserContext} from "./context/auth.context.tsx"
import { TodoContext } from './context/todo.context.tsx';

createRoot(document.getElementById("root")!).render(
    <UserContext>
      <TodoContext>
         <App />
      </TodoContext>
    </UserContext>
);
