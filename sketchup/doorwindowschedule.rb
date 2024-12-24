# Declare a global variable to store the dialog reference
$dialog = nil

# Function to convert inches to feet and inches
def inches_to_feet_and_inches(inches)
  feet = (inches / 12).to_i
  remaining_inches = (inches % 12).round(2)
  if feet > 0
    # If there's a full foot, return the result in feet and inches
    "#{feet}' #{remaining_inches}\""
  else
    # If no full foot, just return the inches
    "#{remaining_inches}\""
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
            cell1.innerHTML = "Index";
            cell2.innerHTML = "Component Name";
            cell3.innerHTML = "Dimensions (W x H x D)";
            
            // Add table rows for each component
            components.forEach(function(component, index) {
              var row = table.insertRow();
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              cell1.innerHTML = index + 1;
              cell2.innerHTML = component.name;
              cell3.innerHTML = component.dimensions;
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
    :width => 500,
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

        # Convert dimensions from inches to feet and inches
        width = inches_to_feet_and_inches(bounds.width)
        height = inches_to_feet_and_inches(bounds.height)
        depth = inches_to_feet_and_inches(bounds.depth)

        dimensions = "#{width} x #{height} x #{depth}"
        
        # Store component data (name and dimensions)
        component_data << { "name" => name, "dimensions" => dimensions }
      end
    end

    # Sort components alphabetically by name
    component_data.sort_by! { |component| component["name"].downcase }

    # Pass the sorted component data (name and dimensions) to JavaScript
    $dialog.execute_script("displayComponents(#{component_data.to_json});")
  end

  # Show the dialog
  $dialog.show
end

# Call the method to create or reload the dialog
create_or_reload_dialog
