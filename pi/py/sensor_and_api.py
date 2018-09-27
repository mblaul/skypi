import requests
#geocoder: Allows to source the latitude and longitude based on the device's IP address 
import geocoder
#pytemperature: allows for converting temperatures
import pytemperature
import os
import glob
import time
import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
import socket
import datetime

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
temp_report = ''
def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        return temp_f

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
temp_api = (pytemperature.k2f(float(kelvin)))
temp_sensor = read_temp()
direction = json_data['wind']['deg']

#If statement to determine if data was pulled from the API
if location != '' and wind != '' and kelvin != '' and humidity != '' and pressure != '':

    #printing the OpenWeatherMap information to ensure that the information was pulled
    print('OpenWeatherMap')
    print('Location: ' + location)
    print('Wind speed: ' + str(wind))
    print('Humidity: ' + str(humidity))
    print('Pressure: ' + str(pressure))
    print('Wind Direction: ' + str(direction))
    if temp_sensor == '':
        print('Temperature: ' + str(temp_api))
        temp_report = temp_api
    else:
        print('Temperature: ' + str(temp_sensor))
        temp_report = temp_sensor
    #URL for the weather API to MongoDB
    url = "http://18.235.27.33/api/weather/log"

    #Payload to push to MongoDB using % (String Formatting Operator)
    payload = "source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s" % ('DS18B20 & OpenWeatherMap',temp_report,humidity,lat,lng,pressure,wind,direction)
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.request("POST", url, data=payload, headers=headers)
    print(response.text)

#Else statement if the variables are empty
else:
    print("Error")
    #exit the python script if the variables are empty
    hostName = socket.gethostname()
    dateTime = datetime.datetime.now()

    fromaddr = "XXXXXXXXXXX@gmail.com"
    toaddr = "XXXXXXXXXXX@yahoo.com"
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = "SkyPi: POST data ERROR on: " + hostName
    
    body = "Please check the following weather station: " +  "\n" + hostName + "\n" + str(dateTime) 
    msg.attach(MIMEText(body, 'plain'))
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, "XXXXXXXXXX")
    text = msg.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()
    exit()
