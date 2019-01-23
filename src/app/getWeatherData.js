export const getWeatherData = async city => {
  const APIkey = "cb78543bd6ec4a9fb0f193824190901";
  try {
    let response = await fetch(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${APIkey}&q=${city}&format=json&num_of_days=1`
    );
    response = await response.json();
    //to catch any errors returned by server
    if (response.data.error) {
      return null;
    }
    return response.data;
  } catch (error) {
    //to catch any server errors ie. server down
    console.log(error);
    return null;
  }
};
