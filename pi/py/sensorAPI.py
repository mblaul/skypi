
import requests
from sense_hat import SenseHat
import geocoder
import socket
import ipaddress
import pytemperature

location = geocoder.ip('me')
lat = location.lat
lng = location.lng

sense = SenseHat()
sense.clear()

temp = sense.get_temperature()
c2f = pytemperature.c2f(temp)
humidity = sense.get_humidity()
pressure = (sense.get_pressure()/68.9476)
address = socket.gethostname()

url = "http://18.235.27.33/api/weather/log"

payload = "source=%s&device=5b778422c1381d18a8bd003e&temperature=%f&humidity=%f&latitude=%f&longitude=%f&pressure=%f&wind=%f&winddirection=%s" % (address,c2f,humidity,lat,lng,pressure,2,"North")
headers = {'Content-Type': 'application/x-www-form-urlencoded'}

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)

