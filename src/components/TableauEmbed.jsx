import { useEffect } from "react";

const TableauEmbed = () => {
  useEffect(() => {
    const divElement = document.getElementById("viz1740180505452");
    const vizElement = divElement.getElementsByTagName("object")[0];
    
    if (divElement.offsetWidth > 800) {
      vizElement.style.width = "1169px";
      vizElement.style.height = "2575px";
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = "1169px";
      vizElement.style.height = "2575px";
    } else {
      vizElement.style.width = "100%";
      vizElement.style.height = "2677px";
    }
    
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div id="viz1740180505452" style={{ position: "relative" }}>
      <noscript>
        <a href="#">
          <img
            alt="2023 In Tornadoes - What can we see?"
            src="https://public.tableau.com/static/images/20/2023inTornadoes/2023inTornadoes/1_rss.png"
            style={{ border: "none" }}
          />
        </a>
      </noscript>
      <object className="tableauViz" style={{ display: "none" }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="path" value="views/2023inTornadoes/2023inTornadoes?:language=en-US&amp;:embed=true&amp;:sid=&amp;:redirect=auth" />
        <param name="toolbar" value="yes" />
        <param name="static_image" value="https://public.tableau.com/static/images/20/2023inTornadoes/2023inTornadoes/1.png" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
      </object>
    </div>
  );
};

export default TableauEmbed;
