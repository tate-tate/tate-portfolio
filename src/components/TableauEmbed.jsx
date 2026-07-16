import { useEffect } from "react";

const TableauEmbed = () => {
  useEffect(() => {
    const divElement = document.getElementById("viz1740180505452");
    const vizElement = divElement.getElementsByTagName("object")[0];

    const containerWidth = divElement?.clientWidth || 800;
    vizElement.style.width = "100%";
    vizElement.style.maxWidth = "100%";
    vizElement.style.height = `${Math.round(containerWidth * 2.15)}px`;
    
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div className="tableau-embed" id="viz1740180505452" style={{ position: "relative", width: "100%", maxWidth: "100%", overflow: "hidden" }}>
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
