async function fetchCall(requestMethod, url, jwt, requestBody) {
  const fetchData = {
    headers: {
      "Content-Type": "application/json",
    },
    method: requestMethod,
  };

  if (jwt) {
    fetchData.headers.Authorization = `Bearer ${jwt}`;
  }

  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
  }

  try {
    const response = await fetch(url, fetchData);
    console.log("Response: ", response);
    const processedResponse = await processResponse(response);
    //console.log("Processed response: ", processedResponse);
    return processedResponse;
  } catch (error) {
    console.log(error);
  }
  // return fetch(url, fetchData).then((response) => {
  //   //if (response.ok) return response.json();
  //   if (response.status === 200) {
  //     const contentType = response.headers.get("content-type");
  //     if (contentType && contentType.indexOf("application/json") !== -1) {
  //       return response.json();
  //     } else {
  //       return response.text();
  //     }
  //   }
  // });
}

function processResponse(response) {
  if (response.status === 200) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      return response.text();
    }
  }
  return console.log("Something went wrong");
}

export default fetchCall;
