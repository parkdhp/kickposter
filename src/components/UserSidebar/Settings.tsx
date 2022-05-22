import React, { useEffect, useState } from "react";
import "./Settings.css";

const Settings: React.FC = () => {
  const [feedname, setFeedname] = useState("");

  // Anything here would run when feedname is changed via setFeedname...
  // currently that doesn't happen though.
  useEffect(() => {
    localStorage.setItem("feedname", feedname)
  }, [feedname]);

  function saveFeedName(e: { target: { value: React.SetStateAction<string>; }; }) {
    setFeedname(e.target.value);
  }
  return (
      <div className="settings">
        Give your feed a name!
        <input value={feedname} onChange={saveFeedName} ></input>
      </div>
  )
};

export default Settings;
