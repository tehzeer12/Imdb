import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

import UserListScreen from './screens/UserListScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserEditScreen from './screens/UserEditScreen'
import MovieScreen from './screens/MovieScreen'
import EditReviewScreen from './screens/EditReviewScreen'
import EditRatingScreen from './screens/EditRatingScreen'
import LimitAccessScreen from './screens/LimitAccessScreen'
import ActiveEditScreen from './screens/ActiveEditScreen'
import BlockListScreen from './screens/BlockListScreen'
import BlockEditScreen from './screens/BlockEditScreen'
import ModeratorScoreScreen from './screens/ModeratorScoreScreen'
import ListScreen from './screens/ListScreen'

function App() {
  return (
    <Router >
    <Header/>
    <main className="py-5">
    <Container>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/profile' component={ProfileScreen} />
      
      
      
      <Route path='/admin/userlist' component={UserListScreen}/>
      <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
      <Route path='/movie/:id' component={MovieScreen}/>
      <Route path='/edit/review/:id/:movId' component={EditReviewScreen}/>
      <Route path='/edit/rating/:id/:movId' component={EditRatingScreen}/>
  
      <Route path='/moderator/limitaccess' component={LimitAccessScreen}/>
      
      <Route path='/moderator/user/:id/edit/access' component={ActiveEditScreen}/>
      
      <Route path='/moderator/blocklist' component={BlockListScreen}/>
      
      <Route path='/moderator/user/:id/unblock' component={BlockEditScreen}/>
      <Route path='/admin/moderatorscores' component={ModeratorScoreScreen}/>
      <Route path='/movies/list' component={ListScreen}/>
      </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
