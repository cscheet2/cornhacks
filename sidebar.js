/**
 * TODO:
 *   - Update travel steps when pressed
 *   - Show planet information
 */
{/* <div class="nav-entry" id="current-steps">
<input type="text" placeholder="please"/>
<button>+</button>
</div> */}

const render_new_step = () => {
  let container = document.createElement("div");
  let input = document.createElement("input");
  let button = document.createElement("button");

  container.className = "nav-entry";
  input.type = "text";
  input.placeholder = "step";
  button.innerText = "+";

  let is_entered = false;
  button.addEventListener("click", () => {
    if (!is_entered) {
      input.readOnly = true;
      button.innerText = "-";
      is_entered = true;
    } else {
      container.remove(container);
    }
  });

  container.appendChild(input);
  container.appendChild(button);

  document.getElementById("current-steps").appendChild(container);
};

const render_settings = () => {
  let orbit_speed = document.createElement();
};

document.addEventListener("DOMContentLoaded", () => {
  render_new_step();

  const add_step_button = document.getElementById("add-step");
  add_step_button.addEventListener("click", () => { render_new_step(); })
  

  console.log(travel_steps); 
});
