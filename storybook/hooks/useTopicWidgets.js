import React from "react";

export default (target = "website", catalog = "", baseUrl = 'https://dev-labs.rawpixel.com/_services') => {
  const [loading, setLoading] = React.useState(false);
  const [widgets, setWidgets] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    const queryParams = {
      ...(target && { target }),
      ...(catalog && { catalog })
    };
    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join("&");

    fetch(
      `${baseUrl}/topics/sidebar/widgets?${queryString}`,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLoading(false);
          setWidgets(data);
        } else {
          console.log({ data });
        }
      })
      .catch(reason => {
        console.log({ reason });
        setLoading(false);
      });
  }, [target, catalog]);

  return { loading, widgets };
};
