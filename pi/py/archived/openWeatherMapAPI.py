import requests
#geocoder: Allows to source the latitude and longitude based on the device's IP address 
import geocoder
#pytemperature: allows for converting temperatures
import pytemperature

#Using geocoder to source the location of the device based on the IP address
g = geocoder.ip('me')
lat = g.lat
lng = g.lng

#Using % (String Formatting Operator) to input the latitude and longitude of the device to utilize the OpenWeatherMap API
api_latlng = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=5ec3e53023c8502e481742440f9595de' % (lat, lng)

#using requests.get to source the API information
json_data = requests.get(api_latlng).json()

#Variables based on the required informataion sourced from the API
location = json_data['name']
wind = json_data['wind']['speed']
kelvin = json_data['main']['temp']
humidity = json_data['main']['humidity']
pressure = json_data['main']['pressure']
k2f = (pytemperature.k2f(float(kelvin)))

#If statement to determine if data was pulled from the API
if location != '' and wind != '' and kelvin != '' and humidity != '' and pressure != '':

    #printing the OpenWeatherMap information to ensure that the information was pulled
    print('OpenWeatherMap')
    print('Location: ' + location)
    print('Wind speed: ' + str(wind))
    print('Temperature: ' + str(pytemperature.k2f(float(kelvin))))
    print('Humidity: ' + str(humidity))
    print('Pressure: ' + str(pressure))

    #URL for the weather API to MongoDB
    url = "http://18.235.27.33/api/weather/log"

    #Payload to push to MongoDB using % (String Formatting Operator)
    payload = "source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s" % ('OpenWeatherMap',k2f,humidity,lat,lng,pressure,wind,'N')
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)

#Else statement if the variables are empty
else:
    print("Error")
    #exit the python script if the variables are empty
    exit()
