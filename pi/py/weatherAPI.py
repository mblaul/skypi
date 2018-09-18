import geocoder
import requests
import pytemperature

g = geocoder.ip('me')
lat = g.lat
lng = g.lng


api_latlng = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=5ec3e53023c8502e481742440f9595de' %(lat, lng)

json_data = requests.get(api_latlng).json()

location = json_data['name']
wind = json_data['wind']['speed']
kelvin = json_data['main']['temp']
humidity = json_data['main']['humidity']
pressure = json_data['main']['pressure']

print
print('OpenWeatherMap')
print('Location: ' + location)
print('Wind speed: ' + str(wind))
print('Temperature: ' + str(pytemperature.k2f(float(kelvin))))
print('Humidity: ' + str(humidity))
print('Pressure: ' + str(pressure))

darksky_api = 'https://api.darksky.net/forecast/36845a09793a4c98d39a8392d66fecc8/%s,%s$
json_darksky = requests.get(darksky_api).json()
dark_location = json_darksky['timezone']
dark_wind = json_darksky['currently']['windSpeed']
dark_temperature = json_darksky['currently']['temperature']
dark_summary = json_darksky['currently']['summary']

print
print("DarkSky")
print('Location: ' + dark_location)
print('Wind speed: ' + str(dark_wind))
print('Temperature: ' + str(dark_temperature))
print('Currently: ' + dark_summary)

#print(api_latlng)
#print(darksky_api)
