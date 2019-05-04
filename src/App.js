import React, {Component} from 'react';

//css
import classes from './App.css';
//components
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Person from './Person/Person';

class App extends Component {
  state = {
    persons:[
      {id:'1',name: 'max', age: 28},
      {id:'2',name: 'manu', age: 29},
      {id:'3',name: 'steph', age: 26}
    ],
    showPersons: false
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

    this.setState({persons:persons});
  }

  deletePerson = (personId) => {
    this.setState(currentState => {return {persons: currentState.persons.filter(person => person.id !== personId)}});
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render(){
    let persons = null;
    let btnClass = '';
    if (this.state.showPersons){
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}><Person
                    click={() => this.deletePerson(person.id)}
                    name={person.name} 
                    age={person.age}
                    changed={(event) => this.nameChangeHandler(event, person.id)} /></ErrorBoundary>
          })}
        </div> 
      );
      btnClass = classes.Red;
    }

    let assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }


    return (
        <div className={classes.App}>
          <h1>hi, i am react</h1>
          <p className={assignedClasses.join(' ')}>this is really works</p>
          <button
            className={btnClass}
            onClick={this.togglePersonsHandler}>switch name</button>
            {this.state.showPersons ? 
            persons : null
            }
        </div>
    );
  }
}

export default App;
