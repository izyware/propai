# Declare a global variable to store the dialog reference
$dialog = nil

# Function to convert inches to a fraction with denominator 16
def inches_to_fraction(inches)
  # Get the whole number part
  whole_inches = inches.to_i
  # Get the fractional part
  fraction = inches - whole_inches
  # Convert the fractional part to the closest fraction with denominator 16
  fraction_in_sixteenths = (fraction * 16).round
  if fraction_in_sixteenths == 16
    whole_inches += 1
    fraction_in_sixteenths = 0
  end

  # If there's no fractional part, return the whole number inches
  if fraction_in_sixteenths == 0
    "#{whole_inches}\""
  else
    # Otherwise, return the whole number and the fraction (e.g., 5 1/16")
    "#{whole_inches} #{fraction_in_sixteenths}/16\""
  end
end

# Function to convert inches to feet and inches (with fractional inches)
def inches_to_feet_and_inches(inches)
  feet = (inches / 12).to_i
  remaining_inches = inches % 12

  # Convert remaining inches to fraction
  inches_str = inches_to_fraction(remaining_inches)

  # Return the formatted string
  if feet > 0
    "#{feet}' #{inches_str}"
  else
    inches_str
  end
end

# Function to create or reload the dialog
def create_or_reload_dialog
  # If the dialog already exists, close it
  if $dialog
    $dialog.close
  end

  # Define the HTML content for the dialog
  html_content = <<-HTML
    <html>
      <head>
        <script type="text/javascript">
          function getComponentNames() {
            sketchup.getComponentNames();
          }

          function displayComponents(components) {
            var table = document.getElementById("componentTable");
            table.innerHTML = "";  // Clear the table first
            
            // Add table headers
            var header = table.createTHead();
            var row = header.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = "Index";
            cell2.innerHTML = "Component Name";
            cell3.innerHTML = "Width (ft, in)";
            cell4.innerHTML = "Height (ft, in)";
            cell5.innerHTML = "Depth (ft, in)";
            
            // Add table rows for each component
            components.forEach(function(component, index) {
              var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              cell1.innerHTML = index + 1;
              cell2.innerHTML = component.name;
              cell3.innerHTML = component.width;
              cell4.innerHTML = component.height;
              cell5.innerHTML = component.depth;
            });
          }
        </script>
      </head>
      <body>
        <h2>Components List in SketchUp</h2>
        <button onclick="getComponentNames()">Get Component Names and Dimensions</button>
        <br><br>
        <table id="componentTable" border="1"></table>
      </body>
    </html>
  HTML

  # Create a new dialog
  $dialog = UI::HtmlDialog.new({
    :dialog_title => "Component Names and Dimensions",
    :width => 600,
    :height => 400,
    :style => UI::HtmlDialog::STYLE_DIALOG,
    :resizable => true
  })

  # Set the HTML content for the dialog
  $dialog.set_html(html_content)

  # Add a callback to handle the JavaScript request to get component names and dimensions
  $dialog.add_action_callback("getComponentNames") do |action_context|
    model = Sketchup.active_model
    entities = model.entities
    component_data = []

    # Collect component names and their dimensions
    entities.each do |entity|
      if entity.is_a?(Sketchup::ComponentInstance)
        # Use instance name if available, otherwise use definition name
        name = entity.name.empty? ? entity.definition.name : entity.name
        bounds = entity.bounds

        # Convert dimensions from inches to feet and fractional inches
        width = inches_to_feet_and_inches(bounds.width)
        height = inches_to_feet_and_inches(bounds.height)
        depth = inches_to_feet_and_inches(bounds.depth)

        # Store component data (name and dimensions)
        component_data << { "name" => name, "width" => width, "height" => height, "depth" => depth }
      end
    end

    # Sort components alphabetically by name
    component_data.sort_by! { |component| component["name"].downcase }

    # Pass the sorted component data (name, width, height, and depth) to JavaScript
    $dialog.execute_script("displayComponents(#{component_data.to_json});")
  end

  # Show the dialog
  $dialog.show
end

# Call the method to create or reload the dialog
create_or_reload_dialog
