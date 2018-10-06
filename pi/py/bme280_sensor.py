try:
    import requests
    #geocoder: Allows to source the latitude and longitude based on the device's IP address 
    import geocoder
    #pytemperature: allows for converting temperatures
    import pytemperature
    import os
    import glob
    import time
    import smtplib
    import socket
    import datetime
    from Adafruit_BME280 import *
except ImportError:
    print("Unable to import modules")
    exit()

def degrees_to_cardinal(d):

    dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    ix = int((d + 11.25)/22.5)
    return dirs[ix % 16]

host_name = socket.gethostname()
sensor = BME280(t_mode=BME280_OSAMPLE_8, p_mode=BME280_OSAMPLE_8, h_mode=BME280_OSAMPLE_8)
sensor_temperature = sensor.read_temperature()
sensor_pascals = sensor.read_pressure()
sensor_pressure = sensor_pascals / 100
sensor_humidity = sensor.read_humidity()

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
api_wind = json_data['wind']['speed']
api_kelvin = json_data['main']['temp']
api_humidity = json_data['main']['humidity']
api_pressure = json_data['main']['pressure']
api_temp = (pytemperature.k2f(float(api_kelvin)))
api_wind_direction = json_data['wind']['deg']
sensor_temp_convert = pytemperature.c2f(sensor_temperature)


#printing the OpenWeatherMap information to ensure that the information was pulled
print('')
print('Location: ' + location)
print('Wind speed: ' + str(api_wind))
print('Humidity: ' + "{:.2f}".format(sensor_humidity))
print('Pressure: ' + "{:.2f}".format(sensor_pressure))
print('Temperature: ' + "{:.2f}".format(sensor_temp_convert))
print('Wind Direction: ' + str(degrees_to_cardinal(api_wind_direction)))


#URL for the weather API to MongoDB
url = "http://18.235.27.33/api/weather/log"

#Payload to push to MongoDB using % (String Formatting Operator)
payload = ("source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s"
 % (host_name + ' BME280',sensor_temp_convert,sensor_humidity,lat,lng,sensor_pressure,api_wind,degrees_to_cardinal(api_wind_direction)))

headers = {'Content-Type': 'application/x-www-form-urlencoded'}
response = requests.request("POST", url, data=payload, headers=headers)
print(response.text)

