import React from "react";
import "./styles.css";
import { TextareaAutosize, Button } from '@material-ui/core';


export default function App() {
  return (
    <div className="App">
      <h1>Insert Job Title Here!</h1>
      <TextareaAutosize aria-label="empty textarea" placeholder="ENTER SUPER LONG DESCRIPTION HERE!    Figure out how to extend width     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus porta magna. In massa leo, facilisis ac libero a, pulvinar tempor est. Morbi eu hendrerit lacus. Vivamus malesuada felis a ante faucibus, vel ornare ex facilisis. Aliquam ultrices tincidunt ligula, at facilisis ipsum tristique eu. Cras nec viverra metus, non eleifend eros. Vivamus vel imperdiet mauris. In hac habitasse platea dictumst. Maecenas convallis, nibh ac facilisis placerat, libero dui hendrerit dolor, lacinia posuere mi turpis id nisi. Donec iaculis velit et sem luctus consectetur. Nullam cursus eros nulla, vitae viverra libero eleifend et. Nam molestie mauris eu malesuada posuere. Donec ut est lacus. Fusce placerat pellentesque nunc ut accumsan. Nulla pharetra augue enim, ac porta urna finibus non. Phasellus viverra congue nisl, eu dapibus massa ultrices faucibus.

Vivamus auctor ipsum nec neque faucibus ultrices..." />
    <p></p>
    <Button variant="contained"
    color="primary">Apply!</Button>


    </div>
  );
}