import React, {Component} from 'react';

//css
import './App.css';
//components
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
    const style = {
      backgroundColor:'green',
      color:'white',
      font:'inherit',
      border:'1px solid blue',
      padding:'8px',
      cursor: 'pointer'
    };

    let persons = null;
    if (this.state.showPersons){
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <Person
                    click={() => this.deletePerson(person.id)}
                    name={person.name} 
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div> 
      );

      style.backgroundColor = 'red';
    }

    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }


    return (
        <div className="App">
          <h1>hi, i am react</h1>
          <p className={classes.join(' ')}>this is really works</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>switch name</button>
            {this.state.showPersons ? 
            persons : null
            }
        </div>
    );
  }
}

export default App;
