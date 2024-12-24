# propAI
Workflow automation and optimization agents for design professionals, particularly in the fields of architecture and building performance analysis.

# Usage
Use the following 

    export STORE_PATH=~/izyware/izy-idman-tools/id/<ID>;
    ./extract.sh 06 existing_and_proposed_site_plan 1750 1600 560 $STORE_PATH/reference openafter_green_transparent
    ./extract.sh 1  existing_and_proposed_site_plan 2000 1500 500 $STORE_PATH/addr_timestamp 


# Integrations
**Workflow Integration between SketchUp, Rhino3D, and Sefaira**

The integration between **SketchUp**, **Rhino3D**, and **Sefaira** offers a powerful and streamlined approach for design professionals, particularly in the fields of architecture and building performance analysis. These tools can be used together to facilitate a smooth workflow from conceptual design to performance simulation, ultimately helping to create more sustainable, efficient, and innovative buildings.

### **1. SketchUp to Rhino3D Workflow**

SketchUp is known for its intuitive and user-friendly interface, making it a popular choice for early-stage design and conceptual modeling. However, Rhino3D is more robust and better suited for detailed design and complex modeling tasks, offering advanced tools for precision and customization. A typical workflow might involve:

- **Initial Design in SketchUp:** Use SketchUp to quickly sketch and create massing models, which can then be refined and detailed in Rhino. This allows designers to explore ideas rapidly without being bogged down by technical complexities.
- **Export from SketchUp to Rhino:** Once a basic design is complete in SketchUp, it can be exported as a `.dwg`, `.3ds`, or `.skp` file, which can then be imported into Rhino3D for further development. Rhino's powerful NURBS modeling tools can be used to refine shapes, apply parametric design principles, or create more intricate geometries.
- **Refinement and Detailing in Rhino:** Once the model has been imported into Rhino, designers can use advanced surface manipulation, scripting (with RhinoScript or Grasshopper), and precise modeling tools to add complexity, detail, and performance-based elements.

### **2. Integrating Sefaira for Performance Analysis**

**Sefaira** is a performance analysis tool designed to seamlessly integrate with both SketchUp and Rhino3D, offering real-time building performance data on energy use, daylight, and HVAC requirements. Its integration with these platforms allows designers to conduct simulations early in the design process, providing valuable insights before committing to a final design.

- **Sefaira in SketchUp:** Sefaira’s plugin for SketchUp makes it easy to perform early-stage energy and environmental simulations within the SketchUp environment. After creating a basic building model in SketchUp, the plugin allows users to simulate energy consumption, daylighting, thermal comfort, and more. This immediate feedback helps to optimize design decisions related to building orientation, glazing, insulation, and shading.
  
- **Sefaira in Rhino3D:** For more advanced design and analysis, Sefaira can also be used in Rhino3D. Rhino’s parametric design capabilities, particularly through Grasshopper, allow for more complex forms and customized workflows. Sefaira for Rhino integrates with Grasshopper, enabling parametric performance analysis. By connecting Sefaira’s analysis capabilities to Grasshopper’s data-driven design tools, designers can explore performance-driven designs iteratively, optimizing geometry for energy efficiency and environmental sustainability.
  
- **Workflow with Real-Time Feedback:** In both SketchUp and Rhino3D, Sefaira provides real-time feedback on energy efficiency, solar exposure, and HVAC needs. This allows for rapid iteration and comparison of different design options, helping designers make informed decisions before physical construction begins.

### **3. Iterative Design and Analysis Process**

The integration of these three tools allows for a fluid, iterative process of design, analysis, and refinement:

1. **Conceptual Design (SketchUp):** Start with quick sketches and massing models to explore building form and volume.
2. **Refinement and Detailed Modeling (Rhino3D):** Import the SketchUp model into Rhino3D for detailed geometry, advanced surfaces, and precise design elements.
3. **Performance Analysis (Sefaira):** Use Sefaira’s analysis tools to assess building performance in terms of energy consumption, daylighting, and thermal comfort.
4. **Refine and Optimize (SketchUp, Rhino3D, and Sefaira):** Based on the performance data, make adjustments to the model and reanalyze, using Sefaira’s real-time feedback to optimize for efficiency and sustainability.
5. **Final Design Development:** Once the design has been optimized for performance, the model can be developed further in Rhino or SketchUp, with final details added for construction or presentation.

### **Benefits of the Integrated Workflow**

- **Seamless Transitions:** The integration between SketchUp, Rhino3D, and Sefaira allows for seamless transitions between conceptual design, detailed modeling, and performance analysis.
- **Improved Efficiency:** Designers can perform performance simulations early in the process, reducing the need for costly revisions later in the design or construction phases.
- **Sustainability:** The integration of performance analysis with design tools enables a more sustainable approach to architecture, with better insights into energy use, comfort, and environmental impact.
- **Iterative Design:** The ability to quickly test and adjust designs based on real-time data from Sefaira allows for an iterative, performance-driven design process that enhances creativity while maintaining practical efficiency.

### **Conclusion**
By leveraging the strengths of SketchUp, Rhino3D, and Sefaira, designers can create innovative, high-performance buildings that are both aesthetically pleasing and energy-efficient. Whether working on early-stage concepts or detailed models, the integration of these tools offers a flexible, data-informed approach that supports sustainable design and streamlines the workflow from ideation to analysis and refinement.

# ChangeLog

## V7.5
* 74000006: sketchup metadata extraction script
* 74000005: update extract utility and improve parameters

## V7.4
* 74000004: make extract utility more robust
* 74000003: improve UI
* 74000002: modularize position and settings. improve state management.
* 74000001: first commit 

