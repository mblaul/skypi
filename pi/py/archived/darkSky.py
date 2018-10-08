import requests
#geocoder: Allows to source the latitude and longitude based on the device's IP address 
import geocoder
#pytemperature: allows for converting temperatures
import pytemperature

#Using geocoder to source the location of the device based on the IP address
g = geocoder.ip('me')
lat = g.lat
lng = g.lng
#Using % (String Formatting Operator) to input the latitude and longitude of the device to utilize the DarkSky API
darksky_api = 'https://api.darksky.net/forecast/36845a09793a4c98d39a8392d66fecc8/%s,%s' % (lat, lng)

#using requests.get to source the API information
json_darksky = requests.get(darksky_api).json()

#Variables based on the required informataion sourced from the API
location = json_darksky['timezone']
wind = json_darksky['currently']['windSpeed']
temperature = json_darksky['currently']['temperature']
summary = json_darksky['currently']['summary']

#If statement to determine if data was pulled from the API
if location != '' and wind != '' and temperature != '':

    #printing the OpenWeatherMap information to ensure that the information was pulled
    print("DarkSky")
    print('Location: ' + location)
    print('Currently: ' + summary)
    print('Wind speed: ' + str(wind))
    print('Temperature: ' + str(temperature))

    #URL for the weather API to MongoDB
    url = "http://18.235.27.33/api/weather/log"

    #Payload to push to MongoDB using % (String Formatting Operator)
    payload = "source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s" % ('DarkSky',temperature,0,lat,lng,0,wind,'N')
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)

#Else statement if the variables are empty
else:
    print("Error")
    #exit the python script if the variables are empty
    exit()