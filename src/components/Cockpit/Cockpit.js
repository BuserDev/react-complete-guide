import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

function Cockpit(props) {
    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        //httprequest
        // setTimeout(() => {
        //     alert('saved data to cloud');
        // }, 1000);

        toggleButtonRef.current.click();
        return () => {
            // clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      };
    });

    let assignedClasses = [];
    let btnClass = '';
    if(props.showPerson){
      btnClass = classes.Red;
    }

    if(props.personsLength <= 2){
      assignedClasses.push(classes.red);
    }
    if(props.personsLength <= 1){
      assignedClasses.push(classes.bold);
    }
    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>this is really works</p>
            <button ref={toggleButtonRef}
            className={btnClass}
            onClick={props.clicked}>switch name</button>
            <button onClick={authContext.login}>Log In</button>
        </div>
    );
}

export default React.memo(Cockpit);