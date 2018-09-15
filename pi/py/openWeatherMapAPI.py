import requests
from sense_hat import SenseHat
import geocoder
import socket
import ipaddress
import pytemperature

g = geocoder.ip('me')
lat = g.lat
lng = g.lng


api_latlng = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=5ec3e53023c8502e481742440f9595de' % (lat, lng)

json_data = requests.get(api_latlng).json()

location = json_data['name']
wind = json_data['wind']['speed']
kelvin = json_data['main']['temp']
humidity = json_data['main']['humidity']
pressure = json_data['main']['pressure']
k2f = (pytemperature.k2f(float(kelvin)))

print
print('OpenWeatherMap')
print('Location: ' + location)
print('Wind speed: ' + str(wind))
print('Temperature: ' + str(pytemperature.k2f(float(kelvin))))
print('Humidity: ' + str(humidity))
print('Pressure: ' + str(pressure))

url = "http://18.235.27.33/api/weather/log"

payload = "source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s" % ('OpenWeatherMap',k2f,humidity,lat,lng,pressure,wind$
headers = {'Content-Type': 'application/x-www-form-urlencoded'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)


