import React, {Component} from 'react';

//css
import classes from './App.css';
//components
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons:[
      {id:'1',name: 'max', age: 28},
      {id:'2',name: 'manu', age: 29},
      {id:'3',name: 'steph', age: 26}
    ],
    showPersons: false,
    showCockpit:true,
    counter:0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    //return updated state
    console.log('[App.js] getDerivedStateFromProps');
    return state;
  }

  // /*depricated
  // componentWillmount(){
  //   //depricated
  // }*/

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    
    const person = {...this.state.persons[personIndex]};
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons:persons,
        counter: prevState.counter + 1
      };
    });
  }

  deletePerson = (personId) => {
    this.setState(currentState => {return {persons: currentState.persons.filter(person => person.id !== personId)}});
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  loginHandler = () => {
    this.setState({authenticated:true});
  }

  render(){
    console.log('[App.js] render');
    let persons = null;
    if (this.state.showPersons){
      persons = (
        <div >
         <Persons 
            persons={this.state.persons} 
            clicked={this.deletePerson} 
            changed={this.nameChangeHandler}
            isAuthenticated={this.state.authenticated} />
        </div> 
      );
    }



    return (
        <Aux>
        <button onClick={() => {this.setState({showCockpit:false})}}>hide cockpit</button>
        <AuthContext.Provider value={{authenticated:this.state.authenticated, login:this.loginHandler}}>
            {this.state.showCockpit ? <Cockpit
              title = {this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
              login={this.loginHandler}
            ></Cockpit> : null}

            {persons}
          </AuthContext.Provider>
        </Aux>
    );
  }
}

export default withClass(App, classes.App);
