try:
    import requests
    import geocoder
    import os
    import glob
    import time
    import smtplib
    import socket
    import datetime
    from Adafruit_BME280 import *
    import mongo_api 
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
sensor_temperature = "{:.2f}".format(sensor.read_temperature())
sensor_pascals = sensor.read_pressure()
sensor_pressure = "{:.2f}".format(sensor_pascals / 100)
sensor_humidity = "{:.2f}".format(sensor.read_humidity())

#Using geocoder to source the location of the device based on the IP address
g = geocoder.ip('me')
lat = g.lat
lng = g.lng

api_location = "http://ipinfo.io/json"
json_location = requests.get(api_location).json()
city = json_location['city']
state = json_location['region']
country = json_location['country']
zip_code = json_location['postal']

#Using % (String Formatting Operator) to input the latitude and longitude of the device to utilize the OpenWeatherMap API
api_latlng = 'http://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&units=metric&appid=5ec3e53023c8502e481742440f9595de' % (lat, lng)

#using requests.get to source the API information
json_data = requests.get(api_latlng).json()

#Variables based on the required informataion sourced from the API
location = json_data['name']
api_wind = json_data['wind']['speed']
api_temp = '%.2f' % (json_data['main']['temp'])
api_humidity = '%.2f' % (json_data['main']['humidity'])
api_pressure = '%.2f' % (json_data['main']['pressure'])
api_wind_direction = json_data['wind']['deg']
wind_direction = degrees_to_cardinal(api_wind_direction)

dark_sky = "https://api.darksky.net/forecast/36845a09793a4c98d39a8392d66fecc8/%s,%s" % (lat, lng)

dark_sky_json = requests.get(dark_sky).json()

percipitation = dark_sky_json['currently']['precipProbability']
description = dark_sky_json['minutely']['icon']

#printing the OpenWeatherMap information to ensure that the information was pulled
print('')
print('Location: ' + location)
print('Wind speed: ' + str(api_wind))
print('Humidity: ' + sensor_humidity)
print('Pressure: ' + sensor_pressure)
print('Temperature: ' + sensor_temperature)
print('Wind Direction: ' + str(degrees_to_cardinal(api_wind_direction)))
print('Percipitation Probability: ' + str(percipitation))
print('Description: ' + description)
print('City: ' + city)
print('State: ' + state)
print('Country: ' + country)
print('Zip Code: ' + str(zip_code))


mongo_api.pushdata(host_name, sensor_temperature, sensor_humidity, lat, lng, sensor_pressure,
city, state, zip_code, country, api_wind, wind_direction, percipitation, description)
