import { Login } from "./components/Authorization/login"; 
import { Register} from "./components/Authorization/register";

export default function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
