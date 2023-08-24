import NavBar from './components/NavBar';
import styles from './App.module.css';
import { Container } from 'react-bootstrap';
import { Route, Switch} from 'react-router-dom'
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpFrom';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';


function App() {
 


  
  return (
    
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main} >
      <Switch>
      <Route exact path='/' render={() => <h1>Home page</h1> } />
      <Route exact path='/signin' render={() => <SignInForm /> } />
      <Route exact path='/signup' render={() => <SignUpForm />} />
      <Route exact path='/stories/create' render={() => <PostCreateForm /> } />
      <Route exact path='/stories/:id' render={() => <PostPage /> } />
      <Route render={() => <p>Page not found!</p>} />  
      </Switch>
      </Container>
    </div>
   
  );
}

export default App;